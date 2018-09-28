# `ASP.NET CORE 2.1` && `Angular 6.1.6 Web Application` && `Identity Server 4`

Made with help from [this github](https://github.com/elanderson/Angular-Core-IdentityServer)

# Getting Started

# #1 `LiveStreams.Web` Project

## In your 1st terminal/command prompt

1.   Navigate to the `./LiveStreams.Web/ClientApp/` folder. (this is where the Angular app is located)
     Then run:

```
     npm install

     // installs all of the NPM packages for the Angular app
```

2.   Stay in the `./LiveStreams.Web/ClientApp/` folder and run:

```
     ng build

     // builds the Angular app
```

3.   Navigate back to `./LiveStrams.Web/` folder. (main folder for MVC Web Server project)
     Then run:

```
     dotnet build

     // or

     dotnet restore

     // installs all dependecies that .NET needs
```

4.   Stay in the `./LiveStrams.Web/` folder
     Then run:

```
        dotnet run

        // This starts the ASP.NET Core Web Server
```

This will run the Web application at [https://localhost:5002](https://localhost:5002)

# #2 `LiveStream.Api` Project

## In your 2nd terminal/command prompt

1.   Navigate to the `./LiveStreams.Api/` folder. (main folder for the Api Server project)
     Then run:

```
     dotnet build

     // or

     dotnet restore

     // installs all dependecies that .NET needs
```

2.   Stay in the `/LiveStreams.Api/` folder and run:

```
     dotnet run

     // This starts the ASP.NET Core Api Server
```

This will run the API on [https://localhost:5050/api](https://localhost:5050/api)

# #3 `LiveStreams.IdentityServer` Project

## In your 3rd terminal/command prompt

1.   Navigate to the `./LiveStreams.IdentityServer/` folder. (main folder for the Identity Server project)
     Then run:

```
     dotnet build

     // or

     dotnet restore

     // installs all dependecies that .NET needs
```

2.   Stay in the `./LiveStreams.IdentityServer/` folder and run:

```
     dotnet run

     // This starts the ASP.NET Core Identity Server 4 / Authentication Server
```

This will run the ID4 server on [https://localhost:5050](https://localhost:5050)

# ========================

# `ASP.NET Core` + `Angular 6.1` + `API server` + `IdentityServer 4` + `SwaggerUI`

This solution has 3 projects.

1. **`LiveStreams.Api`** --> Is intended to be the API server to send data from the database to the Web Client and runs locally on [https://localhost:5069](https://localhost:5069)

Restore dependencies:

```
        dotnet restore
```

Run before using project

```
        dotnet run
```

2. **`LiveStreams.IdentityServer`** --> Templated from the [dotnet templates](https://github.com/IdentityServer/IdentityServer4.Templates)

Install with:

```
        dotnet new -i identityserver4.templates
```

Then using:

```
        dotnet new is4aspid
```

3. **`LiveStreams.Web`** --> Intended to be the Web Client project. This serves the Angular 6.1 application. It runs locally on [https://localhost:5002](https://localhost:5002)

Restore dependencies:

```
        dotnet restore
```

Run before using project

```
        dotnet run
```

# Being Safe And Secure

1.   Add an `appsettings.Development.json` file to your project. Use this file for storing all your configuration values
2.   The `appsettings.json` file is included only as an example template and NEVER should store any real/production settings. This file will be checked into source control. This file will be used by other developers to setup their own `appsettings.{EnvironmentName}.json` file
3.   In your .gitignore file add these lines to ignore your `appsettings.{EnvironmentName}.json` file.

```
     # ignore appsettings configuration files

     **/appsettings.development.json
     **/appsettings.staging.json
     **/appsettings.production.json
```
