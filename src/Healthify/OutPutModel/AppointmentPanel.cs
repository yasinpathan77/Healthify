using System;
namespace Healthify.OutPutModel
{
    public class AppointmentPanel
    {
        public string App_Date { get; set; }

        public string App_Time { get; set; }

        public int Appointment_ID { get; set; }

        public string Mode { get; set; }

        public string FName { get; set; }

        public string Lname { get; set; }

        public bool Completed { get; set; }

        public bool Cancelled { get; set; }

        public bool Refund { get; set; }

        public string Speciality { get; set; }

        public float Price { get; set; }

        public int AmountRefunded { get; set; }

    }
}
