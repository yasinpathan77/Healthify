using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Healthify.Database;
using Healthify.Models;
using Healthify.OutPutModel;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.EntityFrameworkCore;

namespace Healthify.Services
{
    public class UserPanelService : IUserPanelInterface
    {
        private readonly UserManager<User_> _userManager;
        private readonly IMapper _mapper;
        private readonly HealthifyDbContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public UserPanelService(UserManager<User_> userManager,IMapper mapper, HealthifyDbContext context, IWebHostEnvironment webHostEnvironment)
        {
            _userManager = userManager;
            _mapper = mapper;
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }

        public async Task<string> DeleteMedicalRecord(string Email, int Id)
        {
            var user = await _userManager.FindByEmailAsync(Email);
            if (Id == 0)
            {
                var result = await _context.MedicalRecords_Tbl.Where(x => x.User_Id == user.Id).ToListAsync();
                _context.MedicalRecords_Tbl.RemoveRange(result);
            }
            else
            {
                
                var medicalRecord = await _context.MedicalRecords_Tbl.Where(x => x.User_Id == user.Id && x.Id == Id).FirstOrDefaultAsync();

                string webroot = _webHostEnvironment.WebRootPath;

                //string[] filePaths = Directory.GetFiles(Path.Combine(webroot, "MedicalRecords/"));

                if (File.Exists(webroot + medicalRecord.Pathname))
                {
                    File.Delete(webroot+medicalRecord.Pathname);
                }

                _context.MedicalRecords_Tbl.Remove(medicalRecord);
            }
                await _context.SaveChangesAsync();
            return "Okay";
        }

        public async Task<string> EditProfile(string Email, JsonPatchDocument jsonPatchDocument)
        {
            var user = await _userManager.FindByEmailAsync(Email);

            if (user != null)
            {
                jsonPatchDocument.ApplyTo(user);
                await _context.SaveChangesAsync();
                return "Okay";
            }

            return null;
        }

