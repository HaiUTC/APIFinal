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
        [HttpGet]
        public List<OrderRender> Orders(string typeQuery)
        {
            APIFinalDataContext ctx = new APIFinalDataContext();
            if(typeQuery == "all")
            {
                return ctx.OrderRenders.ToList();
            } 
                return ctx.OrderRenders.Where(x => x.Fulfillment_Status == null).ToList();
        }

        [HttpGet]
        public Order Order(int OrderId)
        {
            APIFinalDataContext ctx = new APIFinalDataContext();
            return ctx.Orders.FirstOrDefault(x => x.OrderId == OrderId);
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
                    newCustomerOrder.Address = orderInfo.userInfo.Address;
                    newCustomerOrder.ShipCode = orderInfo.userInfo.ShipCode;
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

        [HttpPut]
        public bool CancelReason(int id, string cancelreason)
        {
            try
            {
                APIFinalDataContext ctx = new APIFinalDataContext();
                Order currentOrder = ctx.Orders.FirstOrDefault(x => x.OrderId == id);
                if (currentOrder == null)
                {
                    return false;
                }
                currentOrder.Cancel_Reason = cancelreason;
                ctx.SubmitChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        [HttpPut]
        public bool UpdateOrder(int OrderId, string Address, string ShipCode)
        {
            try
            {
                APIFinalDataContext ctx = new APIFinalDataContext();
                Order currentOrder = ctx.Orders.FirstOrDefault(x => x.OrderId == OrderId);
                if (currentOrder == null)
                {
                    return false;
                }
                currentOrder.ShipCode = Address;
                currentOrder.Address = ShipCode;
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