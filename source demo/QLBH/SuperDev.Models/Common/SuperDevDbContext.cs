using System;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using SuperDev.Utilities;

namespace SuperDev.Models
{
    public partial class SuperDevDbContext : DbContext
    {
        public SuperDevDbContext()
            : base("Default")
        {
            Configuration.LazyLoadingEnabled = false;
            Database.SetInitializer<SuperDevDbContext>(null);
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            base.OnModelCreating(modelBuilder);
            modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();
            modelBuilder.Conventions.Remove<ManyToManyCascadeDeleteConvention>();
        }

        public override int SaveChanges()
        {
            var userId = Utility.CurrentUserId;
            var modifiedEntries = ChangeTracker.Entries()
                .Where(x => (x.Entity is ICreator || x.Entity is IModifier) && (x.State == EntityState.Added || x.State == EntityState.Modified));
            foreach (var entry in modifiedEntries)
            {
                if (entry.Entity is ICreator && entry.Entity != null)
                {
                    var entity = entry.Entity as ICreator;
                    if (entry.State == EntityState.Added)
                    {
                        entity.CreatedBy = userId;
                        entity.CreatedDate = DateTime.Now;
                    }
                    else
                    {
                        Entry(entity).Property(x => x.CreatedBy).IsModified = false;
                        Entry(entity).Property(x => x.CreatedDate).IsModified = false;
                    }
                }

                if (entry.Entity is IModifier && entry.Entity != null)
                {
                    var entity = entry.Entity as IModifier;
                    entity.ModifiedBy = userId;
                    entity.ModifiedDate = DateTime.Now;
                }
            }
            return base.SaveChanges();
        }
    }
}