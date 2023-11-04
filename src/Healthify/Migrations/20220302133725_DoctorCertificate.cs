using Microsoft.EntityFrameworkCore.Migrations;

namespace Healthify.Migrations
{
    public partial class DoctorCertificate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DoctorCertificate",
                table: "Doctor_Tbl",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DoctorCertificate",
                table: "Doctor_Tbl");
        }
    }
}
