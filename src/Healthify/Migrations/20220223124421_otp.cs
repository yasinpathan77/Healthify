using System;
using Microsoft.EntityFrameworkCore.Migrations;
using MySql.Data.EntityFrameworkCore.Metadata;

namespace Healthify.Migrations
{
    public partial class otp : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
           

            migrationBuilder.CreateTable(
                name: "Otp_Datatbl",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false),
                    UserID = table.Column<string>(maxLength: 767, nullable: false),
                    OtpValue = table.Column<int>(nullable: false),
                    DateTime = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Otp_Datatbl", x => x.ID);
                    table.ForeignKey(
                        name: "FK_AspNetUsers_ID",
                        column: x => x.UserID,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        
    }
}
