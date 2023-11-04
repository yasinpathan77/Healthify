using System;
using System.ComponentModel.DataAnnotations;

namespace Healthify.Database
{
    public class AppointmentOtp
    {
        [Required]
        public int ID { get; set; }

        [Required]
        public int Appointment_Id { get; set; }
        
        [Required]
        public int OtpValue { get; set; }

        [Required]
        public DateTime DateTime { get; set; }
    }
}
