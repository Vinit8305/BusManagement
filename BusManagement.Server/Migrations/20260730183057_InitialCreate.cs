using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BusManagement.Server.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BusInfo",
                columns: table => new
                {
                    BusId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BusNum = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    BusStartedDateAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BusInfo", x => x.BusId);
                });

            migrationBuilder.CreateTable(
                name: "EmployeeInfo",
                columns: table => new
                {
                    EmpId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Role = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ContactNumber = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    Salary = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    JoinDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    BusId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeInfo", x => x.EmpId);
                    table.ForeignKey(
                        name: "FK_EmployeeInfo_BusInfo_BusId",
                        column: x => x.BusId,
                        principalTable: "BusInfo",
                        principalColumn: "BusId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FuelInfo",
                columns: table => new
                {
                    FuelId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BusId = table.Column<int>(type: "int", nullable: false),
                    FuelQuentity = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    FuelAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    RefuleDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FuelInfo", x => x.FuelId);
                    table.ForeignKey(
                        name: "FK_FuelInfo_BusInfo_BusId",
                        column: x => x.BusId,
                        principalTable: "BusInfo",
                        principalColumn: "BusId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MeterInfo",
                columns: table => new
                {
                    MeterId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BusId = table.Column<int>(type: "int", nullable: false),
                    MMR = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    EMR = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    MMRImgUrl = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    EMRImgUrl = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    TravelDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MeterInfo", x => x.MeterId);
                    table.ForeignKey(
                        name: "FK_MeterInfo_BusInfo_BusId",
                        column: x => x.BusId,
                        principalTable: "BusInfo",
                        principalColumn: "BusId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DailyTripInfo",
                columns: table => new
                {
                    TripId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BusId = table.Column<int>(type: "int", nullable: false),
                    EmpId = table.Column<int>(type: "int", nullable: false),
                    FuelId = table.Column<int>(type: "int", nullable: false),
                    MeterId = table.Column<int>(type: "int", nullable: false),
                    TripDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DailyTripInfo", x => x.TripId);
                    table.ForeignKey(
                        name: "FK_DailyTripInfo_BusInfo_BusId",
                        column: x => x.BusId,
                        principalTable: "BusInfo",
                        principalColumn: "BusId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DailyTripInfo_EmployeeInfo_EmpId",
                        column: x => x.EmpId,
                        principalTable: "EmployeeInfo",
                        principalColumn: "EmpId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DailyTripInfo_FuelInfo_FuelId",
                        column: x => x.FuelId,
                        principalTable: "FuelInfo",
                        principalColumn: "FuelId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DailyTripInfo_MeterInfo_MeterId",
                        column: x => x.MeterId,
                        principalTable: "MeterInfo",
                        principalColumn: "MeterId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DailyTripInfo_BusId",
                table: "DailyTripInfo",
                column: "BusId");

            migrationBuilder.CreateIndex(
                name: "IX_DailyTripInfo_EmpId",
                table: "DailyTripInfo",
                column: "EmpId");

            migrationBuilder.CreateIndex(
                name: "IX_DailyTripInfo_FuelId",
                table: "DailyTripInfo",
                column: "FuelId");

            migrationBuilder.CreateIndex(
                name: "IX_DailyTripInfo_MeterId",
                table: "DailyTripInfo",
                column: "MeterId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeInfo_BusId",
                table: "EmployeeInfo",
                column: "BusId");

            migrationBuilder.CreateIndex(
                name: "IX_FuelInfo_BusId",
                table: "FuelInfo",
                column: "BusId");

            migrationBuilder.CreateIndex(
                name: "IX_MeterInfo_BusId",
                table: "MeterInfo",
                column: "BusId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DailyTripInfo");

            migrationBuilder.DropTable(
                name: "EmployeeInfo");

            migrationBuilder.DropTable(
                name: "FuelInfo");

            migrationBuilder.DropTable(
                name: "MeterInfo");

            migrationBuilder.DropTable(
                name: "BusInfo");
        }
    }
}
