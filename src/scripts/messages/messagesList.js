// This component will get the data, build the HTML from the data and append it to the DOM.

// The messageCollection component gets the data.
import messagesCollection from "./messagesCollection"
// To build the HTML for each object in the messages array (which is what the data coming from the API becomes once we parse it), we will use the messages component.
// import messages from "./messages"

const messagesList = {
  postMessage(){
    // 1. Get data
    // The getAllMessages method will do a fetch and return a promise. This call will return the data from the API in the response.
    messagesCollection.getAllMessages()
    .then(allMessages => {

      // An empty document fragment
      let messageDocFragment = document.createDocumentFragment()

      // 2. Iterate over data and build HTML for each message
      // We loop over the array of objects returned from our API and for each obect, we make a call to the messageBuilder method in the messages module. This method takes a message object as an argument and returns an HTML component. Once we have that HTML, we append it to our document fragment so that it is slowly built up. By the end of the forEach loop, our document fragment contains all the HTML for all our data.
      allMessages.forEach(message => {
        let messageHtml = messages.messageBuilder(message)
        messageDocFragment.appendChild(messageHtml)
      })
      
      // 3. Append the HTML to the DOM
      // We get a reference to a HTML element with the class "output__messages" and append our document fragment to that element. Because the HTML element with class "output__messages" is already on the DOM, the HTML in the document fragment is appended to the DOM.
      let outputArticle = document.querySelector(".output__messages")

      //This while loop essentially removes all child nodes of an element until the element has no child nodes left. It is equivalent to the following:
      // outputArticle.innerHTML = ""

      // If we do not do this, each time we add a new message using our form, all the messages will be appended to the bottom of our list so that we will have duplicates. Essentially, we are clearing out our output container (our article tag with class "output") so that we repopulate it.
      while (outputArticle.firstChild) {
        outputArticle.removeChild(outputArticle.firstChild);
      }
      outputArticle.appendChild(messageDocFragment)

    })
  }
}

//Given a single messages object, this component builds out the HTML and returns it
const messages = {

  // This method takes one argument, which we expect to be an object that represents a message and will have the following structure:
  // {
  //   id: "a number that represents the primary key of the messages object",
  //   text: "the message itself",
  //   userId: "primary key from user object"
  //   timeStamp: "MM/DD/YYYY, HH:MM:SS AM/PM"
  // }

  // Given this object, the method will build HTML elements and append them appropriately so that it will look like this:
  // <article>
  //   <h5>username</h5>
  //   <p>message tesxt</p>
  //   <p>timestamp</p>
  // </article>

  // This HTML is then returned to the point from where this method was called
  messageBuilder(messageObject) {
    
    messageUsername(messageObject.userId) {

    } 

    let messageArticle = document.createElement("article")
    messageArticle.setAttribute("id", `message--${messageObject.id}`)

    let messageUserId = document.createElement("h5")
    messageUserId.textContent = messageObject.userId

  

    let messageText = document.createElement("p")
    messageText.textContent = messageObject.text

    let messageTimeStamp = document.createElement("p")
    messageTimeStamp.textContent = messageObject.timeStamp

    // In order to change the data for an existing food item in our API, we need to provide the user with a way to edit the existing values. This means we will show the user a form with the existing values already populated. Once again, we want our data to be our point of truth. So we make a HTTP GET request targeting the specific food item the user wants to edit to get the data that will be populated in the form. Once we have that data, we can build the form, populate the input fields with our data form the GET request and then append that form to the appropriate place on the DOM.
    let editMessageButton = document.createElement("button")
    editMessageButton.textContent = "Edit"
    editMessageButton.addEventListener("click", () => {
      let articleId = event.target.parentNode.id
      let messageId = articleId.split("--")[1]
      messagesCollection.getMessage(messageId)
      .then(response => {
        messagesEditForm.createAndAppendForm(articleId, response)
      })
    })

    // Since we can get the id of the food item to be deleted from the parent element(the article element), we can use that to make an HTTP DELETE request to our API. Once again after this we want to get the list of food items from the API using a HTTP GET request and display it to the user so that the user does not have to refresh the page in order to see that the item they deleted has actually been deleted.
    // let deleteMessageButton = document.createElement("button")
    // deleteMessageButton.textContent = "Delete"
    // deleteMessageButton.addEventListener("click", () => {
    //   let messageId = event.target.parentNode.id.split("--")[1]
    //   messagesCollection.deleteFood(messageId)
    //   .then(() => {
        
    //     messagesList.postMessage()
    //   })
    // })



    messageArticle.appendChild(messageUserId)
    messageArticle.appendChild(messageText)
    messageArticle.appendChild(messageTimeStamp)
    // messageArticle.appendChild(deleteMessageButton)
    if (sessionStorage.userId == messageObject.userId) {messageArticle.appendChild(editMessageButton)}

    return messageArticle
  }
}

const messagesEditForm = {
  // This module will build an edit form and append it to the DOM. The form will contain input fields with existing values from the API and an Update button. The user can edit the the values in the input fields. An event listener on the Update button will handle taking the new values entered by the user and calling the API to update the data.
  createAndAppendForm (articleId, messageObjToEdit) {

    // Building the edit form with fields for the name, expiration and type of the food item. Each of the input fields contains the existing values from the database.
    let messageField = document.createElement("p")

    let messageLabel = document.createElement("label")
    messageLabel.textContent = "Message"
    let messageInput = document.createElement("input")
    messageInput.value = messageObjToEdit.text

    messageField.appendChild(messageLabel)
    messageField.appendChild(messageInput)

    let submitEditButton = document.createElement("button")
    submitEditButton.textContent = "Submit Edit"

    // There is an event listener on the Update button which will take the new values in the input fields and build an object for the food item to be edited. Then we make a HTTP PUT request where we target the food item we want to edit by specifying the id in the URL. We also pass the object representing the food item with the new values as data in our HTTP request. Once again, because our data has been modified, we make an HTTP GET request to get all the food items and display them.
    submitEditButton.addEventListener("click", () => {
      let editedMessage = {
        text: messageInput.value,
        editValue: 1
      }
      
      messagesCollection.patchExistingMessage(messageObjToEdit.id, editedMessage)
      .then(response => {
        messagesList.postMessage()
      })
    })

    // We passed in the id of the article so we know exactly where to append the edit form.
    let messageArticle = document.querySelector(`#${articleId}`)

    // Because we want to replace what is currently in the article element with the edit form, we clear out all children HTML elements in our targeted element before appending our edit form to it.
    while (messageArticle.firstChild) {
      messageArticle.removeChild(messageArticle.firstChild);
    }
    messageArticle.appendChild(messageField)
    messageArticle.appendChild(submitEditButton)
  }
}

export default messagesList
