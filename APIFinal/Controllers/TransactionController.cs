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

        [HttpGet]
        public List<Transaction> SearchTransaction(string Account_Number)
        {
            APIFinalDataContext ctx = new APIFinalDataContext();
            if (Account_Number == null)
            {
                return ctx.Transactions.ToList();
            }
            return ctx.Transactions.Where(x => x.Account_Number.Contains(Account_Number)).ToList();
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

        [HttpDelete]
        public bool DeleteTransaction(int TransactionId)
        {
            APIFinalDataContext ctx = new APIFinalDataContext();
            var tran = ctx.Transactions.FirstOrDefault(x => x.TransactionId == TransactionId);
            if (tran == null)
            {
                return false;
            }
            ctx.Transactions.DeleteOnSubmit(tran);
            ctx.SubmitChanges();
            return true;
        }

        [HttpPut]
        public bool TriggerTransaction(int OrderId, int TransactionId)
        {
            APIFinalDataContext ctx = new APIFinalDataContext();
            try
            {
                var tran = ctx.Transactions.FirstOrDefault(x => x.TransactionId == TransactionId);
                if (tran == null)
                {
                    return false;
                }
                tran.OrderId = OrderId;
                tran.isCapture = true;
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
