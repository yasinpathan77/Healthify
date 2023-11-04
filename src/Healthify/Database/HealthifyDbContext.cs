using System;
using Healthify.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Healthify.Database
{
    public class HealthifyDbContext : IdentityDbContext<User_>
    {

        public HealthifyDbContext(DbContextOptions<HealthifyDbContext> options )
            : base (options)
        {

        }


        public DbSet<OtpModel> Otp_Datatbl { get; set; }

        public DbSet<Doctor_Table> Doctor_Tbl { get; set; }

        public DbSet<Schedule> Schedule_Tbl { get; set; }

        public DbSet<Slot> Slot_Tbl { get; set; }

        public DbSet<Refund> Refund_Tbl { get; set; }

        public DbSet<SomeOneElse> SomeOneElse_Tbl { get; set; }

        public DbSet<Appointment> Appointment_Tbl { get; set; }

        public DbSet<Payment_SuccessFull> Payment_SuccessFull_Tbl { get; set; }

        public DbSet<AppointmentOtp> AppointmentOtp_Tbl { get; set; }

        public DbSet<FeedBAck> FeedBAcks_Tbl{ get; set; }

        public DbSet<MedicalRecords_> MedicalRecords_Tbl { get; set; }

        public DbSet<PatientRecorddsDoctor> PatientRecorddsDoctors_Tbl  { get; set; }

        public DbSet<PaymentDoctor> Payment_Doctor_Tbl { get; set; }


    }
}
