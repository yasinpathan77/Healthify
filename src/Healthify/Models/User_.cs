using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace Healthify.Models
{
    public class User_ : IdentityUser
    {
        [Required(ErrorMessage = "Please Enter First Name.")]
        public string Fname { get; set; }


        [Required(ErrorMessage = "Please Enter Last Name.")]
        public string Lname { get; set; }

        public DateTime BirthDate { get; set; }

        public string Gender { get; set; }

        public string ProfilePicture { get; set; }

        public string BloodGroup { get; set; }

        public string HouseNumber { get; set; }

        public string Street { get; set; }

        public string Country { get; set; }

        public string State { get; set; }

        public string City { get; set; }

        public int Pincode { get; set; }
    }
}
