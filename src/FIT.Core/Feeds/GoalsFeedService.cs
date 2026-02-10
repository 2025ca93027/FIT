namespace FIT.Core.Feeds;

public sealed class GoalsFeedService(IGoalsFeedRepository repository)
{
    private const int MaxPageSize = 100;

    private readonly IGoalsFeedRepository _repository = repository;

    public IAsyncEnumerable<GoalFeedEntry> GetGoalsFeedAsync(
        FeedEntryType entryType,
        int offset,
        int pageSize,
        CancellationToken ct = default)
    {
        ArgumentOutOfRangeException.ThrowIfNegative(pageSize);
        ArgumentOutOfRangeException.ThrowIfNegative(offset);

        if (pageSize == 0)
            pageSize = 20;

        if (pageSize > MaxPageSize)
            pageSize = MaxPageSize;

        if (entryType == 0)
            entryType = FeedEntryType.All;

        return _repository.GetGoalsFeedAsync(entryType, offset, pageSize, ct);
    }
}
