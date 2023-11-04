using Microsoft.EntityFrameworkCore.Migrations;
using MySql.Data.EntityFrameworkCore.Metadata;

namespace Healthify.Migrations
{
    public partial class paymenttable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Payment_SuccessFull_Tbl",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Appointment_Id = table.Column<int>(nullable: false),
                    razorpay_payment_id = table.Column<string>(nullable: false),
                    razorpay_order_id = table.Column<string>(nullable: false),
                    razorpay_signature = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Payment_SuccessFull_Tbl", x => x.Id);
                    table.ForeignKey(
                        name: "Fk_Payment_SuccessFull_Tbl_FK_Appointment_Tbl_ID",
                        column: x => x.Appointment_Id,
                        principalTable: "Appointment_Tbl",
                        principalColumn: "Id");
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Payment_SuccessFull_Tbl");
        }
    }
}
