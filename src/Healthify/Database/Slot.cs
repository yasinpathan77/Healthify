using System;
using System.ComponentModel.DataAnnotations;

namespace Healthify.Database
{
    public class Slot
    {
        [Required]
        public long Id { get; set; }

        [Required]
        public long ScheduleId { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public TimeSpan Time { get; set; }

        [Required]
        public int Value { get; set; }
    }
}
