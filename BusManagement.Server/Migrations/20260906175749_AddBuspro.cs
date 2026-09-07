using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BusManagement.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddBuspro : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DailyTripInfo_BusInfo_BusId",
                table: "DailyTripInfo");

            migrationBuilder.DropForeignKey(
                name: "FK_EmployeeInfo_BusInfo_BusId",
                table: "EmployeeInfo");

            migrationBuilder.DropForeignKey(
                name: "FK_FuelInfo_BusInfo_BusId",
                table: "FuelInfo");

            migrationBuilder.DropForeignKey(
                name: "FK_MeterInfo_BusInfo_BusId",
                table: "MeterInfo");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BusInfo",
                table: "BusInfo");

            migrationBuilder.RenameTable(
                name: "BusInfo",
                newName: "Bus");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Bus",
                table: "Bus",
                column: "BusId");

            migrationBuilder.AddForeignKey(
                name: "FK_DailyTripInfo_Bus_BusId",
                table: "DailyTripInfo",
                column: "BusId",
                principalTable: "Bus",
                principalColumn: "BusId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeeInfo_Bus_BusId",
                table: "EmployeeInfo",
                column: "BusId",
                principalTable: "Bus",
                principalColumn: "BusId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_FuelInfo_Bus_BusId",
                table: "FuelInfo",
                column: "BusId",
                principalTable: "Bus",
                principalColumn: "BusId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MeterInfo_Bus_BusId",
                table: "MeterInfo",
                column: "BusId",
                principalTable: "Bus",
                principalColumn: "BusId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DailyTripInfo_Bus_BusId",
                table: "DailyTripInfo");

            migrationBuilder.DropForeignKey(
                name: "FK_EmployeeInfo_Bus_BusId",
                table: "EmployeeInfo");

            migrationBuilder.DropForeignKey(
                name: "FK_FuelInfo_Bus_BusId",
                table: "FuelInfo");

            migrationBuilder.DropForeignKey(
                name: "FK_MeterInfo_Bus_BusId",
                table: "MeterInfo");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Bus",
                table: "Bus");

            migrationBuilder.RenameTable(
                name: "Bus",
                newName: "BusInfo");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BusInfo",
                table: "BusInfo",
                column: "BusId");

            migrationBuilder.AddForeignKey(
                name: "FK_DailyTripInfo_BusInfo_BusId",
                table: "DailyTripInfo",
                column: "BusId",
                principalTable: "BusInfo",
                principalColumn: "BusId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeeInfo_BusInfo_BusId",
                table: "EmployeeInfo",
                column: "BusId",
                principalTable: "BusInfo",
                principalColumn: "BusId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_FuelInfo_BusInfo_BusId",
                table: "FuelInfo",
                column: "BusId",
                principalTable: "BusInfo",
                principalColumn: "BusId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MeterInfo_BusInfo_BusId",
                table: "MeterInfo",
                column: "BusId",
                principalTable: "BusInfo",
                principalColumn: "BusId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
