using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Healthify.Database
{
    public class Schedule
    {
        [Required]
        public long Id { get; set; }

        [Required]
        public int DoctorId { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [Required]
        public string Mode { get; set; }

        [Required]
        public int Duration { get; set; }

        [Required]
        public TimeSpan StartTime { get; set; }

        [Required]
        public TimeSpan EndTime { get; set; }

        [Required]
        public TimeSpan Break1StartTime { get; set; }

        [Required]
        public TimeSpan Break1EndTime { get; set; }

        [Required]
        public TimeSpan Break2StartTime { get; set; }

        [Required]
        public TimeSpan Break2EndTime { get; set; }

        [Required]
        public bool Repeat { get; set; }

        [Required]
        public bool Sunday { get; set; }

        [Required]
        public bool Monday { get; set; }

        [Required]
        public bool Tuesday { get; set; }

        [Required]
        public bool Wednesday { get; set; }

        [Required]
        public bool Thursday { get; set; }

        [Required]
        public bool Friday { get; set; }

        [Required]
        public bool Saturday { get; set; }

    }
}
