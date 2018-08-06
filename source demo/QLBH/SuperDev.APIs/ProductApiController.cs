using System;
using System.Web.Http;
using SuperDev.Models;
using SuperDev.Repositories.Common;
using SuperDev.Services;

namespace SuperDev.APIs
{
    [AuthorizeFilter]
    public class ProductApiController : ApiController
    {
        ProductService productService = new ProductService();

        [HttpPost]
        [Route("api/product/save")]
        public IHttpActionResult Save(Product product)
        {
            try
            {
                return Ok(productService.Save(product));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("api/product/list")]
        public IHttpActionResult List(PagedListRequest request)
        {
            try
            {
                return Ok(productService.List(request));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("api/product/all")]
        public IHttpActionResult All()
        {
            try
            {
                return Ok(productService.All());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("api/product/get")]
        public IHttpActionResult Get(Guid id)
        {
            try
            {
                return Ok(productService.Get(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("api/product/delete")]
        public IHttpActionResult Delete(Guid id)
        {
            try
            {
                productService.Delete(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
