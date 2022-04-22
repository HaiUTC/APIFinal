const getAllAdmin = async () => {
    const response = await fetch('https://localhost:44312/api/Admin/Admins', {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    const data = await response.json();
    if (data.length === 0) {
        $('#bodyTableAdmin').append('<div style="display: flex; justify-content=center; padding-top: 15px;">Not have admin in store</div>');
    }
    else {
        let dataAppend = '';
        data.map((item, index) => {
            dataAppend += `<tr>
                <td>${item.UserName}</td>
                <td>${item.Email}</td>
                <td>
                    <button class="btn btn-secondary"
                        data-bs-toggle="modal"
                        data-bs-target="#editAdmin"
                        onclick="saveDataAdminItem(${item.AdminId})">
                        Edit</button>
                    <button class='btn btn-danger' onclick="deleteAdmin(${item.AdminId})">Delete</button>
                </td>
            </tr > `
        })
        $('#bodyTableAdmin').append(dataAppend);
    }
    
}
const addAdmin = async () => {
    const data = {
        UserName: $('#UserNameAddAdmin').val(),
        Password: $('#PasswordAddAdmin').val(),
        Email: $('#EmailAddAdmin').val(),
    }
    const url = `https://localhost:44312/api/Admin/Register`;
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
                <td>${dataResponse.UserName}</td>
                <td>${dataResponse.Email}</td>
                <td>
                    <button class="btn btn-secondary"
                        data-bs-toggle="modal"
                        data-bs-target="#editAdmin"
                        onclick="saveDataAdminItem(${dataResponse.AdminId})">
                        Edit</button>
                    <button class='btn btn-danger' onclick="deleteAdmin(${dataResponse.AdminId})">Delete</button>
                </td>
            </tr > `
    $('#bodyTableAdmin').append(dataAppend);
    resetDataForm();
    window.location.reload();
}
const editAdmin = async () => {
    const data = {
        AdminId: $('#AdminIdEditAdmin').val(),
        UserName: $('#UserNameEditAdmin').val(),
        Password: $('#PasswordEditAdmin').val(),
        Email: $('#EmailEditAdmin').val()
    }
    const url = `https://localhost:44312/api/Admin/UpdateAdmin`;
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
const deleteAdmin = async (id) => {
    const url = `https://localhost:44312/api/Admin/DeleteAdmin?AdminId=${id}`;
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

const resetDataForm = () => {
    $('#UserNameAddAdmin').val('');
    $('#PasswordAddAdmin').val('');
    $('#EmailAddAdmin').val('');
}

const saveDataAdminItem = async (id) => {
    const response = await fetch(`https://localhost:44312/api/Admin/Admin?AdminId=${id}`, {
        method: 'GET',
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
    })
const data = await response.json();
$('#AdminIdEditAdmin').val(data.AdminId);
$('#UserNameEditAdmin').val(data.UserName),
    $('#PasswordEditAdmin').val(data.Password),
    $('#EmailEditAdmin').val(data.Email)
}
$(document).ready(function () {
    localStorage.getItem("admin") === null ? (window.location.href = '/login.html') : null;
    $('#logout').click(() => {
        localStorage.removeItem('admin');
        window.location.href = '/login.html'
    })
    getAllAdmin();
})

