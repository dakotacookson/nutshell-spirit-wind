import API from "./api"
import friendsList from "./friends/friendsList"
import registrationForm from "./register"
const userNameInput = document.createElement("input");
const passwordInput = document.createElement("input");
const registrationPage = document.querySelector(".output__registration")
const loginPage = document.querySelector(".output__login");
registrationPage.style.display = "none";

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
        const registerButton = document.createElement("button");
        registerButton.textContent = ("register");
        outEl.appendChild(loginButton);
        outEl.appendChild(registerButton);
        // Runs the getUserData() function when Login button is clicked.
        loginButton.addEventListener("click", this.getUserData);
        // Runs the replaceWithRegistrationForm() function when Register button is clicked.
        registerButton.addEventListener("click", this.replaceWithRegistrationForm);
    },
    // Gathers data entered into Login input fields. Fetches userdata from API and compares input data with existing user data in API. If input data matches user data in API, runs loadUserSpecificPage(). If input data does not match any user data in API, alert is sent.
    getUserData() {
        const username = userNameInput.value;
        const password = passwordInput.value;
        API.getData("users")
            .then(allUsers => {
                let usersProcessed = 1;
                allUsers.forEach(user => {

                    let formArticle2 = document.querySelector(".output__news")
let userIdtytpe = sessionStorage.getItem('userId');
if (userIdtytpe >= 1) {
  formArticle2.className = "output__news3"
}
                    else if (username === user.userName && password === user.password) {
                        console.log(`This one: ${user.id}`)
                        sessionStorage.setItem('userId', user.id)
                        let userId = sessionStorage.getItem('userId');

                        loadUserSpecificPage(userId);

                    } else if (usersProcessed === allUsers.length) {
                        alert("Username/password invalid. If new user, please register. :)")
                    } else {
                        usersProcessed++
                    };
                    // This function will load the dashboard for the user that signed in. (Work in Progress)
                    function loadUserSpecificPage(userId) {
                        loginPage.style.display = "none";
                        console.log(`This is the user page! ${userId}`);
                        const dashboard = document.createElement("h2");
                        const taskContainer = document.querySelector(".output__tasks");
                        dashboard.textContent = "Dashboard";
                        taskContainer.appendChild(dashboard);
                        friendsList.getFriendsList()

                    }
                })




            })

    },
    // Function to hide the login form and display the register form.  
    replaceWithRegistrationForm() {
        console.log("testing");
        const registrationPage = document.querySelector(".output__registration")
        const loginPage = document.querySelector(".output__login");
        loginPage.style.display = "none";
        registrationPage.style.display = "block";
    },
    // Function to hide the register form and display the login form.
    replaceWithLoginForm() {
        console.log("LoginForm");
        loginPage.style.display = "block";
        registrationPage.style.display = "none";
    }
}



export default login