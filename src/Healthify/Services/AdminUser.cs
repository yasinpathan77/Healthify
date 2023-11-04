using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Healthify.Database;
using Healthify.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Healthify.OutPutModel;
using Microsoft.AspNetCore.Hosting;
using System.Security.Claims;
using Microsoft.AspNetCore.JsonPatch;

namespace Healthify.Services
{
    public class AdminUser : IAdminUser
    {
        private readonly IUserClaimService _userClaimService;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IMapper _imapper;
        private readonly UserManager<User_> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly HealthifyDbContext _context;

        public AdminUser(IUserClaimService userClaimService,IWebHostEnvironment webHostEnvironment, IMapper imapper, UserManager<User_> userManager, RoleManager<IdentityRole> roleManager, HealthifyDbContext context)
        {
            _userClaimService = userClaimService;
            _webHostEnvironment = webHostEnvironment;
            _imapper = imapper;
            _userManager = userManager;
            _roleManager = roleManager;
            _context = context;
        }

        public async Task<IdentityResult> CreateRole(RoleModel roleModel)
        {
            var role = new IdentityRole()
            {
                Name = roleModel.RoleName
            };
            return await _roleManager.CreateAsync(role);
        }

        public async Task<List<User_>> GetDataAsync()
        {

            return await _userManager.Users.ToListAsync();
        }

        public async Task<IList<string>> GetUserRoleAsync()
        {
            return await _userManager.GetRolesAsync(await _userManager.FindByNameAsync("yasinpathanp@gmail.com"));
        }

        public async Task<IdentityResult> DeletUserAsync(UserLogin user)
        {
            var result = await _userManager.FindByEmailAsync(user.Email);
            return await _userManager.DeleteAsync(result);
        }

        public async Task<IEnumerable<DoctorUserDetails>> GetDoctors()
        {
            var user = await _context.Users.ToListAsync();
            string webroot = _webHostEnvironment.WebRootPath;
            var doctor = await _context.Doctor_Tbl.ToListAsync();
            var query = from u in user
                        join doc in doctor on u.Id equals doc.UserId
                        select new DoctorUserDetails
                        {
                            ProfilePhoto = webroot + u.ProfilePicture,
                            Email = u.Email,
                            Fname = u.Fname,
                            Lname = u.Lname,
                            BirthDate = u.BirthDate,
                            Gender = u.Gender,
                            Speciality = doc.Speciality,
                            ClinicNumber = doc.ClinicNumber,
                            RoomNumber = doc.RoomNumber,
                            Street = doc.Street,
                            Country = doc.Country,
                            State = doc.State,
                            City = doc.City,
                            Pincode = doc.Pincode
                        };
            return query;
        }

        public async Task<string> VerifyDoctorAsync(DoctorVerify doctor)
        {
            var user = await _userManager.FindByEmailAsync(doctor.Getmail);

            var doc = await _context.Doctor_Tbl.Where(x => x.UserId == user.Id).FirstAsync();

            doc.ExperienceInTotal = doctor.ExperienceInTotal;
            doc.Education = doctor.Education;
            doc.Specialization = doctor.Specialization;
            doc.Awards = doctor.Awards;
            doc.Services = doctor.Services;
            doc.Experience = doctor.Experience;
            doc.Registration = doctor.Registration;
            doc.Training = doctor.Training;
            doc.Membership = doctor.Membership;
            doc.ClinicName = doctor.ClinicName;
            doc.Description = doctor.Description;
            doc.Price = doctor.Price;
            doc.Meet = doctor.Meet;
            doc.Schedule = doctor.Schedule;
            doc.GooglePay = doctor.Googlepay;
            doc.State = doctor.State;
            doc.Street = doctor.Street;
            doc.RoomNumber = doctor.RoomNo;
            doc.Pincode = doctor.Pincode;
            doc.City = doctor.City;
            doc.Country = doctor.Country;

            _context.Doctor_Tbl.Update(doc);


            await _userManager.AddToRoleAsync(user, "Doctor");
            var oldclaim = new Claim("Doctor", "False");

            await _userClaimService.RemoveClaim(user, oldclaim);

            await _context.SaveChangesAsync();

            return "Okay";
        }

        public async Task<string> UpdateDoctor(int id,JsonPatchDocument jsonPatchDocument)
        {
            var doctor = await _context.Doctor_Tbl.Where(x => x.Id == id).FirstOrDefaultAsync();
            if (doctor != null)
            {
                jsonPatchDocument.ApplyTo(doctor);
                await _context.SaveChangesAsync();
                return "Okay";
            }
            return null;
        }

