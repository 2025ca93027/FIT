using FIT.Data.Identity;

using FluentValidation;

using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace FIT.Api.Auth;

internal static class AuthEndpoints
{
    internal static RouteGroupBuilder MapAuth(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/auth").AllowAnonymous();

        group.MapPost("/register", Register);
        group.MapPost("/login", Login);

        return group;
    }

    private static async Task<IResult> Register(
        RegisterRequest req,
        IValidator<RegisterRequest> validator,
        UserManager<ApplicationUser> userManager,
        CancellationToken ct = default)
    {
        var validationResult = await validator.ValidateAsync(req, ct);
        if (!validationResult.IsValid)
        {
            return Results.ValidationProblem(validationResult.ToDictionary());
        }

        var user = new ApplicationUser
        {
            Id = Guid.NewGuid(),
            Email = req.Email,
            UserName = req.Username
        };

        var result = await userManager.CreateAsync(user, req.Password);

        if (!result.Succeeded)
            return Results.BadRequest(result.Errors);

        return Results.NoContent();
    }

    private static async Task<IResult> Login(
    LoginRequest req,
    UserManager<ApplicationUser> userManager,
    IConfiguration config)
    {
        var user = await userManager.FindByEmailAsync(req.Email);
        if (user is null)
            return Results.Unauthorized();

        if (!await userManager.CheckPasswordAsync(user, req.Password))
            return Results.Unauthorized();

        var expires = TimeSpan.FromHours(1);
        var token = CreateJwt(user, config, expires);

        return Results.Ok(new AuthResponse(
            AccessToken: token,
            TokenType: "Bearer",
            ExpiresInSeconds: (int)expires.TotalSeconds));
    }

    private static string CreateJwt(
        ApplicationUser user,
        IConfiguration config,
        TimeSpan lifetime)
    {
        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(config["Jwt:Key"]!));

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
        new Claim(ClaimTypes.Email, user.Email!)
    };

        var token = new JwtSecurityToken(
            issuer: config["Jwt:Issuer"],
            audience: config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.Add(lifetime),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

}
