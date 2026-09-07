using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BusManagement.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddBus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ReFuelAmount",
                table: "DailyTripInfo");

            migrationBuilder.DropColumn(
                name: "ReFuelQuentity",
                table: "DailyTripInfo");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
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
    }
}
