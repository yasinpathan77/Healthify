using System;
using System.Threading.Tasks;
using AutoMapper;
using Healthify.Database;
using Healthify.Models;
using Microsoft.AspNetCore.Identity;

namespace Healthify.Services
{
    public class DoctorRegistration : IDoctorRegistration
    {
        private readonly IUserEmail _userEmail;
        private readonly IFilesService _filesService;
        private readonly IMapper _imapper;
        private readonly UserManager<User_> _userManager;
        private readonly HealthifyDbContext _context;

        public DoctorRegistration(IUserEmail userEmail, IFilesService filesService, IMapper imapper,UserManager<User_> userManager, HealthifyDbContext context)
        {
            _userEmail = userEmail;
            _filesService = filesService;
            _imapper = imapper;
            _userManager = userManager;
            _context = context;
        }

        public async Task<string> CreateDoctorPermissionAsync(DoctorModel doctor, string Email)
        {
            var user = await _userManager.FindByEmailAsync(Email);

            FilesClass profile = new FilesClass { File = doctor.ProfilePicture};

            var profilepicture = await _filesService.UploadImageAsync(profile, Email);

            if (profilepicture == null)
            {
                return "Not A Valid photo";
            }

            profile.File = doctor.DoctorCertificate;

            var certificate = await _filesService.UploadDoctorCertificateAsync(profile,user);

            if (certificate == null)
            {
                return "Enter Valid File";
            }

            user.Fname = doctor.Fname;
            user.Lname = doctor.Lname;
            user.BirthDate = doctor.BirthDate.Date;
            user.Gender = doctor.Gender;

            await _userManager.UpdateAsync(user);

            var doctormodel = _imapper.Map<Doctor_Table>(doctor);

            doctormodel.UserId = user.Id;
            doctormodel.DoctorCertificate = certificate;

            var result = await _context.Doctor_Tbl.AddAsync(doctormodel);

            await _context.SaveChangesAsync();

            var mailresult = _userEmail.SendOTP(user.Email,"Welcome To Healthify","We will contaction you in 15 days.");

            return result.ToString();

        }

        
    }
}
