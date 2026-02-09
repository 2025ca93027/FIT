using FIT.Core.Goals;

using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace FIT.Api.Extensions;

internal static class ExceptionExtensions
{
    internal static IApplicationBuilder UseApiExceptionHandling(this IApplicationBuilder app)
    {
        app.UseExceptionHandler(err => err.Run(async ctx =>
        {
            var exception = ctx.Features.Get<IExceptionHandlerFeature>()?.Error;
            if (exception is null)
                return;

            var (statusCode, title, detail) = exception switch
            {
                // Authorization (authenticated, but forbidden)
                UnauthorizedAccessException ex =>
                    (StatusCodes.Status403Forbidden,
                     "Forbidden",
                     ex.Message),

                // Domain / application errors
                GoalNotFoundException =>
                    (StatusCodes.Status404NotFound,
                     "Resource not found",
                     null),

                ArgumentException ex =>
                    (StatusCodes.Status400BadRequest,
                     "Invalid request",
                     ex.Message),

                // Fallback
                _ =>
                    (StatusCodes.Status500InternalServerError,
                     "Internal server error",
                     null)
            };

            ctx.Response.StatusCode = statusCode;
            ctx.Response.ContentType = "application/problem+json";

            var problem = new ProblemDetails
            {
                Status = statusCode,
                Title = title,
                Detail = detail,
                Instance = ctx.Request.Path
            };

            await ctx.Response.WriteAsJsonAsync(problem);
        }));

        return app;
    }
}
