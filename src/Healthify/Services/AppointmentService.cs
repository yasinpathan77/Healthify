using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Healthify.Database;
using Healthify.Models;
using Healthify.OutPutModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Razorpay.Api;

namespace Healthify.Services
{
    public class AppointmentService : IAppointmentService
    {
        private readonly IMapper _imapper;
        private readonly UserManager<User_> _userManager;
        private readonly HealthifyDbContext _context;
        private readonly IUserEmail _userEmail;

        public AppointmentService(IMapper imapper, UserManager<User_> userManager, HealthifyDbContext context,IUserEmail userEmail)
        {
            _imapper = imapper;
            _userManager = userManager;
            _context = context;
            _userEmail = userEmail;
        }

        public async Task<IQueryable<AppointmentDetails>> AppointmentDetails(int Appointment_ID)
        {

            var someonelse = await _context.SomeOneElse_Tbl.Where(x => x.Appointment_Id == Appointment_ID).FirstOrDefaultAsync();
            if (someonelse == null)
            {
                var query = from a in _context.Appointment_Tbl.Where(x => x.Id == Appointment_ID)
                            join u in _context.Users on a.UserId equals u.Id
                            join s in _context.Slot_Tbl on a.SlotId equals s.Id
                            join sh in _context.Schedule_Tbl on s.ScheduleId equals sh.Id
                            join d in _context.Doctor_Tbl on sh.DoctorId equals d.Id
                            join u2 in _context.Users on d.UserId equals u2.Id
                            select new AppointmentDetails
                            {
                                Date = a.DateTime.Date.ToString(),
                                Email = u.Email,
                                App_Date = s.Date.ToString("ddd dd, MMM yyyy"),
                                App_Time = DateTime.Parse(s.Time.ToString()).ToString("hh : mm tt"),
                                Order_ID = a.Order_Id,
                                Appointment_ID = a.Id,
                                Mode = sh.Mode,
                                FName = u.Fname,
                                Lname = u.Lname,
                                Doc_Fname = u2.Fname,
                                Doc_Lname = u2.Lname,
                                Price = d.Price,
                                Key = "rzp_test_mAlbY3tTc3lEuL"
                            };
                return query;

            }
            else
            {
                var query = from a in _context.Appointment_Tbl.Where(x => x.Id == Appointment_ID)
                            join u in _context.Users on a.UserId equals u.Id
                            join s in _context.Slot_Tbl on a.SlotId equals s.Id
                            join sh in _context.Schedule_Tbl on s.ScheduleId equals sh.Id
                            join d in _context.Doctor_Tbl on sh.DoctorId equals d.Id
                            join u2 in _context.Users on d.UserId equals u2.Id
                            select new AppointmentDetails
                            {
                                Date = a.DateTime.Date.ToString(),
                                Email = u.Email,
                                App_Date = s.Date.ToString("ddd dd, MMM yyyy"),
                                App_Time = DateTime.Parse(s.Time.ToString()).ToString("hh : mm tt"),
                                Order_ID = a.Order_Id,
                                Appointment_ID = a.Id,
                                Mode = sh.Mode,
                                FName = someonelse.Fname,
                                Lname = someonelse.Lname,
                                Doc_Fname = u2.Fname,
                                Doc_Lname = u2.Lname,
                                Price = d.Price,
                                Key = "rzp_test_mAlbY3tTc3lEuL"

                            };
                return query;
            }
        }

