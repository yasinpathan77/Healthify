using System;
using System.ComponentModel.DataAnnotations;

namespace Healthify.Database
{
    public class SomeOneElse
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public int Appointment_Id { get; set; }

        [Required]
        public string Fname { get; set; }

        [Required]
        public string Lname { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
    }
}
