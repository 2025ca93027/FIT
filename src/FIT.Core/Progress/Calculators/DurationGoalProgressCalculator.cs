using FIT.Core.Goals;
using FIT.Core.Workouts;

namespace FIT.Core.Progress.Calculators;

public sealed class DurationGoalProgressCalculator : IGoalProgressCalculator
{
    public bool CanHandle(Goal goal) => goal.TrackingMode == GoalTrackingMode.Duration;

    public decimal GetTotalProgress(Goal goal, IReadOnlyList<Workout> workouts) => workouts
        .Sum(w => w.DurationMinutes);
}