// This component will get the data, build the HTML from the data and append it to the DOM.

// To get the data, we will use the friendsCollection component.
// To build the HTML for each object in the array of friends(which is what the data coming from the API becomes once we parse it), we will use the friends component.
import friends from "./friends"
import API from "../api"



const friendsList = {

  getFriendsList(){
    let userIdString = sessionStorage.getItem('userId');
    let userId = JSON.parse(userIdString)

    // 1. Get data
    // The getAllUsers method will do a fetch and return a promise. This call will return the data from the API in the response.
    API.getData("friends")
    .then(allFriends => {
      console.log(allFriends)
      // An empty document fragment
      let friendDocFragment = document.createDocumentFragment()

      // 2. Iterate over data and build HTML for each 
      // We loop over the array of objects returned from our API and for each obect, we make a call to the friendBuilder method in the friend module. This method takes a friend object as an argument and returns an HTML component. Once we have that HTML, we append it to our document fragment so that it is slowly built up. By the end of the forEach loop, our document fragment contains all the HTML for all our data.

      allFriends.forEach(friend => {
        if (userId === friend.currentUserId) {
          console.log("userId",userId,"friend.currentUserId",friend.currentUserId)
        let friendHtml = friends.friendBuilder(friend)
        friendDocFragment.appendChild(friendHtml)

        }
        else {
          console.log("not a friend")
        }
      })
    
      
      // 3. Append the HTML to the DOM

      let outputArticle = document.querySelector(".output__friends")

      //This while loop essentially removes all child nodes of an element until the element has no child nodes left.
      while (outputArticle.firstChild) {
        outputArticle.removeChild(outputArticle.firstChild);
      }
      outputArticle.appendChild(friendDocFragment)

    })
  }
}

export default friendsList