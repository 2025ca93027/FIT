using FIT.Api.Extensions;
using FIT.Core.Progress;

namespace FIT.Api.Progress;

internal static class ProgressEndpoints
{
    private sealed class ProgressEndpointsLogger { }

    internal static RouteGroupBuilder MapProgress(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/progress").RequireAuthorization();

        group.MapPost("/refresh", RefreshProgress);

        return group;
    }

    private static async Task<IResult> RefreshProgress(
        HttpContext httpContext,
        ProgressService progressService,
        ILogger<ProgressEndpointsLogger> logger,
        CancellationToken ct = default)
    {
        var userId = httpContext.GetUserId();

        try
        {
            await progressService.UpdateProgressAsync(userId, ct);
            return Results.NoContent();
        }
        catch (Exception ex)
        {
            logger.LogError("Error refreshing progress: {Error}", ex);
            return Results.Problem("An error occurred while refreshing progress. Please try again later.");
        }
    }
}