using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace LiveStreams.Web
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var config = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddEnvironmentVariables()
                // .AddJsonFile("certificate.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"certificate.{Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")}.json", optional: true, reloadOnChange: true)
                .Build();

            var certificateSettings = config.GetSection("certificateSettings");
            string certificateFileName = certificateSettings.GetValue<string>("filename");
            string certificatePassword = certificateSettings.GetValue<string>("password");

            var certificate = new X509Certificate2(certificateFileName, certificatePassword);


            // var host = new WebHostBuilder()
            //             .UseKestrel(
            //                 options =>
            //                 {
            //                     options.AddServerHeader = false;
            //                     options.Listen(IPAddress.Loopback, 5002, listenOptions =>
            //                     {
            //                         listenOptions.UseHttps(certificate);
            //                     });
            //                 }
            //             )
            //             .UseConfiguration(config)
            //             .UseContentRoot(Directory.GetCurrentDirectory())
            //             .UseStartup<Startup>()
            //             .UseUrls("https://localhost:5002")
            //             .Build();

            CreateWebHostBuilder(args, config, certificate).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args,
            IConfigurationRoot config,
            X509Certificate2 certificate) =>
                WebHost.CreateDefaultBuilder(args)
                    .UseKestrel(options =>
                    {
                        options.AddServerHeader = false;
                        options.Listen(IPAddress.Loopback, 5002, listenOptions =>
                        {
                            listenOptions.UseHttps(certificate);
                        });
                    })
                   .ConfigureLogging((hostingContext, logging) =>
                    {
                        logging.AddConfiguration(hostingContext.Configuration.GetSection("Logging"));
                        logging.AddConsole();
                        logging.AddDebug();
                    })
                    .UseContentRoot(Directory.GetCurrentDirectory())
                    .UseConfiguration(config)
                    .UseUrls("https://localhost:5002")
                    .UseStartup<Startup>();
    }
}
