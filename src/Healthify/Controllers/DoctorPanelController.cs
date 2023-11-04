using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Healthify.Models;
using Healthify.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Healthify.Controllers
{
    [ApiController]
    [Route("Doctor")]
    public class DoctorPanelController : Controller
    {
        private readonly IDoctorPanel _doctorPanel;

        public DoctorPanelController(IDoctorPanel doctorPanel)
        {
            _doctorPanel = doctorPanel;
        }

        //[HttpGet("GetNextMonths")]
        //public IActionResult GetNextMonth([FromQuery] string FromDate, [FromQuery] int add)
        //{
        //    var date = DateTime.Parse(FromDate);

        //    return Ok(_doctorPanel.GetNextMonth(date, add));
        //}

        //[HttpGet("GetNextWeeks")]
        //public IActionResult GetNextWeeks([FromQuery] string FromDate, [FromQuery] int add)
        //{
        //    var date = DateTime.Parse(FromDate);

        //    return Ok(_doctorPanel.GetNextWeek(date, add));
        //}

        //[HttpGet("GetToday")]
        //public IActionResult GetToday()
        //{
        //    return Ok(_doctorPanel.GetToday());
        //}

        [HttpPost("CreateSchedule")]
        public async Task<IActionResult> CreateScheduleAsync([FromBody] ScheduleModel model)
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

                        if (DateTime.Parse(exp.Value) < DateTime.Now) 
                        {
                            return StatusCode(StatusCodes.Status400BadRequest, new ErrorModel { Status = "Logged Out", Message = "Already User Is Logged Out" });
                        }

                        return StatusCode(StatusCodes.Status201Created, await _doctorPanel.Createschedule(model, name.Value));
                    }
                }

            }
            return StatusCode(StatusCodes.Status500InternalServerError, new ErrorModel { Status = "Error", Message = "Enter Valid Details" });

        }

        [HttpGet("GetSlots")]
        public async Task<IActionResult> GEtSLotAsync([FromQuery] string Date, [FromQuery] int Month,[FromQuery]int Week,[FromQuery] string Mode)
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
                            return StatusCode(StatusCodes.Status400BadRequest, new ErrorModel { Status = "Logged Out", Message = "Already User Is Logged IN" });
                        }

                        return Ok(await _doctorPanel.GetSlots(Date, name.Value,Month,Week, Mode));
                    }
                }

            }
            return StatusCode(StatusCodes.Status500InternalServerError, new ErrorModel { Status = "Error", Message = "Enter Valid Details" });

        }

        [HttpGet("GetTime")]
        public IActionResult EndTime([FromQuery] string starttime, [FromQuery] string endtime, [FromQuery] int duration)
        {
            List<string> time = new List<string>();
            DateTime totime;
            if (endtime == null)
            {
                totime = DateTime.Parse("11:59 PM");
            }
            else
            {
                totime = DateTime.Parse(endtime);
            }
            if (starttime == null)
            {
                starttime = "12:00 AM";
            }
            var thistime = DateTime.Parse(starttime);
            while (DateTime.Compare(thistime, totime) < 0)
            {
                time.Add(thistime.ToString("hh:mm tt"));
                thistime = thistime.AddMinutes(duration);
                
            }

            return Ok(time);
        }

        //[Authorize(Roles = "Doctor")]
        [HttpDelete("DeleteSchedule")]
        public async Task<IActionResult> DeleteSchedule([FromQuery] long Id)
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
                            return StatusCode(StatusCodes.Status400BadRequest, new ErrorModel { Status = "Logged Out", Message = "Already User Is Logged IN" });
                        }

                        return Ok(await _doctorPanel.DeleteSchedule(Id, name.Value));
                    }
                }

            }
            return StatusCode(StatusCodes.Status500InternalServerError, new ErrorModel { Status = "Error", Message = "Enter Valid Details" });

        }

        [HttpGet("GetSchedule")]
        public async Task<IActionResult> GetSchedule([FromQuery] string Date,[FromQuery] string mode, int Month, int Week)
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
                            return StatusCode(StatusCodes.Status400BadRequest, new ErrorModel { Status = "Logged Out", Message = "Already User Is Logged IN" });
                        }

                        return Ok(await _doctorPanel.GetSchedule(name.Value,Date,mode,Month,Week));
                    }
                }

            }
            return StatusCode(StatusCodes.Status500InternalServerError, new ErrorModel { Status = "Error", Message = "Enter Valid Details" });

        }

        [HttpGet("PatientRecord")]
        public async Task<IActionResult> PatientRecord()
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
                            return StatusCode(StatusCodes.Status400BadRequest, new ErrorModel { Status = "Logged Out", Message = "Already User Is Logged IN" });
                        }

                        return Ok(await _doctorPanel.MedicalRecordsView_(name.Value));
                    }
                }

            }
            return StatusCode(StatusCodes.Status500InternalServerError, new ErrorModel { Status = "Error", Message = "Enter Valid Details" });

        }
    }
}
