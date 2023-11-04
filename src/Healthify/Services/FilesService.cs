using System;
using System.IO;
using System.Threading.Tasks;
using Healthify.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;

namespace Healthify.Services
{
    public class FilesService : IFilesService
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly UserManager<User_> _userManager;

        public FilesService(IWebHostEnvironment webHostEnvironment, UserManager<User_> userManager)
        {
            _webHostEnvironment = webHostEnvironment;
            _userManager = userManager;
        }

        public async Task<string> UploadImageAsync(FilesClass files,string Email)
        {
            string webroot = _webHostEnvironment.WebRootPath;

            var user = await  _userManager.FindByEmailAsync(Email);

            var extension = Path.GetExtension(files.File.FileName);

            if (extension != ".jpeg" && extension != ".jpg" && extension != ".png")
            {
                return null;
            }

            using (FileStream fileStream = System.IO.File.Create(webroot + "/Profile/" + user.UserName + extension))
            {
                await files.File.CopyToAsync(fileStream);
                fileStream.Flush();
                user.ProfilePicture = "/Profile/" + user.UserName + extension;
                await _userManager.UpdateAsync(user);
                return "File Created";
            }
            
        }

        public async Task<string> UploadDoctorCertificateAsync(FilesClass files,User_ user)
        {
            string webroot = _webHostEnvironment.WebRootPath;

            var extension = Path.GetExtension(files.File.FileName);

            if (extension != ".jpeg" && extension != ".jpg" && extension != ".png" && extension != ".pdf")
            {
                return null;
            }

            using (FileStream fileStream = System.IO.File.Create(webroot + "/DoctorCertificate/" + user.UserName + extension))
            {
                await files.File.CopyToAsync(fileStream);
                fileStream.Flush();
                return "/DoctorCertificate/" + user.UserName + extension;
            }
        }
    }
}
