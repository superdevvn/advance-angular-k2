using System;
using System.Web.Http;
using SuperDev.Models;
using SuperDev.Repositories.Common;
using SuperDev.Services;

namespace SuperDev.APIs
{
    [AuthorizeFilter]
    public class ManufacturerApiController : ApiController
    {
        ManufacturerService manufacturerService = new ManufacturerService();

        [HttpPost]
        [Route("api/manufacturer/save")]
        public IHttpActionResult Save(Manufacturer manufacturer)
        {
            try
            {
                return Ok(manufacturerService.Save(manufacturer));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("api/manufacturer/list")]
        public IHttpActionResult List(PagedListRequest request)
        {
            try
            {
                return Ok(manufacturerService.List(request));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("api/manufacturer/all")]
        public IHttpActionResult All()
        {
            try
            {
                return Ok(manufacturerService.All());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("api/manufacturer/get")]
        public IHttpActionResult Get(Guid id)
        {
            try
            {
                return Ok(manufacturerService.Get(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("api/manufacturer/delete")]
        public IHttpActionResult Delete(Guid id)
        {
            try
            {
                manufacturerService.Delete(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
