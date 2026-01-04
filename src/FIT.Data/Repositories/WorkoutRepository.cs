using FIT.Core.Workouts;

namespace FIT.Data.Repositories;

public sealed class WorkoutRepository(FITDbContext db) : IWorkoutRepository
{
    private readonly FITDbContext _db = db;

    public Task<IReadOnlyList<Workout>> GetForUserAsync(Guid userId, DateOnly from, DateOnly to, CancellationToken ct = default)
    {
        throw new NotImplementedException();
    }
}