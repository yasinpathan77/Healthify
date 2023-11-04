using System;
using System.Threading.Tasks;
using Healthify.Models;

namespace Healthify.Services
{
    public interface IDoctorRegistration
    {
        Task<string> CreateDoctorPermissionAsync(DoctorModel doctor,string Email);

        
    }
}
