using FIT.Core.Goals;
using FIT.Core.Progress.Calculators;
using FIT.Core.Workouts;

namespace FIT.Core.Tests.Progress.Calculators;

[TestClass]
public sealed class WorkoutsGoalProgressCalculatorTests
{
    [TestMethod]
    public void GetTotalProgress_CountsAllNonUnknownWorkouts()
    {
        var goal = new Goal(
            Guid.NewGuid(),
            DateOnly.FromDateTime(DateTime.UtcNow),
            GoalTrackingMode.Workouts,
            "Workout count",
            targetValue: 3);

        var workouts = new[]
        {
            new Workout(Guid.NewGuid(), DateTime.UtcNow, 30, 12, null, WorkoutActivityType.Running),
            new Workout(Guid.NewGuid(), DateTime.UtcNow, 20, 13, null, WorkoutActivityType.Cycling),
            new Workout(Guid.NewGuid(), DateTime.UtcNow, 15, null, null, WorkoutActivityType.StrengthTraining),
        };

        var calculator = new WorkoutsGoalProgressCalculator();

        var progress = calculator.GetTotalProgress(goal, workouts);

        Assert.AreEqual(3, progress);
    }
}
