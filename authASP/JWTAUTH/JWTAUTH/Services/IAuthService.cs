using JWTAUTH.Entities.Models;
using JWTAUTH.Models.DTOs;

namespace JWTAUTH.Services
{
    public interface IAuthService
    {
        Task<UserResponseDto> RegisterAsync(UserDTO request);
        Task<TokenResponseDto> LoginAsync(UserDTO request);
        Task<RefreshResponseDto> RefreshAccessTokenAsync(RefreshTokenRequestDto request);
        Task<UserResponseDto> GetByIdAsync(Guid userId);
        Task LogoutAsync(Guid userId);
    }
}