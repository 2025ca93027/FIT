using FIT.Core.Goals;
using FIT.Core.Workouts;

namespace FIT.Core.Progress.Calculators;

public sealed class ManualGoalProgressCalculator : IGoalProgressCalculator
{
    public bool CanHandle(Goal goal) => goal.TrackingMode == GoalTrackingMode.Manual;

    public (decimal?, bool) CalculateProgress(Goal goal, IReadOnlyList<Workout> workouts) => (null, false);
}