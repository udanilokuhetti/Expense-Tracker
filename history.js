document.addEventListener('DOMContentLoaded', function() {
    const historyTableBody = document.getElementById('history-table-body');
    const balanceElement = document.querySelector('.balance');

    // Retrieve transactions from localStorage
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    // Initialize balance
    let balance = 0;

    transactions.forEach((transaction, index) => {
        const newRow = document.createElement('tr');

        // Add a class based on the transaction type
        if (transaction.type === 'income') {
            newRow.classList.add('income-row');
        } else if (transaction.type === 'expense') {
            newRow.classList.add('expense-row');
        }

        newRow.innerHTML = `
            <td>${transaction.category}</td>
            <td>${transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}</td>
            <td>${transaction.amount.toFixed(2)}</td>
            <td><button class="delete-btn" data-index="${index}">&cross;</button></td>
        `;
        historyTableBody.appendChild(newRow);

        // Update balance
        if (transaction.type === 'income') {
            balance += transaction.amount;
        } else if (transaction.type === 'expense') {
            balance -= transaction.amount;
        }
    });

    // Update balance element
    balanceElement.textContent = `$${balance.toFixed(2)}`;
    
    // Add event listener for delete buttons
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            deleteTransaction(index);
        });
    });
});

function deleteTransaction(index) {
    // Retrieve transactions from localStorage
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    // Remove the transaction from the array
    transactions.splice(index, 1);

    // Update localStorage
    localStorage.setItem('transactions', JSON.stringify(transactions));

    // Refresh the table to reflect the changes
    location.reload();
}

function feedback() {
    // Retrieve transactions from localStorage
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    let totalIncome = 0;
    let totalExpense = 0;

    // Calculate total income and expenses
    transactions.forEach(transaction => {
        if (transaction.type === 'income') {
            totalIncome += transaction.amount;
        } else if (transaction.type === 'expense') {
            totalExpense += transaction.amount;
        }
    });

    // Provide feedback based on the transaction history
    let feedbackMessage = '';
    if (totalIncome > totalExpense) {
        feedbackMessage = "Great job! You have saved more than you spent.";
    } else if (totalExpense > totalIncome) {
        feedbackMessage = "Warning: Your expenses exceed your income. Consider reviewing your spending.";
    } else if (!totalExpense && !totalIncome){
        feedbackMessage = "You have no transactions to show a feedback!";
    } else {
        feedbackMessage = "Your income and expenses are balanced.";
    } 

    // Display the feedback to the user
    alert(feedbackMessage);
}