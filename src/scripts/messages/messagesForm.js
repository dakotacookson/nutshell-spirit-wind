import messagesCollection from "./messagesCollection"
import messagesList from "./messagesList"
// import API from "../api"

const messagesForm = {

  // This module will build a form and append it to the DOM. The form will contain input fields for a user to add a message to the rolling message board and a button with an event listener that will listen for the click.
  createAndAppendForm () {
    // 1. Build HTML form
    let formHeader = document.createElement("h3")
    formHeader.textContent = "Post a Message"

    let messageField = document.createElement("fieldset")

    let messageLabel = document.createElement("label")
    messageLabel.textContent = "Message"
    messageLabel.setAttribute("for", "message")
    let messageInput = document.createElement("input")
    messageInput.setAttribute("id", "message")
    messageInput.setAttribute("name", "message")

    messageField.appendChild(messageLabel)
    messageField.appendChild(messageInput)
    
    let postButton = document.createElement("button")
    postButton.textContent = "Post Message"
    postButton.setAttribute("class", "message__post")

    // 2. Attach event listener to button in form
    postButton.addEventListener("click", this.handleAddNewMessage)

    // 3. Append the HTML form to the DOM
    //Notice that I have added an article element to my index.html with the class "form".
    let messageFormFragment = document.createDocumentFragment()
    messageFormFragment.appendChild(formHeader)
    messageFormFragment.appendChild(messageField)
    messageFormFragment.appendChild(postButton)

    let formArticle = document.querySelector(".form__messages");
    formArticle.appendChild(messageFormFragment);

  },
  // This module will also contain the function that executes when the button in the form is clicked. When the button in the form is clicked, the following will happen:
  handleAddNewMessage (event) {
    // API.getData("users")
    //     .then(allUsers => {
    //         let usersProcessed = 1;
    //         allUsers.forEach(user => {
    //             if (username === user.userName && password === user.password) {
    //                 console.log(`${user.userName} with user ID ${user.id} is the current user`)
    //                 sessionStorage.setItem('userId', user.id)
    //                 let userId = sessionStorage.getItem('userId');
    //                 sessionStorage.setItem('userName', user.userName)
                    
    //                 loadUserSpecificPage(userId);
                    
    //             } else if (usersProcessed === allUsers.length) {
    //                 alert("Username/password invalid. If new user, please register. :)")
    //             } else {
    //                 usersProcessed ++
    // 1. Get user input that user entered
    let inputMessage = document.querySelector("#message").value
    let messageTimeStamp = new Date().toLocaleString();
    let currentUserId = sessionStorage.getItem("userId")

    // 2. Create a new object with the same structure we have been using throughout the application to represent a message:
    // {
    //   id: "a number that represents the primary key of the messages object",
    //   text: "the message itself",
    //   userId: "primary key from user object"
    //   timeStamp: "MM/DD/YYYY, HH:MM:SS AM/PM"
    // }

    let newMessage = {
      text: inputMessage,
      timeStamp: messageTimeStamp,
      editValue: 0,
      userId: parseInt(currentUserId)
    }

    // 3. Call the method(postNewMessage) with the fetch request to POST to the API and pass it the object we created in the previous step

    // Notice the import statement at the top of the module so I can call a method in the messagesCollection module.

    // *****IMPORTANT*****
    // You will notice at this point that while a new message is being added to our API, unless you refresh the application, the newly added message will not show up on the DOM. We definitely do not want our user to have to hit refresh every time they add new message.

    // We also do NOT want to manually add our new message to the list of messages on the DOM. Instead, we want our data to be our point of truth. Our DOM should always use the data from our API to render the DOM. Logically, here are the steps we want to take place.
    // 1. Add new message to the API using a POST HTTP request.
    //     We are already doing this. We are using the fetch defined in the messagesCollection module to add a new message object to the API.
    // 2. After the new message has been added, we want to get a list of all messages (using a GET HTTP request) and render them to the DOM.
          // Because we want to make sure we only do this after the first step is done, we will return the fetch call that is doing the POST and chain a .then to the call (just like we do with the GET). This means we are doing the POST and then waiting until a response comes back before doing this step. The reason we want to wait is because we want to be sure that when we ask our API for the list of messages, the newly added message is on that list. So we wait until it has been added before using a GET request to get a list of all messages and rendering them to the DOM.
          
          // But that sounds awfully familiar: make a GET HTTP request to the API for a list of all messages, iterate over that list and build the HTML for each message, append the HTML to the DOM. This is exactly what our postMessage method in our messagesList module is already doing. Which means I can simply call that method from here. Once again, note that I am importing the appropriate module at the top of this file.
    // To summarize, we are adding a message to the API, then getting an updated list of messages from the API and rerendering the DOM.
    // *******************
    messagesCollection.postNewMessage(newMessage)
    .then(response => {
      messagesList.postMessage()
    })
  }
}

export default messagesForm
