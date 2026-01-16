using FIT.Core.Goals;
using FIT.Core.Progress.Calculators;
using FIT.Core.Workouts;

namespace FIT.Core.Tests.Progress.Calculators;

[TestClass]
public sealed class DistanceGoalProgressCalculatorTests
{
    [TestMethod]
    public void GetTotalProgress_SumsDistance_ForDistanceActivitiesOnly()
    {
        var goal = new Goal(
            Guid.NewGuid(),
            DateOnly.FromDateTime(DateTime.UtcNow),
            GoalTrackingMode.Distance,
            "Run",
            targetValue: 1000);

        var workouts = new[]
        {
            new Workout(Guid.NewGuid(), DateTime.UtcNow, 30, 500, null, WorkoutActivityType.Running),
            new Workout(Guid.NewGuid(), DateTime.UtcNow, 40, 700, null, WorkoutActivityType.Cycling),
            new Workout(Guid.NewGuid(), DateTime.UtcNow, 20, null, null, WorkoutActivityType.StrengthTraining),
        };

        var calculator = new DistanceGoalProgressCalculator();

        var progress = calculator.GetTotalProgress(goal, workouts);

        Assert.AreEqual(1200m, progress);
    }
}
