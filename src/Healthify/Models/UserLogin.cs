﻿using System;
using System.ComponentModel.DataAnnotations;

namespace Healthify.Models
{
    public class UserLogin
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required]
        public bool Keep { get; set; }

    }
}
