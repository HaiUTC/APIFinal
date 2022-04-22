using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace APIFinal.Controllers
{
    public class TransactionController : ApiController
    {
        [HttpGet]
        public List<Transaction> Transactions()
        {
            APIFinalDataContext ctx = new APIFinalDataContext();
            return ctx.Transactions.ToList();
        }

        [HttpGet]
        public Transaction Transaction(int TransactionId)
        {
            APIFinalDataContext ctx = new APIFinalDataContext();
            return ctx.Transactions.FirstOrDefault(x => x.TransactionId == TransactionId);
        }

        [HttpPost]
        public Transaction AddTransaction([FromBody] Transaction trans)
        {
                APIFinalDataContext ctx = new APIFinalDataContext();
                Transaction transaction = new Transaction();
                transaction.Account_Number = trans.Account_Number;
                transaction.Amount = trans.Amount;
                ctx.Transactions.InsertOnSubmit(transaction);
                ctx.SubmitChanges();
                return transaction;
        }
    }
}
