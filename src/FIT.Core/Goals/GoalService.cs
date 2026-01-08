using System.Diagnostics;

using FIT.Core.Workouts;

namespace FIT.Core.Goals;

public sealed class GoalService(IGoalRepository goalRepository, IWorkoutRepository workoutRepository)
{
    private readonly IGoalRepository _goalRepository = goalRepository;
    private readonly IWorkoutRepository _workoutRepository = workoutRepository;

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

    public async Task<IReadOnlyList<GoalWithProgress>> GetActiveGoalsWithProgressAsync(Guid userId, DateOnly asOf, CancellationToken ct = default)
    {
        var goals = await _goalRepository.GetActiveForUserAsync(userId, asOf, ct);
        if (goals.Count == 0)
        {
            return [];
        }

        var workouts = await _workoutRepository.GetForUserAsync(userId, goals.Min(g => g.StartDate), asOf, ct);

        return goals.Select(g => CalculateProgress(g, workouts)).ToList();
    }

    private static GoalWithProgress CalculateProgress(Goal goal, IReadOnlyList<Workout> workouts) => new(goal)
    {
        Progress = goal.TrackingMode switch
        {
            GoalTrackingMode.Distance => workouts.Sum(w => w.DistanceMeters ?? 0),
            GoalTrackingMode.Workouts => workouts.Count,
            GoalTrackingMode.Duration => workouts.Sum(w => w.DurationMinutes),
            GoalTrackingMode.Manual => null,
            _ => throw new UnreachableException()
        }
    };
}
