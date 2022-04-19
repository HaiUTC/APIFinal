using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace APIFinal.Controllers
{
    public class UserController : ApiController
    {
        [HttpGet]
        public List<Customer> Customers()
        {
            APIFinalDataContext ctx = new APIFinalDataContext();
            return ctx.Customers.ToList();
        }
        
        [HttpGet]
        public List<Customer> Customer(string name)
        {
            APIFinalDataContext ctx = new APIFinalDataContext();
            if(name == "")
            {
                return Customers();
            }
            return ctx.Customers.Where(x => x.Name == name).ToList();
        }
        

        [HttpPost]
        public bool AddCustomer(string name, string phone, string email, string city, string province, string detail)
        {
            try
            {
                APIFinalDataContext ctx = new APIFinalDataContext();
                Customer customer = new Customer();
                customer.Name = name;
                customer.Email = email;
                customer.PhoneNumber = phone;
                customer.City = city;
                customer.Province = province;
                customer.AddressDetail = detail;
                ctx.Customers.InsertOnSubmit(customer);
                ctx.SubmitChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }
        [HttpPut]
        public bool UpdateCustomer(int id, string name, string phone, string email, string city, string province, string detail)
        {
            try
            {
                APIFinalDataContext ctx = new APIFinalDataContext();
                Customer currentCustomer = ctx.Customers.FirstOrDefault(x => x.UserId == id);
                if(currentCustomer == null)
                {
                    return false;
                }
                currentCustomer.Name = name;
                currentCustomer.Email = email;
                currentCustomer.PhoneNumber = phone;
                currentCustomer.City = city;
                currentCustomer.Province = province;
                currentCustomer.AddressDetail = detail;
                ctx.SubmitChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        [HttpPut]
        public bool ToggleActiveCustomer(int id)
        {
            try
            {
                APIFinalDataContext ctx = new APIFinalDataContext();
                Customer currentCustomer = ctx.Customers.FirstOrDefault(x => x.UserId == id);
                if (currentCustomer == null)
                {
                    return false;
                }
                currentCustomer.Active = (currentCustomer.Active == 1 ? 0 : 1);
                ctx.SubmitChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
