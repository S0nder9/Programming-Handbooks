using DotNetEnv;
using JWTAUTH.Common;
using JWTAUTH.Entities.Data;
using JWTAUTH.Extensions;
using JWTAUTH.Middleware;
using JWTAUTH.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Scalar.AspNetCore;
using System.Text;
using System.Text.Json;
using System.Threading.RateLimiting;

Env.Load();

var builder = WebApplication.CreateBuilder(args);

// ---- Core services ----
builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddValidationSetup();

// ---- Auth ----
var jwtIssuer = builder.Configuration.GetValue<string>("AppSettings:Issuer")
    ?? throw new InvalidOperationException("JWT issuer not configured.");
var jwtAudience = builder.Configuration.GetValue<string>("AppSettings:Audience")
    ?? throw new InvalidOperationException("JWT audience not configured.");
var jwtKey = builder.Configuration.GetValue<string>("AppSettings:Token")
    ?? throw new InvalidOperationException("JWT signing key not configured.");

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = jwtIssuer,
            ValidateAudience = true,
            ValidAudience = jwtAudience,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
            ValidateLifetime = true,
            ClockSkew = TimeSpan.FromSeconds(30)
        };

        options.Events = new JwtBearerEvents
        {
            OnChallenge = async context =>
            {
                context.HandleResponse();

                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                context.Response.ContentType = "application/json";

                var code = context.AuthenticateFailure switch
                {
                    SecurityTokenExpiredException => "TOKEN_EXPIRED",
                    _ => "UNAUTHORIZED"
                };

                var message = context.AuthenticateFailure switch
                {
                    SecurityTokenExpiredException => "Access token has expired",
                    _ => "You are not authenticated"
                };

                var response = ApiResponse<object>.Fail(code, message);
                var json = JsonSerializer.Serialize(response, new JsonSerializerOptions
                {
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                });

                await context.Response.WriteAsync(json);
            },

            OnForbidden = async context =>
            {
                context.Response.StatusCode = StatusCodes.Status403Forbidden;
                context.Response.ContentType = "application/json";

                var response = ApiResponse<object>.Fail("FORBIDDEN", "You don't have permission to access this resource");
                var json = JsonSerializer.Serialize(response, new JsonSerializerOptions
                {
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                });

                await context.Response.WriteAsync(json);
            }
        };
    });

builder.Services.AddAuthorization();

builder.Services.AddDbContext<UserDBContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("UserDatabase")));

builder.Services.AddScoped<IAuthService, AuthService>();

// ---- CORS ----
var frontendOrigin = builder.Configuration.GetValue<string>("AppSettings:FrontendOrigin")
    ?? "http://localhost:3000";

builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy => policy
        .WithOrigins(frontendOrigin)
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials());
});

// ---- Rate limiting ----
builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;

    options.AddPolicy("auth", httpContext =>
        RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: httpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown",
            factory: _ => new FixedWindowRateLimiterOptions
            {
                // PermitLimit = 5,
                PermitLimit = 50,
                Window = TimeSpan.FromMinutes(1),
                QueueLimit = 0
            }));
});

var app = builder.Build();

// ---- Pipeline ----
app.UseMiddleware<ExceptionHandlingMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}
else
{
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseCors("Frontend");
app.UseRateLimiter();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();