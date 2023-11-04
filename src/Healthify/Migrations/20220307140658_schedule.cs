using System;
using Microsoft.EntityFrameworkCore.Migrations;
using MySql.Data.EntityFrameworkCore.Metadata;

namespace Healthify.Migrations
{
    public partial class schedule : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Schedule_Tbl",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    DoctorId = table.Column<int>(nullable: false),
                    Date = table.Column<DateTime>(nullable: false),
                    Mode = table.Column<string>(nullable: false),
                    Duration = table.Column<string>(nullable: false),
                    StartTime = table.Column<TimeSpan>(nullable: false),
                    EndTime = table.Column<TimeSpan>(nullable: false),
                    Break1StartTime = table.Column<TimeSpan>(nullable: false),
                    Break1EndTime = table.Column<TimeSpan>(nullable: false),
                    Break2StartTime = table.Column<TimeSpan>(nullable: false),
                    Break2EndTime = table.Column<TimeSpan>(nullable: false),
                    Repeat = table.Column<bool>(nullable: false),
                    Sunday = table.Column<bool>(nullable: false),
                    Monday = table.Column<bool>(nullable: false),
                    Tuesday = table.Column<bool>(nullable: false),
                    Wednesday = table.Column<bool>(nullable: false),
                    Thursday = table.Column<bool>(nullable: false),
                    Friday = table.Column<bool>(nullable: false),
                    Saturday = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Schedule_Tbl", x => x.Id);
                    table.ForeignKey(
                        name: "Fk_Doctor_Tbl_",
                        column: x => x.DoctorId,
                        principalTable: "Doctor_Tbl",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Schedule_Tbl");
        }
    }
}
