using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Healthify.Database
{
    public class Appointment
    {
        [Required]
        public int  Id { get; set; }

        [Required]
        public long SlotId { get; set; }

        [Required]
        public string Order_Id { get; set; }

        [Required]
        public string UserId { get; set; }

        public bool Payment { get; set; }

        public bool Canceled { get; set; }

        public bool Completed { get; set; }

        [Required]
        public DateTime DateTime { get; set; }

    }
}
