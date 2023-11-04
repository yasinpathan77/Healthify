using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Healthify.Models;
using Microsoft.AspNetCore.Identity;

namespace Healthify.Services
{
    public class UserClaimService : IUserClaimService
    {
        private readonly UserManager<User_> _userManager;

        public UserClaimService(UserManager<User_> userManager)
        {
            _userManager = userManager;
        }

        public async Task<bool> ChangeExpirationAsync(User_ user, double hours)
        {
            var result = await _userManager.GetClaimsAsync(user);

            foreach (var claim in result)
            {
                if (claim.Type == "Expiration")
                {
                    var oldclaim = new Claim("Expiration", claim.Value.ToString());
                    var newclaim = new Claim("Expiration", DateTime.Now.AddHours(hours).ToString());
                    var result1 = await _userManager.ReplaceClaimAsync(user, oldclaim, newclaim);
                    if (result != null)
                    {
                        return true;
                    }

                    return false;
                }
            }
            return false;
        }

        public async Task<bool> ChangeResetAsync(User_ user, string claimtype)
        {
            var result = await _userManager.GetClaimsAsync(user);

            foreach (var claim in result)
            {
                if (claim.Type == claimtype)
                {
                    var oldclaim = new Claim(claimtype, claim.Value.ToString());
                    var newclaim = new Claim(claimtype, "true");
                    var result1 = await _userManager.ReplaceClaimAsync(user, oldclaim, newclaim);
                    if (result1 != null)
                    {
                        return true;
                    }

                    return false;
                }
            }
            return false;
        }

        public async Task<string> RemoveClaim(User_ user, Claim claim)
        {
            await  _userManager.RemoveClaimAsync(user, claim);
            return "Okay";
        }
    }
}