        public async Task<string> BookAppointment(string Email, BookAppointment bookAppointment)
        {
            var user = await _userManager.FindByEmailAsync(Email);
            var appointment = new Appointment();
            string order_id;
            var doctor = await _context.Doctor_Tbl.FindAsync(bookAppointment.Id);
            DateTime dateTime = DateTime.Parse(bookAppointment.Time);
            TimeSpan timeSpan = TimeSpan.Parse(dateTime.ToString("HH:mm:ss"));
            var slots = await _context.Slot_Tbl.Where(x => x.Date == DateTime.Parse(bookAppointment.Date) && x.Value == 0 && x.Time == timeSpan).ToListAsync();
            Slot slot = null;
            foreach (var slote in slots)
            {
                var schedule = await _context.Schedule_Tbl.FindAsync(slote.ScheduleId);
                if(schedule.Mode == bookAppointment.Mode || schedule.Mode == "Both")
                {
                    slot = slote;
                    break;
                }
            }
            var appointmentthis = await _context.Appointment_Tbl.Where(x => x.UserId == user.Id && x.SlotId == slot.Id).FirstOrDefaultAsync();

            if (slot == null)
            {
                return null;
            }

            if(appointmentthis != null)
            {
                _context.Appointment_Tbl.Remove(appointmentthis);
                await _context.SaveChangesAsync();
            }

            if (doctor.Price != 0)
            {
                Random randomObj = new Random();
                string transactionId = randomObj.Next(10000000, 100000000).ToString();
                RazorpayClient client = new RazorpayClient("rzp_test_mAlbY3tTc3lEuL", "eEyKClUSGL7togQSQf07YJs2");
                Dictionary<string, object> options = new Dictionary<string, object>();
                options.Add("amount", doctor.Price * 100);
                options.Add("receipt", transactionId);
                options.Add("currency", "INR");
                Order order = client.Order.Create(options);
                order_id = order["id"].ToString();

                appointment = new Appointment()
                {
                    UserId = user.Id,
                    SlotId = slot.Id,
                    DateTime = DateTime.Now,
                    Order_Id = order_id,
                    Payment = false
                };

                if (bookAppointment.SomeOneElse == true)
                {
                    await _context.Appointment_Tbl.AddAsync(appointment);
                    await _context.SaveChangesAsync();
                    var someoneElse = _imapper.Map<SomeOneElse>(bookAppointment);
                    someoneElse.Id = 0;
                    someoneElse.Appointment_Id = appointment.Id;
                    await _context.SomeOneElse_Tbl.AddAsync(someoneElse);
                    await _context.SaveChangesAsync();
                    return appointment.Id.ToString();
                }
                await _context.Appointment_Tbl.AddAsync(appointment);
                await _context.SaveChangesAsync();
                return appointment.Id.ToString();


            }

            if (bookAppointment.SomeOneElse == true)
            {
                appointment = new Appointment()
                {
                    UserId = user.Id,
                    SlotId = slot.Id,
                    DateTime = DateTime.Now,
                    Payment = false
                };

                await _context.Appointment_Tbl.AddAsync(appointment);
                await _context.SaveChangesAsync();
                var someoneElse = _imapper.Map<SomeOneElse>(bookAppointment);
                someoneElse.Appointment_Id = appointment.Id;
                await _context.SomeOneElse_Tbl.AddAsync(someoneElse);
                await _context.SaveChangesAsync();
                return appointment.Id.ToString();
            }

            appointment = new Appointment()
            {
                UserId = user.Id,
                SlotId = slot.Id,
                DateTime = DateTime.Now,
                Order_Id = "0",
                Payment = true
            };
            await _context.Appointment_Tbl.AddAsync(appointment);
            await _context.SaveChangesAsync();
            return "Okay";
        }

        public async Task<string> BookSlot(int Appointment_ID)
        {
            var appointment = await _context.Appointment_Tbl.FindAsync(Appointment_ID);
            var slot = await _context.Slot_Tbl.Where(x => x.Id == appointment.SlotId).FirstOrDefaultAsync();
            slot.Value = 1;
            _context.Slot_Tbl.Update(slot);
            await _context.SaveChangesAsync();
            return "Okay";
        }

