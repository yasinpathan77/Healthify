using System.ComponentModel.DataAnnotations;

namespace Healthify.Models
{
    public class UserRegisterModel
    {
        [Required]
        public int ID { get; set; }

        [Required(ErrorMessage = "Please Enter First Name.")]
        public string Fname { get; set; }


        [Required(ErrorMessage = "Please Enter Last Name.")]
        public string Lname { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Compare("ConfirmPassword")]
        public string Password { get; set; }

        [Required]
        public string ConfirmPassword { get; set; }
        

    }
}
