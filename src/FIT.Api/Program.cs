using FIT.Api.Extensions;

internal sealed class Program
{
    static void Main(string[] args)
    {
        var builder = WebApplication.CreateSlimBuilder(args);

        builder.AddAppLogging();

        builder.Services.AddHttpClient();
        builder.Services.AddPersistence(builder.Configuration);
        builder.Services.AddApplicationServices();
        builder.Services.AddJwtAuth(builder.Configuration);

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
