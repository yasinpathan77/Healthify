using System;
using System.ComponentModel.DataAnnotations;

namespace Healthify.Models
{
    public class SendInvoiceMail
    {
        [Required]
        public string Body { get; set; }
    }
}
