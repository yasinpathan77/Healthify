using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Healthify.Models;
using Healthify.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;


namespace Healthify.Controllers
{
    [ApiController]
    public class DoctorController : Controller
    {
        private readonly IFilesService _filesService;
        private readonly IDoctorRegistration _doctorRegistration;

        public DoctorController(IFilesService filesService, IDoctorRegistration doctorRegistration)
        {
            _filesService = filesService;
            _doctorRegistration = doctorRegistration;
        }

        //[Authorize(Roles = "User,Patient,Doctor")]
        [HttpPost("User/image")]
        public async Task<IActionResult> UploadImageAsync([FromForm] FilesClass files)
        {
            if (ModelState.IsValid)
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;

                if (identity != null)
                {
                    IEnumerable<Claim> claims = identity.Claims;
                    if (claims.Count() != 0)
                    {
                        var date = claims.Where(x => x.Type == "Expiration").FirstOrDefault();
                        var name = claims.Where(x => x.Type == ClaimTypes.Name).FirstOrDefault();
                        if (Convert.ToDateTime(date.Value) < DateTime.Now)
                        {
                            return StatusCode(StatusCodes.Status401Unauthorized, new ErrorModel { Status = "Logged Out", Message = "Already User Is Not Logged IN" });
                        }

                        var result = await _filesService.UploadImageAsync(files, name.Value.ToString());
                        if (result != null)
                        {
                            return StatusCode(StatusCodes.Status201Created, new ErrorModel { Status = "Photo Uploaded", Message = "Image was created" });

                        }
                    }
                }
            }
            return StatusCode(StatusCodes.Status400BadRequest, new ErrorModel { Status = "Error", Message = files.ToString() });
        }

        //[Authorize(Roles = "User,Patient")]
        [HttpPost("Doctor/Details/this")]
        public async Task<IActionResult> CreateDoctorAsync([FromForm] DoctorModel doctor)
        {
            if (ModelState.IsValid)
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;

                if (identity != null)
                {
                    IEnumerable<Claim> claims = identity.Claims;
                    if (claims.Count() != 0)
                    {
                        var date = claims.Where(x => x.Type == "Expiration").FirstOrDefault();
                        var name = claims.Where(x => x.Type == ClaimTypes.Name).FirstOrDefault();
                        if (Convert.ToDateTime(date.Value) < DateTime.Now)
                        {
                            return StatusCode(StatusCodes.Status401Unauthorized, new ErrorModel { Status = "Logged Out", Message = "Already User Is Not Logged IN" });
                        }

                        var result = await _doctorRegistration.CreateDoctorPermissionAsync(doctor,name.Value.ToString());

                        if (result != null)
                        {
                            return StatusCode(StatusCodes.Status201Created, new ErrorModel { Status = "Doctor Details Uploaded", Message = result.ToString() });

                        }
                    }
                }
            }
            return StatusCode(StatusCodes.Status400BadRequest, new ErrorModel { Status = "Error", Message = doctor.ToString() });
        }


    }
}
