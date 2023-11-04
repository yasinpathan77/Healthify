using System;
using System.ComponentModel.DataAnnotations;

namespace Healthify.Models
{
    public class DoctorMedicalShare
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public int[] Docs{ get; set; }
    }
}
