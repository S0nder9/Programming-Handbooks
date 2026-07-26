namespace JWTAUTH.Common
{
    public class ApiResponse<T>
    {
        public bool Success { get; init; }
        public T? Data { get; init; }
        public List<ApiError>? Errors { get; init; }

        public static ApiResponse<T> Ok(T data) =>
            new() { Success = true, Data = data };

        public static ApiResponse<T> Fail(List<ApiError> errors) =>
            new() { Success = false, Errors = errors };

        public static ApiResponse<T> Fail(string code, string message) =>
            new() { Success = false, Errors = [new ApiError(code, message)] };
    }

    // non-generic вариант для ответов без данных (например, Logout)
    public class ApiResponse
    {
        public bool Success { get; init; }
        public List<ApiError>? Errors { get; init; }

        public static ApiResponse Ok() => new() { Success = true };

        public static ApiResponse Fail(List<ApiError> errors) =>
            new() { Success = false, Errors = errors };
    }
}