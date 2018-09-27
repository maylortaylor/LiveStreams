## Getting Started

Go to `LiveStreams.Web` root folder.
Run command:

    dotnet run

This should run the Angular SPA app on `http://localhost:58070/`
However, the `WebHostBuilder().UseUrls()` in the `Program.cs` will ask the application to work on

    https://localhost:5002/

The Angular project uses `/ClientApp/proxy.conf.json` to route the all HTTP calls to the correct server.

All HTTP calls that start with `/api/` will route to `https://127.0.0.1:5069` which is the `LiveStreams.Api` project.