        public async Task<IQueryable<AppointmentPanel>> GetAppointmentPanel(string Email, int Doctor, int Upcoming,int page)
        {
            var user = await _userManager.FindByEmailAsync(Email);

            if (Doctor == 0)
            {
                var appointments = await _context.Appointment_Tbl.Where(x => x.UserId == user.Id).ToListAsync();
                foreach (var appointment in appointments)
                {
                    var slot = await _context.Slot_Tbl.FindAsync(appointment.SlotId);
                    if(DateTime.Compare(DateTime.Now.AddMinutes(+10),slot.Date.Add(slot.Time)) > 0 && appointment.Canceled == false)
                    {
                        appointment.Canceled = true;
                        Refund refund = new()
                        {
                            Dt_Rf_Applied = DateTime.Now,
                            Person = "Patient",
                            Reason = "Patient No Show",
                            Appointment_Id = appointment.Id
                        };
                        _context.Appointment_Tbl.Update(appointment);
                        await _context.Refund_Tbl.AddAsync(refund);
                        await _context.SaveChangesAsync();
                    }
                }
                
                if (Upcoming == 1)
                {
                    var query = from a in _context.Appointment_Tbl.Where(x => x.UserId == user.Id && x.Payment == true && x.Canceled == false && x.Completed == false)
                                join u in _context.Users on a.UserId equals u.Id 
                                join s in _context.Slot_Tbl.OrderBy(x => x.Date).ThenBy(x => x.Time) on a.SlotId equals s.Id
                                join sh in _context.Schedule_Tbl on s.ScheduleId equals sh.Id
                                join d in _context.Doctor_Tbl on sh.DoctorId equals d.Id
                                join u2 in _context.Users on d.UserId equals u2.Id
                                select new AppointmentPanel
                                {
                                    FName = u2.Fname,
                                    Lname = u2.Lname,
                                    Appointment_ID = a.Id,
                                    App_Time = s.Date.Add(s.Time).ToString("dddd, hh:mm tt"),
                                    App_Date = s.Date.ToString("dd MMM"),
                                    Cancelled = a.Canceled,
                                    Completed = a.Completed,
                                    Mode = sh.Mode,
                                    Speciality = d.Speciality

                                };
                    page--;
                    
                    return query;
                }
                else
                {
                    var query = from a in _context.Appointment_Tbl.Where(x => x.UserId == user.Id && x.Payment == true && (x.Canceled == true || x.Completed == true))
                                join u in _context.Users on a.UserId equals u.Id
                                join s in _context.Slot_Tbl.OrderBy(x => x.Date).ThenBy(x => x.Time) on a.SlotId equals s.Id
                                join sh in _context.Schedule_Tbl on s.ScheduleId equals sh.Id
                                join d in _context.Doctor_Tbl on sh.DoctorId equals d.Id
                                join u2 in _context.Users on d.UserId equals u2.Id
                                select new AppointmentPanel
                                {
                                    FName = u2.Fname,
                                    Lname = u2.Lname,
                                    Appointment_ID = a.Id,
                                    App_Time = s.Date.Add(s.Time).ToString("dddd, hh:mm tt"),
                                    App_Date = s.Date.ToString("dd MMM"),
                                    Cancelled = a.Canceled,
                                    Completed = a.Completed,
                                    Speciality = d.Speciality,
                                    Mode = sh.Mode

                                };
                    page--;
                    
                    return query;
                }
            }
            else
            {
                
                    if (Upcoming == 1)
                {
                    var query = from a in _context.Appointment_Tbl.Where(x =>x.Payment == true && x.Canceled == false && x.Completed == false)
                                join u in _context.Users on a.UserId equals u.Id
                                join s in _context.Slot_Tbl.OrderBy(x => x.Date).ThenBy(x => x.Time) on a.SlotId equals s.Id
                                join sh in _context.Schedule_Tbl on s.ScheduleId equals sh.Id
                                join d in _context.Doctor_Tbl.Where(x => x.UserId == user.Id) on sh.DoctorId equals d.Id
                                join u2 in _context.Users on d.UserId equals u2.Id
                                select new AppointmentPanel
                                {
                                    FName = u.Fname,
                                    Lname = u.Lname,
                                    Appointment_ID = a.Id,
                                    App_Time = s.Date.Add(s.Time).ToString("dddd, hh:mm tt"),
                                    App_Date = s.Date.ToString("dd MMM"),
                                    Cancelled = a.Canceled,
                                    Completed = a.Completed,
                                    Mode = sh.Mode,

                                    Speciality = d.Speciality
                                };
                    page--;
                    return query;
                }
                else
                {
                    var query = from d in _context.Doctor_Tbl.Where(x => x.UserId == user.Id) 
                                join sh in _context.Schedule_Tbl on d.Id equals sh.DoctorId
                                join s in _context.Slot_Tbl.OrderBy(x => x.Date).ThenBy(x => x.Time) on sh.Id equals s.ScheduleId
                                join a in _context.Appointment_Tbl.Where(x=> x.Payment ==true && x.Canceled == true || x.Completed == true) on s.Id equals a.SlotId
                                join u in _context.Users on a.UserId equals u.Id
                                //join u2 in _context.Users on d.UserId equals u2.Id
                                select new AppointmentPanel
                                {
                                    FName = u.Fname,
                                    Lname = u.Lname,
                                    Appointment_ID = a.Id,
                                    App_Time = s.Date.Add(s.Time).ToString("dddd, hh:mm tt"),
                                    App_Date = s.Date.ToString("dd MMM"),
                                    Cancelled = a.Canceled,
                                    Completed = a.Completed,
                                    Mode = sh.Mode,

                                    Speciality = d.Speciality

                                };
                    page--;
                    return query;
                }
            }
        }

