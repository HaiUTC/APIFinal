using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace APIFinal.Controllers
{
    [EnableCors(origins: "https://localhost:44312", headers: "*", methods: "*")]
    public class UserController : ApiController
    {
        [HttpGet]
        public List<Customer> Customers()
        {
            APIFinalDataContext ctx = new APIFinalDataContext();
            return ctx.Customers.ToList();
        }
        
        [HttpGet]
        public Customer Customer(int UserId)
        {
            APIFinalDataContext ctx = new APIFinalDataContext();
            return ctx.Customers.FirstOrDefault(x => x.UserId == UserId);
        }

        [HttpPost]
        public Customer AddCustomer([FromBody] Customer cus)
        {
                APIFinalDataContext ctx = new APIFinalDataContext();
                Customer customer = new Customer();
                customer.Name = cus.Name;
                customer.Email = cus.Email;
                customer.PhoneNumber = cus.PhoneNumber;
                customer.City = cus.City;
                customer.Province = cus.Province;
                customer.AddressDetail = cus.AddressDetail;
                customer.Active = cus.Active;
                ctx.Customers.InsertOnSubmit(customer);
                ctx.SubmitChanges();
                return customer;
           
        }
        [HttpPut]
        public Customer UpdateCustomer([FromBody] Customer cus)
        {
                APIFinalDataContext ctx = new APIFinalDataContext();
                Customer currentCustomer = ctx.Customers.FirstOrDefault(x => x.UserId == cus.UserId);
                if(currentCustomer == null)
                {
                    return null;
                }
                currentCustomer.Name = cus.Name;
                currentCustomer.Email = cus.Email;
                currentCustomer.PhoneNumber = cus.PhoneNumber;
                currentCustomer.City = cus.City;
                currentCustomer.Province = cus.Province;
                currentCustomer.AddressDetail = cus.AddressDetail;
                currentCustomer.Active = cus.Active;
                ctx.SubmitChanges();
                return currentCustomer;
        }

        [HttpPut]
        public bool ToggleActiveCustomer(int UserId)
        {
            try
            {
                APIFinalDataContext ctx = new APIFinalDataContext();
                Customer currentCustomer = ctx.Customers.FirstOrDefault(x => x.UserId == UserId);
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
