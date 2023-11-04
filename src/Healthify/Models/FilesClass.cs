using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace Healthify.Models
{
    public class FilesClass
    {
        [Required]
        public IFormFile File { get; set; }
    }
}
