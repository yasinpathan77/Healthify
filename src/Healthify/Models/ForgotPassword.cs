using System;
using System.ComponentModel.DataAnnotations;

namespace Healthify.Models
{
    public class ForgotPassword
    {
        [Required]
        [DataType(DataType.Password)]
        [Compare("ConfirmPassword")]
        public string Password { get; set; }

        [Required]
        public string ConfirmPassword { get; set; }

    }
}
