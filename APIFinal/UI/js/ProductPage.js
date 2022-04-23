const goToAdmin = () => {
    window.location.replace('/admin.html');
}
const saveDataOrderItem = async (id) => {
    const response = await fetch(`https://localhost:44312/api/Product/Product?ProductId=${id}`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    const data = await response.json();
    $('#ProductIdEditProduct').val(data.ProductId),
    $('#NameEditProduct').val(data.Name),
        $('#PriceEditProduct').val(data.Price),
        $('#QuantityEditProduct').val(data.Quantity),
        $('#DescriptionEditProduct').val(data.Description),
        $('#StatusEditProduct').val(data.Status === true ? '1' : '2')

}

const handleSearch = async () => {
    const name = $('#searchProduct').val();
    if (name !== "" || name !== null) {
        const url = `https://localhost:44312/api/Product/SearchProduct?name=${name}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
        const data = await response.json();
        if (data.length === 0) {
            $('#appProduct').html('<div style="display: flex; justify-content=center; padding-top: 15px;">Not have customer in store</div>')
        }
        else {
            let dataAppend = '';
            data.map((item, index) => {
                dataAppend += `<div class="card" style="width: 18rem;">
                    <img src=${item.Picture} class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${item.Name}</h5>
                        <p class="card-text">${item.Description}.</p>
                        <p class="card-text">$${item.Price}.</p>
                        <p class="card-text">Quantity: ${item.Quantity}.</p>
                        <p>
                            <button class="btn btn-secondary"
                        data-bs-toggle="modal"
                        data-bs-target="#editProduct"
                        onclick="saveDataOrderItem(${item.ProductId})">
                        Edit</button>
                    <button
                        class="btn btn-danger"
                        onclick='deleteProduct(${item.ProductId})'>Delete</button>
                        </p>
                    </div>
                </div>`
            })
            $('#appProduct').html(dataAppend);
        }
    } else {
        getAllProduct();
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
        $('#appProduct').append('<div style="display: flex; justify-content=center; padding-top: 15px;">Not have product in store</div>');
    }
    else {
        let dataAppend = '';
        data.map((item, index) => {
            dataAppend += `<div class="card" style="width: 18rem;">
                    <img src=${item.Picture} class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${item.Name}</h5>
                        <p class="card-text">${item.Description}.</p>
                        <p class="card-text">$${item.Price}.</p>
                        <p class="card-text">Quantity: ${item.Quantity}.</p>
                        <p>
                            <button class="btn btn-secondary"
                        data-bs-toggle="modal"
                        data-bs-target="#editProduct"
                        onclick="saveDataOrderItem(${item.ProductId})">
                        Edit</button>
                    <button
                        class="btn btn-danger"
                        onclick='deleteProduct(${item.ProductId})'>Delete</button>
                        </p>
                    </div>
                </div>`
        })
        $('#appProduct').append(dataAppend);
    }
}

const addProduct = async () => {
    const data = {
        Name: $('#NameAddProduct').val(),
        Price: $('#PriceAddProduct').val(),
        Quantity: $('#QuantityAddProduct').val(),
        Description: $('#DescriptionAddProduct').val(),
        Status: $('#StatusAddProduct').val() === '1' ? true : false,
        Picture: $('#PictureAddProduct').val(),
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
    const dataAppend = `<div class="card" style="width: 18rem;">
                    <img src=${dataResponse.Picture} class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${dataResponse.Name}</h5>
                        <p class="card-text">${dataResponse.Description}.</p>
                        <p class="card-text">$${dataResponse.Price}.</p>
                        <p class="card-text">Quantity: ${dataResponse.Quantity}.</p>
                        <p>
                            <button class="btn btn-secondary"
                        data-bs-toggle="modal"
                        data-bs-target="#editProduct"
                        onclick="saveDataOrderItem(${dataResponse.ProductId})">
                        Edit</button>
                    <button
                        class="btn btn-danger"
                        onclick='deleteProduct(${dataResponse.ProductId})'>Delete</button>
                        </p>
                    </div>
                </div>`
    $('#appProduct').append(dataAppend);
    resetDataForm();
}

const resetDataForm = () => {
    $('#NameAddProduct').val('');
    $('#PriceAddProduct').val('');
    $('#QuantityAddProduct').val('');
    $('#DescriptionAddProduct').val(''),
    $('#StatusAddProduct').val('')
}

const editProduct = async () => {
    const data = {
        ProductId: $('#ProductIdEditProduct').val(),
        Name: $('#NameEditProduct').val(),
        Price: $('#PriceEditProduct').val(),
        Quantity: $('#QuantityEditProduct').val(),
        Description: $('#DescriptionEditProduct').val(),
        Picture: $('#PictureEditProduct').val(),
        Status: $('#StatusEditProduct').val(),
    }
    const url = `https://localhost:44312/api/Product/UpdateProduct`;
        await fetch(url, {
            method: 'PUT',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
    resetDataForm();
    window.location.reload();
}

const deleteProduct = async (id) => {
    const url = `https://localhost:44312/api/Product/DeleteProduct?ProductId=${id}`;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    const dataResponse = await response.json();
    if (dataResponse) {
        window.location.reload();
    }
}

$(document).ready(function () {
    localStorage.getItem("admin") === null ? (window.location.href = '/login.html') : null;
    $('#logout').click(() => {
        localStorage.removeItem('admin');
        window.location.href = '/login.html'
    })
    getAllProduct();
})