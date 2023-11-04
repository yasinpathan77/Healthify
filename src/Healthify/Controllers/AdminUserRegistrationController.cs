using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Healthify.Models;
using Healthify.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;


namespace Healthify.Controllers
{
    //[Authorize(Roles = "Admin")]
    [ApiController]
    [Route("Admin")]
    public class AdminUserRegistrationController : Controller
    {
        private readonly IAdminUser _adminUser;

        public AdminUserRegistrationController(IAdminUser adminUser)
        {
            _adminUser = adminUser;
        }

        [HttpPost("Role")]
        public async Task<IActionResult> CreateRole([FromBody] RoleModel roleModel)
        {
            var result = await _adminUser.CreateRole(roleModel);

            return Ok(result);
        }

        [HttpGet("Data")]
        public async Task<IActionResult> GetUser()
        {
            var result = await _adminUser.GetDataAsync();

            return Ok(result);
        }

        [HttpGet("Role")]
        public async Task<IActionResult> GetUserAsync()
        {
            var result = await _adminUser.GetUserRoleAsync();

            return Ok(result);
        }

        [HttpGet("Delete")]
        public async Task<IActionResult> DeleteUser([FromForm] UserLogin user)
        {
            var result = await _adminUser.DeletUserAsync(user);

            return Ok(result);
        }

        [HttpGet("Doctor")]
        public async Task<IActionResult> GetDoctor()
        {
            var result = await _adminUser.GetDoctors();

            return Ok(result);
        }

        [HttpPost("DoctorVerification")]
        public async Task<IActionResult> VerifyDoctor([FromBody] DoctorVerify doctor)
        {
            var result = await _adminUser.VerifyDoctorAsync(doctor);

            return Ok(result);
        }

        [HttpPatch("DoctorDetails")]
        public async Task<IActionResult> UpdateDoctor([FromQuery] int id, [FromBody] JsonPatchDocument jsonPatchDocument)
        {
            var result = await _adminUser.UpdateDoctor(id, jsonPatchDocument);

            return Ok(result);
        }

        [HttpDelete("AppointmentDelete")]
        public async Task<IActionResult> DeleteAppointment([FromQuery] int id)
        {
            var result = await _adminUser.DeleteAppointment(id);

            return Ok(result);
        }

        [HttpDelete("PaymentDelete")]
        public async Task<IActionResult> PsymentDelete([FromQuery] int id)
        {
            var result = await _adminUser.DatletePayment(id);

            return Ok(result);
        }

        [HttpPost("CreateAdmin")]
        public async Task<IActionResult> PsymentDelete([FromBody] TablesID id)
        {
            var result = await _adminUser.AddAdmin(id.User_Id);

            return Ok(result);
        }

        [HttpGet("AppointmentData")]
        public async Task<IActionResult> Appointment()
        {
            var result = await _adminUser.Appointments();

            return Ok(result);
        }

        [HttpGet("Doctors")]
        public IActionResult Doctors()
        {
            var result = _adminUser.Doctors();

            return Ok(result);
        }

        [HttpGet("Request")]
        public async Task<IActionResult> ReqDoctor()
        {
            var result = await _adminUser.RequestDoctors();

            return Ok(result);
        }

        [HttpGet("Patients")]
        public IActionResult Patients()
        {
            var result = _adminUser.GetPatients();

            return Ok(result);
        }

        [HttpGet("UserDetail")]
        public async Task<IActionResult> User([FromQuery] string id)
        {
            var result = await _adminUser.User(id);

            return Ok(result);
        }

        [HttpPatch("UserUpdate")]
        public async Task<IActionResult> UpdateUser([FromQuery] string id, [FromBody] JsonPatchDocument jsonPatchDocument)
        {
            var result = await _adminUser.UpdateUser(id, jsonPatchDocument);

            return Ok(result);
        }

        [HttpGet("DoctorThis")]
        public async Task<IActionResult> DoctorThis([FromQuery] int id)
        {
            var result = await _adminUser.Doctorthis(id);

            return Ok(result);
        }

        [HttpPost("PaymentDoctor")]
        public async Task<IActionResult> PaymentDoctor([FromBody] DocPayment docPayment)
        {
            var result = await _adminUser.PaymentDoc(docPayment);

            if (result != null)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [HttpGet("PaymentDoctor")]
        public IActionResult PaymentDoctor()
        {
            var result = _adminUser.PaymentDoctor();

            return Ok(result);
        }

        [HttpGet("Refund")]
        public async Task<IActionResult> Refund([FromQuery] int id)
        {
            var result = await _adminUser.Refund(id);

            if (result != null)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [HttpGet("Stats")]
        public async Task<IActionResult> Stats()
        {
            var result = await _adminUser.Stats_Data();

            if (result != null)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }
    }
}
