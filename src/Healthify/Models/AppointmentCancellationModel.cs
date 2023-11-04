using System;
using System.ComponentModel.DataAnnotations;

namespace Healthify.Models
{
    public class AppointmentCancellationModel
    {
        [Required]
        public string Reason { get; set; }
        [Required]

        public int Appointment_Id { get; set; }
    }
}
