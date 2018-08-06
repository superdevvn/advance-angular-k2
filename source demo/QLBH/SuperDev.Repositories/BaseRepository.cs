using System;
using System.Collections;
using System.Linq;
using System.Linq.Dynamic;
using SuperDev.Models;
using SuperDev.Repositories.Common;
using SuperDev.Utilities;

namespace SuperDev.Repositories
{
    public abstract class BaseRepository<TEntity>
        where TEntity : class, new()
    {

        public virtual PagedListResult List(string whereClause, string orderBy, string orderDirection, int pageNumber, int pageSize)
        {
            using (var context = new SuperDevDbContext())
            {
                var query = context.Set<TEntity>()
                    .Where(whereClause);
                var entities = query.OrderBy(string.Format("{0} {1}", orderBy.Trim(), orderDirection.Trim()))
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize)
                    .ToList();
                return new PagedListResult(entities, query.Count());
            }
        }

        public virtual PagedListResult List(PagedListRequest request)
        {
            return List(request.whereClause, request.orderBy, request.orderDirection, request.pageNumber, request.pageSize);
        }

        public virtual IEnumerable All()
        {
            using (var context = new SuperDevDbContext())
            {
                TEntity entity = new TEntity();
                if (entity is ICreator)
                {
                    return context.Set<TEntity>().OrderBy("CreatedDate DESC").ToList();
                }
                else return context.Set<TEntity>().ToList();
            }
        }

        public virtual IEnumerable All(string whereClause)
        {
            using (var context = new SuperDevDbContext())
            {
                TEntity entity = new TEntity();
                if (entity is ICreator)
                {
                    return context.Set<TEntity>().Where(whereClause).OrderBy("CreatedDate DESC").ToList();
                }
                else return context.Set<TEntity>().Where(whereClause).ToList();
            }
        }

        public virtual TEntity Get(Guid id)
        {
            using (var context = new SuperDevDbContext())
            {
                return context.Set<TEntity>().Find(id);
            }
        }

        public virtual TEntity Create(TEntity entity)
        {
            TEntity e = new TEntity();
            Guid id = Guid.NewGuid();
            entity.GetType().GetProperty("Id").SetValue(entity, id);
            using (var context = new SuperDevDbContext())
            {
                context.Set<TEntity>().Add(entity);
                context.SaveChanges();
                return context.Set<TEntity>().Find(id);
            }
        }

        public virtual TEntity Update(TEntity entity)
        {
            using (var context = new SuperDevDbContext())
            {
                if (entity is IApprover)
                {
                    var entry = entity as IApprover;
                    if (entry.ApprovedBy != null) throw new Exception("ENTITY_APPROVED");
                }
                Guid id = new Guid(entity.GetType().GetProperty("Id").GetValue(entity, null).ToString());
                TEntity origin = context.Set<TEntity>().Find(id);
                Utility.CloneObject(origin, entity);
                context.SaveChanges();
                context.Entry(origin).Reload();
                return origin;
            }
        }

        public virtual TEntity Approve(TEntity entity)
        {
            using (var context = new SuperDevDbContext())
            {
                if (entity is IApprover)
                {
                    var entry = entity as IApprover;
                    if (entry.ApprovedBy != null) throw new Exception("ENTITY_APPROVED");
                    entry.ApprovedBy = Utility.CurrentUserId;
                    Guid id = new Guid(entity.GetType().GetProperty("Id").GetValue(entity, null).ToString());
                    TEntity origin = context.Set<TEntity>().Find(id);
                    Utility.CloneObject(origin, entry);
                    context.SaveChanges();
                    context.Entry(origin).Reload();
                    return origin;
                }
                else throw new Exception("ENTITY_IS_NOT_IAPPROVE");
            }
        }

        public void Delete(Guid id)
        {
            using (var context = new SuperDevDbContext())
            {
                TEntity entity = context.Set<TEntity>().Find(id);
                context.Set<TEntity>().Remove(entity);
                context.SaveChanges();
            }
        }
    }
}
