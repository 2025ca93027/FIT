using FIT.Core.Workouts;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FIT.Data.Configurations;

public sealed class WorkoutConfiguration : IEntityTypeConfiguration<Workout>
{
    public void Configure(EntityTypeBuilder<Workout> builder)
    {
        builder.ToTable("workouts");

        builder.HasKey(w => w.Id);

        builder.Property(w => w.UserId).IsRequired();
        builder.Property(w => w.StartedAtUtc).IsRequired();
        builder.Property(w => w.DurationMinutes).IsRequired();

        builder.Property(w => w.DistanceMeters);

        builder.Property(w => w.ActivityType).IsRequired();
    }
}