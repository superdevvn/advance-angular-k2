namespace SuperDev.Repositories.Common
{
    public class PagedListRequest
    {
        public string whereClause { get; set; }

        public string orderBy { get; set; }

        public string orderDirection { get; set; }

        public int pageNumber { get; set; }

        public int pageSize { get; set; }

        public PagedListRequest()
        {
            whereClause = "1>0";
            orderBy = "CreatedDate";
            orderDirection = "DESC";
            pageNumber = 1;
            pageSize = 10;
        }
    }
}
