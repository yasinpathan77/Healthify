using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Healthify.Models;
using Healthify.OutPutModel;

namespace Healthify.Services
{
    public interface IAppointmentService
    {
        Task<string> BookAppointment(string Email,BookAppointment bookAppointment);

        Task<IQueryable<AppointmentDetails>> AppointmentDetails(int Appointment_ID);

        Task<string> BookSlot(int Appointment_ID);

        Task<string> CheckoutValid(int Appointment_ID, CheckoutValid CheckoutValid);

        Task<IQueryable<PaymentSuccessfull>> PaymentSuccessfull(int Appointment_ID);

        Task<string> AppointmentMail(int Appointment_ID);

        string SendInvoice(string Mail,SendInvoiceMail Body);

        Task<PatienPanelAppointment> PatientPanelAppointment(int Appointment_ID);

        Task<string> CancellationOfAppointment(string Email,AppointmentCancellationModel appointmentCancellationModel);

        Task<string> PatientFeedBack(string Email, FeedbackfromPatient FeedBack);

        Task<IEnumerable<FeedbackPanel>> FeedbackPanels(string Email,int Doctor,int Page);

        Task<string> AppointmentSuccessfullOtp(AppointmentStartOtp appointmentStartOtp);



    }
}
