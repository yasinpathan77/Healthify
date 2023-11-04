using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Healthify.OutPutModel
{
    public class DoctorDetails
    {
        public string ProfilePhoto { get; set; }

        public string Fname { get; set; }

        public string Lname { get; set; }

        public string Speciality { get; set; }

        public string ClinicNumber { get; set; }

        public string RoomNumber { get; set; }

        public string Street { get; set; }

        public string ClinicName { get; set; }

        public string State { get; set; }

        public string City { get; set; }

        public int Pincode { get; set; }

        public int ExperienceInTotal { get; set; }

        public string[] Membership { get; set; }

        public string[] Education { get; set; }

        public string[] Specialization { get; set; }

        public string[] Awards { get; set; }

        public string[] Services { get; set; }

        public string[] Experience { get; set; }

        public string Registration { get; set; }

        public string[] Training { get; set; }

        public string[] Schedule { get; set; }

        public int Price { get; set; }

        public string Description { get; set; }


    }
}
