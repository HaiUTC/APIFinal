using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace APIFinal.Controllers
{
    public class AdminController : ApiController
    {
        private static string GenerateHash(string value)
        {
            byte[] data = System.Text.Encoding.ASCII.GetBytes("Thanh_Hai_Salt_Password" + value);
            data = System.Security.Cryptography.MD5.Create().ComputeHash(data);
            return Convert.ToBase64String(data);
        }

        

        [HttpPost]
        public bool Register(string email, string username, string password)
        {
            try
            {
                APIFinalDataContext ctx = new APIFinalDataContext();
                Admin checkExistAdmin = ctx.Admins.FirstOrDefault(x => x.Email.Equals(email));
                if(checkExistAdmin == null)
                {
                    Admin admin = new Admin();
                    admin.UserName = username;
                    admin.Email = email;
                    admin.Password = GenerateHash(password);
                    ctx.Admins.InsertOnSubmit(admin);
                    ctx.SubmitChanges();
                    return true;
                }
                else
                {
                    return false;
                }
                
            } catch
            {
                return false;
            }
        }

        [HttpPost]
        public Admin Login(string email, string password)
        {
            APIFinalDataContext ctx = new APIFinalDataContext();
            return ctx.Admins.FirstOrDefault(x => x.Email.Equals(email) && x.Password.Equals(GenerateHash(password)));
        }

        [HttpPut]
        public bool ChangePassword(int adminId, string newPassword)
        {
            APIFinalDataContext ctx = new APIFinalDataContext();
            Admin currentAdmin = ctx.Admins.FirstOrDefault(x => x.AdminId == adminId);
            if(currentAdmin != null)
            {
                currentAdmin.Password = GenerateHash(newPassword);
                ctx.SubmitChanges();
                return true;
            }
            return false;
        }


    }
}
