const getAllAdmin = async () => {

}
const addAdmin = async () => {
   
}
const deleteAdmin = async () => {

}
$(document).ready(function () {
    localStorage.getItem("admin") === null ? (window.location.href = '/login.html') : null;
    $('#logout').click(() => {
        localStorage.removeItem('admin');
        window.location.href = '/login.html'
    })
    getAllAdmin();
}