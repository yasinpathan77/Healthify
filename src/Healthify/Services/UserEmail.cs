using System;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;
using Healthify.Database;
using Healthify.Models;
using Microsoft.EntityFrameworkCore;

namespace Healthify.Services
{
    public class UserEmail : IUserEmail
    {
        
        private readonly HealthifyDbContext _context;
        

        public UserEmail(HealthifyDbContext context)
        {
            _context = context;
          

        }
        public string SendOTP(string mail,string subject,string body)
        {
            try
            {
                var smtp = new SmtpClient
                {
                    Host = "smtp.gmail.com",
                    Port = 587,
                    EnableSsl = true,
                    Credentials = new System.Net.NetworkCredential("healthify.contactus@gmail.com", "hstusfwilkmjugxx")
                };

                MailMessage ma = new MailMessage();

                ma.To.Add(mail);
                ma.Subject = subject;
                ma.Body = body;
                ma.From = new MailAddress("Healthify <healthify.contactus@gmail.com>");
              


                smtp.Send(ma);

                return null;
            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }

        public async Task<int> GetOTPAsync(string Id)
        {
            var otp = new Random();

            var verotp = otp.Next(100000, 999999);

            var result = await _context.Otp_Datatbl.Where(x => x.UserID == Id).FirstOrDefaultAsync();

            if (result != null)
            {

                _context.Otp_Datatbl.Remove(result);

                await _context.SaveChangesAsync();

            }

            OtpModel model = new OtpModel()
            {
                UserID = Id,
                OtpValue = verotp,
                DateTime = DateTime.Now
            };

            await _context.Otp_Datatbl.AddAsync(model);

            await _context.SaveChangesAsync();

            return verotp;
        }

        public async Task<bool> CheckOTPAsync(string name, OtpClass varotp)
        {
            var user = await _context.Users.Where(x => x.UserName == name).Select(x => x.Id).FirstAsync();
            var otp = await _context.Otp_Datatbl.Where(x => x.UserID == user).FirstAsync();

            if (otp.DateTime.AddHours(2) > DateTime.Now)
            {
                if (otp.OtpValue == varotp.OtpData)
                {
                    _context.Otp_Datatbl.Remove(otp);
                    await _context.SaveChangesAsync();
                    return true;
                }
            }


            return false;
        }

        public async Task<int> AppointmentOtp(int Id)
        {
            var otp = new Random();

            var verotp = otp.Next(100000, 999999);

            AppointmentOtp appointmentOtp = new AppointmentOtp()
            {
                Appointment_Id = Id,
                OtpValue = verotp

            };

            await _context.AppointmentOtp_Tbl.AddAsync(appointmentOtp);
            await _context.SaveChangesAsync();

            return verotp;
        }

        public string SendInvoice(string mail, string subject, string body)
        {
            try
            {
                var smtp = new SmtpClient
                {
                    Host = "smtp.gmail.com",
                    Port = 587,
                    EnableSsl = true,
                   
                    Credentials = new System.Net.NetworkCredential("healthify.contactus@gmail.com", "hstusfwilkmjugxx")
                };

                MailMessage ma = new MailMessage();

                ma.To.Add(mail);
                ma.Subject = subject;
                ma.Body = body;
                
                ma.IsBodyHtml = true;
                
                ma.From = new MailAddress("Healthify <healthify.contactus@gmail.com>");



                smtp.Send(ma);

                return "Okay";
            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }
    }
}
