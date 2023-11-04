using System;
using System.Collections.Generic;

namespace Healthify.OutPutModel
{
    public class PatienPanelAppointment
    {
        public string RoomNumber { get; set; }

        public string Experience { get; set; }

        public string Meet { get; set; }


        public string Message { get; set; }

        public string ClinicName { get; set; }

        public string ProfilePicture { get; set; }

        public string Date { get; set; }

        public string Email { get; set; }

        public string App_Time { get; set; }

        public bool FeedBack { get; set; }

        public int Appointment_ID { get; set; }

        public string Mode { get; set; }

        public string FName { get; set; }

        public string Lname { get; set; }

        public string Doc_Fname { get; set; }

        public string Doc_Lname { get; set; }

        public int Price { get; set; }

        public bool Completed { get; set; }

        public bool Cancelled { get; set; }

        public bool Refund { get; set; }

        public bool SomeOneElse { get; set; }

        public string Speciality { get; set; }
        
        public string[] Specialization { get; set; }

        public string Reason { get; set; }

        public string Person { get; set; }

        public string Dt_Rf_Applied { get; set; }

        public string Dt_Refunded { get; set; }

        public string Street { get; set; }


        public string Country { get; set; }

        public string State { get; set; }

        public string City { get; set; }

        public int Pincode { get; set; }
    }
}
