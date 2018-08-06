using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using SuperDev.Services;

namespace SuperDev.APIs
{
    class AuthorizeFilter : ActionFilterAttribute
    {
        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            try
            {
                var userService = new UserService();
                var result = userService.IsValidToken();
                if (result) base.OnActionExecuting(actionContext);
                else throw new Exception("TOKEN_INVALID");
            }
            catch
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.Unauthorized));
            }
        }
    }
}
