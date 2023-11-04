using System;
using Microsoft.AspNetCore.Http;

namespace Healthify.Models
{
    public class UploadMedicalRecords
    {
        public string FileType { get; set; }

        public IFormFile[] FormFiles { get; set; }

        public bool Change { get; set; }

    }
}
