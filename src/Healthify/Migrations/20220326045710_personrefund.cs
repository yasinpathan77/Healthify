using Microsoft.EntityFrameworkCore.Migrations;

namespace Healthify.Migrations
{
    public partial class personrefund : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Person",
                table: "Refund_Tbl",
                nullable: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Person",
                table: "Refund_Tbl");
        }
    }
}
