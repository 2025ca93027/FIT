using System.Data.Common;

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
        if (startedAtUtc.Kind != DateTimeKind.Utc)
        {
            throw new ArgumentException("startedAtUtc must be in UTC", nameof(startedAtUtc));
        }

        if (durationInMinutes <= 0)
        {
            throw new ArgumentOutOfRangeException(nameof(durationInMinutes), "durationInMinutes must be greater than 0");
        }

        if (distanceMeters.HasValue !=
            (activityType is WorkoutActivityType.Running or WorkoutActivityType.Walking or WorkoutActivityType.Cycling))
        {
            throw new ArgumentException("Distance is only allowed for distance-based activities", nameof(distanceMeters));
        }

        Workout workout = new()
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            StartedAtUtc = startedAtUtc,
            DurationMinutes = durationInMinutes,
            DistanceMeters = distanceMeters,
            CaloriesBurned = caloriesBurned,
            ActivityType = activityType
        };

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