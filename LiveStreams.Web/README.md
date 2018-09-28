# `LiveStreams.Web` Project

## Getting Started

Navigate to `./LiveStreams.Web/` root folder. (main folder of the Web Server Project)

Then run:

```
     dotnet build

     // or

     dotnet restore

     // installs all dependecies that .NET needs
```

This should run the Angular SPA app (`./ClientApp/) on a random open port and automatically open the browser to Angular app. Angular's built-in web server will be running the app from the`./ClientApp/dist/` folder.

The URL will look something like this.

```
    `http://localhost:58070/`
```

However, when actually running the Web Server by using the `dotnet run` command, the `WebHostBuilder().UseUrls()` in the `Program.cs` fill will ask the application to be served on port `5002`. So the ASP.NET Core server will launch the Angular application on the URL below using the `./LiveStreams.Web/wwwroot/` folder.

```
    https://localhost:5002/
```

## Angular App Proxy

The Angular project uses `./ClientApp/proxy.conf.json` to route all HTTP calls to the correct server.

All HTTP calls that start with `/api/` will route to `https://127.0.0.1:5069` which is the `LiveStreams.Api` project.
