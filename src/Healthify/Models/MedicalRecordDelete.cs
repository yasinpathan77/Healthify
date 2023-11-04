using System;
using System.ComponentModel.DataAnnotations;

namespace Healthify.Models
{
    public class MedicalRecordDelete
    {
        [Required]
        public int Id { get; set; }
    }
}
