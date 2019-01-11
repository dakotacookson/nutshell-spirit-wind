import messagesCollection from "./messagesCollection"
import messagesList from "./messagesList"

const messagesForm = {

  // This module will build a form and append it to the DOM. The form will contain input fields for a user to add a new food to their refrigerator and a button with an event listener that will listen for the click
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

    let formArticle = document.querySelector(".form");
    formArticle.appendChild(messageFormFragment);

  },
  // This module will also contain the function that executes when the button in the form is clicked. When the button in the form is clicked, the following will happen:
  handleAddNewMessage (event) {
    // 1. Get user input that user entered
    let inputMessage = document.querySelector("#message").value
    let messageTimeStamp = new Date().toLocaleString();

    // 2. Create a new object with the same structure we have been using throughout the application to represent a food item:
    // {
      //   name: "user input name",
      //   expiration: "user input expiration",
      //   type: "user input type"
    // }

    let newMessage = {
      text: inputMessage,
      timeStamp: messageTimeStamp,
      userId: "placeholder"
    }

    // 3. Call the method(postNewFood) with the fetch request to POST to the API and pass it the object we created in the previous step

    // Notice the import statement at the top of the module so I can call a method in the foodCollection module.

    // *****IMPORTANT*****
    // You will notice at this point that while a new food item is being added to our API, unless you refresh the application, the newly added item will not show up on the DOM. We definitely do not want our user to have to hit refresh every time they add new food to their refrigerator.

    // We also do NOT want to manually add our new food item to the list of food on the DOM. Instead, we want our data to be our point of truth. Our DOM should always use the data from our API to render the DOM. Logically, here are the steps we want to take place.
    // 1. Add new food item to the API using a POST HTTP request.
    //     We are already doing this. We are using the fetch defined in the foodCollection module to add a new food item to the API.
    // 2. After the new item has been added, we want to get a list of all the food items (using a GET HTTP request) and render them to the DOM.
          // Because we want to make sure we only do this after the first step is done, we will return the fetch call that is doing the POST and chain a .then to the call (just like we do with the GET). This means we are doing the POST and then waiting until a response comes back before doing this step. The reason we want to wait is because we want to be sure that when we ask our API for the list of food items, the newly added item is on that list. So we wait until it has been added before using a GET request to get a list of all food items and rendering them to the DOM.
          
          // But that sounds awfully familiar: make a GET HTTP request to the API for a list of all food items, iterate over that list and build the HTML for each item, append the HTML to the DOM. This is exactly what our fridgify method in our foodList module is already doing. Which means I can simply call that method from here. Once again, note that I am importing the appropriate module at the top of this file.
    // To summarize, we are adding a new item to the API, then getting an updated list of items from the API and rerendering the DOM.
    // *******************
    messagesCollection.postNewMessage(newMessage)
    .then(response => {
      messagesList.postMessage()
    })
  }
}

export default messagesForm
