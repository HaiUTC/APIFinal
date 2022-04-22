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

        [HttpPost]
        public Product AddProduct([FromBody] Product pro)
        {
                APIFinalDataContext ctx = new APIFinalDataContext();
                Product product = new Product();
                product.Name = pro.Name;
                product.Price = pro.Price;
                product.Quantity = pro.Quantity;
                product.Description = pro.Description;
                product.Status = pro.Status;
                ctx.Products.InsertOnSubmit(product);
                ctx.SubmitChanges();
            return product;
            
        }
        [HttpPut]
        public bool UpdateProduct([FromBody] Product pro)
        {
            try
            {
                APIFinalDataContext ctx = new APIFinalDataContext();
                Product currentProduct = ctx.Products.FirstOrDefault(x => x.ProductId == pro.ProductId);
                if (currentProduct == null)
                {
                    return false;
                }
                currentProduct.Name = pro.Name;
                currentProduct.Price = pro.Price;
                currentProduct.Quantity = pro.Quantity;
                currentProduct.Description = pro.Description;
                currentProduct.Status = pro.Status;
                ctx.SubmitChanges();
                return true; 
            }
            catch
            {
                return false;
            }
        }
        [HttpPut]
        public bool ToggleProduct(int id)
        {
            try
            {
                APIFinalDataContext ctx = new APIFinalDataContext();
                Product currentProduct = ctx.Products.FirstOrDefault(x => x.ProductId == id);
                if (currentProduct == null)
                {
                    return false;
                }
                currentProduct.Status = !currentProduct.Status;
                ctx.SubmitChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        [HttpDelete]
        public bool DeleteProduct(int ProductId)
        {
            APIFinalDataContext ctx = new APIFinalDataContext();
            var checkExistProductHaveOdrer = ctx.OrderItems.Where(x => x.ProductId == ProductId);
            if (checkExistProductHaveOdrer != null)
            {
                return false;
            }

            var product = ctx.Products.FirstOrDefault(x => x.ProductId == ProductId);
            ctx.Products.DeleteOnSubmit(product);
            ctx.SubmitChanges();
            return true;
        }

    }
}
