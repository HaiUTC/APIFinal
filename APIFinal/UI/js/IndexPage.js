const changeRoute = () => {
    window.location.replace('/AddOrder.html');
}
const goToAdmin = () => {
    window.location.replace('/admin.html');
}
const getAllOrder = async () => {
    const response = await fetch('https://localhost:44312/api/Order/Orders?typeQuery=all', {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    const data = await response.json();
    if (data.length === 0) {
        $('#bodyTableOrder').append('<div style="display: flex; justify-content=center; padding-top: 15px;">Not have order in store</div>');
    }
    else {
        let dataAppend = '';
        data.map((item, index) => {
            dataAppend += `<tr>
                <td>${item.OrderName}</td>
                <td>${item.UserName}</td>
                <td>${item.Address}</td>
                <td>${item.Price}</td>
                <td>${item.Fulfillment_Status === 'success' ? 'Success' : item.Fulfillment_Status === 'reject' ? 'Reject' : 'Pending'}</td>
                <td>
                    <button class="btn btn-secondary"
                        id="idd_${index}"
                        data-bs-toggle="modal"
                        data-bs-target="#editOrder"
                        data-id="${item.OrderId}"
                        data-address="${item.Address}"
                        data-shipcode="${item.ShipCode}"
                        onclick="saveDataOrderItem(${index})">
                        Edit</button>
                    <button class='btn btn-danger' onclick="deleteAdmin(${item.OrderId})">Delete</button>
                </td>
            </tr > `
        })
        $('#bodyTableOrder').append(dataAppend);
    }

}

const saveDataOrderItem = (index) => {
    const orderId = $(`#idd_${index}`).data('id');
    const address = $(`#idd_${index}`).data('address');
    const shipcode = $(`#idd_${index}`).data('shipcode');
    console.log(orderId, address, shipcode);
    $('#orderIdEditOrder').val(orderId);
    $('#addressEditOrder').val(address);
    $('#shipcodeEditOrder').val(shipcode);
}

const editOrder = async () => {
    const response = await fetch('https://localhost:44312/api/Order/UpdateOrder?id=${orderId}&address=${address}&shipcode=${shipcode}', {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    const data = await response.json();
    if (data) {
        window.location.reload();
    }
}


$(document).ready(function () {
    localStorage.getItem("admin") === null ? (window.location.href = '/login.html') : null;
    $('#logout').click(() => {
        localStorage.removeItem('admin');
        window.location.href = '/login.html'
    })
    getAllOrder();
});




