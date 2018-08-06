using System.Collections;

namespace SuperDev.Repositories.Common
{
    public class PagedListResult
    {
        public int total { get; set; }
        public IEnumerable entities { get; set; }

        public PagedListResult(IEnumerable entities, int total)
        {
            this.entities = entities;
            this.total = total;
        }
    }
}
