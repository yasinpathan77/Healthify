using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Healthify.Database
{
    public class Doctor_Table
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string UserId { get; set; }

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
        [MaxLength(10)]
        public int Pincode { get; set; }

        [Required]
        public string DoctorCertificate { get; set; }

        public int ExperienceInTotal { get; set; }

        public string Membership { get; set; }

        public string Education { get; set; }

        public string Specialization { get; set; }

        public string Awards { get; set; }

        public string Services { get; set; }

        public string Experience { get; set; }

        public string Registration { get; set; }

        public string Training { get; set; }

        public string ClinicName { get; set; }

        public string Description { get; set; }

        public int Price { get; set; }

        public string Schedule { get; set; }

        public string Meet { get; set; }

        public string GooglePay { get; set; }
    }
}
