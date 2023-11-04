using Microsoft.EntityFrameworkCore.Migrations;

namespace Healthify.Migrations
{
    public partial class doctormeet : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Meet",
                table: "Doctor_Tbl",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Schedule",
                table: "Doctor_Tbl",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Meet",
                table: "Doctor_Tbl");

            migrationBuilder.DropColumn(
                name: "Schedule",
                table: "Doctor_Tbl");
        }
    }
}
