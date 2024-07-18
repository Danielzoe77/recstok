const form = document.getElementById("form")
const formLogin = document.getElementById("form-login")
const fullName = document.getElementById("fullname")
const email = document.getElementById("email")
const password = document.getElementById("password")
const confirmPassword = document.getElementById("confirm-password")
const errorMessage = document.getElementById("error")
const emailError = document.getElementById("error-email")
const fullNameError = document.getElementById("error-fullname")
const passwordError = document.getElementById("error-password")
const loginerrorMessage = document.getElementById("login-error")

const loginButton = document.getElementById("login-button");
const forgotForm = document.getElementById("forgot-form")


function validateForm() {
  const user = {
    fullname: fullName.value,
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value
  }


  if (confirmPassword.value !== password.value) {
    errorMessage.style.display = "block"
    errorMessage.style.color = "red"
    return
  }

  if (fullName.value === "") {
   fullNameError.style.display = "block"
   fullNameError.style.color = "red"
  }

  if (password.value === "") {
    passwordError.password = "Password is required";
  }

  
 

  fetch('https://skulrecbackendcod.onrender.com/api/users/register', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json'
    },
   
    
  })
  .then(response => response.json())
  
  .then(data => {
    if (data) {
      console.log(data)
      showModal()
      
    }
  })
  .catch(error => console.error('Error:', error))
}

form.addEventListener("submit", function(event){
  event.preventDefault()
  validateForm()
})

function showModal() {
  const modal = document.getElementById("success-modal");
  modal.classList.remove("hidden");
  modal.style.display = "flex"
}

loginButton.addEventListener("click", function () {
  window.location.href = "login.html";
});


// when forgot email is correct
function showForgotModal() {
  const forgotModal = document.getElementById("success-forgot");
  forgotModal.classList.remove("hidden");
  forgotModal.style.display = "flex"
}


// when forgot email is wrong
function forgotEmail(){
  const emailModal = document.getElementById("forgot-modal");
  emailModal.classList.remove("hidden");
  emailModal.style.display = "flex"
}

function validateEmail(){
  const emailForget = users.find((u)=>u.email === user.email)
  if(emailForget){
    showForgotModal();
  }else {
    forgotEmail();
  }
}

forgotForm.addEventListener("submit", function(e){
  e.preventDefault();
  validateEmail()
})

