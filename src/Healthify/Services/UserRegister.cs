using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Healthify.Database;
using Healthify.Models;
using Healthify.OutPutModel;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Healthify.Services
{
    public class UserRegister : IUserRegister
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly UserManager<User_> _userManager;
        private readonly SignInManager<User_> _signInManager;
        private readonly HealthifyDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IUserEmail _userEmail;
        private readonly ITokenGeneration _tokenGeneration;
        private readonly IUserClaimService _userClaimService;

        public UserRegister(IWebHostEnvironment webHostEnvironment, UserManager<User_> userManager,SignInManager<User_> signInManager,HealthifyDbContext context,IConfiguration configuration,RoleManager<IdentityRole> roleManager,IUserEmail userEmail,ITokenGeneration tokenGeneration,IUserClaimService userClaimService)
        {
            _webHostEnvironment = webHostEnvironment;
            _userManager = userManager;
            _signInManager = signInManager;
            _context = context;
            _configuration = configuration;
            _roleManager = roleManager;
            _userEmail = userEmail;
            _tokenGeneration = tokenGeneration;
            _userClaimService = userClaimService;
        }

        public async Task<string> RegisterAsync(UserRegisterModel usermodel,string role,string doctor)
        {

            var user = new User_()
            {
                Fname = usermodel.Fname,
                Lname = usermodel.Lname,
                Email = usermodel.Email,
                UserName = usermodel.Email,
            };

            var user7 = await _userManager.FindByEmailAsync(usermodel.Email);

            bool okay=false;

            if (user7 != null)
            {
                okay = await _userManager.IsInRoleAsync(user7, "Visitor");
            }

            if (role == null && okay == false)
            {
                var result = await _userManager.CreateAsync(user, usermodel.Password);

                if (!result.Succeeded)
                {
                    return "Username has already been taken.";
                }

                var result2 = await _userManager.AddToRoleAsync(user, "Visitor");

                if (!result.Succeeded)
                {
                    return result.ToString();
                }
            }
                var user1 = await _userManager.FindByEmailAsync(usermodel.Email);

                if (doctor == "Doctor")
                {
                    var docclaim = new Claim("Doctor", "False");
                    await _userManager.AddClaimAsync(user1, docclaim);
                }

                var exclaim = new Claim("Expiration", DateTime.Now.AddHours(2).ToString());
                await _userManager.AddClaimAsync(user1, exclaim);

                var verotp = await _userEmail.GetOTPAsync(user1.Id);

                var mailresult = _userEmail.SendOTP(usermodel.Email, "Verify Your Email", "Enter this " + verotp.ToString() + " OTP to successfully register in Healthify.\n\nDon't share this OTP. ");

                if (mailresult != null)
                {
                    return mailresult;
                }
                    await _signInManager.PasswordSignInAsync(user.Email, usermodel.Password, true, true);
                    return await _tokenGeneration.GetToken(usermodel.Email, true);

        }

        public async Task<ErrorModel> Login(UserLogin user)
        {
            var user1 = await _userManager.FindByEmailAsync(user.Email);

            if(user1 == null)
            {
                var error = new ErrorModel
                {
                    Status = "Email",
                    Message = "User Is Not Registered"
                };

                return error;

            }


            await _userClaimService.ChangeExpirationAsync(user1, 24);

             await _tokenGeneration.GetToken(user.Email, user.Keep);

            var role = await _userManager.IsInRoleAsync(user1,"Doctor");

            var result = await _signInManager.PasswordSignInAsync(user1, user.Password,user.Keep,true);


            if (!result.Succeeded)
            {
                var error = new ErrorModel
                {
                    Status = "Password",
                    Message = "Password is incorrect"
                };

                return error;
            }

            if (role == false)
            {
                var error = new ErrorModel
                {
                    Status = "User",
                    Message = "User Is Registered"
                };

                return error;
            }

            else
            {
                var error = new ErrorModel
                {
                    Status = "Doctor",
                    Message = "User Is Doctor"
                };

                return error;
            }


        }

        public async Task<string> MailVerificationAsync(string name,OtpClass varotp)
        {
            if (await _userEmail.CheckOTPAsync(name, varotp))
            {
                var user1 = await _userManager.FindByEmailAsync(name);
                user1.EmailConfirmed = true;
                await _userManager.RemoveFromRoleAsync(user1, "Visitor");
                await _userManager.AddToRoleAsync(user1, "User");

                if (await _userClaimService.ChangeExpirationAsync(user1,24))
                {
                    await _signInManager.SignInAsync(user1,true,null);

                    return await _tokenGeneration.GetToken(user1.Email, false);
                }

                return "Error";
            }
            else
            {
                return null;
            }
        }

        public async Task<bool> LogoutAsync()
        {
            await _signInManager.SignOutAsync();
            return true;
        }

        public async Task<string> ResetEmailAsync(ResetEmail email)
        {
            var result = await _userManager.FindByEmailAsync(email.Email);

            if (result == null)
            {
                return "false";
            }

            var verotp = await _userEmail.GetOTPAsync(result.Id);

            var mailresult = _userEmail.SendOTP(result.Email, "Reset Password", "Hello, "+result.Fname.ToString()+" "+result.Lname.ToString()+". Enter this " + verotp.ToString() + " OTP to Reset your Password. \n\nDon't share this OTP. ");

            if (await _userClaimService.ChangeExpirationAsync(result, 2))
            {
                var exclaim = new Claim("Reset", "False");
                await _userManager.AddClaimAsync(result, exclaim);
                var id = await _context.Otp_Datatbl.Where(x => x.UserID == result.Id).FirstOrDefaultAsync();
                return id.ID.ToString();
            }

            return "False";

        }

        public async Task<string> ForgotPasswordOTPAsync(string name, OtpClass varotp)
        {

            if (await _userEmail.CheckOTPAsync(name, varotp))
            {
                var user1 = await _userManager.FindByEmailAsync(name);

                if (await _userClaimService.ChangeExpirationAsync(user1, 24))
                {
                    await _userClaimService.ChangeResetAsync(user1, "Reset");

                    await _signInManager.SignInAsync(user1, false, null);

                    return await _tokenGeneration.GetToken(user1.Email, true);
                }

                return "false";
            }

            return "false";
        }

        public async Task<string> ChangePasswordAsync(string name, ForgotPassword password)
        {
            var user = await _userManager.FindByEmailAsync(name);

            var claim = new Claim("Reset", "True");

            await _userManager.RemoveClaimAsync(user, claim);

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);

            var result = await _userManager.ResetPasswordAsync(user, token, password.ConfirmPassword);

            if (result.Succeeded)
            {
                await _tokenGeneration.GetToken(user.Email, true);
                await _signInManager.SignOutAsync();
                return "True";
            }
            return "False";
        }

        public async Task<string> ResetPasswordAsync(string name, ResetPassword password)
        {
            var user = await _userManager.FindByEmailAsync(name);

            var result = await _userManager.ChangePasswordAsync(user, password.OldPassword, password.ConfirmPassword);

            if (result.Succeeded)
            {
                return await _tokenGeneration.GetToken(user.Email, true);
            }

            

            return "false";
        }

        public async Task<LoginInformation> UserDetails(string Email)
        {
            
            var user = await _userManager.FindByEmailAsync(Email);
            if (await _userManager.IsInRoleAsync(user, "Doctor"))
            {
                var information = new LoginInformation
                {
                    Fname = user.Fname,
                    Lname = user.Lname,
                    ProfilePhoto = user.ProfilePicture,
                    Role = "Doctor"
                };
                return information;
            }
            else if (await _userManager.IsInRoleAsync(user, "User"))
             {
                var information1 = new LoginInformation
                {
                    Fname = user.Fname,
                    Lname = user.Lname,
                    ProfilePhoto = user.ProfilePicture,
                    Role = "User"
                };
                return information1;
            }
            return null;

        }

        public async Task<string> ResendOtp(string Email)
        {
            var user1 = await _userManager.FindByEmailAsync(Email);
            var verotp = await _userEmail.GetOTPAsync(user1.Id);
            var mailresult = _userEmail.SendOTP(user1.Email, "Reset OTP", "Hello, " + user1.Fname.ToString() + " " + user1.Lname.ToString() + ". Enter this " + verotp.ToString() + " OTP to Reset your Password. \n\nDon't share this OTP. ");
            return "Okay";
        }

        public async Task<string> GetMail(int Id)
        {
            var otp = await _context.Otp_Datatbl.Where(x => x.ID == Id).Select(x => x.UserID).FirstOrDefaultAsync();
            var user = await _userManager.FindByIdAsync(otp);
            return user.Email;
        }
    }
}
