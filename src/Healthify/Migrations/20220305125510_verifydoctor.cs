using Microsoft.EntityFrameworkCore.Migrations;

namespace Healthify.Migrations
{
    public partial class verifydoctor : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Awards",
                table: "Doctor_Tbl",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Education",
                table: "Doctor_Tbl",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Experience",
                table: "Doctor_Tbl",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ExperienceInTotal",
                table: "Doctor_Tbl",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Membership",
                table: "Doctor_Tbl",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Registration",
                table: "Doctor_Tbl",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Services",
                table: "Doctor_Tbl",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Specialization",
                table: "Doctor_Tbl",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Training",
                table: "Doctor_Tbl",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Awards",
                table: "Doctor_Tbl");

            migrationBuilder.DropColumn(
                name: "Education",
                table: "Doctor_Tbl");

            migrationBuilder.DropColumn(
                name: "Experience",
                table: "Doctor_Tbl");

            migrationBuilder.DropColumn(
                name: "ExperienceInTotal",
                table: "Doctor_Tbl");

            migrationBuilder.DropColumn(
                name: "Membership",
                table: "Doctor_Tbl");

            migrationBuilder.DropColumn(
                name: "Registration",
                table: "Doctor_Tbl");

            migrationBuilder.DropColumn(
                name: "Services",
                table: "Doctor_Tbl");

            migrationBuilder.DropColumn(
                name: "Specialization",
                table: "Doctor_Tbl");

            migrationBuilder.DropColumn(
                name: "Training",
                table: "Doctor_Tbl");
        }
    }
}
