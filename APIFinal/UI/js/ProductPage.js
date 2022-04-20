﻿const saveDataOrderItem = async (id) => {
    const response = await fetch(`https://localhost:44312/api/Product/Product?ProductId=${id}`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    const data = await response.json();
    $('#NameEditProduct').val(data.Name),
        $('#PriceEditProduct').val(data.Price),
        $('#QuantityEditProduct').val(data.Quantity),
        $('#DescriptionEditProduct').val(data.Description),
        $('#StatusEditProduct').val(data.Status === true ? '1' : '2')

}

const toggleProduct = async (id) => {
    const response = await fetch(`https://localhost:44312/api/Product/DeleteProduct?id=${id}`, {
        method: 'PUT',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    const data = await response.json();
    if (data === true) {
        $(`#toggle_${id}`).text($(`#toggle_${id}`).text() === 'Disable' ? 'Enable' : 'Disable');
        $(`#status_${id}`).text($(`#status_${id}`).text() === 'Active' ? 'Closed' : 'Active');
    }
}

const getAllProduct = async () => {
    const response = await fetch('https://localhost:44312/api/Product/Products', {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    const data = await response.json();
    if (data.length === 0) {
        $('#bodyTableProduct').append('<div style="display: flex; justify-content=center; padding-top: 15px;">Not have product in store</div>');
    }
    else {
        let dataAppend = '';
        data.map((item, index) => {
            dataAppend += `<tr>
                <td>${item.Name}</td>
                <td>${item.Price}</td>
                <td>${item.Quantity}</td>
                <td>${item.Description}</td>
                <td id="status_${item.ProductId}">${item.Status === true ? 'Active' : 'Closed'}</td>
                <td>
                    <button class="btn btn-secondary"
                        data-bs-toggle="modal"
                        data-bs-target="#editProduct"
                        onclick="saveDataOrderItem(${item.ProductId})">
                        Edit</button>
                    <button class="btn btn-secondary" id="toggle_${item.ProductId}" data-bs-toggle="modal" data-bs-target="#toggleProduct" onclick='toggleProduct(${item.ProductId})'>${item.Status === true ? 'Disable' : 'Enable'}</button>
                </td>
            </tr > `
        })
        $('#bodyTableProduct').append(dataAppend);
    }
}

const addProduct = async () => {
    const data = {
        Name: $('#NameAddProduct').val(),
        Price: $('#PriceAddProduct').val(),
        Quantity: $('#QuantityAddProduct').val(),
        Description: $('#DescriptionAddProduct').val(),
        Status: $('#StatusAddProduct').val() === '1' ? true : false,
    }
    const url = `https://localhost:44312/api/Product/AddProduct`;
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
                <td>${dataResponse.Name}</td>
                <td>${dataResponse.Price}</td>
                <td>${dataResponse.Quantity}</td>
                <td>${dataResponse.Description}</td>
                <td id="status_${dataResponse.ProductId}">${dataResponse.Status === true ? 'Active' : 'Closed'}</td>
                <td>
                    <button class="btn btn-secondary"
                        data-bs-toggle="modal"
                        data-bs-target="#editProduct"
                        onclick="saveDataOrderItem(${dataResponse.ProductId})">
                        Edit</button>
                    <button class="btn btn-secondary" id="toggle_${dataResponse.ProductId}" data-bs-toggle="modal" data-bs-target="#toggleProduct" onclick='toggleProduct(${dataResponse.ProductId})'>${dataResponse.Status === true ? 'Disable' : 'Enable'}</button>
                </td>
            </tr > `
    $('#bodyTableProduct').append(dataAppend);
    resetDataForm();
}

const resetDataForm = () => {
    $('#NameAddProduct').val('');
    $('#PriceAddProduct').val('');
    $('#QuantityAddProduct').val('');
    $('#DescriptionAddProduct').val(''),

    $('#StatusAddProduct').val('')
}



$(document).ready(function () {
    localStorage.getItem("admin") === null ? (window.location.href = '/login.html') : null;
    $('#logout').click(() => {
        localStorage.removeItem('admin');
        window.location.href = '/login.html'
    })
    getAllProduct();
})