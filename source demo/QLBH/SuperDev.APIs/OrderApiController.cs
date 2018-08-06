using System;
using System.Web.Http;
using SuperDev.Models;
using SuperDev.Repositories.Common;
using SuperDev.Services;

namespace SuperDev.APIs
{
    [AuthorizeFilter]
    public class OrderApiController : ApiController
    {
        OrderService orderService = new OrderService();

        [HttpPost]
        [Route("api/order/save")]
        public IHttpActionResult Save(Order order)
        {
            try
            {
                return Ok(orderService.Save(order));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("api/order/list")]
        public IHttpActionResult List(PagedListRequest request)
        {
            try
            {
                return Ok(orderService.List(request));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("api/order/all")]
        public IHttpActionResult All()
        {
            try
            {
                return Ok(orderService.All());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("api/order/get")]
        public IHttpActionResult Get(Guid id)
        {
            try
            {
                return Ok(orderService.Get(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("api/order/delete")]
        public IHttpActionResult Delete(Guid id)
        {
            try
            {
                orderService.Delete(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
