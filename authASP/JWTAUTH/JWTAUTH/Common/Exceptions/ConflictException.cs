namespace JWTAUTH.Common.Exceptions
{
    public class ConflictException(string message, string code = "CONFLICT")
        : AppException(code, message, StatusCodes.Status409Conflict);
}