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
        public bool AddCustomer([FromBody] Customer cus)
        {
            try
            {
                APIFinalDataContext ctx = new APIFinalDataContext();
                Customer customer = new Customer();
                customer.Name = cus.Name;
                customer.Email = cus.Email;
                customer.PhoneNumber = cus.PhoneNumber;
                customer.City = cus.City;
                customer.Province = cus.Province;
                customer.AddressDetail = cus.AddressDetail;
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
        public bool UpdateCustomer([FromBody] Customer cus)
        {
            try
            {
                APIFinalDataContext ctx = new APIFinalDataContext();
                Customer currentCustomer = ctx.Customers.FirstOrDefault(x => x.UserId == cus.UserId);
                if(currentCustomer == null)
                {
                    return false;
                }
                currentCustomer.Name = cus.Name;
                currentCustomer.Email = cus.Email;
                currentCustomer.PhoneNumber = cus.PhoneNumber;
                currentCustomer.City = cus.City;
                currentCustomer.Province = cus.Province;
                currentCustomer.AddressDetail = cus.AddressDetail;
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
