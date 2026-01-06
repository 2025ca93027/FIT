using FIT.Core.Workouts;

using Microsoft.EntityFrameworkCore;

namespace FIT.Data.Repositories;

public sealed class WorkoutRepository(FITDbContext db) : IWorkoutRepository
{
    private readonly FITDbContext _db = db;

    public async Task AddAsync(Workout workout, CancellationToken ct = default)
    {
        _db.Workouts.Add(workout);
        await _db.SaveChangesAsync(ct);
    }

    public async Task<IReadOnlyList<Workout>> GetForUserAsync(Guid userId, DateOnly from, DateOnly to, CancellationToken ct = default)
    {
        var fromUtc = from.ToDateTime(TimeOnly.MinValue, DateTimeKind.Utc);
        var toUtc = to.ToDateTime(TimeOnly.MaxValue, DateTimeKind.Utc);

        return await _db.Workouts
            .Where(w => w.UserId == userId &&
                w.StartedAtUtc >= fromUtc &&
                w.StartedAtUtc <= toUtc)
            .OrderBy(w => w.StartedAtUtc)
            .ToListAsync(ct);
    }
}
