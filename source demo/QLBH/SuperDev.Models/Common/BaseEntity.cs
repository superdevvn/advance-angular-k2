using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace SuperDev.Models
{
    public abstract class BaseEntity : ICreator, IModifier
    {
        public DateTime CreatedDate { get; set; }

        public Guid? CreatedBy { get; set; }

        public DateTime ModifiedDate { get; set; }

        public Guid? ModifiedBy { get; set; }

        [ForeignKey("CreatedBy")]
        public User Creator { get; set; }

        [ForeignKey("ModifiedBy")]
        public User Modifier { get; set; }
    }
}
