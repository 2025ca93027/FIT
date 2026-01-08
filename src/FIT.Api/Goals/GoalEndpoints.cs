using FIT.Core.Goals;

using FluentValidation;

namespace FIT.Api.Goals;

internal static class GoalEndpoints
{
    internal static RouteGroupBuilder MapGoals(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/goals");

        group.MapPost("/", CreateGoal);
        group.MapPut("/{id:guid}", UpdateGoal);
        group.MapGet("/", GetGoals);

        return group;
    }

    private static async Task<IResult> CreateGoal(CreateGoalRequest req, GoalService goalService, IValidator<CreateGoalRequest> validator, CancellationToken ct)
    {
        var validationResult = await validator.ValidateAsync(req);
        if (!validationResult.IsValid)
        {
            return Results.ValidationProblem(validationResult.ToDictionary());
        }

        var userId = GetUserId();

        var goal = await goalService.CreateGoalAsync(
            userId,
            req.StartDate,
            req.TrackingMode,
            req.TargetValue,
            req.Unit,
            req.Name,
            req.EndDate,
            ct);

        return Results.Created($"/goals/{goal.Id}", MapResponse(new(goal)));
    }


    private static async Task<IResult> UpdateGoal(Guid id, UpdateGoalRequest req, GoalService goalService, CancellationToken ct)
    {
        var updatedGoal = await goalService.UpdateGoalAsync(
            id, 
            req.TargetValue, 
            req.Unit, 
            req.Name, 
            req.EndDate, 
            ct);

        return Results.Ok(MapResponse(new(updatedGoal)));
    }

    private static async Task<IResult> GetGoals(GoalService goalService, CancellationToken ct)
    {
        var userId = GetUserId();
        var today = DateOnly.FromDateTime(DateTime.UtcNow);

        var goals = await goalService.GetActiveGoalsWithProgressAsync(userId, today, ct);
        var response = goals.Select(MapResponse).ToList();

        return Results.Ok(response);
    }

    private static GoalResponse MapResponse(GoalWithProgress gp) => new()
    {
        Id = gp.Goal.Id,
        TrackingMode = gp.Goal.TrackingMode,
        TargetValue = gp.Goal.TargetValue,
        CurrentProgress = gp.Progress,
        Unit = gp.Goal.Unit,
        Name = gp.Goal.Name,
        StartDate = gp.Goal.StartDate,
        EndDate = gp.Goal.EndDate,
        IsCompleted = gp.Goal.IsCompleted
    };

    // Placeholder until auth exists
    private static Guid GetUserId() => Guid.Empty;
}