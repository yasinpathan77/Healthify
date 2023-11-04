using System;
using System.ComponentModel.DataAnnotations;

namespace Healthify.Models
{
    public class ScheduleModel
    {

        [Required]
        public string StartDate { get; set; }
         
        [Required]
        public string Mode { get; set; }

        [Required]
        public int Duration { get; set; }

        [Required]
        public string StartTime { get; set; }

        [Required]
        public string EndTime { get; set; }

        
        public string Break1StartTime { get; set; }

        
        public string Break1EndTime { get; set; }

     
        public string Break2StartTime { get; set; }

        
        public string Break2EndTime { get; set; }

        [Required]
        public string Repeat { get; set; }

        [Required]
        public string Sunday { get; set; }

        [Required]
        public string Monday { get; set; }

        [Required]
        public string Tuesday { get; set; }

        [Required]
        public string Wednesday { get; set; }

        [Required]
        public string Thursday { get; set; }

        [Required]
        public string Friday { get; set; }

        [Required]
        public string Saturday { get; set; }

    }
}
