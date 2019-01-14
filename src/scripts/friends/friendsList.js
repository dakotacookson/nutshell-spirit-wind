// This component will get the data, build the HTML from the data and append it to the DOM.

import API from "../api"

//Given a single friend object, this component builds out the HTML and returns it
const friends = {

  // This HTML is then returned to the point from where this method was called
  userFriendBuilder(friendObject) {
    // console.log("friendObject", friendObject)
    let friendArticle = document.createElement("article")

    friendArticle.setAttribute("id", `friend--${friendObject.id}`)

    let friendUserName = document.createElement("h3")
    friendUserName.textContent = friendObject.userName
    // console.log("this is friendObject.userName", friendObject.userName)
    let friendEmail = document.createElement("p")
    friendEmail.textContent = friendObject.email
    // console.log("this is friendObject.email", friendObject.email)


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


    let deletefriendButton = document.createElement("button")
    deletefriendButton.textContent = "Delete"
    deletefriendButton.addEventListener("click", () => {
      let friendId = event.target.parentNode.id.split("--")[1]
      friendCollection.deletefriend(friendId)
        .then(response => {
          friendsList.getfriend()
        })
    })

    friendArticle.appendChild(friendUserName)
    friendArticle.appendChild(friendEmail)
    friendArticle.appendChild(editfriendButton)
    friendArticle.appendChild(deletefriendButton)

    return friendArticle
  }
}

const friendsList = {

  getFriendsList() {
    // An empty document fragment
    let friendDocFragment = document.createDocumentFragment()
    // get the current user's Id from database and parse it to be usable
    let userIdString = sessionStorage.getItem('userId');
    let userId = JSON.parse(userIdString)

    // 1. Get data
    // The getData method will do a fetch and return a promise. This call will return the data from the API in the response.
    API.getData("friends")
      .then(allFriends => {
        allFriends.forEach(friend => {
          if (userId === friend.currentUserId) {
            console.log("matched friend")
            API.getData("users")
              .then(allUsers => {
              
                allUsers.forEach(user => {
                
                  if (user.id === friend.friendId) {
                    console.log("user.id", user.id, "user that is a friend", user, "friend.friendId",friend.friendId)
                    let friendHtml = friends.userFriendBuilder(user)
                    friendDocFragment.appendChild(friendHtml)
                  }
                })
              })
            }
          })
        })

              // 3. Append the HTML to the DOM            
              let outputArticle = document.querySelector(".output__friends")

              // This while loop essentially removes all child nodes of an element until the element has no child nodes left.
              while (outputArticle.firstChild) {
                  outputArticle.removeChild(outputArticle.firstChild);
                }
                outputArticle.appendChild(friendDocFragment)
              }
            }

            export default friendsList
            // userFriends.push(friend)
            // console.log("userId", userId, "friend.currentUserId", friend.currentUserId, "friendId", friend.friendId)
            // let friendCollection = []