        public async Task<string> DeleteAppointment(int Id)
        {
            var appointment = await _context.Appointment_Tbl.FindAsync(Id);
            if (appointment != null)
            {
                _context.Remove(appointment);
                await _context.SaveChangesAsync();
                return "Okay";
            }
            return null;
        }

        public async Task<string> DatletePayment(int Id)
        {
            var appointment = await _context.Refund_Tbl.Where(x => x.Appointment_Id == Id).ToListAsync();
            if (appointment.Count != 0)
            {
                _context.RemoveRange(appointment);
                await _context.SaveChangesAsync();
                return "Okay";
            }
            return null;

        }

        public async Task<string> AddAdmin(string Id)
        {
            var user = await _userManager.FindByIdAsync(Id);
            var add = await _userManager.AddToRoleAsync(user,"Admin");
            return "Okay";
        }

        public async Task<List<PatienPanelAppointment>> Appointments()
        {
            var appointments = await _context.Appointment_Tbl.ToListAsync();
            var details = new List<PatienPanelAppointment>();
            foreach (var appointment in appointments)
            {
                    var user = await _userManager.FindByIdAsync(appointment.UserId);

                    var slot = await _context.Slot_Tbl.FindAsync(appointment.SlotId);
                    var schedule = await _context.Schedule_Tbl.FindAsync(slot.ScheduleId);
                    var doctor = await _context.Doctor_Tbl.FindAsync(schedule.DoctorId);
                    var use = await _userManager.FindByIdAsync(doctor.UserId);

                    var detail = new PatienPanelAppointment()
                    {
                        FName = user.Fname,
                        Lname = user.Lname,
                        Appointment_ID = appointment.Id,
                        ProfilePicture = user.ProfilePicture,
                        Doc_Fname = use.Fname,
                        Doc_Lname = use.Lname,
                        Speciality = doctor.Speciality,
                        Date = slot.Date.ToString("ddd dd,MMM yyyy"),
                        App_Time = DateTime.Parse(slot.Time.ToString()).ToString("hh : mm tt"),
                        Cancelled = appointment.Canceled,
                        Completed = appointment.Completed
                    };

                var refund = await _context.Refund_Tbl.Where(x => x.Appointment_Id == appointment.Id).FirstOrDefaultAsync();
                if (refund != null)
                {

                    if (DateTime.Compare(refund.Dt_Rf_Applied.AddDays(7),DateTime.Now) < 0)
                    {
                        refund.Dt_Refunded = DateTime.Now;
                        _context.Refund_Tbl.Update(refund);
                        await _context.SaveChangesAsync();
                    }

                    if (DateTime.Compare(refund.Dt_Refunded, refund.Dt_Rf_Applied) < 0)
                    {
                        detail.Refund = true;
                    }
                    else
                    {
                        detail.Refund = false;

                    }
                }

                details.Add(detail);
            }

            return details;
            
        }

        public IEnumerable<FindDoctor> Doctors()
        {
            var query = from d in _context.Doctor_Tbl
                        join u in _context.Users on d.UserId equals u.Id
                        join r in _context.UserRoles.Where(x => x.RoleId == "8f42bf96-1220-452d-b9c1-bd155368a092") on u.Id equals r.UserId
                        select new FindDoctor
                        {
                            Url = d.Id.ToString(),
                            Fname = u.Fname,
                            Lname = u.Lname,
                            ProfilePhoto = u.ProfilePicture,
                            Speciality = d.Speciality,
                            City = d.City
                        };

            return query;
        }

        public async Task<IEnumerable<FindDoctor>> RequestDoctors()
        {
            var doctor = await _context.Doctor_Tbl.ToListAsync();
            List<FindDoctor> find = new List<FindDoctor>();
            foreach (var doc in doctor)
            {
                if (doc.Education == "" || doc.Education == null)
                {
                    var user = await _userManager.FindByIdAsync(doc.UserId);
                    FindDoctor findDoctor = new FindDoctor() {
                        Fname = user.Fname,
                        Lname = user.Lname,
                        Id = doc.Id,
                        Url = user.Id,
                        Speciality = doc.Speciality,
                        ProfilePhoto = user.ProfilePicture
                     
                    };
                    find.Add(findDoctor);
                }
            }
            return find;
        }

        public IEnumerable<User_> GetPatients()
        {
            var query = from u in _context.Users 
                       join r in _context.UserRoles.Where(x => x.RoleId == "df721ea4-86ff-4510-bc9e-46407ccae4d7") on u.Id equals r.UserId
                       select new User_
                       {
                           Fname = u.Fname,
                           Lname = u.Lname,
                           ProfilePicture = u.ProfilePicture,
                           Id = u.Id,
                           Email = u.Email,
                           PhoneNumber = u.PhoneNumber

                       };

            return query;
        }

        public async Task<User_> User(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            return user;
        }

