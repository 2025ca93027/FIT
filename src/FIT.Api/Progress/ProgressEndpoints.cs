using FIT.Core.Progress;

namespace FIT.Api.Progress;

internal static class ProgressEndpoints
{
    private sealed class ProgressEndpointsLogger { }

    internal static RouteGroupBuilder MapProgress(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/progress");

        group.MapPost("/refresh", RefreshProgress);

        return group;
    }

    private static async Task<IResult> RefreshProgress(
        ProgressService progressService,
        ILogger<ProgressEndpointsLogger> logger,
        CancellationToken ct = default)
    {
        var userId = GetUserId();

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

    // Placeholder to fetch the user's ID, replace with proper logic when authentication is added.
    private static Guid GetUserId() => Guid.Empty;
}