namespace JWTAUTH.Common
{
    public record ApiError(string Code, string Message, string? Field = null);
}