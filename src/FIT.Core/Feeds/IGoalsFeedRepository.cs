namespace FIT.Core.Feeds;

public interface IGoalsFeedRepository
{
    IAsyncEnumerable<GoalFeedEntry> GetGoalsFeedAsync(FeedEntryType entryType, int offset, int pageSize, CancellationToken ct = default);
}