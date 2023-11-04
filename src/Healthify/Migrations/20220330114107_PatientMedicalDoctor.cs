using Microsoft.EntityFrameworkCore.Migrations;
using MySql.Data.EntityFrameworkCore.Metadata;

namespace Healthify.Migrations
{
    public partial class PatientMedicalDoctor : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PatientRecorddsDoctors_Tbl",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    MedicalRecord_Id = table.Column<int>(nullable: false),
                    Doctor_Id = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PatientRecorddsDoctors_Tbl", x => x.Id);
                    table.ForeignKey(
                        name: "Fk_PatientRecorddsDoctors_Tbl_FK_MedicalRecords_Tbl_ID",
                        column: x => x.MedicalRecord_Id,
                        principalTable: "MedicalRecords_Tbl",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "Fk_PatientRecorddsDoctors_Tbl_FK_Doctor_Tbl_ID",
                        column: x => x.Doctor_Id,
                        principalTable: "Doctor_Tbl",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);


                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PatientRecorddsDoctors_Tbl");
        }
    }
}
