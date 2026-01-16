using FIT.Core.Goals;
using FIT.Core.Workouts;

namespace FIT.Core.Progress.Calculators;

public sealed class WorkoutsGoalProgressCalculator : IGoalProgressCalculator
{
    public bool CanHandle(Goal goal) => goal.TrackingMode == GoalTrackingMode.Workouts;

    public decimal GetTotalProgress(Goal goal, IReadOnlyList<Workout> workouts) => workouts
            .Where(w => w.ActivityType != WorkoutActivityType.Unknown)
            .Count();
}