using System;
using Microsoft.EntityFrameworkCore.Migrations;
using MySql.Data.EntityFrameworkCore.Metadata;

namespace Healthify.Migrations
{
    public partial class appointmentotp_tbl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AppointmentOtp_Tbl",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Appointment_Id = table.Column<int>(nullable: false),
                    OtpValue = table.Column<int>(nullable: false),
                    DateTime = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppointmentOtp_Tbl", x => x.ID);
                    table.ForeignKey(
                        name: "FK_AppointmentOtp_Tbl_ID_Fk_Appointment_Tbl",
                        column: x => x.Appointment_Id,
                        principalTable: "Appointment_Tbl",
                        principalColumn: "Id");
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppointmentOtp_Tbl");
        }
    }
}
