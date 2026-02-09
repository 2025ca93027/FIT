using FIT.Data;
using FIT.Data.Identity;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

public static class PersistenceExtensions
{
    public static IServiceCollection AddPersistence(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddDbContext<FITDbContext>(o =>
            o.UseNpgsql(configuration.GetConnectionString("Default")));

        services
            .AddIdentity<ApplicationUser, ApplicationRole>(o =>
            {
                o.User.RequireUniqueEmail = true;
                o.Password.RequiredLength = 8;
            })
            .AddEntityFrameworkStores<FITDbContext>()
            .AddDefaultTokenProviders();

        return services;
    }
}
