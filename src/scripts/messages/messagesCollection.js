// Component responsible for interacting with the API. All fetch calls for this application will be defined here

const messagesCollection = {
  // This method returns a fetch, which means it is returning a promise. Which means to access the response from the asynchronous HTTP GET request that is being made by this fetch, we can chain a .then at the point where this method(getAllMessages) is called. The .then then is chained to the fetch inside the method is parsing the data from JSON to data structures Javascript will understand. In this case, because we have a collection of messages, it will be an array of objects.
  getAllMessages() {
    return fetch("http://localhost:8088/messages")
    .then(response => response.json())
  },

  getAllUsers() {
    return fetch("http://localhost:8088/users")
    .then(response => response.json())
  },

  // This method will make a HTTP POST request to the API. Because a POST has a body with the data for the message, this method will take one argument which will be the object for the new message we want to add to our collection in the API.
  postNewMessage(newMessageToSave) {
    // We want to return this fetch request so that at the point it is called, we can take advantage of the asynchronous nature of promises to wait for this to be done before getting the latest data and rerendering the DOM.
    return fetch("http://localhost:8088/messages", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(newMessageToSave)
    })
  },
  // In order to delete an item from the JSON Server API, all we need is the id of the item in order to target it, which is the only argument this method has.
  deleteFood(messageId) {
  return fetch(`http://localhost:8088/messages/${messageId}`, {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json"
      }
    })
  },
  // Again, you need the id of the message in order to get data for that item back from the API.
  getMessage(messageId) {
    return fetch(`http://localhost:8088/messages/${messageId}`)
    .then(response => response.json())
  },
  getUserName(id) {
    return fetch(`http://localhost:8088/messages/${id}`)
    .then(response => response.json())
  },
  // In order to edit an existing food item, we need the id to identify which food item we want to edit and the new data we want to replace the existing data with. So this time, we have two arguments for the method.
  putExistingMessage(messageId, messageToEdit) {
    return fetch(`http://localhost:8088/messages/${messageId}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(messageToEdit)
    })
  },
  // In order to edit an existing food item, we need the id to identify which food item we want to edit and the new data we want to replace the existing data with. So this time, we have two arguments for the method.
  patchExistingMessage(messageId, messageToEdit) {
    return fetch(`http://localhost:8088/messages/${messageId}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(messageToEdit)
    })
  }
};

export default messagesCollection
