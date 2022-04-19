using APIFinal.Helper.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace APIFinal.Controllers
{
    public class OrderController : ApiController
    {
        // GET: Order
        [HttpGet]
        public List<OrderRender> Orders()
        {
            APIFinalDataContext ctx = new APIFinalDataContext();
            return ctx.OrderRenders.ToList();
        }

        [HttpPost]
        public bool AddOrder([FromBody] OrderItemDetailsViewModel orderInfo)
        {
            APIFinalDataContext ctx = new APIFinalDataContext();
            try
            {
                double? totalPrice = 0;
                if (orderInfo != null)
                {
                    foreach (var item in orderInfo.itemDetails)
                    {
                        var product = ctx.Products.FirstOrDefault(x => x.ProductId == item.ProductId);
                        totalPrice += product.Price * item.Quantity;
                    }
                    var newCustomerOrder = new Order();
                    newCustomerOrder.UserId = orderInfo.userInfo.UserId;
                    newCustomerOrder.Name = orderInfo.userInfo.Name;
                    newCustomerOrder.Price = totalPrice;
                    ctx.Orders.InsertOnSubmit(newCustomerOrder);
                    ctx.SubmitChanges();

                    foreach (var item in orderInfo.itemDetails)
                    {
                        var newItemOrder = new OrderItem();
                        newItemOrder.OrderId = newCustomerOrder.OrderId;
                        newItemOrder.ProductId = item.ProductId;
                        newItemOrder.Quantity = item.Quantity;
                        ctx.OrderItems.InsertOnSubmit(newItemOrder);
                        ctx.SubmitChanges();
                    }
                }
                return true;
            }
            catch
            {
                return false;
            };
        }
    }
}