using System;
using System.ComponentModel.DataAnnotations;

namespace Healthify.Database
{
    public class FeedBAck
    {
        [Required]
        public int Id { get; set; }
        [Required]

        public int Appointment_Id { get; set; }
        [Required]

        public string Experience { get; set; }

        public string Message { get; set; }

        [Required]
        public bool Feedback_By { get; set; }
    }
}
