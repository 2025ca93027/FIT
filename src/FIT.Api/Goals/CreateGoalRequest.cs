using FIT.Core.Goals;

namespace FIT.Api.Goals;

internal sealed record CreateGoalRequest(
    GoalTrackingMode TrackingMode,
    decimal TargetValue,
    string? Unit,
    string Name,
    DateOnly StartDate,
    DateOnly? EndDate);