        public async Task<string> CheckoutValid(int Appointment_ID, CheckoutValid CheckoutValid)
        {
            var appointment = await _context.Appointment_Tbl.FindAsync(Appointment_ID);

            string generated_signature = calculateRFC(appointment.Order_Id + "|" + CheckoutValid.razorpay_payment_id, "eEyKClUSGL7togQSQf07YJs2");

            if(generated_signature == CheckoutValid.razorpay_signature)
            {
                var user = await _userManager.FindByIdAsync(appointment.UserId);
                if (!await _userManager.IsInRoleAsync(user, "Patient"))
                {
                    await _userManager.AddToRoleAsync(user, "Patient");
                }
                var paymentsuccessfull = new Payment_SuccessFull()
                {
                    Appointment_Id = appointment.Id,
                    razorpay_order_id = CheckoutValid.razorpay_order_id,
                    razorpay_payment_id = CheckoutValid.razorpay_payment_id,
                    razorpay_signature = CheckoutValid.razorpay_signature
                };

                await _context.Payment_SuccessFull_Tbl.AddAsync(paymentsuccessfull);
                appointment.Payment = true;
                _context.Appointment_Tbl.Update(appointment);
                await _context.SaveChangesAsync();
                return "Okay";
            }
            return null; 
        }


        public String calculateRFC(String Data, String Secret)
        {
            String Result = "";
            try
            {
                using (HMACSHA256 hmac= new HMACSHA256(Encoding.ASCII.GetBytes(Secret)))
                {
                    var payload = Encoding.ASCII.GetBytes(Data);
                    var rawHMAC = hmac.ComputeHash(payload);
                    Result = HashEncode(rawHMAC);
                }
            }
            catch(Exception e)
            {
                return e.ToString();
            }
            return Result;

        }

        public string HashEncode(byte[] hash)
        {
            return BitConverter.ToString(hash).Replace("-","").ToLower();
        }

        public async Task<IQueryable<PaymentSuccessfull>> PaymentSuccessfull(int Appointment_ID)
        {
            var query = from a in _context.Appointment_Tbl.Where(x => x.Id == Appointment_ID)
                        join u in _context.Users on a.UserId equals u.Id
                        join s in _context.Slot_Tbl on a.SlotId equals s.Id
                        join sh in _context.Schedule_Tbl on s.ScheduleId equals sh.Id
                        join d in _context.Doctor_Tbl on sh.DoctorId equals d.Id
                        join u2 in _context.Users on d.UserId equals u2.Id
                        join p in _context.Payment_SuccessFull_Tbl on a.Id equals p.Appointment_Id
                        select new PaymentSuccessfull
                        {
                            razorpay_order_id = p.razorpay_order_id,     
                            Price = d.Price,
                            razorpay_payment_id = p.razorpay_payment_id,
                            DoctorFName = u2.Fname,
                            Appointment_Id = a.Id,
                            Date = a.DateTime.Date,
                            App_Date = s.Date.ToString("ddd dd, MMM yyyy"),
                            App_Time = DateTime.Parse(s.Time.ToString()).ToString("hh : mm tt"),
                            PatientFName = u.Fname ,
                            PatientLName = u.Lname,
                            DoctorFLame = u2.Lname
                        };
            return query;
        }

        public async Task<string> AppointmentMail(int Appointment_ID)
        {
            var appointment = await _context.Appointment_Tbl.FindAsync(Appointment_ID);
            var user = await _userManager.FindByIdAsync(appointment.UserId);
            var slot = await _context.Slot_Tbl.FindAsync(appointment.SlotId);
            var schedule = await _context.Schedule_Tbl.FindAsync(slot.ScheduleId);
            var doctor = await _context.Doctor_Tbl.FindAsync(schedule.DoctorId);
            var userdoctor = await _userManager.FindByIdAsync(doctor.UserId);
            var verotp = _userEmail.AppointmentOtp(Appointment_ID);
            var ver = verotp.Result;
            var mailresult = _userEmail.SendOTP(user.Email, "Appointment Otp", "Give this " + verotp.Result.ToString() + " OTP to Dr. "+userdoctor.Fname + userdoctor.Lname+" when you start the apppintment at Healthify.This will Ensure the Details of appointment.\n\nDon't share this OTP. ");
            var mail2 = _userEmail.SendOTP(userdoctor.Email, "New Appointment", "You have a new appointment on "+slot.Date.ToString("ddd dd,MMM yyyy")+"at"+DateTime.Parse(slot.Time.ToString()).ToString("hh : mm tt") + "For More Details visit Website" );
            if (mailresult == null || mail2 == null)
            {
                return null; 
            }
            return "Okay";

        }

