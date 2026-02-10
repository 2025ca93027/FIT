using System.Runtime.CompilerServices;

using FIT.Core.Feeds;
using FIT.Data.Identity;

using Microsoft.EntityFrameworkCore;

namespace FIT.Data.Repositories;

public sealed class GoalsFeedRepository(FITDbContext db) : IGoalsFeedRepository
{
    private readonly FITDbContext _db = db;

    public async IAsyncEnumerable<GoalFeedEntry> GetGoalsFeedAsync(
        FeedEntryType entryType,
        int offset,
        int pageSize,
        [EnumeratorCancellation] CancellationToken ct = default)
    {
        var query = _db.Goals
           .AsNoTracking()
           .Where(g => g.IsPublic)
           .OrderByDescending(g => g.UpdatedAt)
           .Skip(offset)
           .Take(pageSize)
           .Join(
               _db.Users.AsNoTracking(),
               goal => goal.UserId,
               user => user.Id,
               (goal, user) => new { goal, user.UserName }
           );

        await foreach (var row in query.AsAsyncEnumerable().WithCancellation(ct))
        {
            var goal = row.goal;

            var type =
                goal.CompletedAt != null
                    ? FeedEntryType.Completed
                    : goal.UpdatedAt > goal.CreatedAt
                        ? FeedEntryType.Updated
                        : FeedEntryType.Created;

            if (!entryType.HasFlag(type))
                continue;

            yield return new GoalFeedEntry
            {
                GoalId = goal.Id,
                UserId = goal.UserId,
                Username = row.UserName ?? string.Empty,

                Name = goal.Name,
                Progress = goal.Progress,
                TargetValue = goal.TargetValue,

                IsCompleted = goal.IsCompleted,
                CompletedAt = goal.CompletedAt,
                UpdatedAt = goal.UpdatedAt,

                Type = type
            };
        }
    }
}
