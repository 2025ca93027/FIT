using FIT.Core.Goals;
using FIT.Core.Progress.Calculators;
using FIT.Core.Workouts;

using Microsoft.Extensions.Logging;

namespace FIT.Core.Progress;

public sealed class ProgressService(
    IGoalRepository goalRepository,
    IWorkoutRepository workoutRepository,
    ILogger<ProgressService> logger,
    IEnumerable<IGoalProgressCalculator> calculators)
{
    private readonly IGoalRepository _goalRepository = goalRepository;
    private readonly IWorkoutRepository _workoutRepository = workoutRepository;
    private readonly ILogger<ProgressService> _logger = logger;
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
            await UpdateProgressForGoalAsync(goal, workouts, ct);
        }
    }

    private async Task UpdateProgressForGoalAsync(Goal goal, IReadOnlyList<Workout> allWorkouts, CancellationToken ct = default)
    {
        var relevantWorkouts = allWorkouts
            .Where(w =>
                DateOnly.FromDateTime(w.StartedAtUtc) >= goal.StartDate &&
                (goal.EndDate == null || DateOnly.FromDateTime(w.StartedAtUtc) <= goal.EndDate.Value))
            .ToList();

        var calculator = _calculators.FirstOrDefault(c => c.CanHandle(goal));
        if (calculator == null)
        {
            if (goal.TrackingMode != GoalTrackingMode.Manual && _logger.IsEnabled(LogLevel.Warning))
            {
                _logger.LogWarning("No progress calculator found for goal tracking mode '{TrackingMode}'", goal.TrackingMode);
            }

            return;
        }

        var progress = calculator.GetTotalProgress(goal, relevantWorkouts);
        goal.SetProgress(progress);

        await _goalRepository.UpdateAsync(goal, ct);
    }
}