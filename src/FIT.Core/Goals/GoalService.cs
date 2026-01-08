using System.Diagnostics;

using FIT.Core.Workouts;

namespace FIT.Core.Goals;

public sealed class GoalService(IGoalRepository goalRepository)
{
    private readonly IGoalRepository _goalRepository = goalRepository;

    public async Task<Goal> CreateGoalAsync(
        Guid userId,
        DateOnly startDate,
        GoalTrackingMode trackingMode,
        decimal targetValue,
        string? unit,
        string? name,
        DateOnly? endDate,
        CancellationToken ct = default
    )
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(name);
        ArgumentOutOfRangeException.ThrowIfNegativeOrZero(targetValue);

        if (endDate is not null)
            ArgumentOutOfRangeException.ThrowIfGreaterThanOrEqual(startDate, endDate.Value);

        if (trackingMode == GoalTrackingMode.Manual)
        {
            ArgumentException.ThrowIfNullOrWhiteSpace(unit);
        }

        var goal = trackingMode switch
        {
            GoalTrackingMode.Manual => new Goal(userId, startDate, trackingMode, name, targetValue, unit!),
            _ => new Goal(userId, startDate, trackingMode, name, targetValue)
        };

        goal = goal with { EndDate = endDate };

        await _goalRepository.AddAsync(goal, ct);
        return goal;
    }

    public async Task<IReadOnlyList<Goal>> GetActiveGoalsAsync(Guid userId, DateOnly asOf, CancellationToken ct = default)
    {
        return await _goalRepository.GetActiveForUserAsync(userId, asOf, ct);
    }

}
