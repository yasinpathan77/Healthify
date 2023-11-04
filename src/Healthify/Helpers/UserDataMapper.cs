using System;
using System.Collections.Generic;
using AutoMapper;
using Healthify.Database;
using Healthify.Models;
using Healthify.OutPutModel;

namespace Healthify.Helpers
{
    public class UserDataMapper : Profile
    {
        public UserDataMapper()
        {
            CreateMap<Doctor_Table,DoctorModel > ().ReverseMap();
            CreateMap<Doctor_Table, User_>().ReverseMap();
            CreateMap<Schedule, ScheduleModel>().ReverseMap();
            CreateMap<Slot, SlotModel>().ReverseMap();
            CreateMap<Schedule, SchedulePanel>().ReverseMap();
            CreateMap<Appointment, BookAppointment>().ReverseMap();
            CreateMap<User_, EditProfile>().ReverseMap();
            CreateMap<SomeOneElse, BookAppointment>().ReverseMap();
            CreateMap<MedicalRecordsView_Model, MedicalRecords_>().ReverseMap();
            CreateMap<PaymentDoctor, DocPayment>().ReverseMap();


        }
    }
}
