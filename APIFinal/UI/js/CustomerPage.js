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
        $('#bodyTableCustomer').append('<div style="display: flex; justify-content=center; padding-top: 15px;">Not have customer in store</div>');
    }
    else {
        let dataAppend = '';
        data.map((item, index) => {
            dataAppend += `<tr>
                <td>${item.Name}</td>
                <td>${item.Email}</td>
                <td>${item.PhoneNumber}</td>
                <td>${item.AddressDetail}, ${item.Province}, ${item.City}</td>
                <td id="status_${item.UserId}">${item.Active === 1 ? 'Active' : 'Closed'}</td>
                <td>
                    <button class="btn btn-secondary"
                        data-bs-toggle="modal"
                        data-bs-target="#editCustomer"
                        onclick="saveDataCustomerItem(${item.UserId})">
                        Edit</button>
                    <button class='btn btn-danger' onclick='deleteCustomer(${item.UserId})'>Delete</button>
                </td>
            </tr > `
        })
        $('#bodyTableCustomer').append(dataAppend);
    }
}
const addCustomer = async () => {
    const data = {
        Name: $('#NameAddCustomer').val(),
        Email: $('#EmailAddCustomer').val(),
        PhoneNumber: $('#PhoneNumberAddCustomer').val(),
        City: $('#CityAddCustomer').val(),
        Province: $('#ProvinceAddCustomer').val(),
        AddressDetail: $('#AddressDetailAddCustomer').val(),
        Active: $('#ActiveAddCustomer').val(),
    }
    const url = `https://localhost:44312/api/User/AddCustomer`;
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
                <td>${dataResponse.Email}</td>
                <td>${dataResponse.PhoneNumber}</td>
                <td>${dataResponse.AddressDetail}, ${dataResponse.Province}, ${dataResponse.City}</td>
                <td id="status_${dataResponse.UserId}">${dataResponse.Active === 1 ? 'Active' : 'Closed'}</td>
                <td>
                    <button class="btn btn-secondary"
                        data-bs-toggle="modal"
                        data-bs-target="#editCustomer"
                        onclick="saveDataCustomerItem(${dataResponse.UserId})">
                        Edit</button>
                    
                </td>
            </tr > `
    $('#bodyTableCustomer').append(dataAppend);
    resetDataForm();
}
const editCustomer = async () => {
    const data = {
        UserId: $('#UserIdEditCustomer').val(),
        Name: $('#NameEditCustomer').val(),
        Email: $('#EmailEditCustomer').val(),
        PhoneNumber: $('#PhoneNumberEditCustomer').val(),
        City: $('#CityEditCustomer').val(),
        Province: $('#ProvinceEditCustomer').val(),
        AddressDetail: $('#AddressDetailEditCustomer').val(),
        Active: $('#ActiveEditCustomer').val(),
    }
    const url = `https://localhost:44312/api/User/UpdateCustomer`;
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
const toggelCustomer = async (id) => {
    const response = await fetch(`https://localhost:44312/api/User/ToggleActiveCustomer?UserId=${id}`, {
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
const saveDataCustomerItem = async (id) => {
    const response = await fetch(`https://localhost:44312/api/User/Customer?UserId=${id}`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    const data = await response.json();
    $('#UserIdEditCustomer').val(data.UserId);
    $('#NameEditCustomer').val(data.Name),
        $('#EmailEditCustomer').val(data.Email),
        $('#PhoneNumberEditCustomer').val(data.PhoneNumber),
        $('#CityEditCustomer').val(data.City),
        $('#ProvinceEditCustomer').val(data.Province),
        $('#AddressDetailEditCustomer').val(data.AddressDetail),
        $('#ActiveEditCustomer').val(data.Active === true ? '1' : '2')
}
const resetDataForm = () => {
    $('#NameAddCustomer').val('');
    $('#EmailAddCustomer').val('');
    $('#PhoneNumberAddCustomer').val('');
    $('#CityAddCustomer').val(''),
    $('#ProvinceAddCustomer').val('')
    $('#AddressDetailAddCustomer').val('')
    $('#ActiveAddCustomer').val('')
}
const deleteCustomer = async (id) => {

}
$(document).ready(function () {
    localStorage.getItem("admin") === null ? (window.location.href = '/login.html') : null;
    $('#logout').click(() => {
        localStorage.removeItem('admin');
        window.location.href = '/login.html'
    })
    getAllCustomer();
})