namespace FIT.Core.Feeds;

[Flags]
public enum FeedEntryType
{
    Completed = 1,
    Updated = 2,
    Created = 4,
    All = Completed | Updated | Created
}