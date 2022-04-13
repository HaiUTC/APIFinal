$(document).ready(function () {
    localStorage.getItem("admin") === null ? (window.location.href = '/login.html') : null;
});
