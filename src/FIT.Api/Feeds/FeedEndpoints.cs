using FIT.Core.Feeds;

namespace FIT.Api.Feeds;

internal static class FeedEndpoints
{
    internal static RouteGroupBuilder MapFeed(this IEndpointRouteBuilder app)
    {
        var group = app
            .MapGroup("/feed")
            .RequireAuthorization();

        group.MapGet("/goals", GetGoalsFeed);

        return group;
    }

    private static IAsyncEnumerable<GoalFeedEntry> GetGoalsFeed(
        FeedEntryType? type,
        int offset,
        int pageSize,
        GoalsFeedService service,
        CancellationToken ct)
    {
        return service.GetGoalsFeedAsync(
            entryType: type ?? FeedEntryType.All,
            offset: offset,
            pageSize: pageSize,
            ct: ct);
    }
}
