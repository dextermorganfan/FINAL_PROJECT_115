let signupButton = document.getElementsByClassName("signupButton")[0]
let loginButton = document.getElementsByClassName("loginButton")[0]

let username_input = document.getElementsByClassName("user")[0]
let password_input = document.getElementsByClassName("pass")[0]

let password_check = document.getElementsByClassName("password_check")[0]

let audio = document.getElementById("audio")

audio.volume = .3
let Database = []

let lastPassword

let minimumPasswordLength = 7

// 1. Check if the input lengths are valid

// Sign Up

// Check if they are already in the database
// Check if username collide with another user

// If none of those then sign them up
// aka put them in the Database


// Log In

function resetInputfields() {
   username_input.value = ""
   password_input.value = ""
   password_check.src = "Images/remove.png"
}

function checkLengthOfInputs() {
   if (password_input.value.length <= minimumPasswordLength || username_input.value.length <= 0) {

      if (username_input.value.length <= 0) {
         alert("Your username is too short.")
      } else {
         alert("Your password is too short.")
         resetInputfields()
      }

      return false

   } else {
      return true
   }
}

function addUserDataToDatabase(username,password) {
   let newUserData = {Username : username, Password : password}
   Database.push(newUserData)
   console.log(Database)
   resetInputfields()
   alert("You have successfully signed up! You may now login.")
}

function checkIfAlreadyInDatabase(username,password,buttonClicked) {

   for (userData in Database) {

      if (buttonClicked == "signUp") {

         if (username.toLowerCase() == Database[userData].Username.toLowerCase()) {
            alert(`A user by the name '${username}', seems to already be in our database. Try again.`)
            resetInputfields()
            break
         } else {
            addUserDataToDatabase(username,password)
            console.log("Not in database")
            break
         }

      } else {

         if (username.toLowerCase() == Database[userData].Username.toLowerCase()) {
            if (password == Database[userData].Password) {
               alert("You have sucessfully logged into your account.")
               resetInputfields()
               window.location.href = 'actual.html'
               localStorage.setItem('username', username)
            } else {
               alert("The password given didn't match our records with the associated username. Try again.")
               resetInputfields()
            }
         } else {
            alert(`The username you provided '${username}', wasn't found in our database. Try signing up instead.`)
            resetInputfields()
         }
      }

   }

   if (Database.length <= 0 && buttonClicked == "logIn") {
      alert(`The username you provided '${username}', wasn't found in our database. Try signing up instead.`)
      resetInputfields()
   }

   if (Database.length <= 0 && buttonClicked == "signUp") { 
      addUserDataToDatabase(username,password)
      console.log("No need to check, the database is empty!")
   }
}
password_input.addEventListener("input", function() {
   if (password_input.value.length < minimumPasswordLength || password_input.value.length <= 0) {
      password_check.src = 'Images/remove.png'
   } else {
      password_check.src = "Images/tick-mark.png"
   }
})

password_input.addEventListener("focusout", function() {
   let lengthOfPassword = password_input.value.length
   if (lengthOfPassword <= 0) {
      return
   }
   let protectedString = ""
   for (let i = 0; i < lengthOfPassword ;i++) {
      protectedString += "*"
   }
   lastPassword = password_input.value
   password_input.value = protectedString
})

password_input.addEventListener("focus", function() {
   password_input.value = ""
   password_check.src = "Images/remove.png"
})

signupButton.onclick = function() {
   if (checkLengthOfInputs()) {

      checkIfAlreadyInDatabase(username_input.value,lastPassword,"signUp")

   } 
}

loginButton.onclick = function() {
   if (checkLengthOfInputs()) {

      checkIfAlreadyInDatabase(username_input.value, lastPassword, "logIn")

   }
}
