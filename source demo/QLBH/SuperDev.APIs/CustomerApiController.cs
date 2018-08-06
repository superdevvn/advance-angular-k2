using System;
using System.Web.Http;
using SuperDev.Models;
using SuperDev.Repositories.Common;
using SuperDev.Services;

namespace SuperDev.APIs
{
    [AuthorizeFilter]
    public class CustomerApiController : ApiController
    {
        CustomerService customerService = new CustomerService();

        [HttpPost]
        [Route("api/customer/save")]
        public IHttpActionResult Save(Customer customer)
        {
            try
            {
                return Ok(customerService.Save(customer));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("api/customer/list")]
        public IHttpActionResult List(PagedListRequest request)
        {
            try
            {
                return Ok(customerService.List(request));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("api/customer/all")]
        public IHttpActionResult All()
        {
            try
            {
                return Ok(customerService.All());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("api/customer/get")]
        public IHttpActionResult Get(Guid id)
        {
            try
            {
                return Ok(customerService.Get(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("api/customer/delete")]
        public IHttpActionResult Delete(Guid id)
        {
            try
            {
                customerService.Delete(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
