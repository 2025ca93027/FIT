namespace FIT.Core.Goals;


public sealed class GoalWithProgress(Goal goal)
{
    public Goal Goal { get; init; } = goal;
    public decimal? Progress { get; set; }
};
