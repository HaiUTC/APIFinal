using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
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
        public List<Product> SearchProduct(string name)
        {
            APIFinalDataContext ctx = new APIFinalDataContext();
            if(name == null)
            {
                ctx.Products.ToList();
            }
            return ctx.Products.Where(n => n.Name.Contains(name)).ToList();
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
            product.Picture = pro.Picture;
            ctx.Products.InsertOnSubmit(product);
            ctx.SubmitChanges();
            return product;

        }

        /*public async Task<HttpResponseMessage> PostFormData()
        {
            // Check if the request contains multipart/form-data.
            if (!Request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }

            string root = HttpContext.Current.Server.MapPath("~/App_Data");
            var provider = new MultipartFormDataStreamProvider(root);

            try
            {
                Stream reqStream = Request.Content.ReadAsStreamAsync().Result;
                if (reqStream.CanSeek)
                {
                    reqStream.Position = 0;
                }
                // Read the form data.
                await Request.Content.ReadAsMultipartAsync(provider);
                // Show all the key-value pairs.
                foreach (var key in provider.FormData.AllKeys)
                {
                    foreach (var val in provider.FormData.GetValues(key))
                    {
                        Trace.WriteLine(string.Format("{0}: {1}", key, val));
                    }
                }
                // This illustrates how to get the file names.
                foreach (MultipartFileData file in provider.FileData)
                {
                    Trace.WriteLine(file.Headers.ContentDisposition.FileName);
                    Trace.WriteLine("Server file path: " + file.LocalFileName);
                }
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (System.Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }
        }*/
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
                currentProduct.Picture = pro.Picture;
                currentProduct.Status = pro.Status;
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
            var checkExistProductHaveOdrer = ctx.OrderItems.FirstOrDefault(x => x.ProductId == ProductId);
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
