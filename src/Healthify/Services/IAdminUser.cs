using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Healthify.Database;
using Healthify.Models;
using Healthify.OutPutModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.JsonPatch;

namespace Healthify.Services
{
    public interface IAdminUser
    {
        Task<IdentityResult> CreateRole(RoleModel roleModel);

        Task<IEnumerable<FindDoctor>> RequestDoctors();

        Task<List<User_>> GetDataAsync();

        Task<IdentityResult> DeletUserAsync(UserLogin user);

        Task<IList<string>> GetUserRoleAsync();

        Task<IEnumerable<DoctorUserDetails>> GetDoctors();

        Task<string> VerifyDoctorAsync(DoctorVerify doctor);

        Task<string> UpdateDoctor(int id, JsonPatchDocument jsonPatchDocument);

        Task<string> UpdateUser(string id, JsonPatchDocument jsonPatchDocument);

        Task<string> DeleteAppointment(int Id);

        Task<string> DatletePayment(int Id);

        Task<string> AddAdmin(string Id);

        Task<List<PatienPanelAppointment>> Appointments();

        IEnumerable<FindDoctor> Doctors();

        IEnumerable<User_> GetPatients();

        Task<IEnumerable<FindDoctor>> PaymentDoctor();


        Task<User_> User(string id);

        Task<string> PaymentDoc(DocPayment docPayment);

        Task<string> Refund(int appid);


        Task<Doctor_Table> Doctorthis(int id);

        Task<Stats_Data> Stats_Data();




    }
}
