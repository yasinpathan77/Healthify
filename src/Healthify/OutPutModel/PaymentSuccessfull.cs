using System;
namespace Healthify.OutPutModel
{
    public class PaymentSuccessfull
    {
        public int Price { get; set; }

        public int Appointment_Id { get; set; }

        public string razorpay_payment_id { get; set; }

        public string razorpay_order_id { get; set; }

        public DateTime Date { get; set; }

        public string DoctorFName { get; set; }

        public string DoctorFLame { get; set; }


        public string App_Date { get; set; }

        public string App_Time { get; set; }

        public string PatientFName { get; set; }

        public string PatientLName { get; set; }


    }
}
