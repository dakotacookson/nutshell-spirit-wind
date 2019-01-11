import API from "./api"
// Declare variables to hold user input
const userNameInput = document.createElement("input")
const userPasswordInput = document.createElement("input")
const userEmailInput = document.createElement("input")

const createNewUser = document.createElement("button")

// Declare variable to be exported
const registrationForm = {

    // This module will build a form and append it to the DOM. The form will contain input fields for a user to add themselves to the database of registered users and a button with an event listener that will listen for the click
    createAndAppendRegistrationForm () {

    const registerContainer = document.querySelector(".output__registration")
    const registerHeader = document.createElement("h3")
    registerContainer.appendChild(registerHeader)
    registerHeader.textContent="Register User"


// setting type for variables

    userNameInput.type = "text"
    userPasswordInput.type = "text"
    userEmailInput.type = "text"

    // Create what the user sees in fields

    userNameInput.placeholder = "Input UserName"
    userPasswordInput.placeholder = "Create Password"
    userEmailInput.placeholder = "Input Email Address"
    createNewUser.textContent = "Register User"

    // Add fields to DOM

    registerContainer.appendChild(userNameInput)
    registerContainer.appendChild(userPasswordInput)
    registerContainer.appendChild(userEmailInput)
    registerContainer.appendChild(createNewUser)

    // Add event listener to createNewUser button

    createNewUser.addEventListener("click", this.registerUser)    
    },

    registerUser () {
        const userNameValue = userNameInput.value;
        const userPasswordValue = userPasswordInput.value;
        const userEmailValue = userEmailInput.value;

        let newUserToSave = {
            userName: userNameValue,
            password: userPasswordValue,
            email: userEmailValue
          }

API.postNewData("users",newUserToSave)
        }
}
  export default registrationForm
