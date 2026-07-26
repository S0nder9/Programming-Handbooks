using JWTAUTH.Entities;
using JWTAUTH.Entities.Data;
using JWTAUTH.Entities.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace JWTAUTH.Services
{
    public class AuthService(UserDBContext context, IConfiguration configuration) : IAuthService
    {
        public async Task<TokenResponseDto?> LoginAsync(UserDTO request)
        {
            var user = await context.Users.FirstOrDefaultAsync(u => u.Username == request.Username);

            if (user == null)
            {
                return null;
            }

            if (new PasswordHasher<User>().VerifyHashedPassword(user, user.PasswordHash, request.Password)
                == PasswordVerificationResult.Failed)
            {
                return null;
            }

            var response = await CreateTokenResponse(user);

            return response;
        }

        public async Task<User?> RegisterAsync(UserDTO request)
        {
            if (await context.Users.AnyAsync(u => u.Username == request.Username))
            {
                return null; // User already exists
            }

            var user = new User();

            var hashedPassword = new PasswordHasher<User>().HashPassword(user, request.Password);

            user.Username = request.Username;
            user.PasswordHash = hashedPassword;

            context.Users.Add(user);
            await context.SaveChangesAsync();

            return user;
        }

        private async Task<TokenResponseDto?> RefreshTokensAsync(RefreshTokenRequestDto request)
        {
            var user = await ValidateRefreshTokenAsync(request.UserId, request.RefreshToken);

            if (user == null)
            {
                return null;
            }

            var response = await CreateTokenResponse(user);

            return response;
        }

        private async Task<TokenResponseDto> CreateTokenResponse(User? user) { 
            return new TokenResponseDto
            {
                AccessToken = CreateToken(user),
                RefreshToken = await GenerateAndSaveRefreshTokenAsync(user)
            };
        }

        private async Task<User> ValidateRefreshTokenAsync (Guid userId, string refreshToken)
        {
            var user = await context.Users.FirstOrDefaultAsync(u => u.Id == userId && u.RefreshToken == refreshToken);

            if (user == null || user.RefreshTokenExpiryTime <= DateTime.UtcNow)
            {
                return null;
            }

            return user;
        }

        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }

        private async Task<string> GenerateAndSaveRefreshTokenAsync(User user)
        {
            var refreshToken = GenerateRefreshToken();
            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.Now.AddDays(7); // 7 days validity for refresh token
            //context.Users.Update(user);
            await context.SaveChangesAsync();
            return refreshToken;
        }

        private string CreateToken(User user)
        {
            var tokenKey = configuration.GetValue<string>("AppSettings:Token");
            if (string.IsNullOrWhiteSpace(tokenKey))
                throw new InvalidOperationException("JWT signing key not configured. Set AppSettings:Token.");

            var claims = new List<Claim> { new Claim(ClaimTypes.Name, user.Username), 
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Role, user.Role)
           };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

            var tokenDescriptor = new JwtSecurityToken(
                issuer: configuration.GetValue<string>("AppSettings:Issuer"),
                audience: configuration.GetValue<string>("AppSettings:Audience"),
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
        }
    }
}
