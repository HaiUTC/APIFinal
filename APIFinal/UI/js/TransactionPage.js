const getAllTransactions = async () => {
    const response = await fetch('https://localhost:44312/api/Transaction/Transactions', {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    const data = await response.json();
    if (data.length === 0) {
        $('#bodyTableTransaction').append('<div style="display: flex; justify-content=center; padding-top: 15px;">Not have transaction in store</div>');
    }
    else {
        let dataAppend = '';
        data.map((item, index) => {
            dataAppend += `<tr>
                <td>${item.Account_Number}</td>
                <td>${item.OderId}</td>
                <td>${item.Amount}</td>
                <td>${item.isCapture}</td>
                <td>
                       <button class="btn btn-secondary"
                        data-bs-toggle="modal"
                        data-bs-target="#editTransaction"
                        onclick="saveDataTransactionItem(${item.AdminId})">
                        Edit</button>
                    <button class="btn btn-primary"
                    onclick="deleteTransaction(${item.TransactionId})">
                        Delete</button>
                </td>                    
            </tr > `
        })
        $('#bodyTableTransaction').append(dataAppend);
    }
}
const addTransaction = async () => {
    const data = {
        Account_Number: $('#AccountNumberAddTransaction').val(),
        Amount: $('#AmountAddTransaction').val(),
    }
    const url = `https://localhost:44312/api/Transaction/AddTransaction`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    const dataResponse = await response.json();
    const dataAppend = `<tr>
                <td>${dataResponse.Account_Number}</td>
                <td>${dataResponse.OrderId}</td>
                <td>${dataResponse.Amount}</td>
                <td>${dataResponse.isCapture}</td>

                <td>
                    <button class="btn btn-secondary"
                        data-bs-toggle="modal"
                        data-bs-target="#editTransaction"
                        onclick="saveDataTransactionItem(${dataResponse.TransactionId})">
                        Edit</button>
                    <button class="btn btn-primary"
                    onclick="deleteTransaction(${dataResponse.TransactionId})">
                        Delete</button>
                </td>
            </tr > `
    $('#bodyTableTransaction').append(dataAppend);
    window.location.reload()
    resetDataForm();
}

const editTransaction = async () => {

}

const triggerTransaction = async () => {

}

    $(document).ready(function () {
        localStorage.getItem("admin") === null ? (window.location.href = '/login.html') : null;
        $('#logout').click(() => {
            localStorage.removeItem('admin');
            window.location.href = '/login.html'
        })
        getAllTransactions();
    })