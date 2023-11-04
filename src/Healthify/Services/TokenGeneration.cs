using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Healthify.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
//using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;

namespace Healthify.Services
{
    public class TokenGeneration : ITokenGeneration
    {
        private readonly UserManager<User_> _userManager;
        private readonly IConfiguration _configuration;

        public TokenGeneration(UserManager<User_> userManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _configuration = configuration;
        }

        

        public async Task<string> GetToken(string Email, bool Keep)
        {
            var authclaims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            var user = await _userManager.FindByEmailAsync(Email);

            var userroles = await _userManager.GetRolesAsync(user);

            foreach (var role in userroles)
            {
                authclaims.Add(new Claim(ClaimTypes.Role, role));
            }

            var userclaims = await _userManager.GetClaimsAsync(user);

            foreach (var claim in userclaims)
            {
                authclaims.Add(new Claim(claim.Type, claim.Value));
            }

            var authkey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["JWt:Secret"]));

            if (Keep)
            {
                var token = new JwtSecurityToken
                (
                    issuer: _configuration["JWt:ValidIssuer"],
                    audience: _configuration["JWt:ValidAudience"],
                    expires: DateTime.Now.AddDays(1),
                    claims: authclaims,
                    signingCredentials: new SigningCredentials(authkey, SecurityAlgorithms.HmacSha256Signature)
                );
                return new JwtSecurityTokenHandler().WriteToken(token);
            }
            else
            {
                var token = new JwtSecurityToken
                (
                    issuer: _configuration["JWt:ValidIssuer"],
                    audience: _configuration["JWt:ValidAudience"],
                    expires: DateTime.Now.AddMilliseconds(10),
                    claims: authclaims,
                    signingCredentials: new SigningCredentials(authkey, SecurityAlgorithms.HmacSha256Signature)
                );
                return new JwtSecurityTokenHandler().WriteToken(token);
            }
        }
    }
}
