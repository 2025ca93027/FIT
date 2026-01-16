using FIT.Core.Goals;
using FIT.Core.Workouts;

namespace FIT.Core.Progress.Calculators;

public sealed class DistanceGoalProgressCalculator : IGoalProgressCalculator
{
    public bool CanHandle(Goal goal) => goal.TrackingMode == GoalTrackingMode.Distance;

    public decimal GetTotalProgress(Goal goal, IReadOnlyList<Workout> workouts) => workouts
        .Where(w => w.ActivityType is (WorkoutActivityType.Running or WorkoutActivityType.Walking or WorkoutActivityType.Cycling))
        .Sum(w => w.DistanceMeters ?? 0);
}