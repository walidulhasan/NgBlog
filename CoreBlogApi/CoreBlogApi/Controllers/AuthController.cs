using CoreBlogApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace CoreBlogApi.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly BlogDbContext _context;
        public AuthController(BlogDbContext context)
        {
            _context = context;
        }
        [HttpPost, Route("login")]
        public IActionResult Login([FromBody] LoginModel user)
        {
            var userLogin = _context.Authors.Where(a => a.Email == user.Email && a.Password == user.Password).FirstOrDefault();
            if (userLogin != null)
                {
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Mahmud1234@5678901"));
                var signingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                var tokenOptions = new JwtSecurityToken(
                    issuer: userLogin.AuthorId.ToString(),
                    audience: "http://localhost:4200",
                    claims: new List<Claim>(),
                    expires: DateTime.Now.AddMinutes(5),
                    signingCredentials: signingCredentials
                );
                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
                return Ok(new { Token = tokenString});
            }
            return Unauthorized();
        }
    }
}