        public async Task<IEnumerable<AppointmentPanel>> GetPayments(string Email, int Doctor,int Page)
        {
            var user = await _userManager.FindByEmailAsync(Email);
            List<AppointmentPanel> appointmentPanels = new List<AppointmentPanel>();
            if (Doctor == 0)
            {
                Page--;
                var appointments = await _context.Appointment_Tbl.Where(x => x.UserId == user.Id).ToListAsync();
                foreach (var appointment in appointments)
                {
                    var slot = await _context.Slot_Tbl.FindAsync(appointment.SlotId);
                    var schedule = await _context.Schedule_Tbl.FindAsync(slot.ScheduleId);
                    var doctor = await _context.Doctor_Tbl.FindAsync(schedule.DoctorId);
                    var doctoruser = await _context.Users.FindAsync(doctor.UserId);
                    AppointmentPanel appointmentPanel = new()
                    {
                        FName = doctoruser.Fname,
                        Lname = doctoruser.Lname,
                        App_Time = slot.Date.Add(slot.Time).ToString("dddd, hh:mm tt"),
                        App_Date = slot.Date.ToString("dd MMM"),
                        Cancelled = appointment.Canceled,
                        Completed = appointment.Completed,
                        Mode = schedule.Mode,
                        Price = doctor.Price,
                        Speciality = doctor.Speciality,
                        Appointment_ID = appointment.Id
                    };

                    var refunds = await _context.Refund_Tbl.Where(x => x.Appointment_Id == appointment.Id).FirstOrDefaultAsync();
                    if (refunds != null && DateTime.Compare(refunds.Dt_Refunded, DateTime.Now) > 0)
                    {
                        appointmentPanel.Refund = true;
                        if (refunds.AmountRefunded != 0)
                        {
                            appointmentPanel.AmountRefunded = refunds.AmountRefunded;
                        }
                    }
                    else
                    {
                        appointmentPanel.Refund = false;
                    }
                    appointmentPanels.Add(appointmentPanel);
                }
                return appointmentPanels;
            }
            else
            {
                var doctor = await _context.Doctor_Tbl.Where(x => x.UserId == user.Id).FirstOrDefaultAsync();
                var appointments = await _context.Appointment_Tbl.Where(x => x.Completed == true).ToListAsync();
                foreach (var appointment in appointments)
                {
                    var payment = await _context.Payment_Doctor_Tbl.Where(x => x.Appointment_Id == appointment.Id).FirstOrDefaultAsync();
                    if (payment != null)
                    {
                        var slot = await _context.Slot_Tbl.FindAsync(appointment.SlotId);
                        var schedule = await _context.Schedule_Tbl.FindAsync(slot.ScheduleId);
                    
                        AppointmentPanel appointmentPanel = new()
                        {
                            FName = slot.Date.Add(slot.Time).ToString("dddd, hh:mm tt"),
                            Lname = slot.Date.ToString("dd MMM"),

                            App_Time = payment.Date_Paid.Add(slot.Time).ToString("dddd, hh:mm tt"),
                            App_Date = payment.Date_Paid.ToString("dd MMM"),

                            //Cancelled = appointment.Canceled,
                            //Completed = appointment.Completed,

                            Mode = schedule.Mode,
                            Price = payment.Amount,
                            Speciality = doctor.Speciality,

                            Appointment_ID = appointment.Id
                        };
                        appointmentPanels.Add(appointmentPanel);
                    }


                }
                return appointmentPanels;
            }
            //return null;
        }

        public async Task<EditProfile> GetProfile(string Email)
        {
            var user = await _userManager.FindByEmailAsync(Email);
            var result = _mapper.Map<EditProfile>(user);
            result.BirthDate = result.BirthDate.Date;
            return result;
        }

        public async Task<List<MedicalRecordsView_Model>> MedicalRecordsView_Models(string Email)
        {
            var user = await _userManager.FindByEmailAsync(Email);
            var medicalrecords = await _context.MedicalRecords_Tbl.Where(x => x.User_Id == user.Id).ToListAsync();
            var getmedicalrecord = _mapper.Map<List<MedicalRecordsView_Model>>(medicalrecords);
            for(int i= 0;i<getmedicalrecord.Count;i++)
            {
                getmedicalrecord[i].Date = medicalrecords[i].DateTime_Uploaded.ToString("dd MMM");
                getmedicalrecord[i].Time = medicalrecords[i].DateTime_Uploaded.ToString("dddd, hh:mm tt");
            }
            return getmedicalrecord;
        }

        public async Task<IEnumerable<FindDoctor>> PatientsDoctor(string Email)
        {
            var query = from u in _context.Users.Where(x => x.Email == Email)
                        join a in _context.Appointment_Tbl.OrderByDescending(x => x.DateTime) on u.Id equals a.UserId
                        join s in _context.Slot_Tbl on a.SlotId equals s.Id
                        join sch in _context.Schedule_Tbl on s.ScheduleId equals sch.Id
                        join d in _context.Doctor_Tbl on sch.DoctorId equals d.Id
                        //group d by d.Id into t
                        join userd in _context.Users on d.UserId equals userd.Id
                        select new FindDoctor
                        {
                            Fname = userd.Fname,
                            Lname = userd.Lname,
                            ProfilePhoto = userd.ProfilePicture,
                            Speciality = d.Speciality,
                            Url = d.Id.ToString()
                        };
            return query.Distinct();
        }

