using System;
using System.ComponentModel.DataAnnotations;

namespace Healthify.Models
{
    public class FeedbackfromPatient
    {
        [Required]
        public string Experience { get; set; }

        public string Message { get; set; }

        [Required]
        public int  Appointment_Id { get; set; }
    }
}
