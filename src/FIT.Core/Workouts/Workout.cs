using System.Diagnostics.Contracts;
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;

namespace FIT.Core.Workouts;

public sealed record Workout
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }

    public DateTime StartedAtUtc { get; set; }
    public decimal DurationMinutes { get; set; }

    public decimal? DistanceMeters { get; set; }
    public decimal? CaloriesBurned { get; set; }
    public WorkoutActivityType ActivityType { get; set; }
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