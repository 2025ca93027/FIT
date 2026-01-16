using FIT.Core.Workouts;

namespace FIT.Core.Tests.Workouts;

[TestClass]
public sealed class WorkoutTests
{
    [TestMethod]
    [Description("Workout duration must be greater than zero")]
    public void Constructor_Throws_WhenDurationIsZeroOrNegative()
    {
        Assert.Throws<ArgumentOutOfRangeException>(() =>
        {
            _ = new Workout(
                userId: Guid.NewGuid(),
                startedAtUtc: DateTime.UtcNow,
                durationMinutes: 0,
                distanceMeters: null,
                caloriesBurned: null,
                activityType: WorkoutActivityType.Running
            );
        });
    }

    [TestMethod]
    [Description("Distance can only be provided for distance-based activities")]
    public void Constructor_Throws_WhenDistanceProvidedForNonDistanceActivity()
    {
        Assert.Throws<ArgumentException>(() =>
        {
            _ = new Workout(
                userId: Guid.NewGuid(),
                startedAtUtc: DateTime.UtcNow,
                durationMinutes: 30,
                distanceMeters: 1000,
                caloriesBurned: 200,
                activityType: WorkoutActivityType.StrengthTraining
            );
        });
    }

    [TestMethod]
    [Description("Distance-based activities require distance to be provided")]
    public void Constructor_Throws_WhenDistanceMissingForDistanceActivity()
    {
        Assert.Throws<ArgumentException>(() =>
        {
            _ = new Workout(
                userId: Guid.NewGuid(),
                startedAtUtc: DateTime.UtcNow,
                durationMinutes: 30,
                distanceMeters: null,
                caloriesBurned: null,
                activityType: WorkoutActivityType.Running
            );
        });
    }

    [TestMethod]
    [Description("Workout must be created with a UTC timestamp")]
    public void Constructor_Throws_WhenStartedAtIsNotUtc()
    {
        Assert.Throws<ArgumentException>(() =>
        {
            _ = new Workout(
                userId: Guid.NewGuid(),
                startedAtUtc: DateTime.Now, // local time
                durationMinutes: 30,
                distanceMeters: null,
                caloriesBurned: 200,
                activityType: WorkoutActivityType.Running
            );
        });
    }

    [TestMethod]
    [Description("Valid workout is created successfully")]
    public void Constructor_CreatesWorkout_WhenInputIsValid()
    {
        var workout = new Workout(
            userId: Guid.NewGuid(),
            startedAtUtc: DateTime.UtcNow,
            durationMinutes: 45,
            distanceMeters: 5000,
            caloriesBurned: 400,
            activityType: WorkoutActivityType.Running
        );

        Assert.IsNotNull(workout);
        Assert.AreEqual(45, workout.DurationMinutes);
        Assert.AreEqual(5000, workout.DistanceMeters);
        Assert.AreEqual(WorkoutActivityType.Running, workout.ActivityType);
    }
}
