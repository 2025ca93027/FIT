namespace FIT.Core.Feeds;

public sealed record GoalFeedEntry
{
    public Guid GoalId { get; init; }
    public Guid UserId { get; init; }
    public string Username { get; init; } = string.Empty;
    public FeedEntryType Type { get; init; }

    public string Name { get; init; } = string.Empty;
    public decimal Progress { get; init; }
    public decimal TargetValue { get; init; }

    public bool IsCompleted { get; init; }
    public DateTime? CompletedAt { get; init; }

    public DateTime UpdatedAt { get; init; }
}
