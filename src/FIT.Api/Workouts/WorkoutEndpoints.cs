using FIT.Core.Workouts;

using FluentValidation;

namespace FIT.Api.Workouts;

internal static class WorkoutEndpoints
{
    internal static RouteGroupBuilder MapWorkouts(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/workouts");

        group.MapPost("/", LogWorkout);
        group.MapGet("/", GetWorkouts);

        return group;
    }

    private static async Task<IResult> LogWorkout(
        LogWorkoutRequest req,
        WorkoutService workoutService,
        HttpClient httpClient,
        ILogger logger,
        IValidator<LogWorkoutRequest> validator,
        CancellationToken ct)
    {
        var validationResult = await validator.ValidateAsync(req);
        if (!validationResult.IsValid)
        {
            return Results.ValidationProblem(validationResult.ToDictionary());
        }

        var userId = GetUserId();

        var workout = await workoutService.LogAsync(userId, req.StartedAtUtc, req.DurationMinutes, req.DistanceMeters, req.ActivityType, ct);

        var refreshProgressUrl = $"http://localhost:8080/progress/refresh";
        _ = Task.Run(async () =>
        {
            try
            {
                var response = await httpClient.PostAsync(refreshProgressUrl, null, ct);
                if (!response.IsSuccessStatusCode)
                {
                    logger.LogError("Failed to refresh progress: {StatusCode}", response.StatusCode);
                }
            }
            catch (Exception ex)
            {
                logger.LogError("Error while refreshing progress: {Error}", ex);
            }
        }, ct);

        return Results.Created($"/workouts/{workout.Id}", MapResponse(workout));
    }

    private static async Task<IResult> GetWorkouts(
      DateOnly from,
      DateOnly to,
      WorkoutService workoutService,
      CancellationToken ct)
    {
        if (from > to)
        {
            return Results.BadRequest("'from' must be less than or equal to 'to'");
        }

        var userId = GetUserId();

        var workouts = await workoutService.GetForUserAsync(userId, from, to, ct);

        return Results.Ok(workouts.Select(MapResponse));
    }

    private static WorkoutResponse MapResponse(Workout workout) => new(
        workout.Id,
        workout.StartedAtUtc,
        workout.DurationMinutes,
        workout.DistanceMeters,
        workout.ActivityType
    );

    // Placeholder until auth exists
    private static Guid GetUserId() => Guid.Empty;
}