using FIT.Core.Goals;
using FIT.Core.Workouts;

namespace FIT.Core.Progress.Calculators;

public sealed class DistanceGoalProgressCalculator : IGoalProgressCalculator
{
    public bool CanHandle(Goal goal) => goal.TrackingMode == GoalTrackingMode.Distance;

    public decimal? CalculateProgress(Goal goal, IReadOnlyList<Workout> workouts)
    {
        var relevantWorkouts = workouts
            .Where(w => w.ActivityType is WorkoutActivityType.Running or WorkoutActivityType.Walking or WorkoutActivityType.Cycling)
            .ToList();

        return relevantWorkouts.Sum(w => w.DistanceMeters ?? 0);
    }
}