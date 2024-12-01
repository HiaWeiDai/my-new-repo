using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace CustomerApp_S10269256
{
    internal class Customer
    {
        private string id;
        private string name;
        private double loanAmount;
        private int repaymentPeriod;
        private int interestRate;

        public string ID
        {
            get {  return id; } 
            set { id = value; }
        }
        public string Name
        {
            get { return name; }
            set { name = value; }
        }
        public double LoanAmount
        {
            get { return loanAmount; }
            set { loanAmount = value; }
        }
        public int RepaymentPeriod
        {
            get { return repaymentPeriod; }
            set { repaymentPeriod = value; }
        }
        public int InterestRate
        {
            get { return interestRate; }
            set { interestRate = value; }
        }

        public Customer(string Id, string custname, double loanamt, int repayperiod, int intrate)
        {
            this.id = Id;   
            this.name = custname; 
            this.loanAmount = loanamt;
            this.repaymentPeriod = repayperiod;
            this.interestRate = intrate;
        }
        public double CalculateAmountDue(double loanAmount, int interestRate, int repaymentPeriod)
        {  // interestRate is in percentage so you need to /100.
            // don't need parameters as these values are the class' attributes.  P.Loy
            double interest = loanAmount * interestRate * repaymentPeriod;
            double amountdue = loanAmount + interest;
            return amountdue;
        }
    }
}
