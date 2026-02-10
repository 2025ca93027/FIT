using System.Security.Claims;

namespace FIT.Api.Extensions;

internal static class HttpContextUserExtensions
{
    public static Guid GetUserId(this HttpContext httpContext)
    {
        var userId = httpContext.User.FindFirstValue(ClaimTypes.NameIdentifier)
            ?? throw new InvalidOperationException("Authenticated user has no NameIdentifier claim");

        return Guid.Parse(userId);
    }
}
