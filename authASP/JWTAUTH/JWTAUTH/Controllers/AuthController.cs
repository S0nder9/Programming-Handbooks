using JWTAUTH.Entities;
using JWTAUTH.Entities.Models;
using JWTAUTH.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace JWTAUTH.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(IAuthService authService) : ControllerBase
    {
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(UserDTO request)
        {
            var user = await authService.RegisterAsync(request);

            if (user is null) { 
                return BadRequest("User already exists");
            }

            return Ok(user);
        }

        [HttpPost("login")]
        public async Task<ActionResult<TokenResponseDto>> Login(UserDTO request)
        {
            var result = await authService.LoginAsync(request);

            if (result is null) { 
                return BadRequest("Invalid username or password");
            }

            return Ok(result);
        }

        [HttpPost("refresh-tokens")]
        public async Task<ActionResult<TokenResponseDto>> RefreshTokens(RefreshTokenRequestDto request)
        {
            var result = await authService.RefreshTokensAsync(request);

            if (result is null || result.AccessToken is null || result.RefreshToken is null)
            {
                return BadRequest("Invalid refresh token");
            }

            return Ok(result);
        }

        [Authorize]
        [HttpGet]
        public IActionResult AuthenrticatedOnlyEndpoint()
        {
            return Ok("You are authenticated!");
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("admin-only")]
        public IActionResult AdminOnlyEndpoit()
        {
            return Ok("You are an admin!");
        }
    }
}
