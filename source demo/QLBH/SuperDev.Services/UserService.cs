using System;
using System.Web;
using SuperDev.Models;
using SuperDev.Repositories;
using SuperDev.Utilities;

namespace SuperDev.Services
{
    public class UserService : BaseService<User, UserRepository>
    {
        public dynamic Login(string username, string password)
        {
            var user = repository.Get(username);
            if (user == null) throw new Exception("USER_USERNAME_NOTFOUND");
            if (user.HashedPassword != Utility.HashMD5(password)) throw new Exception("USER_INCORRECT_PASSWORD");
            var token = Utility.Encrypt(user.Id.ToString());
            return new
            {
                token = Utility.Encrypt(user.Id.ToString()),
                username = user.Username,
                firstName = user.FirstName,
                lastName = user.LastName,
                fullName = user.FirstName + " " + user.LastName
            };
        }

        public User GetCurrrentUser()
        {
            var token = HttpContext.Current.Request.Headers.Get("token").ToString();
            var userId = Utility.Decrypt(token);
            var user = repository.Get(new Guid(userId));
            if (user != null) return user;
            else throw new Exception("TOKEN_INVALID");
        }

        public bool IsValidToken()
        {
            var token = HttpContext.Current.Request.Headers.Get("token").ToString();
            var userId = Utility.Decrypt(token);
            var user = repository.Get(new Guid(userId));
            if (user != null) return true;
            return false;
        }
    }
}