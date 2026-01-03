using FIT.Core.Goals;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FIT.Data.Configurations;

internal class GoalConfiguration : IEntityTypeConfiguration<Goal>
{
    public void Configure(EntityTypeBuilder<Goal> builder)
    {
        builder.ToTable("Goals");

        builder.HasKey(it => it.Id);
        builder.Property(it => it.UserId).IsRequired();

        builder.Property(it => it.TrackingMode).IsRequired();
        builder.Property(it => it.StartDate).IsRequired();

        builder.Property(it => it.TargetValue).HasPrecision(10, 2).IsRequired();
        builder.Property(it => it.Unit).HasMaxLength(50);
        builder.Property(it => it.Name).HasMaxLength(100);


        builder.Property(g => g.EndDate);
        builder.Property(g => g.IsCompleted).IsRequired();
        builder.Property(g => g.CreatedAt).IsRequired();
    }
}
