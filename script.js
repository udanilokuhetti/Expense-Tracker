// Select necessary DOM elements
const typeInput = document.getElementById('type');
const categoryInput = document.getElementById('category');
const amountInput = document.getElementById('amount');
const balanceElement = document.querySelector('.balance');
const transactionTableBody = document.getElementById('transaction-table-body');

let balance = 0;

// Function to add a transaction
function addTransaction() {
    const type = typeInput.value.trim().toLowerCase();
    const category = categoryInput.value.trim();
    const amount = parseFloat(amountInput.value);

    // Validate the input fields
    if (!type) {
        alert('Please enter a transaction type (Income or Expense).');
        return;
    }
    
    if (!category) {
        alert('Please enter a transaction category.');
        return;
    }
    
    if (isNaN(amount)) {
        alert('Please enter a valid amount.');
        return;
    }
    
    if (type !== 'income' && type !== 'expense') {
        alert('Transaction type must be "Income" or "Expense".');
        return;
    }    

    // Save transaction to localStorage
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.push({ type, amount, category });
    localStorage.setItem('transactions', JSON.stringify(transactions));

    // Clear input fields
    typeInput.value = '';
    categoryInput.value = '';
    amountInput.value = '';
}

// Bind the addTransaction function to the button's click event
document.querySelector('button[type="submit"]').addEventListener('click', addTransaction);