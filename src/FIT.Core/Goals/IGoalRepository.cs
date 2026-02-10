namespace FIT.Core.Goals;

public interface IGoalRepository
{
    Task AddAsync(Goal goal, CancellationToken ct = default);
    Task<Goal?> GetByIdAsync(Guid userId, Guid goalId, CancellationToken ct = default);
    Task<IReadOnlyList<Goal>> GetActiveForUserAsync(Guid userId, DateOnly asOf, CancellationToken ct = default);
    Task UpdateAsync(Goal goal, CancellationToken ct = default);
}