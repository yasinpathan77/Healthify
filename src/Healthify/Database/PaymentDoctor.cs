using System;
using System.ComponentModel.DataAnnotations;

namespace Healthify.Database
{
    public class PaymentDoctor
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public int Appointment_Id { get; set; }

        [Required]
        public DateTime Date_Paid  { get; set; }

        [Required]
        public float Amount{ get; set; }


    }
}
