using FIT.Core.Goals;
using FIT.Core.Workouts;

namespace FIT.Core.Progress.Calculators;

public sealed class CaloriesGoalProgressCalculator : IGoalProgressCalculator
{
    public bool CanHandle(Goal goal) => goal.TrackingMode == GoalTrackingMode.Calories;

    public decimal GetTotalProgress(Goal goal, IReadOnlyList<Workout> workouts) => workouts
           .Where(w => w.ActivityType != WorkoutActivityType.Unknown)
           .Sum(w => w.CaloriesBurned ?? 0);
}