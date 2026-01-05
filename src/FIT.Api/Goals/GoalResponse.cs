using FIT.Core.Goals;

namespace FIT.Api.Goals;

internal readonly record struct GoalResponse(
    Guid Id,
    GoalTrackingMode TrackingMode,
    decimal TargetValue,
    decimal? CurrentProgress,
    string? Unit,
    string? Name,
    DateOnly StartDate,
    DateOnly? EndDate,
    bool IsCompleted
);