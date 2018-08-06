namespace SuperDev.Models.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _001 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Category",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        ParentId = c.Guid(),
                        Name = c.String(),
                        Description = c.String(),
                        CreatedDate = c.DateTime(nullable: false),
                        CreatedBy = c.Guid(),
                        ModifiedDate = c.DateTime(nullable: false),
                        ModifiedBy = c.Guid(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.User", t => t.CreatedBy)
                .ForeignKey("dbo.User", t => t.ModifiedBy)
                .ForeignKey("dbo.Category", t => t.ParentId)
                .Index(t => t.ParentId)
                .Index(t => t.CreatedBy)
                .Index(t => t.ModifiedBy);
            
            CreateTable(
                "dbo.User",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        RoleId = c.Guid(nullable: false),
                        Username = c.String(),
                        HashedPassword = c.String(),
                        FirstName = c.String(),
                        LastName = c.String(),
                        Description = c.String(),
                        IsActived = c.Boolean(nullable: false),
                        IsDeleted = c.Boolean(nullable: false),
                        CreatedDate = c.DateTime(nullable: false),
                        CreatedBy = c.Guid(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.User", t => t.CreatedBy)
                .ForeignKey("dbo.Role", t => t.RoleId)
                .Index(t => t.RoleId)
                .Index(t => t.CreatedBy);
            
            CreateTable(
                "dbo.Role",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Name = c.String(),
                        Description = c.String(),
                        CreatedDate = c.DateTime(nullable: false),
                        CreatedBy = c.Guid(),
                        ModifiedDate = c.DateTime(nullable: false),
                        ModifiedBy = c.Guid(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.User", t => t.CreatedBy)
                .ForeignKey("dbo.User", t => t.ModifiedBy)
                .Index(t => t.CreatedBy)
                .Index(t => t.ModifiedBy);
            
            CreateTable(
                "dbo.Product",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        ManufacturerId = c.Guid(),
                        CategoryId = c.Guid(nullable: false),
                        UnitId = c.Guid(nullable: false),
                        Code = c.String(),
                        Name = c.String(),
                        Price = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Description = c.String(),
                        CreatedDate = c.DateTime(nullable: false),
                        CreatedBy = c.Guid(),
                        ModifiedDate = c.DateTime(nullable: false),
                        ModifiedBy = c.Guid(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Category", t => t.CategoryId)
                .ForeignKey("dbo.User", t => t.CreatedBy)
                .ForeignKey("dbo.Manufacturer", t => t.ManufacturerId)
                .ForeignKey("dbo.User", t => t.ModifiedBy)
                .ForeignKey("dbo.Unit", t => t.UnitId)
                .Index(t => t.ManufacturerId)
                .Index(t => t.CategoryId)
                .Index(t => t.UnitId)
                .Index(t => t.CreatedBy)
                .Index(t => t.ModifiedBy);
            
            CreateTable(
                "dbo.Manufacturer",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Code = c.String(),
                        Name = c.String(),
                        Description = c.String(),
                        CreatedDate = c.DateTime(nullable: false),
                        CreatedBy = c.Guid(),
                        ModifiedDate = c.DateTime(nullable: false),
                        ModifiedBy = c.Guid(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.User", t => t.CreatedBy)
                .ForeignKey("dbo.User", t => t.ModifiedBy)
                .Index(t => t.CreatedBy)
                .Index(t => t.ModifiedBy);
            
            CreateTable(
                "dbo.Unit",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Name = c.String(),
                        Description = c.String(),
                        CreatedDate = c.DateTime(nullable: false),
                        CreatedBy = c.Guid(),
                        ModifiedDate = c.DateTime(nullable: false),
                        ModifiedBy = c.Guid(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.User", t => t.CreatedBy)
                .ForeignKey("dbo.User", t => t.ModifiedBy)
                .Index(t => t.CreatedBy)
                .Index(t => t.ModifiedBy);
            
            CreateTable(
                "dbo.Customer",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Code = c.String(),
                        Name = c.String(),
                        Address = c.String(),
                        Description = c.String(),
                        CreatedDate = c.DateTime(nullable: false),
                        CreatedBy = c.Guid(),
                        ModifiedDate = c.DateTime(nullable: false),
                        ModifiedBy = c.Guid(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.User", t => t.CreatedBy)
                .ForeignKey("dbo.User", t => t.ModifiedBy)
                .Index(t => t.CreatedBy)
                .Index(t => t.ModifiedBy);
            
            CreateTable(
                "dbo.Order",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        CustomerId = c.Guid(nullable: false),
                        ProductId = c.Guid(nullable: false),
                        Price = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Quantity = c.Int(nullable: false),
                        Date = c.DateTime(nullable: false),
                        DeliveryDate = c.DateTime(),
                        IsPayed = c.Boolean(nullable: false),
                        Description = c.String(),
                        CreatedDate = c.DateTime(nullable: false),
                        CreatedBy = c.Guid(),
                        ModifiedDate = c.DateTime(nullable: false),
                        ModifiedBy = c.Guid(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.User", t => t.CreatedBy)
                .ForeignKey("dbo.Customer", t => t.CustomerId)
                .ForeignKey("dbo.User", t => t.ModifiedBy)
                .ForeignKey("dbo.Product", t => t.ProductId)
                .Index(t => t.CustomerId)
                .Index(t => t.ProductId)
                .Index(t => t.CreatedBy)
                .Index(t => t.ModifiedBy);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Order", "ProductId", "dbo.Product");
            DropForeignKey("dbo.Order", "ModifiedBy", "dbo.User");
            DropForeignKey("dbo.Order", "CustomerId", "dbo.Customer");
            DropForeignKey("dbo.Order", "CreatedBy", "dbo.User");
            DropForeignKey("dbo.Customer", "ModifiedBy", "dbo.User");
            DropForeignKey("dbo.Customer", "CreatedBy", "dbo.User");
            DropForeignKey("dbo.Product", "UnitId", "dbo.Unit");
            DropForeignKey("dbo.Unit", "ModifiedBy", "dbo.User");
            DropForeignKey("dbo.Unit", "CreatedBy", "dbo.User");
            DropForeignKey("dbo.Product", "ModifiedBy", "dbo.User");
            DropForeignKey("dbo.Product", "ManufacturerId", "dbo.Manufacturer");
            DropForeignKey("dbo.Manufacturer", "ModifiedBy", "dbo.User");
            DropForeignKey("dbo.Manufacturer", "CreatedBy", "dbo.User");
            DropForeignKey("dbo.Product", "CreatedBy", "dbo.User");
            DropForeignKey("dbo.Product", "CategoryId", "dbo.Category");
            DropForeignKey("dbo.Category", "ParentId", "dbo.Category");
            DropForeignKey("dbo.Category", "ModifiedBy", "dbo.User");
            DropForeignKey("dbo.Category", "CreatedBy", "dbo.User");
            DropForeignKey("dbo.User", "RoleId", "dbo.Role");
            DropForeignKey("dbo.Role", "ModifiedBy", "dbo.User");
            DropForeignKey("dbo.Role", "CreatedBy", "dbo.User");
            DropForeignKey("dbo.User", "CreatedBy", "dbo.User");
            DropIndex("dbo.Order", new[] { "ModifiedBy" });
            DropIndex("dbo.Order", new[] { "CreatedBy" });
            DropIndex("dbo.Order", new[] { "ProductId" });
            DropIndex("dbo.Order", new[] { "CustomerId" });
            DropIndex("dbo.Customer", new[] { "ModifiedBy" });
            DropIndex("dbo.Customer", new[] { "CreatedBy" });
            DropIndex("dbo.Unit", new[] { "ModifiedBy" });
            DropIndex("dbo.Unit", new[] { "CreatedBy" });
            DropIndex("dbo.Manufacturer", new[] { "ModifiedBy" });
            DropIndex("dbo.Manufacturer", new[] { "CreatedBy" });
            DropIndex("dbo.Product", new[] { "ModifiedBy" });
            DropIndex("dbo.Product", new[] { "CreatedBy" });
            DropIndex("dbo.Product", new[] { "UnitId" });
            DropIndex("dbo.Product", new[] { "CategoryId" });
            DropIndex("dbo.Product", new[] { "ManufacturerId" });
            DropIndex("dbo.Role", new[] { "ModifiedBy" });
            DropIndex("dbo.Role", new[] { "CreatedBy" });
            DropIndex("dbo.User", new[] { "CreatedBy" });
            DropIndex("dbo.User", new[] { "RoleId" });
            DropIndex("dbo.Category", new[] { "ModifiedBy" });
            DropIndex("dbo.Category", new[] { "CreatedBy" });
            DropIndex("dbo.Category", new[] { "ParentId" });
            DropTable("dbo.Order");
            DropTable("dbo.Customer");
            DropTable("dbo.Unit");
            DropTable("dbo.Manufacturer");
            DropTable("dbo.Product");
            DropTable("dbo.Role");
            DropTable("dbo.User");
            DropTable("dbo.Category");
        }
    }
}
