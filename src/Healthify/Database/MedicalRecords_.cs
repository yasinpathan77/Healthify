using System;
using System.ComponentModel.DataAnnotations;

namespace Healthify.Database
{
    public class MedicalRecords_
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

        public string Extension { get; set; }

        [Required]

        public DateTime DateTime_Uploaded { get; set; }

        [Required]

        public string User_Id { get; set; }

    }
}
