using System;
using System.Threading.Tasks;
using Healthify.Models;

namespace Healthify.Services
{
    public interface IFilesService
    {
        Task<string> UploadImageAsync(FilesClass files, string Email);

        Task<string> UploadDoctorCertificateAsync(FilesClass files,User_ user);
    }
}
