using System;
using System.ComponentModel.DataAnnotations;

namespace Healthify.Database
{
    public class OtpModel
    {
        [Required]
        public int ID { get; set; }

        [Required]
        public string UserID { get; set; }

        [Required]
        public int OtpValue { get; set; }

        [Required]
        public DateTime DateTime { get; set; }
    }
}
