﻿using Microsoft.EntityFrameworkCore.Migrations;

namespace CoreBlogApi.Migrations
{
    public partial class addAuthorPassword : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "Authors",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Password",
                table: "Authors");
        }
    }
}
