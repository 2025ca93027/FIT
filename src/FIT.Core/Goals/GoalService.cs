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
        string name,
        DateOnly? endDate,
        CancellationToken ct = default
    )
    {
        Goal goal = new(userId, startDate, trackingMode, name, targetValue, unit);
        goal.SetEndDate(endDate);

        await _goalRepository.AddAsync(goal, ct);
        return goal;
    }

    public async Task<Goal> UpdateGoalAsync(
        Guid userId,
        Guid goalId,
        decimal targetValue,
        string? unit,
        string name,
        DateOnly? endDate,
        CancellationToken ct = default)
    {
        var goal = await _goalRepository.GetByIdAsync(userId, goalId, ct)
            ?? throw new GoalNotFoundException();

        // Update fields
        var updatedGoal = goal with { TargetValue = targetValue, Name = name, Unit = unit };
        updatedGoal.SetEndDate(endDate);

        await _goalRepository.UpdateAsync(updatedGoal, ct);
        return updatedGoal;
    }

    public async Task<IReadOnlyList<Goal>> GetActiveGoalsAsync(Guid userId, DateOnly asOf, CancellationToken ct = default)
    {
        return await _goalRepository.GetActiveForUserAsync(userId, asOf, ct);
    }

}
