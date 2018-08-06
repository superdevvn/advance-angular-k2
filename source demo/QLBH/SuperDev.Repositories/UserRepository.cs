using System;
using System.Linq;
using System.Linq.Dynamic;
using SuperDev.Models;
using SuperDev.Repositories.Common;
using SuperDev.Utilities;

namespace SuperDev.Repositories
{
    public class UserRepository : BaseRepository<User>
    {
        public override PagedListResult List(string whereClause, string orderBy, string orderDirection, int pageNumber, int pageSize)
        {
            using (var context = new SuperDevDbContext())
            {
                var query = context.Users.Select(e => new
                {
                    Id = e.Id,
                    RoleId = e.RoleId,
                    RoleName = e.Role.Name,
                    FirstName = e.FirstName,
                    LastName = e.LastName,
                    Username = e.Username,
                    HashedPassword = e.HashedPassword,
                    CreatedDate = e.CreatedDate,
                    CreatedBy = e.CreatedBy,
                    CreatorName = e.Creator.Username
                }).Where(whereClause);
                var entities = query.OrderBy(string.Format("{0} {1}", orderBy.Trim(), orderDirection.Trim()))
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToList();
                return new PagedListResult(entities, query.Count());
            }
        }

        public override User Create(User entity)
        {
            entity.CreatedDate = DateTime.Now;
            entity.CreatedBy = Utility.CurrentUserId;
            entity.HashedPassword = Utility.HashMD5(entity.HashedPassword);
            return base.Create(entity);
        }

        public override User Update(User entity)
        {
            using (var context = new SuperDevDbContext())
            {
                var user = context.Users.FirstOrDefault(e => e.Id == entity.Id);
                if (user.HashedPassword != entity.HashedPassword) entity.HashedPassword = Utility.HashMD5(entity.HashedPassword);
            }
            return base.Update(entity);
        }

        public User Get(string username)
        {
            using (var context = new SuperDevDbContext())
            {
                return context.Users.FirstOrDefault(e => e.Username == username);
            }
        }
    }
}