namespace FIT.Core.Goals;

/// <summary>
/// Supported goal tracking modes.
/// </summary>
public enum GoalTrackingMode
{
    Manual,
    Distance,
    Workouts,
    Duration,
    Calories,
}

/// <summary>
/// Core domain model representing a user goal.
/// </summary>
public sealed record Goal
{
    public Guid Id { get; init; }
    public Guid UserId { get; init; }

    /// <summary>How progress is measured.</summary>
    public GoalTrackingMode TrackingMode { get; init; }

    /// <summary>Target value required for completion.</summary>
    public decimal TargetValue { get; init; }

    /// <summary>Optional unit for display and interpretation.</summary>
    public string? Unit { get; init; }

    /// <summary>User-defined name.</summary>
    public string Name { get; init; }

    /// <summary>Start date for goal evaluation.</summary>
    public DateOnly StartDate { get; init; }

    /// <summary>Optional end date; null means ongoing.</summary>
    public DateOnly? EndDate { get; set; }

    public decimal Progress { get; set; }
    public bool IsCompleted { get; set; }
    public DateTime CreatedAt { get; init; }

    /// <summary>For EF Core.</summary>
    public Goal()
    {
        Name = string.Empty;
    }

    public Goal(
        Guid userId,
        DateOnly startDate,
        GoalTrackingMode trackingMode,
        string name,
        decimal targetValue)
    {
        Id = Guid.NewGuid();
        CreatedAt = DateTime.UtcNow;

        UserId = userId;
        StartDate = startDate;
        TrackingMode = trackingMode;
        Name = name;
        TargetValue = targetValue;
    }

    public Goal(
        Guid userId,
        DateOnly startDate,
        GoalTrackingMode trackingMode,
        string name,
        decimal targetValue,
        string unit)
        : this(userId, startDate, trackingMode, name, targetValue)
    {
        Unit = unit;
    }
};
