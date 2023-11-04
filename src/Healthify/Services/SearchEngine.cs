using System.Threading.Tasks;
using AutoMapper;
using Healthify.Database;
using Healthify.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Healthify.OutPutModel;
using Microsoft.AspNetCore.Hosting;
using System.Collections.Generic;
using System.IO;
using System;

namespace Healthify.Services
{
    public class SearchEngine : ISearchEngine
    {
        private readonly IDoctorPanel _doctorPanel;
        private readonly IUserClaimService _userClaimService;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IMapper _imapper;
        private readonly UserManager<User_> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly HealthifyDbContext _context;

        public SearchEngine(IDoctorPanel doctorPanel,IUserClaimService userClaimService, IWebHostEnvironment webHostEnvironment, IMapper imapper, UserManager<User_> userManager, RoleManager<IdentityRole> roleManager, HealthifyDbContext context)
        {
            _doctorPanel = doctorPanel;
            _userClaimService = userClaimService;
            _webHostEnvironment = webHostEnvironment;
            _imapper = imapper;
            _userManager = userManager;
            _roleManager = roleManager;
            _context = context;
        }

        public async Task<DoctorDetails> DoctorDetails(int DoctorId)
        {
            //double d = 15;
            //DateTime dateTime = DateTime.Now.AddMinutes(d);
            var doctor = await _context.Doctor_Tbl.Where(x => x.Id == DoctorId).FirstOrDefaultAsync();
            var user = await _userManager.Users.Where(x => x.Id == doctor.UserId).FirstOrDefaultAsync();

            //var result = await _context.Appointment_Tbl.Where(x => x.UserId == user1.Id && x.DateTime < dateTime && x.Payment == false).FirstOrDefaultAsync();

            //if (result != null)
            //{
            //    var slot = await _context.Slot_Tbl.Where(x => x.Id == result.SlotId).FirstOrDefaultAsync();
            //    slot.Value = 0;
            //    _context.Update(slot);
            //    _context.Remove(result);
            //    await _context.SaveChangesAsync();
            //}

            var details = new DoctorDetails
            {
                ProfilePhoto = user.ProfilePicture,
                Fname = user.Fname,
                Lname = user.Lname,
                ClinicName = doctor.ClinicName,
                Speciality = doctor.Speciality,
                Street = doctor.Street,
                City = doctor.City,
                Pincode = doctor.Pincode,
                ExperienceInTotal = doctor.ExperienceInTotal,
                Price = doctor.Price,
                State = doctor.State,
                Registration = doctor.Registration,
                ClinicNumber = doctor.ClinicNumber,
                RoomNumber = doctor.RoomNumber,
                Description = doctor.Description
            };

            details.Schedule = doctor.Schedule.Split(".");
            details.Services = doctor.Services.Split(".");
            details.Membership = doctor.Membership.Split(".");
            details.Education = doctor.Education.Split(".");
            details.Specialization = doctor.Specialization.Split(".");
            details.Awards = doctor.Awards.Split(".");
            details.Experience = doctor.Experience.Split(".");
            details.Training = doctor.Training.Split(".");

            return details;
        }

        public async Task<IQueryable<DoctorPatient>> DoctorPatient(int doctorid, string mode, string date, string time)
        {

            var apptime = TimeSpan.Parse(DateTime.Parse(time).ToString("HH:mm:ss"));
            var appdate = DateTime.Parse(date);
            var query = from d in _context.Doctor_Tbl.Where(x => x.Id == doctorid)
                        join u in _context.Users on d.UserId equals u.Id
                        join sch in _context.Schedule_Tbl.Where(x => x.Mode == mode || x.Mode == "Both") on d.Id equals sch.DoctorId
                        join s in _context.Slot_Tbl.Where(x => x.Time == apptime && x.Value == 0 && x.Date == appdate) on sch.Id equals s.ScheduleId
                        select new DoctorPatient
                        {
                            ProfilePhoto = u.ProfilePicture,
                            Fname = u.Fname,
                            Lname = u.Lname,
                            Speciality = d.Speciality,
                            Date = s.Date.ToString("MMM dd, yyyy"),
                            Time = time,
                            Mode = mode,
                            Street = d.Street,
                            City = d.City,
                            Pincode = d.Pincode,
                            Price = d.Price,
                            ClinicName = d.ClinicName,
                            ClinicNumber = d.ClinicNumber,
                            RoomNumber = d.RoomNumber,
                            State = d.State

                        };

            return query;
        }

