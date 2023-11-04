using System;
using System.ComponentModel.DataAnnotations;

namespace Healthify.Database
{
    public class Refund
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public int Appointment_Id { get; set; }

        [Required]
        public string Reason { get; set; }

        [Required]
        public string Person { get; set; }

        [Required]
        public DateTime Dt_Rf_Applied { get; set; }

        public DateTime Dt_Refunded { get; set; }

        public int AmountRefunded { get; set; }

    }
}
