using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FIT.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddGoalVisibilityField : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CompletedAt",
                table: "goals",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsPublic",
                table: "goals",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "goals",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateIndex(
                name: "IX_goals_IsPublic_IsCompleted_CompletedAt",
                table: "goals",
                columns: new[] { "IsPublic", "IsCompleted", "CompletedAt" });

            migrationBuilder.CreateIndex(
                name: "IX_goals_IsPublic_UpdatedAt",
                table: "goals",
                columns: new[] { "IsPublic", "UpdatedAt" });

            migrationBuilder.CreateIndex(
                name: "IX_goals_UserId_IsPublic_CreatedAt",
                table: "goals",
                columns: new[] { "UserId", "IsPublic", "CreatedAt" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_goals_IsPublic_IsCompleted_CompletedAt",
                table: "goals");

            migrationBuilder.DropIndex(
                name: "IX_goals_IsPublic_UpdatedAt",
                table: "goals");

            migrationBuilder.DropIndex(
                name: "IX_goals_UserId_IsPublic_CreatedAt",
                table: "goals");

            migrationBuilder.DropColumn(
                name: "CompletedAt",
                table: "goals");

            migrationBuilder.DropColumn(
                name: "IsPublic",
                table: "goals");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "goals");
        }
    }
}
