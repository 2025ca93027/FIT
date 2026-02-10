using FIT.Core.Goals;

namespace FIT.Core.Tests.Fakes;

internal sealed class FakeGoalRepository(IReadOnlyList<Goal> goals) : IGoalRepository
{
    private readonly IReadOnlyList<Goal> _goals = goals;

    public Task<IReadOnlyList<Goal>> GetActiveForUserAsync(
        Guid userId,
        DateOnly asOf,
        CancellationToken ct = default)
    {
        return Task.FromResult(_goals);
    }

    public Task AddAsync(Goal goal, CancellationToken ct = default)
        => Task.CompletedTask;

    public Task UpdateAsync(Goal goal, CancellationToken ct = default)
        => Task.CompletedTask;

    public Task<Goal?> GetByIdAsync(Guid userId, Guid goalId, CancellationToken ct = default)
        => Task.FromResult<Goal?>(null);
}
