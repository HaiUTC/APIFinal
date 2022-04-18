$(document).ready(function () {
    localStorage.getItem("admin") === null ? (window.location.href = '/login.html') : null;
    $('#logout').click(() => {
        localStorage.removeItem('admin');
        window.location.href = '/login.html'
    })


    const getAllOrder = async () => {
        const url = 'https://localhost:44312/api'
        await $.ajax({
            url: url,
            method: 'POST',
            contentType: 'json',
            dataType: 'json',
            error: function (response) {
            },
            success: function (reponse) {
                data = reponse;
            }
        });
    }

    const getAll
});
