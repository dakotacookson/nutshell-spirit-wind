// This component will get the data, build the HTML from the data and append it to the DOM.

// To get the data, we will use the friendsCollection component.
import friendsCollection from "./friendsCollection"
// To build the HTML for each object in the array of friends(which is what the data coming from the API becomes once we parse it), we will use the friends component.
import friends from "./friends"
import API from ".api"
const friendsList = {

  const currentUser = user.id
  friendify(){
    // 1. Get data
    // The getAllUsers method will do a fetch and return a promise. This call will return the data from the API in the response.
    API.getData(users)
    .then(allUsers => {

      // An empty document fragment
      let foodDocFragment = document.createDocumentFragment()

      // 2. Iterate over data and build HTML for each 
      // We loop over the array of objects returned from our API and for each obect, we make a call to the foodBuilder method in the food module. This method takes a food object as an argument and returns an HTML component. Once we have that HTML, we append it to our document fragment so that it is slowly built up. By the end of the forEach loop, our document fragment contains all the HTML for all our data.

      allFriends.forEach(friend => {
        if (friend.id === userReceivedId) {
        
        let friendHtml = friend.friendBuilder(friend)
        friendDocFragment.appendChild(friendHtml)
        }
      })
    
      
      // 3. Append the HTML to the DOM
      // We get a reference to a HTML element with the class "output" and append our document fragment to that element. Because the HTML element with class "output" is already on the DOM, the HTML in the document fragment is appended to the DOM.
      let outputArticle = document.querySelector(".output")

      //This while loop essentially removes all child nodes of an element until the element has no child nodes left. It is equivalent to the following:
      // outputArticle.innerHTML = ""

      // If we do not do this, each time we add a new friend  using our form, all the friend s will be appended to the bottom of our list so that we will have duplicates. To understand why this while loop is needed, try commenting it out and observe the behavior of the application. Essentially, we are clearing out our output container (our article tag with class "output") so that we repopulate it.
      while (outputArticle.firstChild) {
        outputArticle.removeChild(outputArticle.firstChild);
      }
      outputArticle.appendChild(friendDocFragment)

    })
  }
}

export default friendsList