using FIT.Core.Goals;
using FIT.Core.Workouts;

namespace FIT.Core.Progress.Calculators;

public sealed class DistanceGoalProgressCalculator : IGoalProgressCalculator
{
    public bool CanHandle(Goal goal) => goal.TrackingMode == GoalTrackingMode.Distance;

    public (decimal?, bool) CalculateProgress(Goal goal, IReadOnlyList<Workout> workouts)
    {
        var relevantWorkouts = workouts
            .Where(w => w.ActivityType is WorkoutActivityType.Running or WorkoutActivityType.Walking or WorkoutActivityType.Cycling)
            .ToList();

        var totalDistance = relevantWorkouts.Sum(w => w.DistanceMeters ?? 0);
        var isCompleted = totalDistance >= goal.TargetValue;

        return (totalDistance, isCompleted);
    }
}