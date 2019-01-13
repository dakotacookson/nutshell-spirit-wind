import friendsCollection from "./friendsCollection"
import friendsList from "./friendsList"

const friendsForm = {

  // This module will build a form and append it to the DOM. The form will contain input fields for a user to add a new friends to their refrigerator and a button with an event listener that will listen for the click
  createAndAppendForm () {
    // 1. Build HTML form
    let formHeader = document.createElement("h3")
    formHeader.textContent = "Add a Friend"

    let friendsNameField = document.createElement("fieldset")

    let friendsNameLabel = document.createElement("label")
    friendsNameLabel.textContent = "Name"
    friendsNameLabel.setAttribute("for", "friends__name")
    let friendsNameInput = document.createElement("input")
    friendsNameInput.setAttribute("id", "friends__name")
    friendsNameInput.setAttribute("name", "friends__name")

    friendsNameField.appendChild(friendsNameLabel)
    friendsNameField.appendChild(friendsNameInput)

    let friendsExpirationField = document.createElement("fieldset")

    let friendsExpirationLabel = document.createElement("label")
    friendsExpirationLabel.textContent = "Expiration"
    friendsExpirationLabel.setAttribute("for", "friends__expiration")
    let friendsExpirationInput = document.createElement("input")
    friendsExpirationInput.setAttribute("id", "friends__expiration")
    friendsExpirationInput.setAttribute("name", "friends__expiration")

    friendsExpirationField.appendChild(friendsExpirationLabel)
    friendsExpirationField.appendChild(friendsExpirationInput)

    let friendsTypeField = document.createElement("fieldset")

    let friendsTypeLabel = document.createElement("label")
    friendsTypeLabel.textContent = "Type"
    friendsTypeLabel.setAttribute("for", "friends__type")
    let friendsTypeInput = document.createElement("input")
    friendsTypeInput.setAttribute("id", "friends__type")
    friendsTypeInput.setAttribute("name", "friends__type")

    friendsTypeField.appendChild(friendsTypeLabel)
    friendsTypeField.appendChild(friendsTypeInput)

    let submitButton = document.createElement("button")
    submitButton.textContent = "Add Friends"
    submitButton.setAttribute("class", "friends__save")

    // 2. Attach event listener to button in form
    submitButton.addEventListener("click", this.handleAddNewFriends)

    // 3. Append the HTML form to the DOM
    //Notice that I have added an article element to my index.html with the class "form".
    let friendsFormFragment = document.createDocumentFragment()
    friendsFormFragment.appendChild(formHeader)
    friendsFormFragment.appendChild(friendsNameField)
    friendsFormFragment.appendChild(friendsExpirationField)
    friendsFormFragment.appendChild(friendsTypeField)
    friendsFormFragment.appendChild(submitButton)

    let formArticle = document.querySelector(".form")
    formArticle.appendChild(friendsFormFragment)

  },
  // This module will also contain the function that executes when the button in the form is clicked. When the button in the form is clicked, the following will happen:
  handleAddNewFriends (event) {
    // 1. Get user input that user entered
    let inputFriendsName = document.querySelector("#friends__name").value
    let inputFriendsExpiration = document.querySelector("#friends__expiration").value
    let inputFriendsType = document.querySelector("#friends__type").value

    // 2. Create a new object with the same structure we have been using throughout the application to represent a friends item:
    // {
      //   name: "user input name",
      //   expiration: "user input expiration",
      //   type: "user input type"
    // }

    let newFriends = {
      name: inputFriendsName,
      expiration: inputFriendsExpiration,
      type: inputFriendsType
    }

    // 3. Call the method(postNewFriends) with the fetch request to POST to the API and pass it the object we created in the previous step

    // Notice the import statement at the top of the module so I can call a method in the friendsCollection module.

    // *****IMPORTANT*****
    // You will notice at this point that while a new friends item is being added to our API, unless you refresh the application, the newly added item will not show up on the DOM. We definitely do not want our user to have to hit refresh every time they add new friends to their refrigerator.

    // We also do NOT want to manually add our new friends item to the list of friends on the DOM. Instead, we want our data to be our point of truth. Our DOM should always use the data from our API to render the DOM. Logically, here are the steps we want to take place.
    // 1. Add new friends item to the API using a POST HTTP request.
    //     We are already doing this. We are using the fetch defined in the friendsCollection module to add a new friends item to the API.
    // 2. After the new item has been added, we want to get a list of all the friends items (using a GET HTTP request) and render them to the DOM.
          // Because we want to make sure we only do this after the first step is done, we will return the fetch call that is doing the POST and chain a .then to the call (just like we do with the GET). This means we are doing the POST and then waiting until a response comes back before doing this step. The reason we want to wait is because we want to be sure that when we ask our API for the list of friends items, the newly added item is on that list. So we wait until it has been added before using a GET request to get a list of all friends items and rendering them to the DOM.
          
          // But that sounds awfully familiar: make a GET HTTP request to the API for a list of all friends items, iterate over that list and build the HTML for each item, append the HTML to the DOM. This is exactly what our fridgify method in our friendsList module is already doing. Which means I can simply call that method from here. Once again, note that I am importing the appropriate module at the top of this file.
    // To summarize, we are adding a new item to the API, then getting an updated list of items from the API and rerendering the DOM.
    // *******************
    friendsCollection.postNewFriends(newFriends)
    .then(response => {
      friendsList.fridgify()
    })
  }
}

export default friendsForm