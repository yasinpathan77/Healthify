using System;
using Microsoft.EntityFrameworkCore.Migrations;
using MySql.Data.EntityFrameworkCore.Metadata;

namespace Healthify.Migrations
{
    public partial class appointment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Appointment_Tbl",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    SlotId = table.Column<long>(nullable: false),
                    Order_Id = table.Column<string>(nullable: false),
                    UserId = table.Column<string>(maxLength: 767,nullable: false),
                    Payment = table.Column<bool>(nullable: false),
                    Canceled = table.Column<bool>(nullable: false),
                    DateTime = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Appointment_Tbl", x => x.Id);
                    table.ForeignKey(
                        name: "Fk_Appointment_Tbl_FK_AspNetUsers_ID",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "Fk_Appointment_Tbl_FK_Slot_Tbl_ID",
                        column: x => x.SlotId,
                        principalTable: "Slot_Tbl",
                        principalColumn: "Id");

                });

            migrationBuilder.CreateTable(
                name: "SomeOneElse_Tbl",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Appointment_Id = table.Column<int>(nullable: false),
                    Fname = table.Column<string>(nullable: false),
                    Lname = table.Column<string>(nullable: false),
                    Email = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SomeOneElse_Tbl", x => x.Id);
                    table.ForeignKey(
                        name: "Fk_Appointment_Tbl_FK_Appointment_ID",
                        column: x => x.Appointment_Id,
                        principalTable: "Appointment_Tbl",
                        principalColumn: "Id");
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Appointment_Tbl");

            migrationBuilder.DropTable(
                name: "SomeOneElse_Tbl");
        }
    }
}
