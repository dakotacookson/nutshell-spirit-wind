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
    
    let messageName = document.createElement("h3")
    messageName.textContent = messageObject.name

    let messageTimeStamp = document.createElement("p")
    messageTimeStamp.textContent = messageObject.timeStamp

    let foodType = document.createElement("p")
    foodType.textContent = messageObject.type

    messageArticle.appendChild(messageName)
    messageArticle.appendChild(messageTimeStamp)
    messageArticle.appendChild(foodType)

    return messageArticle
  }
}

export default messages
