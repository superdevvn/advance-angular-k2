using System;
using System.Web.Http;
using SuperDev.Models;
using SuperDev.Repositories.Common;
using SuperDev.Services;

namespace SuperDev.APIs
{
    [AuthorizeFilter]
    public class UnitApiController : ApiController
    {
        UnitService unitService = new UnitService();

        [HttpPost]
        [Route("api/unit/save")]
        public IHttpActionResult Save(Unit unit)
        {
            try
            {
                return Ok(unitService.Save(unit));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("api/unit/list")]
        public IHttpActionResult List(PagedListRequest request)
        {
            try
            {
                return Ok(unitService.List(request));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("api/unit/all")]
        public IHttpActionResult All()
        {
            try
            {
                return Ok(unitService.All());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("api/unit/get")]
        public IHttpActionResult Get(Guid id)
        {
            try
            {
                return Ok(unitService.Get(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("api/unit/delete")]
        public IHttpActionResult Delete(Guid id)
        {
            try
            {
                unitService.Delete(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
