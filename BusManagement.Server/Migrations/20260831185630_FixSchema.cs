using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BusManagement.Server.Migrations
{
    /// <inheritdoc />
    public partial class FixSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DailyTripInfo_FuelInfo_FuelId",
                table: "DailyTripInfo");

            migrationBuilder.DropIndex(
                name: "IX_DailyTripInfo_FuelId",
                table: "DailyTripInfo");

            migrationBuilder.DropColumn(
                name: "FuelId",
                table: "DailyTripInfo");

            migrationBuilder.AddColumn<decimal>(
                name: "Average",
                table: "DailyTripInfo",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "BusNum",
                table: "DailyTripInfo",
                type: "nvarchar(150)",
                maxLength: 150,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "DistanceCoverd",
                table: "DailyTripInfo",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "EMR",
                table: "DailyTripInfo",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "MMR",
                table: "DailyTripInfo",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "DailyTripInfo",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "ReFuelAmount",
                table: "DailyTripInfo",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "ReFuelQuentity",
                table: "DailyTripInfo",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Average",
                table: "DailyTripInfo");

            migrationBuilder.DropColumn(
                name: "BusNum",
                table: "DailyTripInfo");

            migrationBuilder.DropColumn(
                name: "DistanceCoverd",
                table: "DailyTripInfo");

            migrationBuilder.DropColumn(
                name: "EMR",
                table: "DailyTripInfo");

            migrationBuilder.DropColumn(
                name: "MMR",
                table: "DailyTripInfo");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "DailyTripInfo");

            migrationBuilder.DropColumn(
                name: "ReFuelAmount",
                table: "DailyTripInfo");

            migrationBuilder.DropColumn(
                name: "ReFuelQuentity",
                table: "DailyTripInfo");

            migrationBuilder.AddColumn<int>(
                name: "FuelId",
                table: "DailyTripInfo",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_DailyTripInfo_FuelId",
                table: "DailyTripInfo",
                column: "FuelId");

            migrationBuilder.AddForeignKey(
                name: "FK_DailyTripInfo_FuelInfo_FuelId",
                table: "DailyTripInfo",
                column: "FuelId",
                principalTable: "FuelInfo",
                principalColumn: "FuelId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
