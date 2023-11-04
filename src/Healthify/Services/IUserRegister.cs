using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Healthify.Models;
using Healthify.OutPutModel;
using Microsoft.AspNetCore.Identity;

namespace Healthify.Services
{
    public interface IUserRegister
    {

        Task<string> RegisterAsync(UserRegisterModel usermodel,string role,string doctor);

        Task<ErrorModel> Login(UserLogin user);

        Task<string> MailVerificationAsync(string name,OtpClass otp);

        Task<bool> LogoutAsync();

        Task<string> ResetEmailAsync(ResetEmail email);

        Task<string> ForgotPasswordOTPAsync(string name, OtpClass varotp);

        Task<string> ChangePasswordAsync(string name, ForgotPassword password);

        Task<string> ResetPasswordAsync(string name, ResetPassword password);

        Task<LoginInformation> UserDetails(string Email);

        Task<string> ResendOtp(string Email);

        Task<string> GetMail(int Id);
    }
}
