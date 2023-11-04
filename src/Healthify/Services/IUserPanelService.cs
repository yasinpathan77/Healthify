using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Healthify.Models;
using Healthify.OutPutModel;
using Microsoft.AspNetCore.JsonPatch;

namespace Healthify.Services
{
    public interface IUserPanelInterface
    {
        Task<EditProfile> GetProfile(string Email);

        Task<string> EditProfile(string Email, JsonPatchDocument jsonPatchDocument);

        Task<IQueryable<AppointmentPanel>> GetAppointmentPanel(string Email, int Doctor, int Upcoming,int Page);

        Task<IEnumerable<AppointmentPanel>> GetPayments(string Email, int Doctor, int Page);

        Task<List<MedicalRepeatfilesModel>> UploadMedical(string Email,UploadMedicalRecords uploadMedicalRecords);

        Task<string> DeleteMedicalRecord(string Email, int Id);

        Task<List<MedicalRecordsView_Model>> MedicalRecordsView_Models(string Email);


        Task<IEnumerable<FindDoctor>> PatientsDoctor(string Email);

        Task<string> SharewithDoctor(string Email,DoctorMedicalShare doctorMedicalShare);




    }
}
