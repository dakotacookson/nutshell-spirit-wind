import API from "./api"
import registrationForm from "./register"
const userNameInput = document.createElement("input");
const passwordInput = document.createElement("input");

const login = {
// Function to create and append login input fields and login button.
    createAndAppendLoginInput() {

        const outEl = document.querySelector(".output__login");
        userNameInput.type = "text";
        userNameInput.placeholder = "username";
        passwordInput.type = "password";
        passwordInput.placeholder = "password";
        outEl.appendChild(userNameInput);
        outEl.appendChild(passwordInput);

        const loginButton = document.createElement("button");
        loginButton.textContent = ("login");
        outEl.appendChild(loginButton);
// Runs the getUserData() function when Login button is clicked.
        loginButton.addEventListener("click", this.getUserData);
    },
// Gathers data entered into Login input fields. Fetches userdata from API and compares input data with existing user data in API. If input data matches user data in API, runs loadUserSpecificPage(). If input data does not match any user data in API, alert is sent.
    getUserData () {
        const username = userNameInput.value;
        const password = passwordInput.value;
        API.getData("users")
        .then(allUsers => {
            allUsers.forEach(user => {

                if (username === user.userName && password === user.password) {
                    console.log(`This one: ${user.id}`)
                    sessionStorage.setItem('userId', user.id)
                    let userId = sessionStorage.getItem('userId');
                    loadUserSpecificPage(userId);
                } else {
                    alert("Username/password invalid. If new user, please register. :)")
                }
                function loadUserSpecificPage(userId) {
                    console.log(`This is the user page! ${userId}`);
                } 
            })
        
        })
        
     },     
    
}

export default login