using FIT.Core.Workouts;

namespace FIT.Core.Tests.Fakes;

internal sealed class FakeWorkoutRepository : IWorkoutRepository
{
    public DateOnly? LastFromDate { get; private set; }
    public DateOnly? LastToDate { get; private set; }
    public IReadOnlyList<Workout> WorkoutsToReturn { get; set; } = [];

    public Task AddAsync(Workout workout, CancellationToken ct = default)
    {
        return Task.CompletedTask;
    }

    public Task<IReadOnlyList<Workout>> GetForUserAsync(Guid userId, DateOnly from, DateOnly to, CancellationToken ct = default)
    {
        LastFromDate = from;
        LastToDate = to;

        return Task.FromResult(WorkoutsToReturn);
    }
}
