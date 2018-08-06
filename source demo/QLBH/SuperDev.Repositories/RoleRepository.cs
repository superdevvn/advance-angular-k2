using System.Collections;
using System.Linq;
using SuperDev.Models;
using SuperDev.Utilities;

namespace SuperDev.Repositories
{
    public class RoleRepository : BaseRepository<Role>
    {
        public override IEnumerable All()
        {
            using (var context = new SuperDevDbContext())
            {
                return context.Roles.Select(e => new
                {
                    Id = e.Id,
                    Name = e.Name,
                    Description = e.Description,
                    CreatedDate = e.CreatedDate,
                    CreatorName = e.Creator.Username,
                    ModifierDate = e.ModifiedDate,
                    ModifierName = e.Modifier.Username
                }).ToList();
            }
        }
    }
}
