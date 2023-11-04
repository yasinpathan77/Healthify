using Microsoft.EntityFrameworkCore.Migrations;

namespace Healthify.Migrations
{
    public partial class feedbackby : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Feedback_By",
                table: "FeedBAcks_Tbl",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Feedback_By",
                table: "FeedBAcks_Tbl");
        }
    }
}
