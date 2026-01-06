using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FIT.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddDbIndices : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_workouts_UserId_StartedAtUtc",
                table: "workouts",
                columns: new[] { "UserId", "StartedAtUtc" });

            migrationBuilder.CreateIndex(
                name: "IX_goals_UserId_IsCompleted",
                table: "goals",
                columns: new[] { "UserId", "IsCompleted" });

            migrationBuilder.CreateIndex(
                name: "IX_goals_UserId_StartDate",
                table: "goals",
                columns: new[] { "UserId", "StartDate" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_workouts_UserId_StartedAtUtc",
                table: "workouts");

            migrationBuilder.DropIndex(
                name: "IX_goals_UserId_IsCompleted",
                table: "goals");

            migrationBuilder.DropIndex(
                name: "IX_goals_UserId_StartDate",
                table: "goals");
        }
    }
}
