using FIT.Api.Goals;
using FIT.Api.Workouts;
using FIT.Core.Goals;
using FIT.Core.Progress;
using FIT.Core.Progress.Calculators;
using FIT.Core.Workouts;
using FIT.Data.Repositories;

using FluentValidation;

namespace FIT.Api.Extensions;

internal static class ServiceCollectionExtensions
{
    internal static IServiceCollection AddApplicationServices(
        this IServiceCollection services)
    {
        services.AddScoped<IValidator<CreateGoalRequest>, CreateGoalRequestValidator>();
        services.AddScoped<IValidator<LogWorkoutRequest>, LogWorkoutRequestValidator>();

        services.AddScoped<IGoalProgressCalculator, DistanceGoalProgressCalculator>();
        services.AddScoped<IGoalProgressCalculator, DurationGoalProgressCalculator>();
        services.AddScoped<IGoalProgressCalculator, WorkoutsGoalProgressCalculator>();
        services.AddScoped<IGoalProgressCalculator, CaloriesGoalProgressCalculator>();

        services.AddScoped<GoalService>();
        services.AddScoped<ProgressService>();
        services.AddScoped<WorkoutService>();

        services.AddScoped<IGoalRepository, GoalRepository>();
        services.AddScoped<IWorkoutRepository, WorkoutRepository>();

        return services;
    }
}
