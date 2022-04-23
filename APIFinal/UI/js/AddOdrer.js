

const getAllCustomer = async () => {
    const response = await fetch('https://localhost:44312/api/User/Customers', {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    const data = await response.json();
    if (data.length === 0) {
        return null;
    }
    else {
        let dataAppend = '';
        data.map((item, index) => {
            dataAppend += `<option value="${item.UserId}">${item.Name}</option> `
        })
        $('#userAddOrder').append(dataAppend);
    }
}


const addProductSelect = async () => {
    const response = await fetch('https://localhost:44312/api/Product/Products', {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    const data = await response.json();
    let listProduct = JSON.parse(localStorage.getItem('listProduct'));
    if (listProduct === null) {
        listProduct = 0;
        localStorage.setItem('listProduct', JSON.stringify(1));
    } else {
        localStorage.setItem('listProduct', JSON.stringify(listProduct + 1));
    }
    let dataAppendChild;
    const dataAppend = `
     <div style="display: flex; flex-wrap: wrap" class="mb-3">
                    <div style="flex: 1">
                        <label class="form-label" for="inputEmail">Product</label>
                        <select class="form-select" aria-label="Default select example" id="productAdd_${listProduct}">
                            <option selected>Chooes one products</option>
                        </select>
                    </div>
                    <div style="flex: 1; margin-left: 10px;">
                        <label class="form-label" for="inputEmail">Quantity</label>
                        <input type="number" class="form-control" id="quantitySelect_${listProduct}">
                    </div>
                </div>
`
    data.map(item => {
        dataAppendChild += `<option value="${item.ProductId}">${item.Name}</option>`
    })
    
    $('#listProductSelect').append(dataAppend);
    $(`#productAdd_${listProduct}`).append(dataAppendChild);
}

const handleAddOrder = async () => {
    const listProduct = JSON.parse(localStorage.getItem('listProduct'));
    const data = [];
    for (let i = 0; i < listProduct; i++) {
        const dataElement = {
            ProductId: Number.parseInt($(`#productAdd_${i}`).val()),
            Quantity: Number.parseInt($(`#quantitySelect_${i}`).val()),
        }
        data.push(dataElement);
    }
    localStorage.removeItem('listProduct');

    const url = `https://localhost:44312/api/Order/AddOrder`;
    const dataReq = {
        userInfo: {
            UserId: $('#userAddOrder').val(),
            Name: $('#nameAddOrder').val(),
            Address: $('#AddressAddOrder').val(),
            ShipCode: $('#shipCodeAddOrder').val(),
        },
        itemDetails: data,
    }
    await fetch(url, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dataReq),
    })
    window.location.replace('/');
}
$(document).ready(function () {
    localStorage.getItem("admin") === null ? (window.location.href = '/login.html') : null;
    $('#logout').click(() => {
        localStorage.removeItem('admin');
        window.location.href = '/login.html'
    })
    getAllCustomer();
    localStorage.removeItem('listProduct');
})