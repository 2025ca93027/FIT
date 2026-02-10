using FIT.Core.Goals;

namespace FIT.Core.Tests.Goals;

[TestClass]
public sealed class GoalServiceTests
{
    [TestMethod]
    [Description("Marks a goal as completed when progress reaches the target value")]
    public void SetProgress_MarksCompleted_WhenTargetReached()
    {
        Goal goal = new(
            userId: Guid.NewGuid(),
            startDate: DateOnly.FromDateTime(DateTime.UtcNow),
            trackingMode: GoalTrackingMode.Distance,
            name: "Run 10 km",
            targetValue: 10);

        goal.SetProgress(10);

        Assert.IsTrue(goal.IsCompleted);
        Assert.AreEqual(10, goal.Progress);
    }

    [TestMethod]
    [Description("Goal progress can be increase beyond the target value")]
    public void SetProgress_AllowsProgressBeyondTargetValue()
    {
        var goal = new Goal(
          Guid.NewGuid(),
          DateOnly.FromDateTime(DateTime.UtcNow),
          GoalTrackingMode.Workouts,
          "Workout count",
          targetValue: 5);

        goal.SetProgress(8);

        Assert.IsTrue(goal.IsCompleted);
        Assert.AreEqual(8m, goal.Progress);
    }

    [TestMethod]
    [Description("Manual goals cannot be created without 'unit'")]
    public void ManualGoal_RequiresUnit()
    {
        Assert.Throws<ArgumentException>(() =>
        {
            _ = new Goal(
                Guid.NewGuid(),
                DateOnly.FromDateTime(DateTime.UtcNow),
                GoalTrackingMode.Manual,
                "Drink honey",
                targetValue: 10,
                unit: null
            );
        });
    }

    [TestMethod]
    [Description("Goal progress cannot be set to negative")]
    public void SetProgress_CannotBeNegative()
    {
        Goal goal = new(
           userId: Guid.NewGuid(),
           startDate: DateOnly.FromDateTime(DateTime.UtcNow),
           trackingMode: GoalTrackingMode.Distance,
           name: "Run 10 km",
           targetValue: 10);

        Assert.Throws<InvalidOperationException>(() => goal.SetProgress(-1));
    }

    [TestMethod]
    [Description("Progress can regress when recalculated")]
    public void SetProgress_AllowsProgressRegression()
    {
        var goal = new Goal(
            Guid.NewGuid(),
            DateOnly.FromDateTime(DateTime.UtcNow),
            GoalTrackingMode.Distance,
            "Run",
            targetValue: 10);

        goal.SetProgress(8);
        goal.SetProgress(3);

        Assert.AreEqual(3, goal.Progress);
        Assert.IsFalse(goal.IsCompleted);
    }

    [TestMethod]
    [Description("CompletedAt is set when goal is completed")]
    public void SetProgress_SetsCompletedAt_WhenCompleted()
    {
        var goal = new Goal(
            Guid.NewGuid(),
            DateOnly.FromDateTime(DateTime.UtcNow),
            GoalTrackingMode.Distance,
            "Run",
            targetValue: 10);

        goal.SetProgress(10);

        Assert.IsTrue(goal.IsCompleted);
        Assert.IsNotNull(goal.CompletedAt);
    }

    [TestMethod]
    [Description("CompletedAt is not updated after completion")]
    public void SetProgress_DoesNotChangeCompletedAt_AfterCompletion()
    {
        var goal = new Goal(
            Guid.NewGuid(),
            DateOnly.FromDateTime(DateTime.UtcNow),
            GoalTrackingMode.Distance,
            "Run",
            targetValue: 10);

        goal.SetProgress(10);
        var completedAt = goal.CompletedAt;

        goal.SetProgress(15);

        Assert.AreEqual(completedAt, goal.CompletedAt);
    }

    [TestMethod]
    [Description("UpdatedAt updates only when progress changes")]
    public void SetProgress_UpdatesUpdatedAt_WhenProgressChanges()
    {
        var goal = new Goal(
            Guid.NewGuid(),
            DateOnly.FromDateTime(DateTime.UtcNow),
            GoalTrackingMode.Distance,
            "Run",
            targetValue: 10);

        var initialUpdatedAt = goal.UpdatedAt;

        Thread.Sleep(10); // ensure clock tick
        goal.SetProgress(5);

        Assert.IsTrue(goal.UpdatedAt > initialUpdatedAt);
    }

    [TestMethod]
    [Description("UpdatedAt does not change if progress value is unchanged")]
    public void SetProgress_DoesNotUpdateUpdatedAt_WhenProgressUnchanged()
    {
        var goal = new Goal(
            Guid.NewGuid(),
            DateOnly.FromDateTime(DateTime.UtcNow),
            GoalTrackingMode.Distance,
            "Run",
            targetValue: 10);

        goal.SetProgress(5);
        var updatedAt = goal.UpdatedAt;

        Thread.Sleep(10);
        goal.SetProgress(5);

        Assert.AreEqual(updatedAt, goal.UpdatedAt);
    }

    [TestMethod]
    [Description("Visibility can be toggled")]
    public void SetVisibility_UpdatesIsPublic()
    {
        var goal = new Goal(
            Guid.NewGuid(),
            DateOnly.FromDateTime(DateTime.UtcNow),
            GoalTrackingMode.Distance,
            "Run",
            targetValue: 10);

        goal.SetVisibility(true);
        Assert.IsTrue(goal.IsPublic);

        goal.SetVisibility(false);
        Assert.IsFalse(goal.IsPublic);
    }
}
