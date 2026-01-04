using FIT.Api.Extensions;
using FIT.Api.Goals;
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

        builder.Services.AddPersistence(builder.Configuration);

        builder.Services.AddScoped<GoalService>();
        builder.Services.AddScoped<IGoalRepository, GoalRepository>();
        builder.Services.AddScoped<IWorkoutRepository, WorkoutRepository>();

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddOpenApi();

        var app = builder.Build();
        app.UseApiExceptionHandling();

        var logger = app.Services.GetRequiredService<ILogger<Program>>();
        logger.LogInformation("Starting FIT.Api in [{Environment}] mode.", app.Environment.EnvironmentName);

        app.UseApiExceptionHandling();
        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
            // app.UseDeveloperExceptionPage();
        }

        app.MapGoals();

        app.Run();
    }
}