        public string SendInvoice(string Mail, SendInvoiceMail Body)
        {
            var mail2 = _userEmail.SendInvoice(Mail, "Appointment Bill", Body.Body);
            return mail2;
        }

        public async Task<PatienPanelAppointment> PatientPanelAppointment(int Appointment_ID)
        {
            var appointment = await _context.Appointment_Tbl.FindAsync(Appointment_ID);
            var user = await _userManager.FindByIdAsync(appointment.UserId);
            var slot = await _context.Slot_Tbl.FindAsync(appointment.SlotId);
            var schedule = await _context.Schedule_Tbl.FindAsync(slot.ScheduleId);
            var doctor = await _context.Doctor_Tbl.FindAsync(schedule.DoctorId);
            var userdoctor = await _userManager.FindByIdAsync(doctor.UserId);
            var pateintpaneldetails = new PatienPanelAppointment()
            {
                ProfilePicture = userdoctor.ProfilePicture,
                Doc_Fname = userdoctor.Fname,
                Doc_Lname = userdoctor.Lname,
                FName = user.Fname,
                Lname = user.Lname,
                ClinicName = doctor.ClinicName,
                RoomNumber = doctor.RoomNumber,
                Street = doctor.Street,
                City = doctor.City,
                State = doctor.State,
                Pincode = doctor.Pincode,
                Specialization = doctor.Specialization.Split("."),
                Speciality = doctor.Speciality,
                Mode = schedule.Mode,
                Date = slot.Date.ToString("ddd dd,MMM yyyy"),
                App_Time = DateTime.Parse(slot.Time.ToString()).ToString("hh : mm tt"),
                Cancelled = appointment.Canceled,
                Completed = appointment.Completed,
                Email = user.Email,
                Appointment_ID = appointment.Id,
                Price = doctor.Price,
                Country = doctor.Country,
                FeedBack = false,
                Message = null,
                Experience = null,
                Meet = doctor.Meet

            };

            var feeback = await _context.FeedBAcks_Tbl.Where(x => x.Appointment_Id == appointment.Id).FirstOrDefaultAsync();

            if (feeback != null)
            {
                pateintpaneldetails.FeedBack = true;
                pateintpaneldetails.Experience = feeback.Experience;
                pateintpaneldetails.Message = feeback.Message;
            }

            var refund = await _context.Refund_Tbl.Where(x => x.Appointment_Id == appointment.Id).FirstOrDefaultAsync();
            if (refund != null)
            {
                if (DateTime.Compare(refund.Dt_Refunded, refund.Dt_Rf_Applied) > 0)
                {
                    pateintpaneldetails.Refund = true;
                }
                else
                {
                    pateintpaneldetails.Refund = false;

                }

                var someonlese = await _context.SomeOneElse_Tbl.Where(x => x.Appointment_Id == appointment.Id).FirstOrDefaultAsync();
                if (someonlese != null)
                {
                    pateintpaneldetails.FName = someonlese.Fname;
                    pateintpaneldetails.Lname = someonlese.Lname;
                    pateintpaneldetails.SomeOneElse = true;
                    
                }
                else
                {
                    pateintpaneldetails.SomeOneElse = false;
                }

                pateintpaneldetails.Person = refund.Person;
                pateintpaneldetails.Reason = refund.Reason;
                pateintpaneldetails.Dt_Refunded = refund.Dt_Refunded.ToString("ddd dd,MMM yyyy At hh : mm tt");
                pateintpaneldetails.Dt_Rf_Applied = refund.Dt_Rf_Applied.ToString("ddd dd,MMM yyyy At hh : mm tt");
            }
            else
            {
                pateintpaneldetails.Refund = false;
                var someonlese = await _context.SomeOneElse_Tbl.Where(x => x.Appointment_Id == appointment.Id).FirstOrDefaultAsync();
                if (someonlese != null)
                {
                    pateintpaneldetails.FName = someonlese.Fname;
                    pateintpaneldetails.Lname = someonlese.Lname;
                    pateintpaneldetails.SomeOneElse = true;
                }
                else
                {
                    pateintpaneldetails.SomeOneElse = false;

                }
            }
            return pateintpaneldetails;
        }

