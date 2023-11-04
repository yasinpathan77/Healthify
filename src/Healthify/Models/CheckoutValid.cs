using System;
using System.ComponentModel.DataAnnotations;

namespace Healthify.Models
{
    public class CheckoutValid
    {
        [Required]
        public string razorpay_payment_id { get; set; }

        [Required]
        public string razorpay_order_id { get; set; }

        [Required]
        public string razorpay_signature { get; set; }

    }
}
