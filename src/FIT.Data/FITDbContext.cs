using FIT.Core.Goals;

using Microsoft.EntityFrameworkCore;

namespace FIT.Data;

public sealed class FITDbContext(DbContextOptions<FITDbContext> options) : DbContext(options)
{
    public DbSet<Goal> Goals => Set<Goal>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(FITDbContext).Assembly);
    }
}
