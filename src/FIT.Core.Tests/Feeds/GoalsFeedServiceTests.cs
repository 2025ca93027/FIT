using FIT.Core.Feeds;
using FIT.Core.Tests.Fakes;

namespace FIT.Core.Tests.Feeds;

[TestClass]
public sealed class GoalsFeedTests
{
    [TestMethod]
    public async Task Defaults_ToAll_WhenEntryTypeIsZero()
    {
        var repo = new FakeGoalsFeedRepository();
        var service = new GoalsFeedService(repo);

        await foreach (var _ in service.GetGoalsFeedAsync(
            entryType: 0,
            offset: 0,
            pageSize: 10))
        { }

        Assert.AreEqual(FeedEntryType.All, repo.LastEntryType);
    }

    [TestMethod]
    public async Task Caps_PageSize_ToMax()
    {
        var repo = new FakeGoalsFeedRepository();
        var service = new GoalsFeedService(repo);

        await foreach (var _ in service.GetGoalsFeedAsync(
            entryType: FeedEntryType.All,
            offset: 0,
            pageSize: 1000))
        { }

        Assert.AreEqual(100, repo.LastPageSize);
    }

    [TestMethod]
    public async Task Uses_DefaultPageSize_WhenZero()
    {
        var repo = new FakeGoalsFeedRepository();
        var service = new GoalsFeedService(repo);

        await foreach (var _ in service.GetGoalsFeedAsync(
            entryType: FeedEntryType.All,
            offset: 0,
            pageSize: 0))
        { }

        Assert.AreEqual(20, repo.LastPageSize);
    }

    [TestMethod]
    public void Rejects_NegativeOffset()
    {
        var repo = new FakeGoalsFeedRepository();
        var service = new GoalsFeedService(repo);

        Assert.Throws<ArgumentOutOfRangeException>(() =>
            service.GetGoalsFeedAsync(
                FeedEntryType.All,
                offset: -1,
                pageSize: 10));
    }
}
