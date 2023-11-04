using System;
using System.ComponentModel.DataAnnotations;

namespace Healthify.Models
{
    public class ResetEmail
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
