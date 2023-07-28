// Initialize expenses array
let expenses = [];

// DOM Elements
const addExpenseForm = document.querySelector('#addExpenseForm');
const expenseTableBody = document.querySelector('#expenseTableBody');

// Event Listeners
addExpenseForm.addEventListener('submit', addExpense);
expenseTableBody.addEventListener('click', deleteOrEditExpense);

// Functions
function addExpense(event) {
    event.preventDefault();

    // Get form values
    const expenseName = document.querySelector('#expenseName').value;
    const expenseAmount = parseFloat(document.querySelector('#expenseAmount').value);

    // Create new expense object
    const newExpense = {
        name: expenseName,
        amount: expenseAmount,
        id: Date.now()
    };

    // Add new expense to expenses array
    expenses.push(newExpense);

    // Clear form fields
    addExpenseForm.reset();

    // Render expenses table
    renderExpensesTable();
}

function deleteOrEditExpense(event) {
    const button = event.target;

    if (button.classList.contains('delete-button')) {
        // Delete expense
        const expenseId = parseInt(button.parentElement.parentElement.dataset.id);
        expenses = expenses.filter(expense => expense.id !== expenseId);
        renderExpensesTable();
    } else if (button.classList.contains('edit-button')) {
        // Edit expense
        const expenseId = parseInt(button.parentElement.parentElement.dataset.id);
        const expense = expenses.find(expense => expense.id === expenseId);
        document.querySelector('#expenseName').value = expense.name;
        document.querySelector('#expenseAmount').value = expense.amount;
        expenses = expenses.filter(expense => expense.id !== expenseId);
        renderExpensesTable();
    }
}

function renderExpensesTable() {
    // Clear table body
    expenseTableBody.innerHTML = '';

    // Render each expense in table
    expenses.forEach(expense => {
        const row = document.createElement('tr');
        row.dataset.id = expense.id;
        row.innerHTML = `
            <td>${expense.name}</td>
            <td>$${expense.amount.toFixed(2)}</td>
            <td>
                <button type="button" class="btn btn-sm btn-danger delete-button">Delete</button>
                <button type="button" class="btn btn-sm btn-primary edit-button">Edit</button>
            </td>
        `;
        expenseTableBody.appendChild(row);
    });
}
