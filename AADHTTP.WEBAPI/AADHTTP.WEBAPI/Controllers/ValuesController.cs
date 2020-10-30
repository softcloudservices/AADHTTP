using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AADHTTP.WEBAPI.Controllers
{
    [Authorize]
    public class ValuesController : ApiController
    {
        // GET api/values
        public IHttpActionResult Get()
        {
            return Ok(Order.CreateOrders());
        }

        // GET api/values/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }

    #region Helpers

    public class Order
    {
        public int EMPID { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
        public string Gender { get; set; }
        public string Technology { get; set; }

        public string Language { get; set; }


        public static List<Order> CreateOrders()
        {
            List<Order> OrderList = new List<Order>
            {
                new Order {EMPID = 10248, Name = "Shiva", City = "Letterkenny", Gender = "Male",Technology = "Blockchain" ,Language ="Python"},
                new Order {EMPID = 10249, Name = "Cornor", City = "Dublin", Gender = "Male",Technology = ".net",Language ="C#" },
                new Order {EMPID = 10250,Name = "David", City = "SA", Gender = "Male" ,Technology = "AI",Language ="asp.net"},
                new Order {EMPID = 10251,Name = "Stephen", City = "Dublin", Gender = "Male",Technology = "Java",Language ="c++"},
                new Order {EMPID = 10252,Name = "Prasad", City = "UK", Gender = "Male",Technology = "Ruby",Language ="SQl"}
            };

            return OrderList;
        }
    }

    #endregion
}
