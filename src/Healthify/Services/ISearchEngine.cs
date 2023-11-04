using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Healthify.OutPutModel;

namespace Healthify.Services
{
    public interface ISearchEngine
    {
        Task<IEnumerable<FindDoctor>> FindAllDoctorAsync(int Page,string speciality, bool Videoconsult, int problem);

        Task<DoctorDetails> DoctorDetails(int DoctorId);

        Task<List<SlotOutput>> DoctorSlots(int DoctorId,string mode);

        Task<IQueryable<DoctorPatient>> DoctorPatient(int doctorid, string mode, string date, string time);

        Task<IEnumerable<FindDoctor>> SearchBar(string name);



    }
}
