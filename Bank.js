// 🏦 Bank and Account System 
// Bank Class: Manages multiple accounts
class Bank {
    constructor() {
        this.accounts = []; // Stores all accounts in the bank
    }

    // Add methods here:
    // Example: createAccount(name, initialDeposit)

    createAccount(name, initialDeposit){
        const newAccount = new Account(name, initialDeposit);
        this.accounts.push(newAccount);
        return newAccount;
    }

}

// Account Class: Represents a single user's account
class Account {
    constructor(name, balance = 0) {
        this.name = name; // Account holder's name
        this.balance = balance; // Initial balance (default is 0)
        this.transactionHistory = []; // Keeps a record of all transactions
    }

    // Add methods here:
    // Example: deposit(amount) 
    // example data to be stored in transactionHistory { transactionType: 'Deposit', amount: 500 }
    deposit(amount){
        if(amount > 0){
            this.balance += amount;
            this.transactionHistory.push({ transactionType: 'Deposit', amount: amount });
        }
        else if(amount === 0){
            console.log("You enter 0 deposit amount.");
        }
        else{
            console.log("Please enter valid deposit amount number.");
        }
    }

    // Example: withdraw(amount)
    // example data to be stored in transactionHistory { transactionType: 'Withdrawal', amount: 200 }
    withdraw(amount){
        if(amount > 0 && amount <= this.balance){
            this.balance -= amount;
            this.transactionHistory.push({ transactionType: 'Withdrawal', amount: amount });
        }
        else if(amount === 0){
            console.log("0 withdraw amount.")
        }
        else{
            console.log("Please enter valid withdraw amount number.")
        }
    }

    // Example: transfer(amount, recipientAccount)
    // example data to be stored in transactionHistory:
    // for account sending { transactionType: 'Transfer', amount: 300, to: recipientName }
    // for account recieving { transactionType: 'Received', amount: 300, from: senderName }
    transfer(amount, recipientAccount){
        if(amount > 0 && amount <= this.balance){
            this.balance -= amount;
            this.recipientName = recipientAccount;
            this.transactionHistory.push({ transactionType: 'Transfer', amount: amount, to: this.recipientName.name });
            this.recipientName.deposit(amount);
            this.transactionHistory.push({ transactionType: 'Received', amount: amount, from: this.name });
        }
        else{
            console.log("Not enough funds.");
        }
    }
    
    // Example: checkBalance()
    checkBalance(){
        return this.balance;
    }
}

//<-------------------------------DO NOT WRITE BELOW THIS LINE------------------------------>

// Function to test bank operations
function testBankOperations() {
    const bank = new Bank();

    // Create new accounts
    const johnAccount = bank.createAccount('John Doe', 1200);
    const janeAccount = bank.createAccount('Jane Doe', 500);
    console.log('Accounts created:', johnAccount, janeAccount);

    // Perform some operations on John's account
    johnAccount.deposit(100);
    johnAccount.withdraw(200);

    // Perform a transfer from John to Jane
    johnAccount.transfer(300, janeAccount);

    // Check balances
    const johnFinalBalance = johnAccount.checkBalance();
    const janeFinalBalance = janeAccount.checkBalance();
    console.log('John\'s balance:', johnFinalBalance);
    console.log('Jane\'s balance:', janeFinalBalance);

    // Return balances for testing
    return { 
        johnFinalBalance, 
        janeFinalBalance, 
        johnTransactionHistory: johnAccount.transactionHistory, 
        janeTransactionHistory: janeAccount.transactionHistory 
    };
}

module.exports = testBankOperations;

//<-------------------------------DO NOT WRITE ABOVE THIS LINE------------------------------>


console.log(testBankOperations());
