using FIT.Core.Goals;
using FIT.Core.Progress.Calculators;
using FIT.Core.Workouts;

namespace FIT.Core.Tests.Progress.Calculators;

[TestClass]
public sealed class DurationGoalProgressCalculatorTests
{
    [TestMethod]
    public void GetTotalProgress_SumsWorkoutDurations()
    {
        var goal = new Goal(
            Guid.NewGuid(),
            DateOnly.FromDateTime(DateTime.UtcNow),
            GoalTrackingMode.Duration,
            "Workout duration",
            targetValue: 60);

        var workouts = new[]
        {
            new Workout(Guid.NewGuid(), DateTime.UtcNow, 30, 34, null, WorkoutActivityType.Running),
            new Workout(Guid.NewGuid(), DateTime.UtcNow, 45, null, null, WorkoutActivityType.Yoga),
        };

        var calculator = new DurationGoalProgressCalculator();

        var progress = calculator.GetTotalProgress(goal, workouts);

        Assert.AreEqual(75m, progress);
    }
}
