using FIT.Core.Goals;
using FIT.Core.Workouts;

namespace FIT.Core.Progress.Calculators;

public interface IGoalProgressCalculator
{
    bool CanHandle(Goal goal);
    decimal GetTotalProgress(Goal goal, IReadOnlyList<Workout> workouts);
}