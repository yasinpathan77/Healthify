using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Healthify.Migrations
{
    public partial class endandstartsheduledate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Date",
                table: "Schedule_Tbl");

            migrationBuilder.AddColumn<DateTime>(
                name: "EndDate",
                table: "Schedule_Tbl",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "StartDate",
                table: "Schedule_Tbl",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EndDate",
                table: "Schedule_Tbl");

            migrationBuilder.DropColumn(
                name: "StartDate",
                table: "Schedule_Tbl");

            migrationBuilder.AddColumn<DateTime>(
                name: "Date",
                table: "Schedule_Tbl",
                type: "datetime",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
