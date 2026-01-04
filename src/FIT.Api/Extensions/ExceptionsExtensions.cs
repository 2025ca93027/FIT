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
            {
                return;
            }

            var (statusCode, title) = exception switch
            {
                ArgumentException => (StatusCodes.Status400BadRequest, "Invalid request"),
                _ => (StatusCodes.Status500InternalServerError, "Internal server error")
            };

            ctx.Response.StatusCode = statusCode;
            ctx.Response.ContentType = "application/problem+json";

            ProblemDetails problem = new()
            {
                Status = statusCode,
                Title = title,
                Detail = exception.Message,
                Instance = ctx.Request.Path
            };

            await ctx.Response.WriteAsJsonAsync(problem);
        }));
        return app;
    }
}