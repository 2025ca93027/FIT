// FIT.Api/Extensions/EndpointExtensions.cs
using FIT.Api.Auth;
using FIT.Api.Feeds;
using FIT.Api.Goals;
using FIT.Api.Progress;
using FIT.Api.Workouts;

namespace FIT.Api.Extensions;

internal static class EndpointExtensions
{
    internal static void MapApi(this WebApplication app)
    {
        var api = app.MapGroup("/api");

        api.MapAuth();
        api.MapGoals();
        api.MapWorkouts();
        api.MapProgress();
        api.MapFeed();
    }
}
