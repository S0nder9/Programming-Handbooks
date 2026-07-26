using JWTAUTH.Entities;
using JWTAUTH.Entities.Models;

namespace JWTAUTH.Services
{
    public interface IAuthService
    {
        Task<User?> RegisterAsync(UserDTO request);
        Task<TokenResponseDto?> LoginAsync(UserDTO request);

        Task<TokenResponseDto?> RefreshTokensAsync(RefreshTokenRequestDto request);
    }
}
