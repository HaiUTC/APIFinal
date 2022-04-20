const getAllTransactions = async () => {

}
const addTransaction = async () => {
    
}

const editTransaction = async () => {

}

const triggerTransaction = async () => {

}


$(document).ready(function () {
    localStorage.getItem("admin") === null ? (window.location.href = '/login.html') : null;
    $('#logout').click(() => {
        localStorage.removeItem('admin');
        window.location.href = '/login.html'
    })
    getAllTransactions();
}