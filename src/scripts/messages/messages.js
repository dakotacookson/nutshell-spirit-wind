//Given a single food object, this component builds out the HTML and returns it
const messages = {

  // This method takes one argument, which we expect to be an object that represents a food and will have the following structure:
  // {
  //   name: "name value",
  //   expiration: "expiration value",
  //   type: "type value"
  // }

  // Given this object, the method will build HTML elements and append them appropriately so that it will look like this:
  // <article>
  //   <h3>name value</h3>
  //   <p>expiration value</p>
  //   <p>type value</p>
  // </article>

  // This HTML is then returned to the point from where this method was called
  messageBuilder(messageObject) {
    let messageArticle = document.createElement("article")
    
    let messageUserId = document.createElement("h5")
    messageUserId.textContent = messageObject.userId

    let messageText = document.createElement("p")
    messageText.textContent = messageObject.text

    let messageTimeStamp = document.createElement("p")
    messageTimeStamp.textContent = messageObject.timeStamp

    messageArticle.appendChild(messageUserId)
    messageArticle.appendChild(messageText)
    messageArticle.appendChild(messageTimeStamp)

    return messageArticle
  }
}

export default messages
