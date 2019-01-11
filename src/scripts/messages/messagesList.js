// This component will get the data, build the HTML from the data and append it to the DOM.

// The messageCollection component gets the data.
import messagesCollection from "./messagesCollection"
// To build the HTML for each object in the messages array (which is what the data coming from the API becomes once we parse it), we will use the messages component.
import messages from "./messages"

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

export default messagesList
