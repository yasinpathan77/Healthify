using System;
using System.ComponentModel.DataAnnotations;

namespace Healthify.Models
{
    public class DocPayment
    {
        [Required]
        public int Appointment_Id { get; set; }
    }
}
