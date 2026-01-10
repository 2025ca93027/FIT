using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FIT.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddCaloriesBurnedToWorkout : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "CaloriesBurned",
                table: "workouts",
                type: "numeric",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CaloriesBurned",
                table: "workouts");
        }
    }
}
