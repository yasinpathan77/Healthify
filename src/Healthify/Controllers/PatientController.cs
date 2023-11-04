using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Healthify.Models;
using Healthify.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Healthify.Controllers
{
    [ApiController]
    [Route("Patient")]
    public class PatientController : Controller
    {
        private readonly IUserPanelInterface _userPanelInterface;

        public PatientController(IUserPanelInterface userPanelInterface)
        {
            _userPanelInterface = userPanelInterface;
            
        }

        [HttpGet("GetProfile")]
        public async Task<IActionResult> GetProfile()
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
                        var exp = claims.Where(x => x.Type == "Expiration").FirstOrDefault();

                        if (Convert.ToDateTime(exp.Value) < DateTime.Now)
                        {
                            return StatusCode(StatusCodes.Status400BadRequest, new ErrorModel { Status = "Logged Out", Message = "Already User Is Logged Out" });
                        }
                        return Ok(await _userPanelInterface.GetProfile(name.Value));
                    }
                }

            }
            return StatusCode(StatusCodes.Status500InternalServerError, new ErrorModel { Status = "Error", Message = "Enter Valid Details" });

        }

        [HttpPatch("EditProfile")]
        public async Task<IActionResult> UpdateDoctor([FromBody] JsonPatchDocument jsonPatchDocument)
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
                        var exp = claims.Where(x => x.Type == "Expiration").FirstOrDefault();

                        if (Convert.ToDateTime(exp.Value) < DateTime.Now)
                        {
                            return StatusCode(StatusCodes.Status400BadRequest, new ErrorModel { Status = "Logged Out", Message = "Already User Is Logged Out" });
                        }
                        return Ok(await _userPanelInterface.EditProfile(name.Value,jsonPatchDocument));
                    }
                }

            }
            return StatusCode(StatusCodes.Status500InternalServerError, new ErrorModel { Status = "Error", Message = "Enter Valid Details" });

        }

        [HttpGet("GetAppointment")]
        public async Task<IActionResult> GetProfile([FromQuery] int Doctor,int Upcoming,int Page)
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
                        var exp = claims.Where(x => x.Type == "Expiration").FirstOrDefault();

                        if (Convert.ToDateTime(exp.Value) < DateTime.Now)
                        {
                            return StatusCode(StatusCodes.Status400BadRequest, new ErrorModel { Status = "Logged Out", Message = "Already User Is Logged Out" });
                        }
                        return Ok(await _userPanelInterface.GetAppointmentPanel(name.Value ,Doctor,Upcoming,Page));
                    }
                }

            }
            return StatusCode(StatusCodes.Status500InternalServerError, new ErrorModel { Status = "Error", Message = "Enter Valid Details" });

        }

        [HttpGet("GetPayments")]
        public async Task<IActionResult> GetPayments([FromQuery] int Doctor, int Page)
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
                        var exp = claims.Where(x => x.Type == "Expiration").FirstOrDefault();

                        if (Convert.ToDateTime(exp.Value) < DateTime.Now)
                        {
                            return StatusCode(StatusCodes.Status400BadRequest, new ErrorModel { Status = "Logged Out", Message = "Already User Is Logged Out" });
                        }
                        return Ok(await _userPanelInterface.GetPayments(name.Value, Doctor,  Page));
                    }
                }

            }
            return StatusCode(StatusCodes.Status500InternalServerError, new ErrorModel { Status = "Error", Message = "Enter Valid Details" });

        }

        [HttpPost("MedicalRecords")]
        public async Task<IActionResult> UploadMedicalRecords([FromForm]UploadMedicalRecords uploadMedicalRecords)
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
                        var exp = claims.Where(x => x.Type == "Expiration").FirstOrDefault();

                        if (Convert.ToDateTime(exp.Value) < DateTime.Now)
                        {
                            return StatusCode(StatusCodes.Status400BadRequest, new ErrorModel { Status = "Logged Out", Message = "Already User Is Logged Out" });
                        }
                        var result = await _userPanelInterface.UploadMedical(name.Value, uploadMedicalRecords);
                        if (result == null)
                        {
                            return StatusCode(StatusCodes.Status201Created, result);
                        }
                        return StatusCode(StatusCodes.Status200OK, result);
                    }
                }

            }
            return StatusCode(StatusCodes.Status500InternalServerError, new ErrorModel { Status = "Error", Message = "Enter Valid Details" });

        }

        [HttpDelete("DeleteRecords")]
        public async Task<IActionResult> DeleteMedicalRecords([FromBody] MedicalRecordDelete medicalRecordDelete)
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
                        var exp = claims.Where(x => x.Type == "Expiration").FirstOrDefault();

                        if (Convert.ToDateTime(exp.Value) < DateTime.Now)
                        {
                            return StatusCode(StatusCodes.Status400BadRequest, new ErrorModel { Status = "Logged Out", Message = "Already User Is Logged Out" });
                        }
                        var result = await _userPanelInterface.DeleteMedicalRecord(name.Value, medicalRecordDelete.Id);
                        if (result == "Okay")
                        {
                            return StatusCode(StatusCodes.Status200OK, result);
                        }
                    }
                }

            }
            return StatusCode(StatusCodes.Status500InternalServerError, new ErrorModel { Status = "Error", Message = "Enter Valid Details" });

        }

        [HttpGet("MedicalRecords")]
        public async Task<IActionResult> GetMedicalRecords()
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
                        var exp = claims.Where(x => x.Type == "Expiration").FirstOrDefault();

                        if (Convert.ToDateTime(exp.Value) < DateTime.Now)
                        {
                            return StatusCode(StatusCodes.Status400BadRequest, new ErrorModel { Status = "Logged Out", Message = "Already User Is Logged Out" });
                        }
                        var result = await _userPanelInterface.MedicalRecordsView_Models(name.Value);
                        if (result != null)
                        {
                            return StatusCode(StatusCodes.Status200OK, result);
                        }
                    }
                }

            }
            return StatusCode(StatusCodes.Status400BadRequest, new ErrorModel { Status = "Error", Message = "Enter Valid Details" });
        }

        [HttpGet("GetPatientDoctor")]
        public async Task<IActionResult> GetPatientDoctor()
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
                        var exp = claims.Where(x => x.Type == "Expiration").FirstOrDefault();

                        if (Convert.ToDateTime(exp.Value) < DateTime.Now)
                        {
                            return StatusCode(StatusCodes.Status400BadRequest, new ErrorModel { Status = "Logged Out", Message = "Already User Is Logged Out" });
                        }
                        var result = await _userPanelInterface.PatientsDoctor(name.Value);
                        if (result != null)
                        {
                            return StatusCode(StatusCodes.Status200OK, result);
                        }
                    }
                }

            }
            return StatusCode(StatusCodes.Status400BadRequest, new ErrorModel { Status = "Error", Message = "Enter Valid Details" });
        }

        [HttpPost("ShareWithDoctor")]
        public async Task<IActionResult> ShareWithDoctor([FromBody]DoctorMedicalShare DoctorMedicalShare)
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
                        var exp = claims.Where(x => x.Type == "Expiration").FirstOrDefault();

                        if (Convert.ToDateTime(exp.Value) < DateTime.Now)
                        {
                            return StatusCode(StatusCodes.Status400BadRequest, new ErrorModel { Status = "Logged Out", Message = "Already User Is Logged Out" });
                        }
                        var result = await _userPanelInterface.SharewithDoctor(name.Value,DoctorMedicalShare);
                        if (result == "Okay")
                        {
                            return StatusCode(StatusCodes.Status200OK, result);
                        }
                    }
                }
            }
            return StatusCode(StatusCodes.Status400BadRequest, new ErrorModel { Status = "Error", Message = "Enter Valid Details" });
        }


    }
}
