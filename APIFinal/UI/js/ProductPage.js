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
        $('#bodyTableProduct').append('<div style="display: flex; justify-content=center; padding-top: 15px;">Not have order in store</div>');
    }
    else {
        let dataAppend = '';
        data.map((item, index) => {
            dataAppend += `<tr>
                <td>${item.Name}</td>
                <td>${item.Price}</td>
                <td>${item.Quantity}</td>
                <td>${item.Description}</td>
                <td>${item.Status === true ? 'Active' : 'Closed'}</td>
                <td>
                    <button class="btn btn-secondary"
                        data-bs-toggle="modal"
                        data-bs-target="#editProduct"
                        onclick='saveDataOrderItem(${item.ProductId}, ${item.Name}, ${item.Price}, ${item.Quantity},  ${item.Description}, ${item.Status})'>
                        Edit</button>
                    <button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#removeProduct" onclick='saveDataOrderItem(${index})'>Disable</button>
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
                <td>${item.OrderName}</td>
                <td>${item.UserName}</td>
                <td>${item.AddressDetail}, ${item.Province}, ${item.City}</td>
                <td>${item.Price}</td>
                <td>${item.Fulfillment_Status === true ? 'Success' : 'Pending'}</td>
                <td>
                    <button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#editProduct" onclick='saveDataOrderItem(${item.ProductId}, ${item.OrderName}, ${item.ProductId}, ${item.OrderName})'>Edit</button>
                    <button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#removeOrder" onclick='saveDataOrderItem(${index})'>Remove</button>
                    <button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#">Transaction</button>
                </td>
            </tr > `
    $('#bodyTableProduct').appendChild(dataAppend);
}

const saveDataOrderItem = (id, name, price, quantity, description, status) => {
    $('#NameEditProduct').val(name),
    $('#PriceEditProduct').val(price),
    $('#QuantityEditProduct').val(quantity),
    $('#DescriptionEditProduct').val(description),
    $('#StatusEditProduct').val(status === true ? '1' : '2')

}

$(document).ready(function () {
    localStorage.getItem("admin") === null ? (window.location.href = '/login.html') : null;
    $('#logout').click(() => {
        localStorage.removeItem('admin');
        window.location.href = '/login.html'
    })
    getAllProduct();
})