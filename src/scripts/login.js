import API from "./api"
const userNameInput = document.createElement("input");
const passwordInput = document.createElement("input");

const login = {

    createAndAppendLoginInput() {

        const outEl = document.querySelector(".output__login");
        userNameInput.type = "text";
        userNameInput.placeholder = "username";
        passwordInput.type = "text";
        passwordInput.placeholder = "password";
        outEl.appendChild(userNameInput);
        outEl.appendChild(passwordInput);

        const loginButton = document.createElement("button");
        loginButton.textContent = ("login");
        outEl.appendChild(loginButton);

        loginButton.addEventListener("click", this.getUserData);
    },
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