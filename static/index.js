document.addEventListener('DOMContentLoaded', () => {
    const mineBtn = document.getElementById('mineBtn');
    const createTransactionBtn = document.getElementById('createTransactionBtn');
    const getChainBtn = document.getElementById('getChainBtn');
    const mineResponse = document.getElementById('mineResponse');
    const transactionResponse = document.getElementById('transactionResponse');
    const chainResponse = document.getElementById('chainResponse');

    mineBtn.addEventListener('click', () => {
        fetch('/mine')
            .then(response => response.json())
            .then(data => mineResponse.innerHTML = JSON.stringify(data));
    });

    createTransactionBtn.addEventListener('click', () => {
        const sender = document.getElementById('sender').value;
        const recipient = document.getElementById('recipient').value;
        const drugName = document.getElementById('drug_name').value;

        fetch('/transactions/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({sender, recipient, drug_name: drugName})
        })
        .then(response => response.json())
        .then(data => transactionResponse.innerHTML = data.message);
    });

    getChainBtn.addEventListener('click', () => {
        fetch('/chain')
            .then(response => response.json())
            .then(data => chainResponse.innerHTML = JSON.stringify(data, null, 4));
    });
});