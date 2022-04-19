﻿    
const getAllOrder = async () => {
    const url = 'https://localhost:44312/api/Order/Orders'
    await $.ajax({
        url: url,
        method: 'GET',
        contentType: 'json',
        dataType: 'json',
        error: function (response) {
        },
        success: function (reponse) {
            data = reponse;
        }
    });

    if (data.length === 0) {
        $('#bodyTableOrder').append('<div style="display: flex; justify-content=center; padding-top: 15px;">Not have order in store</div>');
    }
    else {
        const dataAppend = '';
        data.map((item, index) => {
            dataAppend += `<tr>
                <td>${item.OrderName}</td>
                <td>${item.UserName}</td>
                <td>${item.AddressDetail}, ${item.Province}, ${item.City}</td>
                <td>${item.Price}</td>
                <td>${item.Fulfillment_Status === true ? 'Success' : 'Pending' }</td>
                <td>
                    <button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#editOrder" onclick='saveDataOrderItem(${index})'>Edit</button>
                    <button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#removeOrder" onclick='saveDataOrderItem(${index})'>Remove</button>
                    <button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#">Transaction</button>
                </td>
            </tr > `
        })
    }
}

const saveDataOrderItem = (index) => { localStorage.setItem('index', index) }

const addOrder = async () => {
    const url = `https://localhost:44312/api/Order/AddOrder`;
    const data = {
        userInfo: {
            UserId: $('#userIdAddOrder').val(),
            Name: $('#NameAddOrder').val(),
        },
        itemDetails: [
            {
                ProductId: 1,
                Quantity: 1,
            }
        ]
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    const dataResponse = await response.json();
    console.log(dataResponse);
}

$(document).ready(function () {
    localStorage.getItem("admin") === null ? (window.location.href = '/login.html') : null;
    $('#logout').click(() => {
        localStorage.removeItem('admin');
        window.location.href = '/login.html'
    })
    getAllOrder();
    
    

     

});




