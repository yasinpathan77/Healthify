using System;
using Microsoft.EntityFrameworkCore.Migrations;
using MySql.Data.EntityFrameworkCore.Metadata;

namespace Healthify.Migrations
{
    public partial class payment_doctor : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Payment_Doctor_Tbl",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Paid_Date = table.Column<DateTime>(nullable: false),
                    Doctor_Id = table.Column<int>(nullable: false),
                    Amount_Paid = table.Column<float>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Payment_Doctor_Tbl", x => x.Id);
                    table.ForeignKey(
                        name: "Fk_Doctor_Tbl_Fk_Payment_Doctor_Tbl",
                        column: x => x.Doctor_Id,
                        principalTable: "Doctor_Tbl",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Payment_Doctor_Tbl");
        }
    }
}
