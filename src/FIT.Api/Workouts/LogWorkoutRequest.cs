using FIT.Core.Workouts;

namespace FIT.Api.Workouts;

public sealed record LogWorkoutRequest
(
    DateTime StartedAtUtc,
    decimal DurationMinutes,
    decimal? DistanceMeters,
    WorkoutActivityType ActivityType
);