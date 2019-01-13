// import messagesCollection from "./messagesCollection"
// import messagesEditForm from "./messagesEditForm"
// import messagesList from "./messagesList"


// //Given a single messages object, this component builds out the HTML and returns it
// const messages = {

//   // This method takes one argument, which we expect to be an object that represents a message and will have the following structure:
//   // {
//   //   id: "a number that represents the primary key of the messages object",
//   //   text: "the message itself",
//   //   userId: "primary key from user object"
//   //   timeStamp: "MM/DD/YYYY, HH:MM:SS AM/PM"
//   // }

//   // Given this object, the method will build HTML elements and append them appropriately so that it will look like this:
//   // <article>
//   //   <h5>username</h5>
//   //   <p>message tesxt</p>
//   //   <p>timestamp</p>
//   // </article>

//   // This HTML is then returned to the point from where this method was called
//   messageBuilder(messageObject) {
//     let messageArticle = document.createElement("article")
//     messageArticle.setAttribute("id", `message--${messageObject.id}`)

//     let messageUserId = document.createElement("h5")
//     messageUserId.textContent = messageObject.userId

//     let messageText = document.createElement("p")
//     messageText.textContent = messageObject.text

//     let messageTimeStamp = document.createElement("p")
//     messageTimeStamp.textContent = messageObject.timeStamp

//     // In order to change the data for an existing food item in our API, we need to provide the user with a way to edit the existing values. This means we will show the user a form with the existing values already populated. Once again, we want our data to be our point of truth. So we make a HTTP GET request targeting the specific food item the user wants to edit to get the data that will be populated in the form. Once we have that data, we can build the form, populate the input fields with our data form the GET request and then append that form to the appropriate place on the DOM.
//     let editMessageButton = document.createElement("button")
//     editMessageButton.textContent = "Edit"
//     editMessageButton.addEventListener("click", () => {
//       let articleId = event.target.parentNode.id
//       let messageId = articleId.split("--")[1]
//       messagesCollection.getMessage(messageId)
//       .then(response => {
//         messagesEditForm.createAndAppendForm(articleId, response)
//       })
//     })

//     // Since we can get the id of the food item to be deleted from the parent element(the article element), we can use that to make an HTTP DELETE request to our API. Once again after this we want to get the list of food items from the API using a HTTP GET request and display it to the user so that the user does not have to refresh the page in order to see that the item they deleted has actually been deleted.
//     let deleteMessageButton = document.createElement("button")
//     deleteMessageButton.textContent = "Delete"
//     deleteMessageButton.addEventListener("click", () => {
//       let messageId = event.target.parentNode.id.split("--")[1]
//       messagesCollection.deleteFood(messageId)
//       .then(() => {
        
//         messagesList.postMessage()
//       })
//     })



//     messageArticle.appendChild(messageUserId)
//     messageArticle.appendChild(messageText)
//     messageArticle.appendChild(messageTimeStamp)
//     messageArticle.appendChild(deleteMessageButton)
//     messageArticle.appendChild(editMessageButton)

//     return messageArticle
//   }
// }

// export default messages
