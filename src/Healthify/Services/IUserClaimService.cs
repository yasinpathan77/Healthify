using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Healthify.Models;

namespace Healthify.Services
{
    public interface IUserClaimService
    {
        Task<bool> ChangeExpirationAsync(User_ user,double hours);

        Task<bool> ChangeResetAsync(User_ user, string claimtype);

        Task<string> RemoveClaim(User_ user, Claim claim);
    }
}
