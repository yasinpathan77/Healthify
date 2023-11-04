using System;
using System.Threading.Tasks;
using Healthify.Models;

namespace Healthify.Services
{
    public interface IUserEmail
    {
        string SendOTP(string mail, string subject, string body);

        Task<int> GetOTPAsync(string Id);

        Task<bool> CheckOTPAsync(string name, OtpClass varotp);

        Task<int> AppointmentOtp(int Id);

        string SendInvoice(string mail, string subject, string body);

    }
}
