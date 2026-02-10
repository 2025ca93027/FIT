// FIT.Core.Tests/Feeds/FakeGoalsFeedRepository.cs
using System.Runtime.CompilerServices;

using FIT.Core.Feeds;

namespace FIT.Core.Tests.Fakes;

internal sealed class FakeGoalsFeedRepository : IGoalsFeedRepository
{
    public FeedEntryType? LastEntryType { get; private set; }
    public int? LastOffset { get; private set; }
    public int? LastPageSize { get; private set; }

    public List<GoalFeedEntry> Entries { get; } = [];

    public async IAsyncEnumerable<GoalFeedEntry> GetGoalsFeedAsync(
        FeedEntryType entryType,
        int offset,
        int pageSize,
        [EnumeratorCancellation] CancellationToken ct = default)
    {
        LastEntryType = entryType;
        LastOffset = offset;
        LastPageSize = pageSize;

        foreach (var entry in Entries)
        {
            yield return entry;
            await Task.Yield();
        }
    }
}
