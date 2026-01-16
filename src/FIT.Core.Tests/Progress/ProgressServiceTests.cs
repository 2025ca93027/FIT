using FIT.Core.Goals;
using FIT.Core.Progress;
using FIT.Core.Progress.Calculators;
using FIT.Core.Tests.Fakes;
using FIT.Core.Workouts;

using Microsoft.Extensions.Logging.Abstractions;

namespace FIT.Core.Tests.Progress;

[TestClass]
public sealed class ProgressServiceTests
{
    [TestMethod]
    [Description("Uses the oldest active goal start date when fetching workouts")]
    public async Task UpdateProgress_UsesOldestGoalStartDate()
    {
        // Arrange
        var userId = Guid.NewGuid();

        var oldestStart = new DateOnly(2024, 1, 1);
        var newerStart = new DateOnly(2024, 3, 1);

        var goals = new[]
        {
            new Goal(userId, oldestStart, GoalTrackingMode.Duration, "Goal A", 60),
            new Goal(userId, newerStart,  GoalTrackingMode.Duration, "Goal B", 30),
        };

        var goalRepo = new FakeGoalRepository(goals);
        var workoutRepo = new FakeWorkoutRepository();

        var calculators = new IGoalProgressCalculator[]
        {
            new DurationGoalProgressCalculator()
        };

        var service = new ProgressService(
            goalRepo,
            workoutRepo,
            NullLogger<ProgressService>.Instance,
            calculators);

        // Act
        await service.UpdateProgressAsync(userId);

        // Assert
        Assert.AreEqual(oldestStart, workoutRepo.LastFromDate);
    }

    [TestMethod]
    [Description("Each goal only considers workouts within its own date window")]
    public async Task UpdateProgress_FiltersWorkoutsPerGoalDateWindow()
    {
        // Arrange
        var userId = Guid.NewGuid();

        var goal1 = new Goal(
            userId,
            startDate: new DateOnly(2024, 1, 1),
            trackingMode: GoalTrackingMode.Workouts,
            name: "Goal 1",
            targetValue: 10);

        var goal2 = new Goal(
            userId,
            startDate: new DateOnly(2024, 3, 1),
            trackingMode: GoalTrackingMode.Workouts,
            name: "Goal 2",
            targetValue: 10);

        var goal3 = new Goal(
            userId,
            startDate: new DateOnly(2024, 1, 1),
            trackingMode: GoalTrackingMode.Workouts,
            name: "Goal 3",
            targetValue: 10);
        goal3.SetEndDate(new(2024, 2, 15));

        var workouts = new[]
        {
            CreateWorkoutOn(userId, new DateOnly(2024, 2, 1), WorkoutActivityType.Other), // counts for goal1 and goal3 (before goal3 end date)
            CreateWorkoutOn(userId, new DateOnly(2024, 4, 1), WorkoutActivityType.Walking, 10), // goal1 + goal2
        };

        var goalRepo = new FakeGoalRepository([goal1, goal2, goal3]);
        var workoutRepo = new FakeWorkoutRepository
        {
            WorkoutsToReturn = workouts
        };

        var calculators = new IGoalProgressCalculator[]
        {
        new WorkoutsGoalProgressCalculator()
        };

        var service = new ProgressService(
            goalRepo,
            workoutRepo,
            NullLogger<ProgressService>.Instance,
            calculators);

        // Act
        await service.UpdateProgressAsync(userId);

        // Assert
        Assert.AreEqual(2, goal1.Progress);
        Assert.AreEqual(1, goal2.Progress);
        Assert.AreEqual(1, goal3.Progress);
    }

    private static Workout CreateWorkoutOn(
        Guid userId,
        DateOnly date,
        WorkoutActivityType activityType,
        decimal? distanceMeters = null)
    {
        return new Workout(
            userId,
            date.ToDateTime(TimeOnly.MinValue, DateTimeKind.Utc),
            durationMinutes: 30,
            distanceMeters: distanceMeters,
            caloriesBurned: null,
            activityType: activityType);
    }
}
