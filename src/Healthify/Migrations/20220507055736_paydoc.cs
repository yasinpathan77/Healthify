using System;
using Microsoft.EntityFrameworkCore.Migrations;
using MySql.Data.EntityFrameworkCore.Metadata;

namespace Healthify.Migrations
{
    public partial class paydoc : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Payment_Doctor_Tbl",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Appointment_Id = table.Column<int>(nullable: false),
                    Date_Paid = table.Column<DateTime>(nullable: false),
                    Amount = table.Column<float>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Payment_Doctor_Tbl", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Payment_Doctor_Tbl_ID_Fk_Appointment_Tbl",
                        column: x => x.Appointment_Id,
                        principalTable: "Appointment_Tbl",
                        principalColumn: "Id");
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Payment_Doctor_Tbl");
        }
    }
}
