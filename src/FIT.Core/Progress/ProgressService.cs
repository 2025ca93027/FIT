using FIT.Core.Goals;
using FIT.Core.Progress.Calculators;
using FIT.Core.Workouts;

namespace FIT.Core.Progress;

public sealed class ProgressService(
    IGoalRepository goalRepository,
    IWorkoutRepository workoutRepository,
    IEnumerable<IGoalProgressCalculator> calculators)
{
    private readonly IGoalRepository _goalRepository = goalRepository;
    private readonly IWorkoutRepository _workoutRepository = workoutRepository;
    private readonly IEnumerable<IGoalProgressCalculator> _calculators = calculators;

    public async Task UpdateProgressAsync(Guid userId, CancellationToken ct = default)
    {
        // Fetch active goals for the user
        var activeGoals = await _goalRepository.GetActiveForUserAsync(userId, DateOnly.FromDateTime(DateTime.UtcNow), ct);
        if (!activeGoals.Any()) return;

        // Fetch all workouts within the timeframe of the oldest goal
        var earliestStartDate = activeGoals.Min(g => g.StartDate);
        var workouts = await _workoutRepository.GetForUserAsync(userId, earliestStartDate, DateOnly.FromDateTime(DateTime.UtcNow), ct);

        foreach (var goal in activeGoals)
        {
            // Filter workouts locally for the current goal's timeframe
            var relevantWorkouts = workouts.Where(w =>
                DateOnly.FromDateTime(w.StartedAtUtc) >= goal.StartDate &&
                (goal.EndDate == null || DateOnly.FromDateTime(w.StartedAtUtc) <= goal.EndDate.Value)).ToList();

            var calculator = _calculators.FirstOrDefault(c => c.CanHandle(goal));
            if (calculator == null) continue;

            var (progress, isComplete) = calculator.CalculateProgress(goal, relevantWorkouts);

            if (progress.HasValue)
            {
                goal.Progress = progress.Value;
                goal.IsCompleted = isComplete;

                await _goalRepository.UpdateAsync(goal, ct);
            }
        }
    }
}