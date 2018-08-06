using System;
using System.Web.Http;
using SuperDev.Models;
using SuperDev.Repositories.Common;
using SuperDev.Services;

namespace SuperDev.APIs
{
    [AuthorizeFilter]
    public class CategoryApiController : ApiController
    {
        CategoryService categoryService = new CategoryService();

        [HttpPost]
        [Route("api/category/save")]
        public IHttpActionResult Save(Category category)
        {
            try
            {
                return Ok(categoryService.Save(category));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("api/category/list")]
        public IHttpActionResult List(PagedListRequest request)
        {
            try
            {
                return Ok(categoryService.List(request));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("api/category/all")]
        public IHttpActionResult All()
        {
            try
            {
                return Ok(categoryService.All());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("api/category/get")]
        public IHttpActionResult Get(Guid id)
        {
            try
            {
                return Ok(categoryService.Get(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("api/category/delete")]
        public IHttpActionResult Delete(Guid id)
        {
            try
            {
                categoryService.Delete(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}