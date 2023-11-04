using System;
using System.ComponentModel.DataAnnotations;

namespace Healthify.Database
{
    public class Payment_SuccessFull
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public int Appointment_Id { get; set; }

        [Required]
        public string razorpay_payment_id { get; set; }

        [Required]
        public string razorpay_order_id { get; set; }

        [Required]
        public string razorpay_signature { get; set; }
    }
}
