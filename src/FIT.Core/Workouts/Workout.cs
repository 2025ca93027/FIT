using System.Diagnostics.Contracts;
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;

namespace FIT.Core.Workouts;

public sealed record Workout
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }

    public DateTime StartedAtUtc { get; set; }
    public WorkoutActivityType ActivityType { get; set; }

    public decimal DurationMinutes { get; set; }
    public decimal? DistanceMeters { get; set; }
    public decimal? CaloriesBurned { get; set; }

    public Workout(
        Guid userId,
        DateTime startedAtUtc,
        decimal durationMinutes,
        decimal? distanceMeters,
        decimal? caloriesBurned,
        WorkoutActivityType activityType)
    {
        if (startedAtUtc.Kind != DateTimeKind.Utc)
        {
            throw new ArgumentException("startedAtUtc must be in UTC", nameof(startedAtUtc));
        }

        if (durationMinutes <= 0)
        {
            throw new ArgumentOutOfRangeException(nameof(durationMinutes), "durationInMinutes must be greater than 0");
        }

        if (distanceMeters.HasValue !=
            (activityType is WorkoutActivityType.Running or WorkoutActivityType.Walking or WorkoutActivityType.Cycling))
        {
            throw new ArgumentException("Distance is only allowed for distance-based activities", nameof(distanceMeters));
        }

        Id = Guid.NewGuid();
        UserId = userId;

        StartedAtUtc = startedAtUtc;
        ActivityType = activityType;

        DurationMinutes = durationMinutes;
        DistanceMeters = distanceMeters;
        CaloriesBurned = caloriesBurned;
    }
}

public enum WorkoutActivityType
{
    Unknown = 0,

    Running = 1,
    Walking = 2,
    Cycling = 3,

    StrengthTraining = 10,
    Yoga = 11,

    Hydration = 50,

    Other = 99
}