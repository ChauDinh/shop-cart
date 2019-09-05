const cookies = document.cookie.split(";");

window.localStorage.setItem("userId", cookies[0]);
window.localStorage.setItem("username", cookies[1]);
