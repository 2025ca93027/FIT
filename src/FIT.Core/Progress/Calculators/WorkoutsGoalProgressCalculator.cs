using FIT.Core.Goals;
using FIT.Core.Workouts;

namespace FIT.Core.Progress.Calculators;

public sealed class WorkoutsGoalProgressCalculator : IGoalProgressCalculator
{
    public bool CanHandle(Goal goal) => goal.TrackingMode == GoalTrackingMode.Workouts;

    public decimal? CalculateProgress(Goal goal, IReadOnlyList<Workout> workouts)
    {
        var relevantWorkouts = workouts
            .Where(w => w.ActivityType != WorkoutActivityType.Unknown)
            .ToList();

        return relevantWorkouts.Count;
    }
}