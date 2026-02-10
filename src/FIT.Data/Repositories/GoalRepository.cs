using FIT.Core.Goals;

using Microsoft.EntityFrameworkCore;

namespace FIT.Data.Repositories;

public sealed class GoalRepository(FITDbContext db) : IGoalRepository
{
    private readonly FITDbContext _db = db;

    public async Task AddAsync(Goal goal, CancellationToken ct = default)
    {
        _db.Goals.Add(goal);
        await _db.SaveChangesAsync(ct);
    }

    public async Task<IReadOnlyList<Goal>> GetActiveForUserAsync(Guid userId, DateOnly asOf, CancellationToken ct = default)
    {
        var q = _db.Goals.Where(g =>
            g.UserId == userId &&
            g.StartDate <= asOf &&
            (g.EndDate == null || g.EndDate >= asOf));

        return await q.ToListAsync(ct);
    }

    public async Task<Goal?> GetByIdAsync(Guid userId, Guid goalId, CancellationToken ct = default)
    {
        return await _db.Goals.AsNoTracking().FirstOrDefaultAsync(g => g.Id == goalId && g.UserId == userId, ct);
    }

    public async Task UpdateAsync(Goal goal, CancellationToken ct = default)
    {
        var existing = _db.Goals.Local.FirstOrDefault(e => e.Id == goal.Id);
        if (existing is not null)
        {
            _db.Entry(existing).State = EntityState.Detached;
        }

        _db.Goals.Update(goal);
        await _db.SaveChangesAsync(ct);
    }
}
