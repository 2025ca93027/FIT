using FIT.Core.Goals;
using FIT.Core.Workouts;

using Microsoft.EntityFrameworkCore;

namespace FIT.Data;

public sealed class FITDbContext(DbContextOptions<FITDbContext> options) : DbContext(options)
{
    public DbSet<Goal> Goals => Set<Goal>();
    public DbSet<Workout> Workouts => Set<Workout>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasPostgresEnum<GoalTrackingMode>();
        modelBuilder.HasPostgresEnum<WorkoutActivityType>();

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(FITDbContext).Assembly);
    }
}
