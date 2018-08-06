using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;

namespace SuperDev.Models
{
    public partial class SuperDevDbContext
    {
        public DbSet<User> Users { get; set; }
    }

    public class User : ICreator
    {

        public Guid Id { get; set; }

        public Guid RoleId { get; set; }

        public string Username { get; set; }

        public string HashedPassword { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Description { get; set; }

        public bool IsActived { get; set; }

        public bool IsDeleted { get; set; }

        public DateTime CreatedDate { get; set; }

        public Guid? CreatedBy { get; set; }

        public User()
        {
            CreatedDate = DateTime.Now;
        }

        [ForeignKey("RoleId")]
        public virtual Role Role { get; set; }

        [ForeignKey("CreatedBy")]
        public User Creator { get; set; }
    }
}
