document.addEventListener('DOMContentLoaded', () => {
    const mineBtn = document.getElementById('mineBtn');
    const createTransactionBtn = document.getElementById('createTransactionBtn');
    const getChainBtn = document.getElementById('getChainBtn');
    const mineResponse = document.getElementById('mineResponse');
    const transactionResponse = document.getElementById('transactionResponse');
    const chainResponse = document.getElementById('chainResponse');

    // Function to set the price
    function setPrice() {
        const newPrice = document.getElementById('priceInput').value;
        contract.methods.setPrice(newPrice).send({ from: '0x...' }) // Update with your MetaMask account address
            .on('transactionHash', function(hash) {
                console.log('Transaction Hash:', hash);
            })
            .on('receipt', function(receipt) {
                console.log('Receipt:', receipt);
            });
    }

    // Function to get the price
    async function getPrice() {
        const price = await contract.methods.getPrice().call();
        document.getElementById('currentPrice').innerText = price;
    }

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
