using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JWTAUTH.Migrations
{
    /// <inheritdoc />
    public partial class RenameRefreshTokenToHash : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RefreshToken",
                table: "Users",
                newName: "RefreshTokenHash");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Username",
                table: "Users",
                column: "Username",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Users_Username",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "RefreshTokenHash",
                table: "Users",
                newName: "RefreshToken");
        }
    }
}
