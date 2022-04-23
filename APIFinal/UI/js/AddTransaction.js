const getAllOdrerNotTransa = async () => {
    const response = await fetch('https://localhost:44312/api/Order/Orders?typeQuery=not', {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    const data = await response.json();
    if (data.length === 0) {
        alert('Not have order to transaction');
    }
    else {
        let dataAppend = '';
        data.map((item, index) => {
            dataAppend += `<option value="${item.OrderId}">${item.OrderName}</option>`
        })
        $('#ListOrderNotTran').append(dataAppend);
    }
}

const hanleTriggerTransaction = async () => {
    const OrderId = $('#ListOrderNotTran').val();
    const TransactionId = JSON.parse(localStorage.getItem('TransactionId'));
    const response = await fetch(`https://localhost:44312/api/Transaction/TriggerTransaction?OrderId=${OrderId}&TransactionId=${TransactionId}`, {
        method: 'PUT',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    const data = await response.json();
    if (data) {
        window.location.replace('/transaction.html');
    }
    else {
        alert('Failure to transaction');
    }
}

$(document).ready(function () {
    localStorage.getItem("admin") === null ? (window.location.href = '/login.html') : null;
    $('#logout').click(() => {
        localStorage.removeItem('admin');
        window.location.href = '/login.html'
    })
    getAllOdrerNotTransa();
})