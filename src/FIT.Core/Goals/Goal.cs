namespace FIT.Core.Goals;

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
    public DateOnly? EndDate { get; private set; }

    public decimal Progress { get; private set; }
    public bool IsCompleted { get; private set; }
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
        decimal targetValue,
        string? unit = null)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(name);
        ArgumentOutOfRangeException.ThrowIfNegativeOrZero(targetValue);

        if (trackingMode == GoalTrackingMode.Manual && string.IsNullOrEmpty(unit))
        {
            throw new ArgumentException("'unit' cannot be empty for Manual goals.");
        }

        Id = Guid.NewGuid();
        CreatedAt = DateTime.UtcNow;

        UserId = userId;
        StartDate = startDate;
        TrackingMode = trackingMode;
        Name = name;
        TargetValue = targetValue;
        Unit = unit;
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="endDate"></param>
    /// <exception cref="InvalidOperationException"></exception>
    public void SetEndDate(DateOnly? endDate)
    {
        if (endDate is not null && endDate < StartDate)
        {
            throw new InvalidOperationException("End date cannot before start date");
        }

        EndDate = endDate;
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="progress"></param>
    /// <exception cref="InvalidOperationException"></exception>
    public void SetProgress(decimal progress)
    {
        if (progress < 0)
            throw new InvalidOperationException("Progress cannot be negative");

        if (progress >= TargetValue)
            IsCompleted = true;

        Progress = progress;
    }
};

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