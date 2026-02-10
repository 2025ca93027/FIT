using FluentValidation;

namespace FIT.Api.Auth;

public sealed record RegisterRequest(string Username, string Email, string Password);
public sealed record LoginRequest(string Email, string Password);


internal sealed class RegisterRequestValidator
    : AbstractValidator<RegisterRequest>
{
    public RegisterRequestValidator()
    {
        RuleFor(x => x.Username)
            .MinimumLength(3)
            .Matches("^[a-zA-Z0-9_]+$");
        RuleFor(x => x.Email).EmailAddress();
        RuleFor(x => x.Password).MinimumLength(8);
    }
}
