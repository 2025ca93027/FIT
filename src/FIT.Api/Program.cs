using FIT.Api.Extensions;

internal sealed class Program
{
    static void Main(string[] args)
    {
        var isMigration = args.Contains("--migrate", StringComparer.OrdinalIgnoreCase)
            || (Environment.GetEnvironmentVariable("DOTNET_RUNNING_IN_CONTAINER") == "true"
                && Environment.GetEnvironmentVariable("RUN_MIGRATIONS") == "true");

        var builder = WebApplication.CreateSlimBuilder(args);

        builder.AddAppLogging();

        builder.Services.AddHttpClient();
        builder.Services.AddPersistence(builder.Configuration);
        builder.Services.AddApplicationServices();

        if (!isMigration)
        {
            builder.Services.AddJwtAuth(builder.Configuration);
        }

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddOpenApi(o =>
            o.AddSchemaTransformer(new OpenApiEnumMetadataTransformer()));

        var app = builder.Build();

        app.UseAuthentication();
        app.UseAuthorization();
        app.UseApiExceptionHandling();

        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
        }

        app.MapApi();

        app.Run();
    }
}
