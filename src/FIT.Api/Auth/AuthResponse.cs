namespace FIT.Api.Auth;

public sealed record AuthResponse(
    string AccessToken,
    string TokenType,
    int ExpiresInSeconds);