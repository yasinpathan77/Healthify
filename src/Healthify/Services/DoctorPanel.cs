using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Healthify.Database;
using Healthify.Models;
using Healthify.OutPutModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Healthify.Services
{
    public class DoctorPanel : IDoctorPanel 
    {
        private readonly IMapper _imapper;
        private readonly UserManager<User_> _userManager;
        private readonly HealthifyDbContext _context;

        public DoctorPanel(IMapper imapper, UserManager<User_> userManager,HealthifyDbContext context)
        {
            _imapper = imapper;
            _userManager = userManager;
            _context = context;
        }

        public async Task<string> Createschedule(ScheduleModel model, string Email)
        {
            List<Schedule> oldschedule;
            var user = await _userManager.FindByEmailAsync(Email);
            var doctor = await _context.Doctor_Tbl.Where(x => x.UserId == user.Id).FirstOrDefaultAsync();
            double m = -1;
            if (DateTime.Parse(model.StartDate) < DateTime.Now.AddDays(m) || DateTime.Parse(model.StartDate) > DateTime.Now.AddMonths(1))
            {
                return "Cannot create schedule for after a month and cannot create schedule for previous day";
            }

            model.StartTime = DateTime.Parse(model.StartTime).ToString("HH:mm:ss");
            model.EndTime = DateTime.Parse(model.EndTime).ToString("HH:mm:ss");

            if (model.Break1StartTime != null)
            {
                model.Break1EndTime = DateTime.Parse(model.Break1EndTime).ToString("HH:mm:ss");
                model.Break1StartTime = DateTime.Parse(model.Break1StartTime).ToString("HH:mm:ss");
            }
            else
            {
                model.Break1EndTime = null;
                model.Break1StartTime = null;
            }
            if (model.Break1StartTime != null)
            {
                model.Break2EndTime = DateTime.Parse(model.Break2EndTime).ToString("HH:mm:ss");
                model.Break2StartTime = DateTime.Parse(model.Break2StartTime).ToString("HH:mm:ss");
            }
            else
            {
                model.Break2EndTime = null;
                model.Break2StartTime = null;
            }

            var schedule = _imapper.Map<Schedule>(model);
            schedule.DoctorId = doctor.Id;
            schedule.EndDate = DateTime.Parse(model.StartDate).AddMonths(1);

            if (model.Mode == "Both")
            {
               oldschedule = await _context.Schedule_Tbl.Where(x => x.DoctorId == doctor.Id &&  x.EndDate  > schedule.StartDate).ToListAsync();
            }
            else
            {
               oldschedule = await _context.Schedule_Tbl.Where(x => x.DoctorId == doctor.Id && x.Mode == model.Mode || x.Mode == "Both" && x.EndDate > schedule.StartDate).ToListAsync();

            }
            if (oldschedule.Count != 0)
            {
                foreach (var sch in oldschedule)
                {
                    if (sch.Monday == schedule.Monday && schedule.Monday == true ||
                        sch.Tuesday == schedule.Tuesday && schedule.Monday == true ||
                        sch.Wednesday == schedule.Wednesday && schedule.Monday == true ||
                        sch.Thursday == schedule.Thursday && schedule.Monday == true ||
                        sch.Friday == schedule.Friday && schedule.Monday == true ||
                        sch.Saturday == schedule.Saturday && schedule.Monday == true ||
                        sch.Sunday == schedule.Sunday && schedule.Monday == true ||
                        schedule.Repeat == sch.Repeat)
                    {

                        if (!(schedule.StartTime < sch.StartTime && schedule.EndTime > sch.EndTime ||
                                  schedule.StartTime >= sch.Break1StartTime && schedule.EndTime <= sch.Break1EndTime ||
                                  schedule.StartTime >= sch.Break2StartTime && schedule.EndTime <= sch.Break2EndTime))
                        {
                            var findslot = await _context.Slot_Tbl.Where(x => x.ScheduleId == sch.Id && x.Date > DateTime.Parse(model.StartDate)).ToListAsync();
                            foreach (var slot in findslot)
                            {
                                if (slot.Value == 1)
                                {
                                    return "There is an appointment at " + DateTime.Parse(slot.Time.ToString()).ToString("hh : mm tt") + slot.Date.ToString("ddd dd, MMMM yyyy");
                                }
                            }
                            if (schedule.Repeat == true)
                            {
                                await DeleteSlots(schedule.StartDate,sch.EndDate, sch.Id);
                                sch.EndDate = schedule.StartDate;
                                _context.Schedule_Tbl.Update(sch);
                                await _context.SaveChangesAsync();
                            }
                            else
                            {
                                DateTime dateTime = sch.EndDate;
                                //Delete Slot For that day
                                await DeleteSlots(schedule.StartDate, schedule.StartDate.Add(TimeSpan.Parse("23:59")), sch.Id);

                                //Update the Previous Schedule till that day
                                sch.EndDate = schedule.StartDate;
                                _context.Schedule_Tbl.Update(sch);
                                await _context.SaveChangesAsync();

                                //Create a schedule for that Day
                                schedule.EndDate = schedule.StartDate.Add(TimeSpan.Parse("23:59"));
                                await _context.Schedule_Tbl.AddAsync(schedule) ;
                                await _context.SaveChangesAsync();

                                //Create Slots for that Day
                                await CreateSlotAsync(schedule);

                                //Create schedule for after a month
                                schedule.StartDate = schedule.StartDate.Add(TimeSpan.Parse("23:59"));
                                schedule.EndDate = dateTime;
                                schedule.Id++;
                                var result = await _context.Schedule_Tbl.AddAsync(schedule);
                                await _context.SaveChangesAsync();
                                var newschedule = await _context.Schedule_Tbl.LastOrDefaultAsync();
                                var slots = await _context.Slot_Tbl.Where(x => x.ScheduleId == sch.Id && x.Date > schedule.StartDate).ToListAsync();
                                slots.ForEach(x => x.Id = newschedule.Id);
                                _context.Slot_Tbl.UpdateRange(slots);
                                await _context.SaveChangesAsync();

                                return "Okay";
                            }
                        }
                    }
                }
                await _context.SaveChangesAsync();
             }

            //schedule.StartDate = DateTime.Parse(model.StartDate);

            if (schedule.Repeat == false)
            {
                schedule.EndDate = schedule.StartDate.Add(TimeSpan.Parse("23:59"));
            }

            await _context.Schedule_Tbl.AddAsync(schedule);

            await _context.SaveChangesAsync();

            await CreateSlotAsync(schedule);

            return "model";
        }

        public async Task<SlotModel> CreateSlotAsync(Schedule schedule)
        {
            var previoustime = schedule.StartTime;
            var preDate = schedule.StartDate;
            while (preDate< schedule.EndDate)
            {
                List<SlotModel> slots = new();

                while (TimeSpan.Compare(previoustime, schedule.EndTime) != 0)
                {
                    SlotModel slot = new();
                    slot.ScheduleId = schedule.Id;
                    slot.Date = preDate;
                    if (!(TimeSpan.Compare(previoustime, schedule.Break1StartTime) >= 0
                        && TimeSpan.Compare(previoustime, schedule.Break1EndTime) < 0
                        ||
                        TimeSpan.Compare(previoustime, schedule.Break2StartTime) >= 0
                        && TimeSpan.Compare(previoustime, schedule.Break2EndTime) < 0))
                    {
                        if (schedule.Repeat == true)
                        {
                            if (preDate.DayOfWeek == DayOfWeek.Sunday && schedule.Sunday == true)
                            {
                                slot.Time = previoustime;
                                slot.Value = 0;
                                slots.Add(slot);
                                //slot = null;
                                //slottable = _imapper.Map<Slot>(slot);
                                //await _context.Slot_Tbl.AddAsync(slottable);
                            }
                            else if (preDate.DayOfWeek == DayOfWeek.Monday && schedule.Monday == true)
                            {
                                slot.Time = previoustime;
                                slot.Value = 0;
                                slots.Add(slot);
                                //slot = null;

                                //slottable = _imapper.Map<Slot>(slot);
                                //await _context.Slot_Tbl.AddAsync(slottable);
                            }
                            else if (preDate.DayOfWeek == DayOfWeek.Tuesday && schedule.Tuesday == true)
                            {
                                slot.Time = previoustime;
                                slot.Value = 0;
                                slots.Add(slot);
                                //slot = null;
                                //slottable = _imapper.Map<Slot>(slot);
                                //await _context.Slot_Tbl.AddAsync(slottable);
                            }
                            else if (preDate.DayOfWeek == DayOfWeek.Wednesday && schedule.Wednesday == true)
                            {
                                slot.Time = previoustime;
                                slot.Value = 0;
                                slots.Add(slot);
                                //slot = null;

                                //slottable = _imapper.Map<Slot>(slot);
                                //await _context.Slot_Tbl.AddAsync(slottable);
                            }
                            else if (preDate.DayOfWeek == DayOfWeek.Thursday && schedule.Thursday == true)
                            {
                                slot.Time = previoustime;
                                slot.Value = 0;
                                slots.Add(slot);
                                //slot = null;

                                //slottable = _imapper.Map<Slot>(slot);
                                //await _context.Slot_Tbl.AddAsync(slottable);
                            }
                            else if (preDate.DayOfWeek == DayOfWeek.Friday && schedule.Friday == true)
                            {
                                slot.Time = previoustime;
                                slot.Value = 0;
                                slots.Add(slot);
                                //slot = null;

                                //slottable = _imapper.Map<Slot>(slot);
                                //await _context.Slot_Tbl.AddAsync(slottable);
                            }
                            else if (preDate.DayOfWeek == DayOfWeek.Saturday && schedule.Saturday == true)
                            {
                                slot.Time = previoustime;
                                slot.Value = 0;
                                slots.Add(slot);
                                //slottable = _imapper.Map<Slot>(slot);
                                //await _context.Slot_Tbl.AddAsync(slottable);
                            }
                        }
                        else
                        {
                            slot.Time = previoustime;
                            slot.Value = 0;
                            slots.Add(slot);
                        }
                    }
                    previoustime = previoustime.Add(TimeSpan.FromMinutes(schedule.Duration));

                }
                var slotstbl = _imapper.Map<List<Slot>>(slots);
                await _context.Slot_Tbl.AddRangeAsync(slotstbl);
                await _context.SaveChangesAsync();
                if (schedule.Repeat != true)
                {
                    preDate = preDate.AddMonths(1);
                }
                else
                {
                    preDate = preDate.AddDays(1);
                }
                previoustime = schedule.StartTime ;
            }

            await _context.SaveChangesAsync();
            return null;
        }

        public Month GetNextMonth(DateTime date, int add)
        {
            DateTime next;
            if (add == 1)
            {
                date = date.AddMonths(1);
                next = new DateTime(date.Year, date.Month, 1);
                return GetSevenDays(next);
            }
            else
            {
                date = date.AddMonths(-1);
                next = new DateTime(date.Year, date.Month, 1);
                return GetSevenDays(next);
            }
        }

        public Month GetNextWeek(DateTime fromdate, int add)
        {
            if (add == 1)
            {
                return GetSevenDays(fromdate.AddDays(7));
            }

            return GetSevenDays(fromdate.AddDays(-7));
        }

        public Month GetSevenDays(DateTime next)
        {
            var nextmonth = new Month();

            if ( DayOfWeek.Sunday != next.DayOfWeek)
            {
                if (DayOfWeek.Monday == next.DayOfWeek)
                {
                    nextmonth.First = next.AddDays(-1).ToString("ddd dd, MMMM yyyy");
                    nextmonth.Second = next.ToString("ddd dd, MMMM yyyy");
                    nextmonth.Third = next.AddDays(+1).ToString("ddd dd, MMMM yyyy");
                    nextmonth.Fourth = next.AddDays(+2).ToString("ddd dd, MMMM yyyy");
                    nextmonth.Fifth = next.AddDays(+3).ToString("ddd dd, MMMM yyyy");
                    nextmonth.Sixth = next.AddDays(+4).ToString("ddd dd, MMMM yyyy");
                    nextmonth.Seventh = next.AddDays(+5).ToString("ddd dd, MMMM yyyy");
                    return nextmonth;
                }

                else if (DayOfWeek.Tuesday == next.DayOfWeek)
                {
                    nextmonth.First = next.AddDays(-2).ToString("ddd dd, MMMM yyyy");
                    nextmonth.Second = next.AddDays(-1).ToString("ddd dd, MMMM yyyy");
                    nextmonth.Third = next.ToString("ddd dd, MMMM yyyy");
                    nextmonth.Fourth = next.AddDays(+1).ToString("ddd dd, MMMM yyyy");
                    nextmonth.Fifth = next.AddDays(+2).ToString("ddd dd, MMMM yyyy");
                    nextmonth.Sixth = next.AddDays(+3).ToString("ddd dd, MMMM yyyy");
                    nextmonth.Seventh = next.AddDays(+4).ToString("ddd dd, MMMM yyyy");
                    return nextmonth;
                }

                else if (DayOfWeek.Wednesday == next.DayOfWeek)
                {
                    nextmonth.First = next.AddDays(-3).ToString("ddd dd, MMMM yyyy");
                    nextmonth.Second = next.AddDays(-2).ToString("ddd dd, MMMM yyyy");
                    nextmonth.Third = next.AddDays(-1).ToString("ddd dd, MMMM yyyy");
                    nextmonth.Fourth = next.ToString("ddd dd, MMMM yyyy");
                    nextmonth.Fifth = next.AddDays(+1).ToString("ddd dd, MMMM yyyy");
                    nextmonth.Sixth = next.AddDays(+2).ToString("ddd dd, MMMM yyyy");
                    nextmonth.Seventh = next.AddDays(+3).ToString("ddd dd, MMMM yyyy");
                    return nextmonth;
                }

                else if (DayOfWeek.Thursday == next.DayOfWeek)
                {
                    nextmonth.First = next.AddDays(-4).ToString("ddd dd, MMMM yyyy");
                    nextmonth.Second = next.AddDays(-3).ToString("ddd dd, MMMM yyyy");
                    nextmonth.Third = next.AddDays(-2).ToString("ddd dd, MMMM yyyy");
                    nextmonth.Fourth = next.AddDays(-1).ToString("ddd dd, MMMM yyyy");
                    nextmonth.Fifth = next.ToString("ddd dd, MMMM yyyy");
                    nextmonth.Sixth = next.AddDays(+1).ToString("ddd dd, MMMM yyyy");
                    nextmonth.Seventh = next.AddDays(+2).ToString("ddd dd, MMMM yyyy");
                    return nextmonth;
                }

                else if (DayOfWeek.Friday == next.DayOfWeek)
                {
                    nextmonth.First = next.AddDays(-5).ToString("ddd dd, MMMM yyyy");
                    nextmonth.Second = next.AddDays(-4).ToString("ddd dd, MMMM yyyy");
                    nextmonth.Third = next.AddDays(-3).ToString("ddd dd, MMMM yyyy");
                    nextmonth.Fourth = next.AddDays(-2).ToString("ddd dd, MMMM yyyy");
                    nextmonth.Fifth = next.AddDays(-1).ToString("ddd dd, MMMM yyyy");
                    nextmonth.Sixth = next.ToString("ddd dd, MMMM yyyy");
                    nextmonth.Seventh = next.AddDays(+1).ToString("ddd dd, MMMM yyyy");
                    return nextmonth;
                }

                else if (DayOfWeek.Saturday == next.DayOfWeek)
                {
                    nextmonth.First = next.AddDays(-6).ToString("ddd dd, MMMM yyyy");
                    nextmonth.Second = next.AddDays(-5).ToString("ddd dd, MMMM yyyy");
                    nextmonth.Third = next.AddDays(-4).ToString("ddd dd, MMMM yyyy");
                    nextmonth.Fourth = next.AddDays(-3).ToString("ddd dd, MMMM yyyy");
                    nextmonth.Fifth = next.AddDays(-2).ToString("ddd dd, MMMM yyyy");
                    nextmonth.Sixth = next.AddDays(-1).ToString("ddd dd, MMMM yyyy");
                    nextmonth.Seventh = next.ToString("ddd dd, MMMM yyyy");
                    return nextmonth;
                }
            }

            nextmonth.First = next.ToString("ddd dd, MMMM yyyy");
            nextmonth.Second = next.AddDays(+1).ToString("ddd dd, MMMM yyyy");
            nextmonth.Third = next.AddDays(+2).ToString("ddd dd, MMMM yyyy");
            nextmonth.Fourth = next.AddDays(+3).ToString("ddd dd, MMMM yyyy");
            nextmonth.Fifth = next.AddDays(+4).ToString("ddd dd, MMMM yyyy");
            nextmonth.Sixth = next.AddDays(+5).ToString("ddd dd, MMMM yyyy");
            nextmonth.Seventh = next.AddDays(+6).ToString("ddd dd, MMMM yyyy");

            return nextmonth;
            
        }

        public async Task<List<SlotOutput>> GetSlots(string Date,string Email, int Month, int Week, string Mode)
        {
            var user = await _userManager.FindByEmailAsync(Email);
            var doctor = await _context.Doctor_Tbl.Where(x => x.UserId == user.Id ).FirstOrDefaultAsync();
            List<Schedule> schedules;



            if (Mode != null)
            {
                schedules = await _context.Schedule_Tbl.Where(x => x.DoctorId == doctor.Id && x.Mode == Mode || x.Mode == "Both").ToListAsync();

            }
            else
            {
                schedules = await _context.Schedule_Tbl.Where(x => x.DoctorId == doctor.Id ).ToListAsync();

            }

            var thisdate = DateTime.Parse(Date);

            var Mor = DateTime.Parse("12:00 PM");
            var After = DateTime.Parse("5:00 PM");
            var Eve = DateTime.Parse("12:00 AM");
            List<SlotOutput> outslots = new List<SlotOutput>();
            
            Month week = new Month();
            List<Slot> slots;
            if (Month != 0)
            {
                if (Month == 1)
                {
                    week = GetNextMonth(DateTime.Parse(Date), Month);
                }
                else
                {
                    week = GetNextMonth(DateTime.Parse(Date), 0);
                }

            }
            else if (Week != 0)
            {
                if (Week == 1)
                {
                    week = GetNextWeek(DateTime.Parse(Date), Week);
                }
                else
                {
                    week = GetNextWeek(DateTime.Parse(Date), 0);
                }
            }
            else
            {
                week = GetSevenDays(thisdate);
            }
            for (int i=0;i<7;i++)
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
                List<string> Evening = new List<string>();
                foreach (var schedule in schedules)
                {
                        slots = await _context.Slot_Tbl.Where(x => x.ScheduleId == schedule.Id && x.Date == thisdate).ToListAsync();
                    
                    if (slots.Count != 0)
                    {
                        foreach (var slot in slots)
                        {
                            bool appointment = false;
                            if (slot.Value != 0)
                            {
                                appointment = true;
                            }
                            var okay = slot.Time.ToString();
                            var dateTime = DateTime.Parse(okay);
                            if (DateTime.Compare(dateTime, Mor) < 0 && DateTime.Compare(dateTime, Eve) > 0)
                            {
                                Morning.Add(dateTime.ToString("hh : mm tt") + "," + appointment.ToString());
                            }
                            else if (DateTime.Compare(dateTime, Mor) >= 0 && DateTime.Compare(dateTime, After) < 0)
                            {
                                Afternoon.Add(dateTime.ToString("hh : mm tt") + "," + appointment.ToString());
                            }
                            else
                            {
                                Evening.Add(dateTime.ToString("hh : mm tt") + "," + appointment.ToString());
                            }
                        }
                    }
                }

                Morning.Sort();
                Afternoon.Sort();
                Evening.Sort();
                var thisslot = new SlotOutput()
                {
                            Date = thisdate.ToString("ddd dd, MMMM yyyy"),
                            Morning = Morning,
                            Evening = Evening,
                            Afternoon = Afternoon

                };
                outslots.Add(thisslot);
                
            }
            return outslots;
        }

        public Month GetToday()
        {
            return GetSevenDays(DateTime.Now);
        }

        public Month FromNowSevenDays(DateTime next)
        {
            var nextmonth = new Month
            {
                First = next.ToString("ddd dd, MMMM yyyy"),
                Second = next.AddDays(+1).ToString("ddd dd, MMMM yyyy"),
                Third = next.AddDays(+2).ToString("ddd dd, MMMM yyyy"),
                Fourth = next.AddDays(+3).ToString("ddd dd, MMMM yyyy"),
                Fifth = next.AddDays(+4).ToString("ddd dd, MMMM yyyy"),
                Sixth = next.AddDays(+5).ToString("ddd dd, MMMM yyyy"),
                Seventh = next.AddDays(+6).ToString("ddd dd, MMMM yyyy")
            };
            return nextmonth;

        }

        public async Task<string> DeleteSlots(DateTime StartdateTime, DateTime EnddateTime, long scheduleid)
        {
            var slots = await _context.Slot_Tbl.Where(x => x.Date >= StartdateTime && x.Date <= EnddateTime && x.ScheduleId == scheduleid).ToListAsync();
            _context.Slot_Tbl.RemoveRange(slots);
            await _context.SaveChangesAsync();
            return null;
        }

        public async  Task<string> DeleteSchedule(long id, string Email)
        {
            var user = await _context.Users.Where(x => x.Email == Email).Select(x => x.Id).FirstOrDefaultAsync();
            var doctor = await _context.Doctor_Tbl.Where(x => x.UserId == user).FirstOrDefaultAsync();
            var result = await _context.Schedule_Tbl.Where(x => x.DoctorId == doctor.Id && x.Id == id).FirstOrDefaultAsync();
            var slots = await _context.Slot_Tbl.Where(x => x.ScheduleId == result.Id).ToListAsync();
            foreach (var slot in slots)
            {
                if (slot.Value != 0)
                {
                    return "Cannot delete schedule. There is an appointment at " + DateTime.Parse(slot.Time.ToString()).ToString("hh : mm tt") + "on" + slot.Date.ToString("d");
                }
            }
            _context.Schedule_Tbl.Remove(result);
            await _context.SaveChangesAsync();
            return "Okay";
        }

        public async Task<List<SevenDaySchedule>> GetSchedule(string Email, string dateTime,string mode, int Month, int Week)
        {
            var date = DateTime.Parse(dateTime);
            

            var user = await _userManager.FindByEmailAsync(Email);
            var doctor = await _context.Doctor_Tbl.Where(x => x.UserId == user.Id).FirstOrDefaultAsync();
            List<SevenDaySchedule> sevenDaySchedules = new List<SevenDaySchedule>();
            

            

            
                //var slots = await _context.Slot_Tbl.Where(x => x.Date == date).ToListAsync();

                //if (slots.Count != 0)
                //{
                //    foreach (var slot in slots)
                //    {
            var schedules = await _context.Schedule_Tbl.Where(x => x.Mode == mode && x.DoctorId == doctor.Id).ToListAsync();
            foreach (var schedule in schedules)
            {
                var slots = await _context.Slot_Tbl.Where(x => x.Date == date && x.ScheduleId == schedule.Id).ToListAsync();

                if (slots.Count != 0)
                {
                    if (DateTime.Compare(schedule.EndDate,DateTime.Now) > 0)
                    {
                        var schedulepanel = _imapper.Map<SchedulePanel>(schedule);

                        schedulepanel.StartTime = DateTime.Parse(schedule.StartTime.ToString()).ToString("hh:mm tt");
                        schedulepanel.EndTime = DateTime.Parse(schedule.EndTime.ToString()).ToString("hh:mm tt");
                        schedulepanel.Break1StartTime = DateTime.Parse(schedule.Break1StartTime.ToString()).ToString("hh:mm tt");
                        schedulepanel.Break1EndTime = DateTime.Parse(schedule.Break1EndTime.ToString()).ToString("hh:mm tt");
                        schedulepanel.Break2StartTime = DateTime.Parse(schedule.Break2StartTime.ToString()).ToString("hh:mm tt");
                        schedulepanel.Break2EndTime = DateTime.Parse(schedule.Break2EndTime.ToString()).ToString("hh:mm tt");

                        SevenDaySchedule sevenDaySchedule = new()
                        {
                            Date = date.ToString("ddd dd, MMMM yyyy"),
                            schedule = schedulepanel
                        };
                        sevenDaySchedules.Add(sevenDaySchedule);
                        break;
                    }
                    else
                    {
                        SevenDaySchedule sevenDaySchedule = new()
                        {
                            Date = date.ToString("ddd dd, MMMM yyyy"),
                            schedule = null
                        };
                        sevenDaySchedules.Add(sevenDaySchedule);
                    }
                }
            }
               

            

            return sevenDaySchedules;


        }

        public async Task<IEnumerable<MedicalRecordsView_Model>> MedicalRecordsView_(string Email)
        {
            var user = await _userManager.FindByEmailAsync(Email);
            var doctor = await _context.Doctor_Tbl.Where(x => x.UserId == user.Id).FirstOrDefaultAsync();
            var query = from s in _context.PatientRecorddsDoctors_Tbl.Where(x => x.Doctor_Id == doctor.Id)
                        join m in _context.MedicalRecords_Tbl on s.MedicalRecord_Id equals m.Id
                        join u in _context.Users on m.User_Id equals u.Id
                        select new MedicalRecordsView_Model
                        {
                            Fname = u.Fname,
                            Lname = u.Lname,
                            Pathname = m.Pathname,
                            Filename = m.Filename,
                            Date = m.DateTime_Uploaded.ToString("dd MMM"),
                            Time = m.DateTime_Uploaded.ToString("dddd, hh:mm tt"),
                            Type = m.Type
                        };

            return query;
        }
    }
}
