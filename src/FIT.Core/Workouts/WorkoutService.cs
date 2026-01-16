namespace FIT.Core.Workouts;

public sealed class WorkoutService(IWorkoutRepository workoutRepository)
{
    private readonly IWorkoutRepository _workoutRepository = workoutRepository;

    public async Task<Workout> LogAsync(
        Guid userId,
        DateTime startedAtUtc,
        decimal durationInMinutes,
        decimal? distanceMeters,
        decimal? caloriesBurned,
        WorkoutActivityType activityType,
        CancellationToken ct = default)
    {
        Workout workout = new(userId, startedAtUtc, durationInMinutes, distanceMeters, caloriesBurned, activityType);
        await _workoutRepository.AddAsync(workout, ct);

        return workout;
    }

    public async Task<IReadOnlyList<Workout>> GetForUserAsync(
        Guid userId,
        DateOnly from,
        DateOnly to,
        CancellationToken ct = default)
    {
        if (from > to)
            throw new ArgumentException("'from' must be less than or equal to 'to'");

        return await _workoutRepository.GetForUserAsync(userId, from, to, ct);
    }

}