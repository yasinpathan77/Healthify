using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Healthify.Models;
using Healthify.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Healthify.Controllers
{
    [Route("Appointment")]
    [ApiController]
    public class AppointmentController : Controller
    {
        private readonly IAppointmentService _appointmentService;

        public AppointmentController(IAppointmentService appointmentService)
        {
            _appointmentService = appointmentService;
        }

        [HttpPost("Booking")]
        public async Task<IActionResult> BookAppointment([FromBody]BookAppointment bookAppointment)
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
                    var result = await _appointmentService.BookAppointment(name.Value, bookAppointment);
                    if (result != null)
                    {
                        return StatusCode(StatusCodes.Status201Created, new ErrorModel { Status = "Okay", Message = result });
                    }
                }
            }
            return StatusCode(StatusCodes.Status400BadRequest, new ErrorModel { Status = "Error", Message = "Enter Valid Details" });
        }

        [HttpGet("AppointmentDetails")]
        public async Task<IActionResult> AppointmentDetails([FromQuery] int Appointment_ID)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity != null)
            {

                IEnumerable<Claim> claims = identity.Claims;
                if (claims.Count() != 0)
                {

                    var date = claims.Where(x => x.Type == "Expiration").FirstOrDefault();

                    if (Convert.ToDateTime(date.Value) < DateTime.Now)
                    {
                        return StatusCode(StatusCodes.Status400BadRequest, new ErrorModel { Status = "Logged Out", Message = "Already User Is Logged Out" });
                    }
                    var result = await _appointmentService.AppointmentDetails(Appointment_ID);
                    if (result != null)
                    {
                        return Ok(result);
                    }
                }
            }
            return StatusCode(StatusCodes.Status400BadRequest, new ErrorModel { Status = "Error", Message = "Enter Valid Details" });
        }

        [HttpGet("BookSlot")]
        public async Task<IActionResult> BookSlot([FromQuery] int Appointment_ID)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity != null)
            {

                IEnumerable<Claim> claims = identity.Claims;
                if (claims.Count() != 0)
                {

                    var date = claims.Where(x => x.Type == "Expiration").FirstOrDefault();

                    if (Convert.ToDateTime(date.Value) < DateTime.Now)
                    {
                        return StatusCode(StatusCodes.Status400BadRequest, new ErrorModel { Status = "Logged Out", Message = "Already User Is Logged Out" });
                    }
                    var result = await _appointmentService.BookSlot(Appointment_ID);
                    if (result != null)
                    {
                        return Ok(result);
                    }
                }
            }
            return StatusCode(StatusCodes.Status400BadRequest, new ErrorModel { Status = "Error", Message = "Enter Valid Details" });
        }

        [HttpPost("CheckoutDescription")]
        public async Task<IActionResult> Checkout([FromQuery] int Appointment_ID,[FromBody] CheckoutValid CheckoutValid)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity != null)
            {

                IEnumerable<Claim> claims = identity.Claims;
                if (claims.Count() != 0)
                {

                    var date = claims.Where(x => x.Type == "Expiration").FirstOrDefault();

                    if (Convert.ToDateTime(date.Value) < DateTime.Now)
                    {
                        return StatusCode(StatusCodes.Status400BadRequest, new ErrorModel { Status = "Logged Out", Message = "Already User Is Logged Out" });
                    }
                    var result = await _appointmentService.CheckoutValid(Appointment_ID,CheckoutValid);
                    if (result != null)
                    {
                        return StatusCode(StatusCodes.Status200OK, result);
                    }
                }
            }
            return StatusCode(StatusCodes.Status400BadRequest, new ErrorModel { Status = "Error", Message = "Enter Valid Details" });
        }

        [HttpGet("PaymentSuccessfull")]
        public async Task<IActionResult> PaymentSuccessfull([FromQuery]int Appointment_ID)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity != null)
            {

                IEnumerable<Claim> claims = identity.Claims;
                if (claims.Count() != 0)
                {

                    var date = claims.Where(x => x.Type == "Expiration").FirstOrDefault();

                    if (Convert.ToDateTime(date.Value) < DateTime.Now)
                    {
                        return StatusCode(StatusCodes.Status400BadRequest, new ErrorModel { Status = "Logged Out", Message = "Already User Is Logged Out" });
                    }
                    var result = await _appointmentService.PaymentSuccessfull(Appointment_ID);

                    if (result != null)
                    {
                        return StatusCode(StatusCodes.Status200OK,result);
                    }
                }
            }
            return StatusCode(StatusCodes.Status400BadRequest, new ErrorModel { Status = "Error", Message = "Enter Valid Details" });
        }

        [HttpGet("AppointmentMail")]
        public async Task<IActionResult> AppointmentDetailMail([FromQuery] int Appointment_ID)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity != null)
            {

                IEnumerable<Claim> claims = identity.Claims;
                if (claims.Count() != 0)
                {

                    var date = claims.Where(x => x.Type == "Expiration").FirstOrDefault();

                    if (Convert.ToDateTime(date.Value) < DateTime.Now)
                    {
                        return StatusCode(StatusCodes.Status400BadRequest, new ErrorModel { Status = "Logged Out", Message = "Already User Is Logged Out" });
                    }
                    var result = await _appointmentService.AppointmentMail(Appointment_ID);

                    if (result != null)
                    {
                        return StatusCode(StatusCodes.Status200OK, result);
                    }
                }
            }
            return StatusCode(StatusCodes.Status400BadRequest, new ErrorModel { Status = "Error", Message = "Enter Valid Details" });
        }

        [HttpPost("SendVoice")]
        public async Task<IActionResult> SendInvoice([FromForm]SendInvoiceMail sendInvoiceMail)
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
                        return StatusCode(StatusCodes.Status400BadRequest, new ErrorModel { Status = "Logged Out", Message = "Already User Is Logged Out" });
                    }
                    var result =  _appointmentService.SendInvoice(name.Value,sendInvoiceMail);

                    if (result != null)
                    {
                        return StatusCode(StatusCodes.Status200OK, result);
                    }
                }
            }
            return StatusCode(StatusCodes.Status400BadRequest, new ErrorModel { Status = "Error", Message = "Enter Valid Details" });
        }

        [HttpGet("PanelAppointmentDetails")]
        public async Task<IActionResult> AppointmentPanel([FromQuery] int Appointment_ID)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity != null)
            {

                IEnumerable<Claim> claims = identity.Claims;
                if (claims.Count() != 0)
                {

                    var date = claims.Where(x => x.Type == "Expiration").FirstOrDefault();

                    if (Convert.ToDateTime(date.Value) < DateTime.Now)
                    {
                        return StatusCode(StatusCodes.Status400BadRequest, new ErrorModel { Status = "Logged Out", Message = "Already User Is Logged Out" });
                    }
                    var result = await _appointmentService.PatientPanelAppointment(Appointment_ID);
                    if (result != null)
                    {
                        return Ok(result);
                    }
                }
            }
            return StatusCode(StatusCodes.Status400BadRequest, new ErrorModel { Status = "Error", Message = "Enter Valid Details" });
        }

        [HttpPost("AppointmentCancellation")]
        public async Task<IActionResult> SendInAppointmentCancel([FromBody] AppointmentCancellationModel appointmentCancellationModel)
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
                        return StatusCode(StatusCodes.Status400BadRequest, new ErrorModel { Status = "Logged Out", Message = "Already User Is Logged Out" });
                    }
                    var result = await _appointmentService.CancellationOfAppointment(name.Value, appointmentCancellationModel);


                    if (result != null)
                    {
                        return StatusCode(StatusCodes.Status200OK, result);
                    }
                }
            }
            return StatusCode(StatusCodes.Status400BadRequest, new ErrorModel { Status = "Error", Message = "Enter Valid Details" });
        }

        [HttpPost("FeedBackForAppointment")]
        public async Task<IActionResult> PatientFeedBack([FromBody] FeedbackfromPatient Feedback)
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
                        return StatusCode(StatusCodes.Status400BadRequest, new ErrorModel { Status = "Logged Out", Message = "Already User Is Logged Out" });
                    }

                    var result = await _appointmentService.PatientFeedBack(name.Value, Feedback);


                    if (result != null)
                    {
                        return StatusCode(StatusCodes.Status200OK, result);
                    }
                }
            }
            return StatusCode(StatusCodes.Status400BadRequest, new ErrorModel { Status = "Error", Message = "Enter Valid Details" });
        }

        [HttpGet("GetPatientFeedBack")]
        public async Task<IActionResult> GetPatientFeedback([FromQuery]int Doctor,int Page)
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
                        return StatusCode(StatusCodes.Status400BadRequest, new ErrorModel { Status = "Logged Out", Message = "Already User Is Logged Out" });
                    }

                    var result = await _appointmentService.FeedbackPanels(name.Value,Doctor,Page);


                    if (result != null)
                    {
                        return StatusCode(StatusCodes.Status200OK, result);
                    }
                }
            }
            return StatusCode(StatusCodes.Status400BadRequest, new ErrorModel { Status = "Error", Message = "Enter Valid Details" });
        }

        [HttpPost("AppointmentStarted")]
        public async Task<IActionResult> AppointmentStarted([FromBody] AppointmentStartOtp appointmentStartOtp)
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
                        return StatusCode(StatusCodes.Status400BadRequest, new ErrorModel { Status = "Logged Out", Message = "Already User Is Logged Out" });
                    }

                    var result = await _appointmentService.AppointmentSuccessfullOtp(appointmentStartOtp);


                    if (result != null)
                    {
                        return StatusCode(StatusCodes.Status200OK, result);
                    }
                }
            }
            return StatusCode(StatusCodes.Status400BadRequest, new ErrorModel { Status = "Error", Message = "Enter Valid Details" });
        }
    }
}
