using System;
using System.Threading.Tasks;

namespace Healthify.Services
{
    public interface ITokenGeneration
    {
        Task<string> GetToken(string Email, bool Keep);

    }
}
