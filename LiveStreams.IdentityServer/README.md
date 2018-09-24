# Getting Started

    dotnet run

# Database / Migrations

Start by `deleting your _EF Migrations table` if you have one.
Next delete the migrationsin your `src/Migrations` folder.

Next, add a new migration

    dotnet ef migrations add InitialMigration

## Apply the migrations

    dotnet ef database update

## Helpful

    dotnet ef migrations list
    // Lists available migrations

    dotnet ef migrations script
    // Generates a SQL script from migrations.
