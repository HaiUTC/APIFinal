using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace APIFinal.Helper.Types
{

    public class ItemsDetails {
        public int ProductId { get; set; }

        public int Quantity { get; set; }
    }

    public class UserInfo
    {
        public int UserId { get; set; }
        public string Name { get; set; }

        public string Address { get; set; }
        public string ShipCode { get; set; }

    }
    public class OrderItemDetailsViewModel
    {
        public UserInfo userInfo { get; set; }
        public List<ItemsDetails> itemDetails { get; set; }
    }
}