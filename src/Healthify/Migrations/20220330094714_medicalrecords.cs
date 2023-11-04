using System;
using Microsoft.EntityFrameworkCore.Migrations;
using MySql.Data.EntityFrameworkCore.Metadata;

namespace Healthify.Migrations
{
    public partial class medicalrecords : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MedicalRecords_Tbl",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Type = table.Column<string>(nullable: false),
                    Pathname = table.Column<string>(nullable: false),
                    Filename = table.Column<string>(nullable: false),
                    Extension = table.Column<string>(nullable: false),
                    DateTime_Uploaded = table.Column<DateTime>(nullable: false),
                    User_Id = table.Column<string>(maxLength:767,nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MedicalRecords_Tbl", x => x.Id);
                    table.ForeignKey(
                        name: "Fk_MedicalRecords_Tbl_FK_AspNetUsers_ID",
                        column: x => x.User_Id,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MedicalRecords_Tbl");
        }
    }
}