        public async Task<string> CancellationOfAppointment(string Email, AppointmentCancellationModel appointmentCancellationModel)
        {
            var appointment = await _context.Appointment_Tbl.FindAsync(appointmentCancellationModel.Appointment_Id);
            var user = await _userManager.FindByEmailAsync(Email);
            var slot = await _context.Slot_Tbl.FindAsync(appointment.SlotId);
            double d = -6;
            Database.Refund refund = null;
            var schedule = await _context.Schedule_Tbl.FindAsync(slot.ScheduleId);
            var doctor = await _context.Doctor_Tbl.FindAsync(schedule.DoctorId);

            var userdoctor = await _userManager.FindByIdAsync(doctor.UserId);
            if (user.Id == appointment.UserId)
            {
                if (appointment.Canceled == true)
                {
                    return null;
                }
                appointment.Canceled = true;
                if (doctor.Price == 0)
                {
                    _context.Appointment_Tbl.Update(appointment);
                }
                else 
                {
                    refund = new()
                    {
                        Appointment_Id = appointment.Id,
                        Dt_Rf_Applied = DateTime.Now,
                        Person = "Patient",
                        Reason = appointmentCancellationModel.Reason
                    };
                    _context.Refund_Tbl.Add(refund);
                }
                var mail2 = _userEmail.SendOTP(user.Email, "Cancelled Appointment", "Your appointment on "+appointment.DateTime.Date.ToString("ddd dd,MMM yyyy")+"at"+DateTime.Parse(slot.Time.ToString()).ToString("hh : mm tt") + "have been cancelled by "+ "Patient" + "for this" + refund.Reason + "on" + DateTime.Now.ToLocalTime() );
                var mail = _userEmail.SendOTP(userdoctor.Email, "Cancelled Appointment", "Your appointment on " + appointment.DateTime.Date.ToString("ddd dd,MMM yyyy") + "at" + DateTime.Parse(slot.Time.ToString()).ToString("hh : mm tt") + "have been cancelled by " + "Patient" + "for this" + refund.Reason + "on" + DateTime.Now.ToLocalTime());
            }
            else
            {
                if (appointment.Canceled == true)
                {
                    return null;
                }
                if (doctor.Price == 0)
                {
                    _context.Appointment_Tbl.Update(appointment);
                }
                refund = new()
                {
                    Appointment_Id = appointment.Id,
                    Dt_Rf_Applied = DateTime.Now,
                    Person = "Doctor",
                    Reason = appointmentCancellationModel.Reason
                };
                _context.Refund_Tbl.Add(refund);
                var mail2 = _userEmail.SendOTP(user.Email, "Cancelled Appointment", "Your appointment on " + appointment.DateTime.Date.ToString("ddd dd,MMM yyyy") + "at" + DateTime.Parse(slot.Time.ToString()).ToString("hh : mm tt") + "have been cancelled by " + "Doctor" + "for this" + refund.Reason + "on" + DateTime.Now.ToLocalTime());
                var mail = _userEmail.SendOTP(userdoctor.Email, "Cancelled Appointment", "Your appointment on " + appointment.DateTime.Date.ToString("ddd dd,MMM yyyy") + "at" + DateTime.Parse(slot.Time.ToString()).ToString("hh : mm tt") + "have been cancelled by " + "Doctor" + "for this" + refund.Reason + "on" + DateTime.Now.ToLocalTime());

            }

            var appoOtp = await  _context.AppointmentOtp_Tbl.Where(x => x.Appointment_Id == appointment.Id).FirstOrDefaultAsync();
            if (appoOtp != null)
            {
                _context.Remove(appoOtp);
            }
                await _context.SaveChangesAsync();


            return "Okay";
        }

