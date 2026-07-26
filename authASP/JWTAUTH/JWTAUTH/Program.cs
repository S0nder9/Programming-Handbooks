using JWTAUTH.Entities.Data;
using JWTAUTH.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidIssuer = builder.Configuration.GetValue<string>("AppSettings:Issuer") ?? throw new InvalidOperationException("JWT issuer not configured. Set AppSettings:Issuer."),
            ValidateAudience = false,
            ValidAudience = builder.Configuration.GetValue<string>("AppSettings:Audience") ?? throw new InvalidOperationException("JWT audience not configured. Set AppSettings:Audience."),
            IssuerSigningKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(
                System.Text.Encoding.UTF8.GetBytes(builder.Configuration.GetValue<string>("AppSettings:Token") ?? throw new InvalidOperationException("JWT signing key not configured. Set AppSettings:Token."))),
            ValidateIssuerSigningKey = true,
        };
    });

builder.Services.AddDbContext<UserDBContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("UserDatabase")));

 builder.Services.AddScoped<IAuthService, AuthService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
