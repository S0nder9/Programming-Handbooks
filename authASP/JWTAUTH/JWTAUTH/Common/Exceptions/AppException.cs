namespace JWTAUTH.Common.Exceptions
{
    public abstract class AppException(string code, string message, int statusCode) : Exception(message)
    {
        public string Code { get; } = code;
        public int StatusCode { get; } = statusCode;
    }
}