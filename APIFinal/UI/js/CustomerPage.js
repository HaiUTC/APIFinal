const getAllCustomer = async () => {

}
const addCustomer = async () => {
    
}
const editCustomer = async () => {

}
const toggelCustomer = async () => {

}

$(document).ready(function () {
    localStorage.getItem("admin") === null ? (window.location.href = '/login.html') : null;
    $('#logout').click(() => {
        localStorage.removeItem('admin');
        window.location.href = '/login.html'
    })
    getAllCustomer();
}