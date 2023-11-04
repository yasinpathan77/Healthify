using System;
using System.ComponentModel.DataAnnotations;

namespace Healthify.Models
{
    public class AppointmentStartOtp
    {
        [Required]
        public int OtpValue { get; set; }

        [Required]
        public int Appointment_Id { get; set; }
    }
}
