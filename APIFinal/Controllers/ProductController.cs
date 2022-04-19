using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace APIFinal.Controllers
{
    public class ProductController : ApiController
    {
        [HttpGet]
        public List<Product> Products()
        {
            APIFinalDataContext ctx = new APIFinalDataContext();
            return ctx.Products.ToList();
        }

        [HttpGet]
        public Product Product(int ProductId)
        {
            APIFinalDataContext ctx = new APIFinalDataContext();
            return ctx.Products.FirstOrDefault(x => x.ProductId == ProductId);
        }

        [HttpGet]
        public bool AddProduct(string name, double price, byte quantity, string description)
        {
            try
            {
                APIFinalDataContext ctx = new APIFinalDataContext();
                Product product = new Product();
                product.Name = name;
                product.Price = price;
                product.Quantity = quantity;
                product.Description = description;
                ctx.Products.InsertOnSubmit(product);
                ctx.SubmitChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }
        [HttpPut]
        public bool UpdateProduct(int id, string name, double price, byte quantity, string description)
        {
            try
            {
                APIFinalDataContext ctx = new APIFinalDataContext();
                Product currentProduct = ctx.Products.FirstOrDefault(x => x.ProductId == id);
                if (currentProduct == null)
                {
                    return false;
                }
                currentProduct.Name = name;
                currentProduct.Price = price;
                currentProduct.Quantity = quantity;
                currentProduct.Description = description;
                ctx.SubmitChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }
        [HttpPut]
        public bool DeleteProduct(int id)
        {
            try
            {
                APIFinalDataContext ctx = new APIFinalDataContext();
                Product currentProduct = ctx.Products.FirstOrDefault(x => x.ProductId == id);
                if (currentProduct == null)
                {
                    return false;
                }
                currentProduct.Status = (Int32.Parse(currentProduct.Status.ToString()) == 1) ? false : true;
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
