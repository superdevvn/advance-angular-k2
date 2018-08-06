using System;
using System.Web.Http;
using SuperDev.Models;
using SuperDev.Repositories.Common;
using SuperDev.Services;

namespace SuperDev.APIs
{
    [AuthorizeFilter]
    public class RoleApiController : ApiController
    {
        RoleService roleService = new RoleService();

        [HttpPost]
        [Route("api/role/save")]
        public IHttpActionResult Save(Role role)
        {
            try
            {
                return Ok(roleService.Save(role));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("api/role/list")]
        public IHttpActionResult List(PagedListRequest request)
        {
            try
            {
                return Ok(roleService.List(request));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("api/role/all")]
        public IHttpActionResult All()
        {
            try
            {
                return Ok(roleService.All());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("api/role/get")]
        public IHttpActionResult Get(Guid id)
        {
            try
            {
                return Ok(roleService.Get(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("api/role/delete")]
        public IHttpActionResult Delete(Guid id)
        {
            try
            {
                roleService.Delete(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
