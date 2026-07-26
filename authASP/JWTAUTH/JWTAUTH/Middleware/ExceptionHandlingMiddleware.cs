using JWTAUTH.Common;
using JWTAUTH.Common.Exceptions;
using System.Text.Json;

namespace JWTAUTH.Middleware
{
    public class ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
    {
        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await next(context);
            }
            catch (AppException ex)
            {
                logger.LogWarning(ex, "Handled application exception: {Code}", ex.Code);
                await WriteErrorAsync(context, ex.StatusCode, ex.Code, ex.Message);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Unhandled exception");
                await WriteErrorAsync(context, StatusCodes.Status500InternalServerError,
                    "INTERNAL_ERROR", "Something went wrong. Please try again later.");
            }
        }

        private static async Task WriteErrorAsync(HttpContext context, int statusCode, string code, string message)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = statusCode;

            var response = ApiResponse<object>.Fail(code, message);
            var json = JsonSerializer.Serialize(response, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            });

            await context.Response.WriteAsync(json);
        }
    }
}