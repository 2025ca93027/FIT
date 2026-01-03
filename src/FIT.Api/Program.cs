using FIT.Api.Extensions;

namespace FIT.Api;

internal sealed class Program
{
    static void Main(string[] args)
    {
        var builder = WebApplication.CreateSlimBuilder(args);

        builder.AddAppLogging();

        builder.Services.AddPersistence(builder.Configuration);
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddOpenApi();

        var app = builder.Build();

        var logger = app.Services.GetRequiredService<ILogger<Program>>();
        logger.LogInformation(
            "Starting FIT.Api in [{Environment}] mode.",
            app.Environment.EnvironmentName);


        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
            app.UseDeveloperExceptionPage();
        }

        app.Run();
    }
}