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

        Goal goal = new(userId, startDate, trackingMode, name, targetValue, unit)
        {
            EndDate = endDate
        };

        await _goalRepository.AddAsync(goal, ct);
        return goal;
    }

    public async Task<Goal> UpdateGoalAsync(
        Guid goalId,
        decimal targetValue,
        string? unit,
        string name,
        DateOnly? endDate,
        CancellationToken ct = default)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(name);
        ArgumentOutOfRangeException.ThrowIfNegativeOrZero(targetValue);

        var goal = await _goalRepository.GetByIdAsync(goalId, ct);
        if (goal is null)
        {
            // Ideally throw NotFoundException or return null
            throw new Exception($"Goal {goalId} not found");
        }

        // Update fields
        var updatedGoal = goal with
        {
            TargetValue = targetValue,
            Name = name,
            Unit = unit,
            EndDate = endDate
        };

        await _goalRepository.UpdateAsync(updatedGoal, ct);
        return updatedGoal;
    }

    public async Task<IReadOnlyList<Goal>> GetActiveGoalsAsync(Guid userId, DateOnly asOf, CancellationToken ct = default)
    {
        return await _goalRepository.GetActiveForUserAsync(userId, asOf, ct);
    }

}
