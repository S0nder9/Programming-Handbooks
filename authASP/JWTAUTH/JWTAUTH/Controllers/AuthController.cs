using JWTAUTH.Common;
using JWTAUTH.Entities.Models;
using JWTAUTH.Models.DTOs;
using JWTAUTH.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using System.Security.Claims;

namespace JWTAUTH.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(IAuthService authService) : ControllerBase
    {
        [EnableRateLimiting("auth")]
        [HttpPost("register")]
        public async Task<ActionResult<ApiResponse<UserResponseDto>>> Register(UserDTO request)
        {
            var user = await authService.RegisterAsync(request);
            return Ok(ApiResponse<UserResponseDto>.Ok(user));
        }

        [EnableRateLimiting("auth")]
        [HttpPost("login")]
        public async Task<ActionResult<ApiResponse<TokenResponseDto>>> Login(UserDTO request)
        {
            var result = await authService.LoginAsync(request);
            return Ok(ApiResponse<TokenResponseDto>.Ok(result));
        }

        [EnableRateLimiting("auth")]
        [HttpPost("refresh-tokens")]
        public async Task<ActionResult<ApiResponse<RefreshResponseDto>>> RefreshTokens(RefreshTokenRequestDto request)
        {
            var result = await authService.RefreshAccessTokenAsync(request);
            return Ok(ApiResponse<RefreshResponseDto>.Ok(result));
        }

        [Authorize]
        [HttpPost("logout")]
        public async Task<ActionResult<ApiResponse>> Logout()
        {
            var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            await authService.LogoutAsync(userId);
            return Ok(ApiResponse.Ok());
        }

        [Authorize]
        [HttpGet("me")]
        public async Task<ActionResult<ApiResponse<UserResponseDto>>> GetMe()
        {
            var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var user = await authService.GetByIdAsync(userId);
            return Ok(ApiResponse<UserResponseDto>.Ok(user));
        }
    }
}