        public async Task<List<SlotOutput>> DoctorSlots(int DoctorId,string mode)
        {
            var schedules = await _context.Schedule_Tbl.Where(x => x.DoctorId == DoctorId && x.Mode == mode || x.Mode == "Both").ToListAsync();
            var week = _doctorPanel.FromNowSevenDays(DateTime.Now);
            DateTime thisdate = new DateTime();
            DateTime today = DateTime.Now;
            
            var Mor = DateTime.Parse("12:00 PM");
            var After = DateTime.Parse("5:00 PM");
            var Eve = DateTime.Parse("12:00 AM");
            List<SlotOutput> slotOutput = new List<SlotOutput>();


            for (int i = 0; i < 7; i++)
            {
                if (i == 0)
                {
                    thisdate = DateTime.Parse(week.First);
                }
                else if (i == 1)
                {
                    thisdate = DateTime.Parse(week.Second);
                }
                else if (i == 2)
                {
                    thisdate = DateTime.Parse(week.Third);
                }
                else if (i == 3)
                {
                    thisdate = DateTime.Parse(week.Fourth);
                }
                else if (i == 4)
                {
                    thisdate = DateTime.Parse(week.Fifth);
                }
                else if (i == 5)
                {
                    thisdate = DateTime.Parse(week.Sixth);
                }
                else if (i == 6)
                {
                    thisdate = DateTime.Parse(week.Seventh);
                }

                List<string> Morning = new List<string>();
                List<string> Afternoon = new List<string>();
                List<string> AfternoonConverted = new List<string>();

                List<string> Evening = new List<string>();
                //thisdate.Add(Timespan.Parse(DateTime.Now.ToString("hh : mm tt")));
                foreach (var schedule in schedules)
                {
                    var slots = await _context.Slot_Tbl.Where(x => x.ScheduleId == schedule.Id && x.Date == thisdate && x.Value == 0).ToListAsync();
                    if (slots.Count != 0)
                    {
                        foreach (var slot in slots)
                        {
                            var okay = slot.Time.ToString();
                            var dateTime = DateTime.Parse(okay);
                            if (DateTime.Compare(dateTime, Mor) < 0 && DateTime.Compare(dateTime, Eve) > 0 && DateTime.Compare(thisdate.Add(slot.Time),today) >= 0)
                            {
                                Morning.Add(dateTime.ToString("hh : mm tt"));
                            }
                            else if (DateTime.Compare(dateTime, Mor) >= 0 && DateTime.Compare(dateTime, After) < 0 && DateTime.Compare(thisdate.Add(slot.Time), today) >= 0)
                            {
                                Afternoon.Add(dateTime.ToString("HH : mm"));
                            }
                            else if(DateTime.Compare(thisdate.Add(slot.Time), today) >= 0)
                            {
                                Evening.Add(dateTime.ToString("hh : mm tt"));
                            }
                        }
                    }
                }

                Morning.Sort();
                Afternoon.Sort();
                foreach (var afternoon in Afternoon)
                {
                     AfternoonConverted.Add(DateTime.Parse(afternoon).ToString("hh : mm tt"));
                }

                Evening.Sort();


                var thisslot = new SlotOutput
                {
                    Date = thisdate.ToString("ddd dd, MMMM yyyy"),
                    Morning = Morning,
                    Evening = Evening,
                    Afternoon = AfternoonConverted
                };
                slotOutput.Add(thisslot);
            }

            return slotOutput;
        }

