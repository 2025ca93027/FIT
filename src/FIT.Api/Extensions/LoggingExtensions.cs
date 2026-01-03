namespace FIT.Api.Extensions;

internal static class LoggingExtensions
{
    internal static WebApplicationBuilder AddAppLogging(this WebApplicationBuilder builder)
    {
        builder.Logging.ClearProviders();
        builder.Logging.AddSimpleConsole(o =>
        {
            o.SingleLine = true;
            o.TimestampFormat = "HH:mm:ss ";
        });

        return builder;
    }
}