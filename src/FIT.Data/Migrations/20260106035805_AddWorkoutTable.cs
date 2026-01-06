using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FIT.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddWorkoutTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Goals",
                table: "Goals");

            migrationBuilder.RenameTable(
                name: "Goals",
                newName: "goals");

            migrationBuilder.AlterDatabase()
                .Annotation("Npgsql:Enum:goal_tracking_mode", "manual,distance,workouts,duration")
                .Annotation("Npgsql:Enum:workout_activity_type", "unknown,running,walking,cycling,strength_training,yoga,other");

            migrationBuilder.AddPrimaryKey(
                name: "PK_goals",
                table: "goals",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "workouts",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    StartedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DurationMinutes = table.Column<decimal>(type: "numeric", nullable: false),
                    DistanceMeters = table.Column<decimal>(type: "numeric", nullable: true),
                    ActivityType = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_workouts", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "workouts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_goals",
                table: "goals");

            migrationBuilder.RenameTable(
                name: "goals",
                newName: "Goals");

            migrationBuilder.AlterDatabase()
                .OldAnnotation("Npgsql:Enum:goal_tracking_mode", "manual,distance,workouts,duration")
                .OldAnnotation("Npgsql:Enum:workout_activity_type", "unknown,running,walking,cycling,strength_training,yoga,other");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Goals",
                table: "Goals",
                column: "Id");
        }
    }
}
