const cookies = document.cookie.split(";");

window.localStorage.setItem("userId", cookies[1]);
window.localStorage.setItem("username", cookies[2]);
