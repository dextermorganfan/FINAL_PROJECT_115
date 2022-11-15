let signOutText = document.getElementsByClassName("signout")[0]
let username = document.getElementsByClassName("user")[0]

username.innerText = localStorage.getItem("username")

signOutText.onclick = function() {
   window.location.href = 'main.html'
}