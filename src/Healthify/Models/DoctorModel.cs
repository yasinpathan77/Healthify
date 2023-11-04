using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace Healthify.Models
{
    public class DoctorModel
    {
        
        [Required]
        public IFormFile ProfilePicture { get; set; }

        [Required]
        public string Fname { get; set; }

        [Required]
        public string Lname { get; set; }

        [Required]
        public DateTime BirthDate { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        [MaxLength(30)]
        public string Speciality { get; set; }

        [Required]
        public string ClinicNumber { get; set; }

        [Required]
        [MaxLength(5)]
        public string RoomNumber { get; set; }

        [Required]
        [MaxLength(30)]
        public string Street { get; set; }

        [Required]
        [MaxLength(30)]
        public string Country { get; set; }

        [Required]
        [MaxLength(30)]
        public string State { get; set; }

        [Required]
        [MaxLength(30)]
        public string City { get; set; }

        [Required]
        public int Pincode { get; set; }

        [Required]
        public IFormFile DoctorCertificate { get; set; }

    }
}
