using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Healthify.Models;
using Healthify.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Healthify.Controllers
{
    [ApiController]
    [Route("User")]
    public class UserRegisterController : Controller
    {
        private readonly IUserRegister _iuserregister;
        private readonly IConfiguration _configuration;

        public UserRegisterController(IUserRegister iuserregister, IConfiguration configuration)
        {
            _iuserregister = iuserregister;
            _configuration = configuration;
        }

        [HttpPost("{doctor}/SignUP")]
        public async Task<IActionResult> Registration([FromBody] UserRegisterModel userRegisterModel, [FromRoute] string doctor)
        {
            if (ModelState.IsValid)
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;

                if (identity != null)
                {

                    IEnumerable<Claim> claims = identity.Claims;
                    if (claims.Count() != 0)
                    {
                        var name = claims.Where(x => x.Type == "Expiration").FirstOrDefault();
                        var role = claims.Where(x => x.Type == ClaimTypes.Role).FirstOrDefault();
                        if (Convert.ToDateTime(name.Value) > DateTime.Now && role.Value != "Visitor")
                        {
                            return StatusCode(StatusCodes.Status400BadRequest, new ErrorModel { Status = "Logged IN", Message = "Already User Is Logged IN" });
                        }
                        //var result = await _iuserregister.RegisterAsync(userRegisterModel, role.Value.ToString(), doctor);
                        //return Ok(result);
                    }
                }
                var result1 = await _iuserregister.RegisterAsync(userRegisterModel, null, doctor);
                if (result1 != "false")
                {
                    return StatusCode(StatusCodes.Status200OK, new ErrorModel { Status = "Error", Message = "Enter Valid Details" });
                }
            }
            return StatusCode(StatusCodes.Status500InternalServerError, new ErrorModel { Status = "Error", Message = "Enter Valid Details" });
        }

        [HttpPost("LogIN")]
        public async Task<IActionResult> Login([FromBody] UserLogin user)
        {
            if (ModelState.IsValid)
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;

                if (identity != null)
                {

                    IEnumerable<Claim> claims = identity.Claims;
                    if (claims.Count() != 0)
                    {
                        var name = claims.Where(x => x.Type == "Expiration").FirstOrDefault();
                        if (Convert.ToDateTime(name.Value) > DateTime.Now)
                        {
                            return StatusCode(StatusCodes.Status400BadRequest, new ErrorModel { Status = "Logged IN", Message = "Already User Is Logged IN" });
                        }
                    }
                }
                var result = await _iuserregister.Login(user);
                if (result.Status ==  "Doctor" || result.Status == "User" )
                {
                    return StatusCode(StatusCodes.Status200OK, result);
                }

                return StatusCode(StatusCodes.Status401Unauthorized, result);

            }
            return BadRequest(user);
        }

        
        [HttpPost("MailVerification")]
        public async Task<IActionResult> MailVerification([FromBody] OtpClass Otpvar)
        {
            if (ModelState.IsValid)
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                if (identity != null)
                {
                    IEnumerable<Claim> claims = identity.Claims;

                    if (claims.Count() != 0)
                    {
                        var name = claims.Where(x => x.Type == ClaimTypes.Name).FirstOrDefault();
                        var expires = claims.Where(x => x.Type == "Expiration").FirstOrDefault();
                        var doctor = claims.Where(x => x.Type == "Doctor").FirstOrDefault();

                        if (Convert.ToDateTime(expires.Value) < DateTime.Now)
                        {
                            return StatusCode(StatusCodes.Status400BadRequest, new ErrorModel { Status = "Timed Out", Message = "Please Retry Registration" });
                        }

                        var result = await _iuserregister.MailVerificationAsync(name.Value.ToString(), Otpvar);

                        if (result != null && doctor != null)
                        {
                            return StatusCode(StatusCodes.Status200OK, new ErrorModel { Status = "Doctor", Message = result });
                        }

                        return StatusCode(StatusCodes.Status200OK, new ErrorModel { Status = "User", Message = result });

                    }
                }
                if (Otpvar.Email != null)
                {
                    var result = await _iuserregister.ForgotPasswordOTPAsync(Otpvar.Email, Otpvar);
                    return StatusCode(StatusCodes.Status200OK, new ErrorModel { Status = "Okay", Message = result });
                }
            }
            return BadRequest(Otpvar);
        }

        [HttpGet("GetMail")]
        public async Task<IActionResult> GetMail([FromQuery]int A)
        {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                if (identity != null)
                {
                    IEnumerable<Claim> claims = identity.Claims;

                    if (claims.Count() != 0)
                    {
                        var name = claims.Where(x => x.Type == ClaimTypes.Name).FirstOrDefault();
                        var expires = claims.Where(x => x.Type == "Expiration").FirstOrDefault();
                        
                        if (Convert.ToDateTime(expires.Value) < DateTime.Now)
                        {
                            return StatusCode(StatusCodes.Status400BadRequest, new ErrorModel { Status = "Timed Out", Message = "Please Retry Registration" });
                        }
                        return StatusCode(StatusCodes.Status200OK, name.Value);
                    }
                }
            
            
                return StatusCode(StatusCodes.Status200OK, await _iuserregister.GetMail(A));

        }


        [HttpGet("Logout")]
        public async Task<IActionResult> LogOut()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity != null)
            {

                IEnumerable<Claim> claims = identity.Claims;
                if (claims.Count() != 0)
                {
                    var name = claims.Where(x => x.Type == ClaimTypes.Name).FirstOrDefault();
                    var date = claims.Where(x => x.Type == "Expiration").FirstOrDefault();

                    if (Convert.ToDateTime(date.Value) < DateTime.Now)
                    {
                        return StatusCode(StatusCodes.Status400BadRequest, new ErrorModel { Status = "Logged Out", Message = "Already User Is Logged Out" });
                    }
                    var result = await _iuserregister.LogoutAsync();
                    return Ok(result);
                }
            }
            return StatusCode(StatusCodes.Status500InternalServerError, new ErrorModel { Status = "Error", Message = "Enter Valid Details" });

        }


        [HttpPost("EmailForgotPassword")]
        public async Task<IActionResult> EmailResetPassword([FromBody] ResetEmail email)
        {
            if (ModelState.IsValid)
            {
                var result = await _iuserregister.ResetEmailAsync(email);
                if (result != "false")
                {
                    return StatusCode(StatusCodes.Status200OK, new ErrorModel { Status = "Okay", Message = result });
                }
            }
            return StatusCode(StatusCodes.Status400BadRequest, new ErrorModel { Status = "Error", Message = email.ToString() });
        }

        
        [HttpPost("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPassword password)
        {
            if (ModelState.IsValid)
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;

                if (identity != null)
                {

                    IEnumerable<Claim> claims = identity.Claims;
                    if (claims.Count() != 0)
                    {
                        var name = claims.Where(x => x.Type == ClaimTypes.Name).FirstOrDefault();
                        var date = claims.Where(x => x.Type == "Expiration").FirstOrDefault();

                        if (Convert.ToDateTime(date.Value) < DateTime.Now)
                        {
                            return StatusCode(StatusCodes.Status400BadRequest, new ErrorModel { Status = "Logged Out", Message = "Already User Is Logged Out" });
                        }

                        var result = await _iuserregister.ChangePasswordAsync(name.Value.ToString(),password);
                        return Ok(result);
                    }
                }
            }
            return StatusCode(StatusCodes.Status500InternalServerError, new ErrorModel { Status = "Error", Message = "Enter Valid Details" });

        }

        [Authorize]
        [HttpPost("ResetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPassword password)
        {
            if (ModelState.IsValid)
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;

                if (identity != null)
                {

                    IEnumerable<Claim> claims = identity.Claims;
                    if (claims.Count() != 0)
                    {
                        var name = claims.Where(x => x.Type == ClaimTypes.Name).FirstOrDefault();
                        var date = claims.Where(x => x.Type == "Expiration").FirstOrDefault();

                        if (Convert.ToDateTime(date.Value) < DateTime.Now)
                        {
                            return StatusCode(StatusCodes.Status400BadRequest, new ErrorModel { Status = "Logged Out", Message = "Already User Is Logged Out" });
                        }

                        var result = await _iuserregister.ResetPasswordAsync(name.Value.ToString(), password);
                        return Ok(result);
                    }
                }
            }
            return StatusCode(StatusCodes.Status500InternalServerError, new ErrorModel { Status = "Error", Message = "Enter Valid Details" });

        }

        [HttpGet("IsLogIN")]
        public async Task<IActionResult> IsLogin()
        {
            if (ModelState.IsValid)
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;

                if (identity != null)
                {

                    IEnumerable<Claim> claims = identity.Claims;
                    if (claims.Count() != 0)
                    {
                        var exp = claims.Where(x => x.Type == "Expiration").FirstOrDefault();
                        var name = claims.Where(x => x.Type == ClaimTypes.Name).FirstOrDefault();
                        if (DateTime.Parse(exp.Value) > DateTime.Now)
                        {
                            var result = await _iuserregister.UserDetails(name.Value);
                            if(result != null)
                            {
                                return StatusCode(StatusCodes.Status200OK,  result );

                            }
                        }
                     
                    }
                }

            }
            return StatusCode(StatusCodes.Status401Unauthorized, new ErrorModel { Status = "Logged Out", Message = "Already User Is Loggrd Out" });
            
        }

        [HttpPost("ResendOTP")]
        public async Task<IActionResult> ResendOTP([FromBody]ResetEmail Email)
        {
            return StatusCode(StatusCodes.Status200OK, await _iuserregister.ResendOtp(Email.Email));
        }

    }
}
