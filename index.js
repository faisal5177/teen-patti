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
        }

        addMoneyInput.value = ''; // Clear input after adding
        calculateTotal();
    }
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

// Add event listeners to update values when inputs change or Enter key is pressed
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

// Clear local storage and reset values
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
    const totalAddMoney = document.getElementById('total-add-money');
    if (totalAddMoney) {
        totalAddMoney.value = '0.00';
    }
});
