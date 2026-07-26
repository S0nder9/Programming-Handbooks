using FluentValidation;
using FluentValidation.AspNetCore;
using JWTAUTH.Common;
using Microsoft.AspNetCore.Mvc;

namespace JWTAUTH.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddValidationSetup(this IServiceCollection services)
        {
            services.AddFluentValidationAutoValidation();
            services.AddValidatorsFromAssemblyContaining<Program>();

            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.InvalidModelStateResponseFactory = context =>
                {
                    var errors = context.ModelState
                        .Where(e => e.Value?.Errors.Count > 0)
                        .SelectMany(e => e.Value!.Errors.Select(err =>
                            new ApiError("VALIDATION_ERROR", err.ErrorMessage, e.Key)))
                        .ToList();

                    var response = ApiResponse<object>.Fail(errors);
                    return new BadRequestObjectResult(response);
                };
            });

            return services;
        }
    }
}