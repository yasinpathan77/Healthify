using Microsoft.EntityFrameworkCore.Migrations;

namespace Healthify.Migrations
{
    public partial class clinicnamsndes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ClinicName",
                table: "Doctor_Tbl",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Doctor_Tbl",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ClinicName",
                table: "Doctor_Tbl");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Doctor_Tbl");
        }
    }
}
