namespace JWTAUTH.Common.Exceptions
{
    public class NotFoundException(string message, string code = "NOT_FOUND")
        : AppException(code, message, StatusCodes.Status404NotFound);
}