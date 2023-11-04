using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Healthify.Database;
using Healthify.Models;
using Healthify.OutPutModel;

namespace Healthify.Services
{
    public interface IDoctorPanel
    {
        Month GetNextMonth(DateTime fromdate,int add);

        Month GetNextWeek(DateTime fromdate, int add);

        Month GetToday();

        Task<string> Createschedule(ScheduleModel model, string Email);

        Task<List<SlotOutput>> GetSlots(string Date,string Email, int Month, int Week, string mode);

        Month FromNowSevenDays(DateTime next);

        Task<string> DeleteSchedule(long id, string Email);

        Task<List<SevenDaySchedule>> GetSchedule(string id, string dateTime,string mode, int Month, int Week);

        Task<IEnumerable<MedicalRecordsView_Model>> MedicalRecordsView_(string Email);

    }

}
