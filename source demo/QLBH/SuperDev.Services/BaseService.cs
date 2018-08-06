using System;
using System.Collections;
using SuperDev.Models;
using SuperDev.Repositories;
using SuperDev.Repositories.Common;

namespace SuperDev.Services
{
    public abstract class BaseService<TEntity, TBaseRepository>
        where TEntity : class, new()
        where TBaseRepository : BaseRepository<TEntity>, new()
    {
        public TBaseRepository repository = new TBaseRepository();
        public virtual PagedListResult List(string whereClause, string orderBy, string orderDirection, int pageNumber, int pageSize)
        {
            return repository.List(whereClause, orderBy, orderDirection, pageNumber, pageSize);
        }

        public virtual PagedListResult List(PagedListRequest request)
        {
            return repository.List(request);
        }

        public virtual IEnumerable All()
        {
            return repository.All();
        }

        public virtual IEnumerable All(string whereClause)
        {
            if (string.IsNullOrWhiteSpace(whereClause)) return repository.All();
            return repository.All(whereClause);
        }

        public virtual TEntity Get(Guid id)
        {
            var entity = repository.Get(id);
            if (entity == null) throw new Exception("ENTITY_INCORRECT_ID");
            return entity;
        }

        public virtual TEntity Save(TEntity entity)
        {
            Guid id = new Guid(entity.GetType().GetProperty("Id").GetValue(entity, null).ToString());
            if (id == Guid.Empty)
            {
                return repository.Create(entity);
            }
            else
            {
                return repository.Update(entity);
            }
        }

        public virtual TEntity Approve(TEntity entity)
        {
            if (entity is IApprover)
            {
                return repository.Approve(entity);
            }
            else throw new Exception("ENTITY_IS_NOT_IAPPROVE");
        }

        public virtual void Delete(Guid id)
        {
            var entity = repository.Get(id);
            if (entity == null) throw new Exception("ENTITY_INCORRECT_ID");
            repository.Delete(id);
        }
    }
}
