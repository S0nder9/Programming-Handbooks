namespace JWTAUTH.Common.Exceptions
{
    public class UnauthorizedAppException(string message, string code = "UNAUTHORIZED")
        : AppException(code, message, StatusCodes.Status401Unauthorized);
}