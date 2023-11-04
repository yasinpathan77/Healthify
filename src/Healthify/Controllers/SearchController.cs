using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Healthify.Models;
using Healthify.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace Healthify.Controllers
{
    [ApiController]
    [Route("Search")]
    public class SearchController : Controller
    {
        private readonly ISearchEngine _searchEngine;

        public SearchController(ISearchEngine searchEngine)
        {
            _searchEngine = searchEngine;
        }

        [HttpGet("FindDoctor")]
        public async Task<IActionResult> FindAllDoctor([FromQuery] int page, string speciality, bool videoconsult, int problem)
        {
            return Ok(await _searchEngine.FindAllDoctorAsync(page,speciality,videoconsult,problem));
        }

        [HttpGet("SearchBar")]
        public async Task<IActionResult> SearchBar([FromQuery] string name)
        {
            return Ok(await _searchEngine.SearchBar(name));
        }

        [HttpGet("DoctorDetails")]
        public async Task<IActionResult> DoctorDetails([FromQuery] int DoctorId)
        {
            return Ok(await _searchEngine.DoctorDetails(DoctorId));
        }

        [HttpGet("DoctorSlots")]
        public async Task<IActionResult> DoctorSlots([FromQuery] int DoctorId,[FromQuery] string body)
        {
            return Ok(await _searchEngine.DoctorSlots(DoctorId,body));
        }

        [HttpGet("DoctorAppointment")]
        public async Task<IActionResult> DoctorAppointmentDetails([FromQuery] int id,string mode,string date,string time)
        {
            return Ok(await _searchEngine.DoctorPatient(id,mode,date,time));
        }

    }
}
