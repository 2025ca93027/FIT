using FIT.Core.Goals;
using FIT.Core.Workouts;

namespace FIT.Core.Progress.Calculators;

public sealed class DurationGoalProgressCalculator : IGoalProgressCalculator
{
    public bool CanHandle(Goal goal) => goal.TrackingMode == GoalTrackingMode.Duration;

    public (decimal?, bool) CalculateProgress(Goal goal, IReadOnlyList<Workout> workouts)
    {
        var totalDuration = workouts.Sum(w => w.DurationMinutes);
        var isCompleted = totalDuration >= goal.TargetValue;

        return (totalDuration, isCompleted);
    }
}