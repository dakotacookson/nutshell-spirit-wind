const logout = {

  createAndAppendLogout() {

    const outputElement = document.querySelector(".output__logout");

    let logoutButton = document.createElement("button")
    logoutButton.textContent = "Log Out"
    logoutButton.setAttribute("class", "logout")

    logoutButton.addEventListener("click", this.handleLogout)
    outputElement.appendChild(logoutButton);
  },

  handleLogout() {
    sessionStorage.clear();
    location.reload();

  }
}
    // const handleLogout = sessionStorage.clear();


export default logout