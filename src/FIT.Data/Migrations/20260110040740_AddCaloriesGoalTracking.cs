using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FIT.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddCaloriesGoalTracking : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("Npgsql:Enum:goal_tracking_mode", "manual,distance,workouts,duration,calories")
                .Annotation("Npgsql:Enum:workout_activity_type", "unknown,running,walking,cycling,strength_training,yoga,hydration,other")
                .OldAnnotation("Npgsql:Enum:goal_tracking_mode", "manual,distance,workouts,duration")
                .OldAnnotation("Npgsql:Enum:workout_activity_type", "unknown,running,walking,cycling,strength_training,yoga,hydration,other");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("Npgsql:Enum:goal_tracking_mode", "manual,distance,workouts,duration")
                .Annotation("Npgsql:Enum:workout_activity_type", "unknown,running,walking,cycling,strength_training,yoga,hydration,other")
                .OldAnnotation("Npgsql:Enum:goal_tracking_mode", "manual,distance,workouts,duration,calories")
                .OldAnnotation("Npgsql:Enum:workout_activity_type", "unknown,running,walking,cycling,strength_training,yoga,hydration,other");
        }
    }
}
