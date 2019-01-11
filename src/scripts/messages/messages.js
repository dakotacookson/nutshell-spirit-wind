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
  //   <p>message text</p>
  //   <p>timestamp</p>
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
