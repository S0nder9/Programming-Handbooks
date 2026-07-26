using JWTAUTH.Common.Exceptions;
using JWTAUTH.Entities;
using JWTAUTH.Entities.Data;
using JWTAUTH.Entities.Models;
using JWTAUTH.Models.DTOs;
using Microsoft.AspNetCore.Identity;
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
        public async Task<TokenResponseDto> LoginAsync(UserDTO request)
        {
            var user = await context.Users.FirstOrDefaultAsync(u => u.Username == request.Username)
                ?? throw new UnauthorizedAppException("Invalid username or password", "INVALID_CREDENTIALS");

            if (new PasswordHasher<User>().VerifyHashedPassword(user, user.PasswordHash, request.Password)
                == PasswordVerificationResult.Failed)
                throw new UnauthorizedAppException("Invalid username or password", "INVALID_CREDENTIALS");

            var refreshToken = await GenerateAndSaveRefreshTokenAsync(user);

            return new TokenResponseDto
            {
                AccessToken = CreateAccessToken(user),
                RefreshToken = refreshToken
            };
        }

        public async Task<UserResponseDto> RegisterAsync(UserDTO request)
        {
            if (await context.Users.AnyAsync(u => u.Username == request.Username))
                throw new ConflictException("User with this username already exists", "USERNAME_TAKEN");

            var user = new User { Username = request.Username };
            user.PasswordHash = new PasswordHasher<User>().HashPassword(user, request.Password);

            context.Users.Add(user);

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                throw new ConflictException("User with this username already exists", "USERNAME_TAKEN");
            }

            return new UserResponseDto
            {
                Id = user.Id,
                Username = user.Username,
                Role = user.Role
            };
        }

        public async Task<RefreshResponseDto> RefreshAccessTokenAsync(RefreshTokenRequestDto request)
        {
            var user = await ValidateRefreshTokenAsync(request.UserId, request.RefreshToken)
                ?? throw new UnauthorizedAppException("Invalid or expired refresh token", "INVALID_REFRESH_TOKEN");

            return new RefreshResponseDto
            {
                AccessToken = CreateAccessToken(user)
            };
        }

        public async Task LogoutAsync(Guid userId)
        {
            var user = await context.Users.FindAsync(userId)
                ?? throw new NotFoundException("User not found", "USER_NOT_FOUND");

            if (user.RefreshTokenHash == null || user.RefreshTokenExpiryTime == null)
                throw new UnauthorizedAppException("No active session to log out from", "NO_ACTIVE_SESSION");

            user.RefreshTokenHash = null;
            user.RefreshTokenExpiryTime = null;
            await context.SaveChangesAsync();
        }

        public async Task<UserResponseDto> GetByIdAsync(Guid userId)
        {
            var user = await context.Users.FindAsync(userId)
                ?? throw new NotFoundException("User not found", "USER_NOT_FOUND");

            return new UserResponseDto
            {
                Id = user.Id,
                Username = user.Username,
                Role = user.Role
            };
        }


        private async Task<User?> ValidateRefreshTokenAsync(Guid userId, string refreshToken)
        {
            var user = await context.Users.FirstOrDefaultAsync(u => u.Id == userId);

            if (user?.RefreshTokenHash == null
                || user.RefreshTokenExpiryTime == null
                || user.RefreshTokenExpiryTime <= DateTime.UtcNow)
                return null;

            var storedBytes = Convert.FromBase64String(user.RefreshTokenHash);
            var incomingBytes = Convert.FromBase64String(HashToken(refreshToken));

            if (storedBytes.Length != incomingBytes.Length ||
                !CryptographicOperations.FixedTimeEquals(storedBytes, incomingBytes))
                return null;

            return user;
        }

        private static string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }

        private static string HashToken(string token) =>
            Convert.ToBase64String(SHA256.HashData(Encoding.UTF8.GetBytes(token)));

        private async Task<string> GenerateAndSaveRefreshTokenAsync(User user)
        {
            var refreshToken = GenerateRefreshToken();
            user.RefreshTokenHash = HashToken(refreshToken);
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
            await context.SaveChangesAsync();
            return refreshToken;
        }

        private string CreateAccessToken(User user)
        {
            var tokenKey = configuration.GetValue<string>("AppSettings:Token")!;
            var claims = new List<Claim>
            {
                new(ClaimTypes.Name, user.Username),
                new(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new(ClaimTypes.Role, user.Role)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

            var tokenDescriptor = new JwtSecurityToken(
                issuer: configuration.GetValue<string>("AppSettings:Issuer"),
                audience: configuration.GetValue<string>("AppSettings:Audience"),
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(15),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
        }
    }
}