        public async Task<string> SharewithDoctor(string Email,DoctorMedicalShare doctorMedicalShare)
        {
            var user = await _userManager.FindByEmailAsync(Email);
            var record = await _context.MedicalRecords_Tbl.Where(x => x.User_Id == user.Id && x.Id == doctorMedicalShare.Id).FirstOrDefaultAsync();

            foreach(var doc in doctorMedicalShare.Docs)
            {
                var doctor = await _context.Doctor_Tbl.FindAsync(doc);

                if (doctor != null)
                {
                    var doctorshare = await _context.PatientRecorddsDoctors_Tbl.Where(x => x.Doctor_Id == doc && x.MedicalRecord_Id == record.Id).FirstOrDefaultAsync();

                    if (doctorshare != null)
                    {
                        return "Already Exist";
                    }

                    var share = new PatientRecorddsDoctor()
                    {
                        MedicalRecord_Id = record.Id,
                        Doctor_Id = doc
                    };
                    await _context.PatientRecorddsDoctors_Tbl.AddAsync(share);
                   
                }

            }
            await _context.SaveChangesAsync();
            return "Okay";
        }

        public async Task<List<MedicalRepeatfilesModel>> UploadMedical(string Email,UploadMedicalRecords uploadMedicalRecords)
        {
            var user = await _userManager.FindByEmailAsync(Email);
            int k=0;
            string webroot = _webHostEnvironment.WebRootPath;
            List<MedicalRepeatfilesModel> medicalRepeatfilesModels = new();

            if (!Directory.Exists(webroot+"/MedicalRecords/"+user.Id))
            {
                DirectoryInfo di = Directory.CreateDirectory(webroot+"/MedicalRecords/"+user.Id);
            }

            for (int i = 0; i < uploadMedicalRecords.FormFiles.Length; i++)
            {
                if (File.Exists(webroot + "/MedicalRecords/" + user.Id + "/" + uploadMedicalRecords.FormFiles[i].FileName) && uploadMedicalRecords.Change == false)
                {
                    MedicalRepeatfilesModel medicalRepeatfilesModel = new()
                    {
                        Index = i,
                        Filename = uploadMedicalRecords.FormFiles[i].FileName
                    };
                    medicalRepeatfilesModels.Add(medicalRepeatfilesModel);
                    k = 1;
                }
                else
                {
                    var extension = Path.GetExtension(uploadMedicalRecords.FormFiles[i].FileName);

                    var med = await _context.MedicalRecords_Tbl.Where(x => x.Filename == uploadMedicalRecords.FormFiles[i].FileName && x.Pathname == "/MedicalRecords/" + user.Id + "/" + uploadMedicalRecords.FormFiles[i].FileName).FirstOrDefaultAsync();
                    if (med != null)
                    {
                        _context.MedicalRecords_Tbl.Remove(med);
                    }

                    using (FileStream fileStream = System.IO.File.Create(webroot + "/MedicalRecords/" + user.Id + "/" + uploadMedicalRecords.FormFiles[i].FileName))
                    {
                        await uploadMedicalRecords.FormFiles[i].CopyToAsync(fileStream);
                        fileStream.Flush();
                    }

                    MedicalRecords_ medicalRecords_ = new()
                    {
                        Filename = uploadMedicalRecords.FormFiles[i].FileName,
                        Extension = extension,
                        Pathname = "/MedicalRecords/" + user.Id + "/" + uploadMedicalRecords.FormFiles[i].FileName,
                        User_Id = user.Id,
                        DateTime_Uploaded = DateTime.Now,
                        Type = uploadMedicalRecords.FileType
                    };

                    await _context.MedicalRecords_Tbl.AddAsync(medicalRecords_);
                }
            }
            await _context.SaveChangesAsync();

            if (k != 0)
            {
                return medicalRepeatfilesModels;
            }
            return null;

        }
    }
}
