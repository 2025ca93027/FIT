using FIT.Core.Goals;
using FIT.Core.Workouts;

namespace FIT.Core.Progress.Calculators;

public sealed class CaloriesGoalProgressCalculator : IGoalProgressCalculator
{
    public bool CanHandle(Goal goal) => goal.TrackingMode == GoalTrackingMode.Calories;

    public (decimal?, bool) CalculateProgress(Goal goal, IReadOnlyList<Workout> workouts)
    {
        var relevantCalories = workouts
           .Where(w => w.ActivityType != WorkoutActivityType.Unknown)
           .Sum(w => w.CaloriesBurned ?? 0);

        var isCompleted = relevantCalories >= goal.TargetValue;

        return (relevantCalories, isCompleted);
    }
}