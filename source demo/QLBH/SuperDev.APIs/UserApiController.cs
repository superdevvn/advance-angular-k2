using System;
using System.Web.Http;
using Newtonsoft.Json.Linq;
using SuperDev.Models;
using SuperDev.Repositories.Common;
using SuperDev.Services;

namespace SuperDev.APIs
{
    public class UserApiController : ApiController
    {
        UserService userService = new UserService();

        [HttpPost]
        [Route("api/user/login")]
        public IHttpActionResult Login(JObject obj)
        {
            try
            {
                string username = obj["username"].ToString();
                string password = obj["password"].ToString();
                return Ok(userService.Login(username, password));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("api/user/save")]
        [AuthorizeFilter]
        public IHttpActionResult Save(User user)
        {
            try
            {
                return Ok(userService.Save(user));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("api/user/list")]
        [AuthorizeFilter]
        public IHttpActionResult List(PagedListRequest request)
        {
            try
            {
                return Ok(userService.List(request));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("api/user/get")]
        [AuthorizeFilter]
        public IHttpActionResult Get(Guid id)
        {
            try
            {
                return Ok(userService.Get(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("api/user/delete")]
        [AuthorizeFilter]
        public IHttpActionResult Delete(Guid id)
        {
            try
            {
                userService.Delete(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
