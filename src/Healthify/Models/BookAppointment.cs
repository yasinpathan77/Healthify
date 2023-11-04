using System;
using System.ComponentModel.DataAnnotations;

namespace Healthify.Models
{
    public class BookAppointment
    {
        
        [Required]
        public int Id { get; set; }

        [Required]
        public string  Mode{ get; set; }

        [Required]
        public string Date { get; set; }

        [Required]
        public string Time { get; set; }

        [Required]
        public bool SomeOneElse { get; set; }

        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        public string Fname { get; set; }

        public string Lname { get; set; }

    }
}
