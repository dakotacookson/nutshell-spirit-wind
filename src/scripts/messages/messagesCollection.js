// Component responsible for interacting with the API. All fetch calls for this application will be defined here

const messagesCollection = {
  // This method returns a fetch, which means it is returning a promise. Which means to access the response from the asynchronous HTTP GET request that is being made by this fetch, we can chain a .then at the point where this method(getAllFoods) is called. The .then then is chained to the fetch inside the method is parsing the data from JSON to data structures Javascript will understand. In this case, because we have a collection of items, it will be an array of objects.
  getAllMessages() {
    return fetch("http://localhost:8088/messages")
    .then(response => response.json())
  },

  // This method will make a HTTP POST request to the API. Because a POST has a body with the data for the new item you want created, this method will take one argument which will be the object for the new food item we want to add to our collection in the API.
  postNewMessage(newMessageToSave) {
    // We want to return this fetch request so that at the point it is called, we can take advantage of the asynchronous nature of promises to wait for this to be done before getting the latest data and rerendering the DOM.
    return fetch("http://localhost:8088/messages", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(newMessageToSave)
    })
  }
}

export default messagesCollection
