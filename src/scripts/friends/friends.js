import friendsList from "./friends/friendsList"
//Given a single friend object, this component builds out the HTML and returns it
const friends = {

  // This method takes one argument, which we expect to be an object that represents a friend and will have the following structure:
  // {
  //   name: "name value",
  //   password: "password value",
  //   email: "email value"
  // }

  // Given this object, the method will build HTML elements and append them appropriately so that it will look like this:
  // <article>
  //   <h3>name value</h3>
  //   <p>email value</p>
  // </article>

  // This HTML is then returned to the point from where this method was called
  friendBuilder(friendObject) {
    console.log("friendObject",friendObject)
    let friendArticle = document.createElement("article")
    // In order to have the id of the friend item available when the user clicks on the delete and edit button, we set the id of the HTML article element for each friend item to contain the id of the item in the API. We are intentionally planning ahead and formating the id this way so that when the buttons are clicked, we can use the split method for strings to get just the id number of the friend item to be edited/deleted. Also, because we are using the ids from the API, it also ensures that each delete button has a unique id. By moving the id to the article element, it also gives us a a way to target the whole article element so that we can replace the contents of the article element with a pre-filled form when the user clicks the edit button.
    friendArticle.setAttribute("id", `friend--${friendObject.id}`)
    
    let friendUserName = document.createElement("h3")
    friendUserName.textContent = friendObject.name

    let friendEmail = document.createElement("p")
    friendEmail.textContent = friendObject.email

    // In order to change the data for an existing friend item in our API, we need to provide the user with a way to edit the existing values. This means we will show the user a form with the existing values already populated. Once again, we want our data to be our point of truth. So we make a HTTP GET request targeting the specific friend item the user wants to edit to get the data that will be populated in the form. Once we have that data, we can build the form, populate the input fields with our data form the GET request and then append that form to the appropriate place on the DOM.
    let editfriendButton = document.createElement("button")
    editfriendButton.textContent = "Edit"
    editfriendButton.addEventListener("click", () => {
      let articleId = event.target.parentNode.id
      let friendId = articleId.split("--")[1]
      friendCollection.getfriend(friendId)
      .then(response => {
        friendEditForm.createAndAppendForm(articleId, response)
      })
    })

    // Since we can get the id of the friend item to be deleted from the parent element(the article element), we can use that to make an HTTP DELETE request to our API. Once again after this we want to get the list of friend items from the API using a HTTP GET request and display it to the user so that the user does not have to refresh the page in order to see that the item they deleted has actually been deleted.
    let deletefriendButton = document.createElement("button")
    deletefriendButton.textContent = "Delete"
    deletefriendButton.addEventListener("click", () => {
      let friendId = event.target.parentNode.id.split("--")[1]
      friendCollection.deletefriend(friendId)
      .then(response => {
        friendList.getfriend()
      })
    })

    friendArticle.appendChild(friendUserName)
    friendArticle.appendChild(friendEmail)
    friendArticle.appendChild(editfriendButton)
    friendArticle.appendChild(deletefriendButton)

    return friendArticle
  }
}

export default friends