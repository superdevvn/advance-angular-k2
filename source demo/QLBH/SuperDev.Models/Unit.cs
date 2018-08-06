using System;
using System.Data.Entity;

namespace SuperDev.Models
{
    public partial class SuperDevDbContext
    {
        public DbSet<Unit> Units { get; set; }
    }

    public class Unit: BaseEntity
    {

        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }
    }
}
