namespace FIT.Core.Workouts;

public interface IWorkoutRepository
{
    Task<IReadOnlyList<Workout>> GetForUserAsync(Guid userId, DateOnly from, DateOnly to, CancellationToken ct = default);
}
