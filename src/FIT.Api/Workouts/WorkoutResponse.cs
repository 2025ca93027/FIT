using FIT.Core.Workouts;

namespace FIT.Api.Workouts;

public sealed record WorkoutResponse
(
    Guid Id,
    DateTime StartedAtUtc,
    decimal DurationMinutes,
    decimal? DistanceMeters,
    WorkoutActivityType ActivityType
);
