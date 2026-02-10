using FIT.Api.Extensions;
using FIT.Core.Goals;

using FluentValidation;

namespace FIT.Api.Goals;

internal static class GoalEndpoints
{
    internal static RouteGroupBuilder MapGoals(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/goals").RequireAuthorization();

        group.MapPost("/", CreateGoal);
        group.MapPut("/{id:guid}", UpdateGoal);
        group.MapGet("/", GetGoals);

        return group;
    }

    private static async Task<IResult> CreateGoal(
        HttpContext httpContext,
        CreateGoalRequest req,
        GoalService goalService,
        IValidator<CreateGoalRequest> validator,
        CancellationToken ct)
    {
        var validationResult = await validator.ValidateAsync(req, ct);
        if (!validationResult.IsValid)
        {
            return Results.ValidationProblem(validationResult.ToDictionary());
        }

        var userId = httpContext.GetUserId();

        var goal = await goalService.CreateGoalAsync(
            userId,
            req.StartDate,
            req.TrackingMode,
            req.TargetValue,
            req.Unit,
            req.Name,
            req.EndDate,
            ct);

        return Results.Created($"/goals/{goal.Id}", MapResponse(goal));
    }


    private static async Task<IResult> UpdateGoal(
        HttpContext httpContext,
        Guid id,
        UpdateGoalRequest req,
        GoalService goalService,
        CancellationToken ct)
    {
        var userId = httpContext.GetUserId();

        var updatedGoal = await goalService.UpdateGoalAsync(
            userId,
            id,
            req.TargetValue,
            req.Unit,
            req.Name,
            req.EndDate,
            ct);

        return Results.Ok(MapResponse(updatedGoal));
    }


    private static async Task<IResult> GetGoals(HttpContext httpContext, GoalService goalService, CancellationToken ct)
    {
        var userId = httpContext.GetUserId();
        var today = DateOnly.FromDateTime(DateTime.UtcNow);

        var goals = await goalService.GetActiveGoalsAsync(userId, today, ct);
        var response = goals.Select(MapResponse).ToList();

        return Results.Ok(response);
    }

    private static GoalResponse MapResponse(Goal goal) => new()
    {
        Id = goal.Id,
        TrackingMode = goal.TrackingMode,
        TargetValue = goal.TargetValue,
        CurrentProgress = goal.Progress,
        Unit = goal.Unit,
        Name = goal.Name,
        StartDate = goal.StartDate,
        EndDate = goal.EndDate,
        IsCompleted = goal.IsCompleted
    };
}