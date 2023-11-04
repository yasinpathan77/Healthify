using System;
using System.ComponentModel.DataAnnotations;

namespace Healthify.Database
{
    public class PatientRecorddsDoctor 
    {
        [Required]
        public long Id { get; set; }

        [Required]
        public int MedicalRecord_Id { get; set; }

        [Required]
        public int Doctor_Id { get; set; }
    }
}