        public async Task<IEnumerable<FindDoctor>> FindAllDoctorAsync(int page,string speciality,bool Videoconsult,int problem)
        {

            if (speciality != null && Videoconsult == false)
            {
                page--;
                var query = from u in _context.Users
                            join r in _context.UserRoles.Where(x => x.RoleId == "8f42bf96-1220-452d-b9c1-bd155368a092") on u.Id equals r.UserId
                            join doc in _context.Doctor_Tbl.Where(x => x.Speciality == speciality) on r.UserId equals doc.UserId
                            select new FindDoctor
                            {
                                ProfilePhoto = u.ProfilePicture,
                                Url = doc.Id.ToString(),
                                Fname = u.Fname,
                                Lname = u.Lname,
                                ClinicName = doc.ClinicName,
                                Speciality = doc.Speciality,
                                Street = doc.Street,
                                City = doc.City,
                                Pincode = doc.Pincode,
                                ExperienceInTotal = doc.ExperienceInTotal,
                                Price = doc.Price
                            };
                return query.Skip(10*page).Take(10);
            }
            else if (speciality != null && Videoconsult == true)
            {
                page--;

                var query = from u in _context.Users
                            join r in _context.UserRoles.Where(x => x.RoleId == "8f42bf96-1220-452d-b9c1-bd155368a092") on u.Id equals r.UserId
                            join doc in _context.Doctor_Tbl.Where(x => x.Speciality == speciality) on r.UserId equals doc.UserId
                            join sch in _context.Schedule_Tbl.Where(x => x.Mode == "Online") on doc.Id equals sch.DoctorId
                            select new FindDoctor
                            {
                                ProfilePhoto = u.ProfilePicture,
                                Url = doc.Id.ToString(),
                                Fname = u.Fname,
                                Lname = u.Lname,
                                ClinicName = doc.ClinicName,
                                Speciality = doc.Speciality,
                                Street = doc.Street,
                                City = doc.City,
                                Pincode = doc.Pincode,
                                ExperienceInTotal = doc.ExperienceInTotal,
                                Price = doc.Price
                            };
                return query.Skip(10 * page).Take(10);
            }

            else if (problem != 0 && Videoconsult == true)
            {
                page--;

                switch (problem)
                {
                    case 1:
                        speciality = "General Pathology";
                        break;
                    case 2:
                        speciality = "Gynaecology";
                        break;
                    case 3:
                        speciality = "Pediatrics";
                        break;
                    case 4:
                        speciality = "Dermatology";
                        break;
                    case 5:
                        speciality = "Physchologyst";
                        break;
                    case 6:
                        speciality = "Dietician";
                        break;
                    case 7:
                        speciality = "Gaestroentology";
                        break;
                }

                var query = from u in _context.Users
                            join r in _context.UserRoles.Where(x => x.RoleId == "8f42bf96-1220-452d-b9c1-bd155368a092") on u.Id equals r.UserId
                            join doc in _context.Doctor_Tbl.Where(x => x.Speciality == speciality) on r.UserId equals doc.UserId
                            join sch in _context.Schedule_Tbl.Where(x => x.Mode == "Online") on doc.Id equals sch.DoctorId
                            select new FindDoctor
                            {
                                ProfilePhoto = u.ProfilePicture,
                                Url =  doc.Id.ToString(),
                                Fname = u.Fname,
                                Lname = u.Lname,
                                ClinicName = doc.ClinicName,
                                Speciality = doc.Speciality,
                                Street = doc.Street,
                                City = doc.City,
                                Pincode = doc.Pincode,
                                ExperienceInTotal = doc.ExperienceInTotal,
                                Price = doc.Price
                            };
                return query.Skip(10 * page).Take(10);
            }
            else if (problem != 0 && Videoconsult == false)
            {
                page--;

                switch (problem)
                {
                    case 1:
                        speciality = "General Phathology";
                        break;
                    case 2:
                        speciality = "Gynaecology";
                        break;
                    case 3:
                        speciality = "Pediatrics";
                        break;
                    case 4:
                        speciality = "Dermatology";
                        break;
                    case 5:
                        speciality = "Physchologyst";
                        break;
                    case 6:
                        speciality = "Dietician";
                        break;
                    case 7:
                        speciality = "Gaestroentology";
                        break;
                }

                var query = from u in _context.Users
                            join r in _context.UserRoles.Where(x => x.RoleId == "8f42bf96-1220-452d-b9c1-bd155368a092") on u.Id equals r.UserId
                            join doc in _context.Doctor_Tbl.Where(x => x.Speciality == speciality) on r.UserId equals doc.UserId
                            select new FindDoctor
                            {
                                ProfilePhoto = u.ProfilePicture,
                                Url = doc.Id.ToString(),
                                Fname = u.Fname,
                                Lname = u.Lname,
                                ClinicName = doc.ClinicName,
                                Speciality = doc.Speciality,
                                Street = doc.Street,
                                City = doc.City,
                                Pincode = doc.Pincode,
                                ExperienceInTotal = doc.ExperienceInTotal,
                                Price = doc.Price
                            };
                return query.Skip(10 * page).Take(10);
            }

            else
            {
                var query = from u in _context.Users
                            join r in _context.UserRoles.Where( x=> x.RoleId == "8f42bf96-1220-452d-b9c1-bd155368a092") on u.Id equals r.UserId
                            join doc in _context.Doctor_Tbl on r.UserId equals doc.UserId
               
                            select new FindDoctor
                            {
                                ProfilePhoto = u.ProfilePicture,
                                Url = doc.Id.ToString(),
                                Fname = u.Fname,
                                Lname = u.Lname,
                                ClinicName = doc.ClinicName,
                                Speciality = doc.Speciality,
                                Street = doc.Street,
                                City = doc.City,
                                Pincode = doc.Pincode,
                                ExperienceInTotal = doc.ExperienceInTotal,
                                Price = doc.Price
                            };
                return query.Skip(10 * page).Take(10);
            }

        }

        public async Task<IEnumerable<FindDoctor>> SearchBar(string name)
        {
            var query = from u in _context.Users.Where(x => x.Fname.Contains(name,StringComparison.CurrentCultureIgnoreCase) || x.Lname.Contains(name,StringComparison.CurrentCultureIgnoreCase))
                        join r in _context.UserRoles.Where(x => x.RoleId == "8f42bf96-1220-452d-b9c1-bd155368a092") on u.Id equals r.UserId
                        join doc in _context.Doctor_Tbl on r.UserId equals doc.UserId
                        select new FindDoctor
                        {
                            Fname = u.Fname,
                            Lname = u.Lname,
                            ProfilePhoto = u.ProfilePicture,
                            Speciality = doc.Speciality,
                            Url = doc.Id.ToString()
                        };
            return query;


        }
    }

}