        public async Task<string> PatientFeedBack(string Email, FeedbackfromPatient FeedBack)
        {
            var user =await _userManager.FindByEmailAsync(Email);
            var appointment =await  _context.Appointment_Tbl.FindAsync(FeedBack.Appointment_Id);
            FeedBAck feedBAck = new FeedBAck()
            {
                Appointment_Id = FeedBack.Appointment_Id,
                Experience = FeedBack.Experience,
                Message = FeedBack.Message
            };
            feedBAck.Feedback_By = false;
            if(user.Id != appointment.UserId)
            {
                feedBAck.Feedback_By = true;
            }
            await _context.FeedBAcks_Tbl.AddAsync(feedBAck);
            await _context.SaveChangesAsync();
            return "Okay";
        }

        public async Task<IEnumerable<FeedbackPanel>> FeedbackPanels(string Email,int Doctor,int Page)
        {
            if (Doctor == 0)
            {
                Page--;
                var user = await _userManager.FindByEmailAsync(Email);
                var query = from a in _context.Appointment_Tbl.Where(x => x.UserId == user.Id)
                            join f in _context.FeedBAcks_Tbl.Where(x => x.Feedback_By == false) on a.Id equals f.Appointment_Id
                            join s in _context.Slot_Tbl on a.SlotId equals s.Id
                            join sch in _context.Schedule_Tbl on s.ScheduleId equals sch.Id
                            join d in _context.Doctor_Tbl on sch.DoctorId equals d.Id
                            join duser in _context.Users on d.UserId equals duser.Id
                            select new FeedbackPanel
                            {
                                Fname = user.Fname,
                                Lname = user.Lname,
                                Doc_Fname = duser.Fname,
                                Doc_Lname = duser.Lname,
                                Experience = f.Experience,
                                Message = f.Message,
                                Date = a.DateTime.ToString("dd MMM"),
                                Time = a.DateTime.ToString("dddd ,hh : mm tt ")

                            };
                return query.Skip(Page * 10).Take(10);
                     
            }
            else
            {
                Page--;
                var doctor = await _userManager.FindByEmailAsync(Email);
                var d = await _context.Doctor_Tbl.Where(x => x.UserId == doctor.Id).FirstOrDefaultAsync();
                var query = from sch in _context.Schedule_Tbl.Where(x => x.DoctorId == d.Id)
                            join s in _context.Slot_Tbl on sch.Id equals s.ScheduleId
                            join a in _context.Appointment_Tbl on s.Id equals a.SlotId
                            join f in _context.FeedBAcks_Tbl.Where(x => x.Feedback_By == false) on a.Id equals f.Appointment_Id
                            join user in _context.Users on a.UserId equals user.Id
                            select new FeedbackPanel
                            {
                                Fname = user.Fname,
                                Lname = user.Lname,
                                Doc_Fname = doctor.Fname,
                                Doc_Lname = doctor.Lname,
                                Experience = f.Experience,
                                Message = f.Message,
                                Date = a.DateTime.ToString("dd MMM"),
                                Time = a.DateTime.ToString("dddd ,hh : mm tt ")
                            };

                return query.Skip(Page * 10).Take(10);

            }
        }

        public async Task<string> AppointmentSuccessfullOtp(AppointmentStartOtp appointmentStartOtp)
        {
            var otp = await _context.AppointmentOtp_Tbl.Where(x => x.Appointment_Id == appointmentStartOtp.Appointment_Id).FirstOrDefaultAsync();
            if (otp != null)
            {
                if (otp.OtpValue == appointmentStartOtp.OtpValue)
                {
                    otp.DateTime = DateTime.Now;
                    var appointment = await _context.Appointment_Tbl.FindAsync(appointmentStartOtp.Appointment_Id);
                    if (appointment.Canceled == true || appointment.Completed == true)
                    {
                        return null;
                    }
                    appointment.Completed = true;
                    _context.AppointmentOtp_Tbl.Update(otp);
                    _context.Appointment_Tbl.Update(appointment);
                }
                await _context.SaveChangesAsync();
                return "Okay";
            }
            return null;
        }
    }
}


