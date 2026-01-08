using FIT.Core.Goals;

namespace FIT.Api.Goals;

internal sealed record UpdateGoalRequest(
    decimal TargetValue,
    string? Unit,
    string Name,
    DateOnly? EndDate);
