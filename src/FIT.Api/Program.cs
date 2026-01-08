using FIT.Api.Extensions;
using FIT.Api.Goals;
using FIT.Api.Workouts;
using FIT.Core.Goals;
using FIT.Core.Workouts;
using FIT.Data.Repositories;

using FluentValidation;

namespace FIT.Api;

internal sealed class Program
{
    static void Main(string[] args)
    {
        var builder = WebApplication.CreateSlimBuilder(args);

        builder.AddAppLogging();

        builder.Services.AddScoped<IValidator<CreateGoalRequest>, CreateGoalRequestValidator>();
        builder.Services.AddScoped<IValidator<LogWorkoutRequest>, LogWorkoutRequestValidator>();

        builder.Services.AddPersistence(builder.Configuration);

        builder.Services.AddScoped<GoalService>();
        builder.Services.AddScoped<WorkoutService>();
        builder.Services.AddScoped<IGoalRepository, GoalRepository>();
        builder.Services.AddScoped<IWorkoutRepository, WorkoutRepository>();

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddOpenApi(o =>
        {
            o.AddSchemaTransformer(new OpenApiEnumMetadataTransformer());
        });

        var app = builder.Build();

        var logger = app.Services.GetRequiredService<ILogger<Program>>();
        logger.LogInformation("Starting FIT.Api in [{Environment}] mode.", app.Environment.EnvironmentName);
        app.UseApiExceptionHandling();
        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
            // app.UseDeveloperExceptionPage();
        }

        app.MapGoals();
        app.MapWorkouts();

        app.Run();
    }
}