        public async Task<string> UpdateUser(string id, JsonPatchDocument jsonPatchDocument)
        {
            var user = await _context.Users.Where(x => x.Id == id).FirstOrDefaultAsync();
            if (user != null)
            {
                jsonPatchDocument.ApplyTo(user);
                await _context.SaveChangesAsync();
                return "Okay";
            }
            return null;
        }

        public async Task<string> PaymentDoc(DocPayment docPayment)
        {
            var appointment = await _context.Appointment_Tbl.Where(x => x.Id == docPayment.Appointment_Id).FirstOrDefaultAsync();

            
            var pay = await _context.Payment_Doctor_Tbl.Where(x => x.Appointment_Id == appointment.Id).FirstOrDefaultAsync();

            var slot = await _context.Slot_Tbl.FindAsync(appointment.SlotId);
            var schedule = await _context.Schedule_Tbl.FindAsync(slot.ScheduleId);
            var doctor = await _context.Doctor_Tbl.FindAsync(schedule.DoctorId);


            if (pay == null)
            {
                var payment = _imapper.Map<PaymentDoctor>(docPayment);

                float amount = 0.8f;

                payment.Date_Paid = DateTime.Now;

                payment.Amount = doctor.Price*amount;

                await _context.AddAsync(payment);

                await _context.SaveChangesAsync();

                return "Okay";
            }

            return null;
        }

        public async Task<Doctor_Table> Doctorthis(int id)
        {
            return await _context.Doctor_Tbl.Where(x => x.Id == id).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<FindDoctor>> PaymentDoctor()
        {
            var appointments = await _context.Appointment_Tbl.Where(x => x.Completed == true).ToListAsync();
            List<FindDoctor> finds = new List<FindDoctor>();
            foreach (var appointment in appointments)
            {
                var payment = await _context.Payment_Doctor_Tbl.Where(x => x.Appointment_Id == appointment.Id).FirstOrDefaultAsync();
                if (payment == null)
                {
                    var slot = await _context.Slot_Tbl.FindAsync(appointment.SlotId);
                    var schedule = await _context.Schedule_Tbl.FindAsync(slot.ScheduleId);
                    var doctor = await _context.Doctor_Tbl.FindAsync(schedule.DoctorId);
                    var user = await _userManager.FindByIdAsync(doctor.UserId);

                    var doc = new FindDoctor() {
                        Fname = user.Fname,
                        Lname = user.Lname,
                        ProfilePhoto = user.ProfilePicture,
                        Price = doctor.Price * 0.8,
                        City = doctor.GooglePay,
                        Url = doctor.Id.ToString(),
                        Pincode = appointment.Id

                    };

                    finds.Add(doc);
                }
            }

            return finds;
        }

        public async Task<string> Refund(int appid)
        {
            var appointment = await _context.Appointment_Tbl.FindAsync(appid);
            var refund = await _context.Refund_Tbl.Where(x => x.Appointment_Id == appointment.Id).FirstOrDefaultAsync();
            refund.Dt_Refunded = DateTime.Now;
            var slot = await _context.Slot_Tbl.FindAsync(appointment.SlotId);
            var schedule = await _context.Schedule_Tbl.FindAsync(slot.ScheduleId);
            var doctor = await _context.Doctor_Tbl.FindAsync(schedule.DoctorId);
            var user = await _userManager.FindByIdAsync(doctor.UserId);
            refund.AmountRefunded = doctor.Price;
            _context.Refund_Tbl.Update(refund);
            await _context.SaveChangesAsync();
            return "okay";

        }

        public async Task<Stats_Data> Stats_Data()
        {
            //        public int totaldocs { get; set; }

            //public int totalPats { get; set; }

            //public int totalUsers { get; set; }

            //public int comApps { get; set; }

            //public int upApps { get; set; }

            //public int totalVis { get; set; }

            var users = await _context.Users.ToListAsync();

            var stats = new Stats_Data()
            {
                totaldocs = await _context.UserRoles.Where(x => x.RoleId == "8f42bf96-1220-452d-b9c1-bd155368a092").CountAsync(),
                totalPats = await _context.UserRoles.Where(x => x.RoleId == "df721ea4-86ff-4510-bc9e-46407ccae4d7").CountAsync(),
                totalUsers = await _context.Users.CountAsync(),
                upApps = await _context.Appointment_Tbl.Where(x => x.Canceled == false && x.Completed == false).CountAsync(),
                totalVis = await _context.UserRoles.Where(x => x.RoleId == "8ea64c42-815b-4175-9b67-a2a916445259").CountAsync(),
                comApps = await _context.Appointment_Tbl.Where(x => x.Completed == true).CountAsync()
            };

            return stats;
        }
    }
}
