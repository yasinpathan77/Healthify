using System;
using System.ComponentModel.DataAnnotations;

namespace Healthify.Models
{
    public class OtpClass
    {
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public int OtpData { get; set; }
    }
}
