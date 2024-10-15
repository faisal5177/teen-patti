function updateValues(sectionId) {
    const addMoneyInput = document.getElementById(`add-money${sectionId}`);
    const showAddMoney = document.getElementById(`show-add-money${sectionId}`);
    const expenses = document.getElementById(`expenses${sectionId}`);

    if (addMoneyInput && showAddMoney && expenses) {
        let addMoneyValue = parseFloat(addMoneyInput.value) || 0;
        let previousAddMoneyValue = parseFloat(localStorage.getItem(`add-money${sectionId}`)) || 0;
        let newAddMoneyValue = previousAddMoneyValue + addMoneyValue;

        if (!isNaN(addMoneyValue) && addMoneyInput.value.trim() !== '') {
            const expensesValue = parseFloat(expenses.value.replace('Total:', ''));

            showAddMoney.value = newAddMoneyValue.toFixed(2);
            expenses.value = `Total:${(expensesValue - addMoneyValue).toFixed(2)}`;

            // Save to local storage
            localStorage.setItem(`add-money${sectionId}`, newAddMoneyValue);
            localStorage.setItem(`expenses${sectionId}`, expenses.value);

            // Display the date, time, and amount in a card format
            displayCard(sectionId, addMoneyValue);
        }

        addMoneyInput.value = '';
    }
}

function displayCard(sectionId, amount) {
    const cardsContainer = document.getElementById('cards-container');
    const currentTime = new Date().toLocaleTimeString();
    const currentDate = new Date().toLocaleDateString();

    const card = document.createElement('div');
    card.className = 'card bg-gray-100 p-4 rounded-lg shadow-md';
    card.innerHTML = `
        <h4 class="font-bold text-lg">ID: ${sectionId}</h4>
        <p>Date: ${currentDate}</p>
        <p>Time: ${currentTime}</p>
        <p>Amount: $${amount.toFixed(2)}</p>
    `;

    cardsContainer.appendChild(card);
}

function calculateTotal() {
    let total = 0;
    for (let i = 1; i <= 4; i++) {
        const addMoney = parseFloat(localStorage.getItem(`add-money${i}`)) || 0;
        total += addMoney;
    }
    const totalAddMoney = document.getElementById('total-add-money');
    if (totalAddMoney) {
        totalAddMoney.value = total.toFixed(2);
    }
}

function loadValues() {
    for (let i = 1; i <= 4; i++) {
        const addMoney = localStorage.getItem(`add-money${i}`) || '0';
        const expenses = localStorage.getItem(`expenses${i}`) || 'Total:1000';

        const showAddMoney = document.getElementById(`show-add-money${i}`);
        const expensesElement = document.getElementById(`expenses${i}`);

        if (showAddMoney && expensesElement) {
            showAddMoney.value = addMoney;
            expensesElement.value = expenses;
        }
    }
    calculateTotal();
}

function addEventListeners(sectionId) {
    const addMoneyInput = document.getElementById(`add-money${sectionId}`);
    if (addMoneyInput) {
        addMoneyInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                updateValues(sectionId);
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadValues();
    addEventListeners(1);
    addEventListeners(2);
    addEventListeners(3);
    addEventListeners(4);
});

document.getElementById('restart').addEventListener('click', () => {
    for (let i = 1; i <= 4; i++) {
        localStorage.setItem(`add-money${i}`, '0');
        localStorage.setItem(`expenses${i}`, 'Total:1000');
        const addMoneyInput = document.getElementById(`add-money${i}`);
        const showAddMoney = document.getElementById(`show-add-money${i}`);
        const expenses = document.getElementById(`expenses${i}`);

        if (addMoneyInput && showAddMoney && expenses) {
            addMoneyInput.value = '';
            showAddMoney.value = '0';
            expenses.value = 'Total:1000';
        }
    }
    document.getElementById('cards-container').innerHTML = '';
});
