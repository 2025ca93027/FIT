using FIT.Core.Goals;
using FIT.Core.Progress.Calculators;
using FIT.Core.Workouts;

namespace FIT.Core.Tests.Progress.Calculators;

[TestClass]
public sealed class CaloriesGoalProgressCalculatorTests
{
    [TestMethod]
    public void GetTotalProgress_SumsCalories_ForAllWorkouts()
    {
        var goal = new Goal(
            Guid.NewGuid(),
            DateOnly.FromDateTime(DateTime.UtcNow),
            GoalTrackingMode.Calories,
            "Burn calories",
            targetValue: 500);

        var workouts = new[]
        {
            new Workout(Guid.NewGuid(), DateTime.UtcNow, 30, 64, 200, WorkoutActivityType.Running),
            new Workout(Guid.NewGuid(), DateTime.UtcNow, 20, null, 150, WorkoutActivityType.StrengthTraining),
            new Workout(Guid.NewGuid(), DateTime.UtcNow, 15, null, null, WorkoutActivityType.Yoga),
        };

        var calculator = new CaloriesGoalProgressCalculator();

        var progress = calculator.GetTotalProgress(goal, workouts);

        Assert.AreEqual(350m, progress);
    }
}
