using System;
using System.ComponentModel.DataAnnotations;

namespace Healthify.OutPutModel
{
    public class MedicalRecordsView_Model
    {

        [Required]
        public int Id { get; set; }

        [Required]
        public string Type { get; set; }

        [Required]
        public string Pathname { get; set; }

        [Required]
        public string Filename { get; set; }

        [Required]
        public string Date {get; set; }

        public string Time { get; set; }

        public string Fname { get; set; }

        public string Lname { get; set; }
    }
}
