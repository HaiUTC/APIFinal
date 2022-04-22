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

        [HttpGet]
        public List<Admin> Admins()
        {
            APIFinalDataContext ctx = new APIFinalDataContext();
            return ctx.Admins.ToList();
        }

        [HttpGet]
        public Admin Admins(int AdminId)
        {
            APIFinalDataContext ctx = new APIFinalDataContext();
            return ctx.Admins.FirstOrDefault(x => x.AdminId == AdminId);
        }

        [HttpPut]
        public Admin UpdateAdmin([FromBody] Admin ad)
        {
            APIFinalDataContext ctx = new APIFinalDataContext();
            Admin currentAdmin = ctx.Admins.FirstOrDefault(x => x.AdminId == ad.AdminId);
            if (currentAdmin == null)
            {
                return null;
            }
            currentAdmin.UserName = ad.UserName;
            currentAdmin.Password = ad.Password;
            currentAdmin.Email = ad.Email;
            ctx.SubmitChanges();
            return currentAdmin;
        }
        [HttpDelete]
        public bool DeleteAdmin(int AdminId)
        {
            try
            {
                APIFinalDataContext ctx = new APIFinalDataContext();
                Admin admin = ctx.Admins.FirstOrDefault(x => x.AdminId == AdminId);
                if (admin == null)
                {
                    return false;
                }
                ctx.Admins.DeleteOnSubmit(admin);
                ctx.SubmitChanges();
                return true;
            }
            catch
            {
                return false;
            }
        } 

        [HttpPost]
        public bool Register([FromBody] Admin ad)
        {
            try
            {
                APIFinalDataContext ctx = new APIFinalDataContext();
                Admin checkExistAdmin = ctx.Admins.FirstOrDefault(x => x.Email.Equals(ad.Email));
                if(checkExistAdmin == null)
                {
                    Admin admin = new Admin();
                    admin.UserName = ad.UserName;
                    admin.Email = ad.Email;
                    admin.Password = GenerateHash(ad.Password);
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
        public bool ChangePassword([FromBody]  int adminId, string newPassword)
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
