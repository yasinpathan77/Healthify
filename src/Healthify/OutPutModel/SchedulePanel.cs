using System;
using System.ComponentModel.DataAnnotations;

namespace Healthify.OutPutModel
{
    public class SchedulePanel
    {
        [Required]
        public long Id { get; set; }

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
