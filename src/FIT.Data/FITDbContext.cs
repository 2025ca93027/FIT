using FIT.Core.Goals;
using FIT.Core.Workouts;
using FIT.Data.Identity;

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FIT.Data;

public sealed class FITDbContext(DbContextOptions<FITDbContext> options)
    : IdentityDbContext<ApplicationUser, ApplicationRole, Guid>(options)
{
    public DbSet<Goal> Goals => Set<Goal>();
    public DbSet<Workout> Workouts => Set<Workout>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.HasPostgresEnum<GoalTrackingMode>();
        modelBuilder.HasPostgresEnum<WorkoutActivityType>();

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(FITDbContext).Assembly);
    }
}
