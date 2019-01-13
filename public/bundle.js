(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const API = {
  getData(resource) {
    return fetch(`http://localhost:8088/${resource}`).then(response => response.json());
  }

}; //     getAllUsers() {
//         return fetch("http://localhost:8088/users")
//         .then(response => response.json())
//       },
//     getAllMessages() {
//         return fetch("http://localhost:8088/messages")
//         .then(response => response.json)
//       },
//     getAllNewsArticles() {
//         return fetch("http://localhost:8088/newsArticles")
//         .then(response => response.json())
//       },
//     getAllTasks() {
//         return fetch("http://localhost:8088/tasks")
//         .then(response => response.json())
//       },
//     getAllEvents() {
//         return fetch("http://localhost:8088/events")
//         .then(response => response.json())
//       },
//     getAllFriends() {
//         return fetch("http://localhost:8088/friends")
//         .then(response => response.json())
//       },
//     postNewUser(newUserToAdd) {
//     fetch("http://localhost:8088/users", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(newUserToAdd)
//     })
//     },
//     postNewMessage(newMessageToAdd) {
//         fetch("http://localhost:8088/messages", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(newMessageToAdd)
//     })
//     },
//     postNewNewsArticle(newNewsArticleToAdd) {
//     fetch("http://localhost:8088/newsArticles", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(newNewsArticleToAdd)
//     })
//     },
//     postNewTask(newTaskToAdd) {
//         fetch("http://localhost:8088/tasks", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(newTaskToAdd)
//     })
//     },
// }

var _default = API;
exports.default = _default;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _api = _interopRequireDefault(require("./api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userNameInput = document.createElement("input");
const passwordInput = document.createElement("input");
const login = {
  // Function to create and append login input fields and login button.
  createAndAppendLoginInput() {
    const outEl = document.querySelector(".output__login");
    userNameInput.type = "text";
    userNameInput.placeholder = "username";
    passwordInput.type = "password";
    passwordInput.placeholder = "password";
    outEl.appendChild(userNameInput);
    outEl.appendChild(passwordInput);
    const loginButton = document.createElement("button");
    loginButton.textContent = "login";
    outEl.appendChild(loginButton); // Runs the getUserData() function when Login button is clicked.

    loginButton.addEventListener("click", this.getUserData);
  },

  // Gathers data entered into Login input fields. Fetches userdata from API and compares input data with existing user data in API. If input data matches user data in API, runs loadUserSpecificPage(). If input data does not match any user data in API, alert is sent.
  getUserData() {
    const username = userNameInput.value;
    const password = passwordInput.value;

    _api.default.getData("users").then(allUsers => {
      allUsers.forEach(user => {
        if (username === user.userName && password === user.password) {
          console.log(`This one: ${user.id}`);
          sessionStorage.setItem('userId', user.id);
          let userId = sessionStorage.getItem('userId');
          loadUserSpecificPage(userId);
        } else {
          alert("Username/password invalid. If new user, please register. :)");
        }

        function loadUserSpecificPage(userId) {
          console.log(`This is the user page! ${userId}`);
        }
      });
    });
  }

};
var _default = login;
exports.default = _default;

},{"./api":1}],3:[function(require,module,exports){
"use strict";

var _messagesList = _interopRequireDefault(require("./messages/messagesList"));

var _messagesForm = _interopRequireDefault(require("./messages/messagesForm"));

var _login = _interopRequireDefault(require("./login"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_login.default.createAndAppendLoginInput();

_messagesList.default.postMessage();

_messagesForm.default.createAndAppendForm();

},{"./login":2,"./messages/messagesForm":5,"./messages/messagesList":6}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// Component responsible for interacting with the API. All fetch calls for this application will be defined here
const messagesCollection = {
  // This method returns a fetch, which means it is returning a promise. Which means to access the response from the asynchronous HTTP GET request that is being made by this fetch, we can chain a .then at the point where this method(getAllMessages) is called. The .then then is chained to the fetch inside the method is parsing the data from JSON to data structures Javascript will understand. In this case, because we have a collection of messages, it will be an array of objects.
  getAllMessages() {
    return fetch("http://localhost:8088/messages").then(response => response.json());
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
    });
  },

  // In order to delete a item from the JSON Server API, all we need is the id of the item in order to target it, which is the only argument this method has.
  deleteFood(messageId) {
    return fetch(`http://localhost:8088/messages/${messageId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
  },

  // Again, you need the id of the food item in order to get data for that item back from the API.
  getMessage(messageId) {
    return fetch(`http://localhost:8088/messages/${messageId}`).then(response => response.json());
  },

  // In order to edit an existing food item, we need the id to identify which food item we want to edit and the new data we want to replace the existing data with. So this time, we have two arguments for the method.
  putExistingMessage(messageId, messageToEdit) {
    return fetch(`http://localhost:8088/messages/${messageId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(messageToEdit)
    });
  },

  // In order to edit an existing food item, we need the id to identify which food item we want to edit and the new data we want to replace the existing data with. So this time, we have two arguments for the method.
  patchExistingMessage(messageId, messageToEdit) {
    return fetch(`http://localhost:8088/messages/${messageId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(messageToEdit)
    });
  }

};
var _default = messagesCollection;
exports.default = _default;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _messagesCollection = _interopRequireDefault(require("./messagesCollection"));

var _messagesList = _interopRequireDefault(require("./messagesList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const messagesForm = {
  // This module will build a form and append it to the DOM. The form will contain input fields for a user to add a message to the rolling message board and a button with an event listener that will listen for the click.
  createAndAppendForm() {
    // 1. Build HTML form
    let formHeader = document.createElement("h3");
    formHeader.textContent = "Post a Message";
    let messageField = document.createElement("fieldset");
    let messageLabel = document.createElement("label");
    messageLabel.textContent = "Message";
    messageLabel.setAttribute("for", "message");
    let messageInput = document.createElement("input");
    messageInput.setAttribute("id", "message");
    messageInput.setAttribute("name", "message");
    messageField.appendChild(messageLabel);
    messageField.appendChild(messageInput);
    let postButton = document.createElement("button");
    postButton.textContent = "Post Message";
    postButton.setAttribute("class", "message__post"); // 2. Attach event listener to button in form

    postButton.addEventListener("click", this.handleAddNewMessage); // 3. Append the HTML form to the DOM
    //Notice that I have added an article element to my index.html with the class "form".

    let messageFormFragment = document.createDocumentFragment();
    messageFormFragment.appendChild(formHeader);
    messageFormFragment.appendChild(messageField);
    messageFormFragment.appendChild(postButton);
    let formArticle = document.querySelector(".form__messages");
    formArticle.appendChild(messageFormFragment);
  },

  // This module will also contain the function that executes when the button in the form is clicked. When the button in the form is clicked, the following will happen:
  handleAddNewMessage(event) {
    // 1. Get user input that user entered
    let inputMessage = document.querySelector("#message").value;
    let messageTimeStamp = new Date().toLocaleString(); // 2. Create a new object with the same structure we have been using throughout the application to represent a message:
    // {
    //   id: "a number that represents the primary key of the messages object",
    //   text: "the message itself",
    //   userId: "primary key from user object"
    //   timeStamp: "MM/DD/YYYY, HH:MM:SS AM/PM"
    // }

    let newMessage = {
      text: inputMessage,
      timeStamp: messageTimeStamp,
      editValue: 0,
      userId: "placeholder" // 3. Call the method(postNewMessage) with the fetch request to POST to the API and pass it the object we created in the previous step
      // Notice the import statement at the top of the module so I can call a method in the messagesCollection module.
      // *****IMPORTANT*****
      // You will notice at this point that while a new message is being added to our API, unless you refresh the application, the newly added message will not show up on the DOM. We definitely do not want our user to have to hit refresh every time they add new message.
      // We also do NOT want to manually add our new message to the list of messages on the DOM. Instead, we want our data to be our point of truth. Our DOM should always use the data from our API to render the DOM. Logically, here are the steps we want to take place.
      // 1. Add new message to the API using a POST HTTP request.
      //     We are already doing this. We are using the fetch defined in the messagesCollection module to add a new message object to the API.
      // 2. After the new message has been added, we want to get a list of all messages (using a GET HTTP request) and render them to the DOM.
      // Because we want to make sure we only do this after the first step is done, we will return the fetch call that is doing the POST and chain a .then to the call (just like we do with the GET). This means we are doing the POST and then waiting until a response comes back before doing this step. The reason we want to wait is because we want to be sure that when we ask our API for the list of messages, the newly added message is on that list. So we wait until it has been added before using a GET request to get a list of all messages and rendering them to the DOM.
      // But that sounds awfully familiar: make a GET HTTP request to the API for a list of all messages, iterate over that list and build the HTML for each message, append the HTML to the DOM. This is exactly what our postMessage method in our messagesList module is already doing. Which means I can simply call that method from here. Once again, note that I am importing the appropriate module at the top of this file.
      // To summarize, we are adding a message to the API, then getting an updated list of messages from the API and rerendering the DOM.
      // *******************

    };

    _messagesCollection.default.postNewMessage(newMessage).then(response => {
      _messagesList.default.postMessage();
    });
  }

};
var _default = messagesForm;
exports.default = _default;

},{"./messagesCollection":4,"./messagesList":6}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _messagesCollection = _interopRequireDefault(require("./messagesCollection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This component will get the data, build the HTML from the data and append it to the DOM.
// The messageCollection component gets the data.
// To build the HTML for each object in the messages array (which is what the data coming from the API becomes once we parse it), we will use the messages component.
// import messages from "./messages"
const messagesList = {
  postMessage() {
    // 1. Get data
    // The getAllMessages method will do a fetch and return a promise. This call will return the data from the API in the response.
    _messagesCollection.default.getAllMessages().then(allMessages => {
      // An empty document fragment
      let messageDocFragment = document.createDocumentFragment(); // 2. Iterate over data and build HTML for each message
      // We loop over the array of objects returned from our API and for each obect, we make a call to the messageBuilder method in the messages module. This method takes a message object as an argument and returns an HTML component. Once we have that HTML, we append it to our document fragment so that it is slowly built up. By the end of the forEach loop, our document fragment contains all the HTML for all our data.

      allMessages.forEach(message => {
        let messageHtml = messages.messageBuilder(message);
        messageDocFragment.appendChild(messageHtml);
      }); // 3. Append the HTML to the DOM
      // We get a reference to a HTML element with the class "output__messages" and append our document fragment to that element. Because the HTML element with class "output__messages" is already on the DOM, the HTML in the document fragment is appended to the DOM.

      let outputArticle = document.querySelector(".output__messages"); //This while loop essentially removes all child nodes of an element until the element has no child nodes left. It is equivalent to the following:
      // outputArticle.innerHTML = ""
      // If we do not do this, each time we add a new message using our form, all the messages will be appended to the bottom of our list so that we will have duplicates. Essentially, we are clearing out our output container (our article tag with class "output") so that we repopulate it.

      while (outputArticle.firstChild) {
        outputArticle.removeChild(outputArticle.firstChild);
      }

      outputArticle.appendChild(messageDocFragment);
    });
  }

}; //Given a single messages object, this component builds out the HTML and returns it

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
  //   <p>message tesxt</p>
  //   <p>timestamp</p>
  // </article>
  // This HTML is then returned to the point from where this method was called
  messageBuilder(messageObject) {
    let messageArticle = document.createElement("article");
    messageArticle.setAttribute("id", `message--${messageObject.id}`);
    let messageUserId = document.createElement("h5");
    messageUserId.textContent = messageObject.userId;
    let messageText = document.createElement("p");
    messageText.textContent = messageObject.text;
    let messageTimeStamp = document.createElement("p");
    messageTimeStamp.textContent = messageObject.timeStamp; // In order to change the data for an existing food item in our API, we need to provide the user with a way to edit the existing values. This means we will show the user a form with the existing values already populated. Once again, we want our data to be our point of truth. So we make a HTTP GET request targeting the specific food item the user wants to edit to get the data that will be populated in the form. Once we have that data, we can build the form, populate the input fields with our data form the GET request and then append that form to the appropriate place on the DOM.

    let editMessageButton = document.createElement("button");
    editMessageButton.textContent = "Edit";
    editMessageButton.addEventListener("click", () => {
      let articleId = event.target.parentNode.id;
      let messageId = articleId.split("--")[1];

      _messagesCollection.default.getMessage(messageId).then(response => {
        messagesEditForm.createAndAppendForm(articleId, response);
      });
    }); // Since we can get the id of the food item to be deleted from the parent element(the article element), we can use that to make an HTTP DELETE request to our API. Once again after this we want to get the list of food items from the API using a HTTP GET request and display it to the user so that the user does not have to refresh the page in order to see that the item they deleted has actually been deleted.
    // let deleteMessageButton = document.createElement("button")
    // deleteMessageButton.textContent = "Delete"
    // deleteMessageButton.addEventListener("click", () => {
    //   let messageId = event.target.parentNode.id.split("--")[1]
    //   messagesCollection.deleteFood(messageId)
    //   .then(() => {
    //     messagesList.postMessage()
    //   })
    // })

    messageArticle.appendChild(messageUserId);
    messageArticle.appendChild(messageText);
    messageArticle.appendChild(messageTimeStamp); // messageArticle.appendChild(deleteMessageButton)

    messageArticle.appendChild(editMessageButton);
    return messageArticle;
  }

};
const messagesEditForm = {
  // This module will build an edit form and append it to the DOM. The form will contain input fields with existing values from the API and an Update button. The user can edit the the values in the input fields. An event listener on the Update button will handle taking the new values entered by the user and calling the API to update the data.
  createAndAppendForm(articleId, messageObjToEdit) {
    // Building the edit form with fields for the name, expiration and type of the food item. Each of the input fields contains the existing values from the database.
    let messageField = document.createElement("p");
    let messageLabel = document.createElement("label");
    messageLabel.textContent = "Message";
    let messageInput = document.createElement("input");
    messageInput.value = messageObjToEdit.text;
    messageField.appendChild(messageLabel);
    messageField.appendChild(messageInput);
    let submitEditButton = document.createElement("button");
    submitEditButton.textContent = "Submit Edit"; // There is an event listener on the Update button which will take the new values in the input fields and build an object for the food item to be edited. Then we make a HTTP PUT request where we target the food item we want to edit by specifying the id in the URL. We also pass the object representing the food item with the new values as data in our HTTP request. Once again, because our data has been modified, we make an HTTP GET request to get all the food items and display them.

    submitEditButton.addEventListener("click", () => {
      let editedMessage = {
        text: messageInput.value,
        editValue: 1
      };

      _messagesCollection.default.patchExistingMessage(messageObjToEdit.id, editedMessage).then(response => {
        messagesList.postMessage();
      });
    }); // We passed in the id of the article so we know exactly where to append the edit form.

    let messageArticle = document.querySelector(`#${articleId}`); // Because we want to replace what is currently in the article element with the edit form, we clear out all children HTML elements in our targeted element before appending our edit form to it.

    while (messageArticle.firstChild) {
      messageArticle.removeChild(messageArticle.firstChild);
    }

    messageArticle.appendChild(messageField);
    messageArticle.appendChild(submitEditButton);
  }

};
var _default = messagesList;
exports.default = _default;

},{"./messagesCollection":4}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2FwaS5qcyIsIi4uL3NjcmlwdHMvbG9naW4uanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL21lc3NhZ2VzL21lc3NhZ2VzQ29sbGVjdGlvbi5qcyIsIi4uL3NjcmlwdHMvbWVzc2FnZXMvbWVzc2FnZXNGb3JtLmpzIiwiLi4vc2NyaXB0cy9tZXNzYWdlcy9tZXNzYWdlc0xpc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQSxNQUFNLEdBQUcsR0FBRztBQUVSLEVBQUEsT0FBTyxDQUFDLFFBQUQsRUFBVztBQUNkLFdBQU8sS0FBSyxDQUFFLHlCQUF3QixRQUFTLEVBQW5DLENBQUwsQ0FDTixJQURNLENBQ0QsUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFULEVBRFgsQ0FBUDtBQUVIOztBQUxPLENBQVosQyxDQVNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBOztlQUVlLEc7Ozs7Ozs7Ozs7O0FDbkZmOzs7O0FBQ0EsTUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBdEI7QUFDQSxNQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixPQUF2QixDQUF0QjtBQUVBLE1BQU0sS0FBSyxHQUFH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QixDQUF2QjtBQUNBLElBQUEsZ0JBQWdCLENBQUMsV0FBakIsR0FBK0IsYUFBL0IsQ0FkZ0QsQ0FnQmhEOztBQUNBLElBQUEsZ0JBQWdCLENBQUMsZ0JBQWpCLENBQWtDLE9BQWxDLEVBQTJDLE1BQU07QUFDL0MsVUFBSSxhQUFhLEdBQUc7QUFDbEIsUUFBQSxJQUFJLEVBQUUsWUFBWSxDQUFDLEtBREQ7QUFFbEIsUUFBQSxTQUFTLEVBQUU7QUFGTyxPQUFwQjs7QUFLQSxrQ0FBbUIsb0JBQW5CLENBQXdDLGdCQUFnQixDQUFDLEVBQXpELEVBQTZELGFBQTdELEVBQ0MsSUFERCxDQUNNLFFBQVEsSUFBSTtBQUNoQixRQUFBLFlBQVksQ0FBQyxXQUFiO0FBQ0QsT0FIRDtBQUlELEtBVkQsRUFqQmdELENBNkJoRDs7QUFDQSxRQUFJLGNBQWMsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF3QixJQUFHLFNBQVUsRUFBckMsQ0FBckIsQ0E5QmdELENBZ0NoRDs7QUFDQSxXQUFPLGNBQWMsQ0FBQyxVQUF0QixFQUFrQztBQUNoQyxNQUFBLGNBQWMsQ0FBQyxXQUFmLENBQTJCLGNBQWMsQ0FBQyxVQUExQztBQUNEOztBQUNELElBQUEsY0FBYyxDQUFDLFdBQWYsQ0FBMkIsWUFBM0I7QUFDQSxJQUFBLGNBQWMsQ0FBQyxXQUFmLENBQTJCLGdCQUEzQjtBQUNEOztBQXhDc0IsQ0FBekI7ZUEyQ2UsWSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IEFQSSA9IHtcclxuXHJcbiAgICBnZXREYXRhKHJlc291cmNlKSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvJHtyZXNvdXJjZX1gKVxyXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgIH0sXHJcblxyXG59XHJcblxyXG4vLyAgICAgZ2V0QWxsVXNlcnMoKSB7XHJcbi8vICAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L3VzZXJzXCIpXHJcbi8vICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4vLyAgICAgICB9LFxyXG5cclxuLy8gICAgIGdldEFsbE1lc3NhZ2VzKCkge1xyXG4vLyAgICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9tZXNzYWdlc1wiKVxyXG4vLyAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24pXHJcbi8vICAgICAgIH0sXHJcblxyXG4vLyAgICAgZ2V0QWxsTmV3c0FydGljbGVzKCkge1xyXG4vLyAgICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9uZXdzQXJ0aWNsZXNcIilcclxuLy8gICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbi8vICAgICAgIH0sXHJcblxyXG4vLyAgICAgZ2V0QWxsVGFza3MoKSB7XHJcbi8vICAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L3Rhc2tzXCIpXHJcbi8vICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4vLyAgICAgICB9LFxyXG5cclxuLy8gICAgIGdldEFsbEV2ZW50cygpIHtcclxuLy8gICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvZXZlbnRzXCIpXHJcbi8vICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4vLyAgICAgICB9LFxyXG5cclxuLy8gICAgIGdldEFsbEZyaWVuZHMoKSB7XHJcbi8vICAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2ZyaWVuZHNcIilcclxuLy8gICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbi8vICAgICAgIH0sXHJcblxyXG5cclxuLy8gICAgIHBvc3ROZXdVc2VyKG5ld1VzZXJUb0FkZCkge1xyXG4vLyAgICAgZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvdXNlcnNcIiwge1xyXG4vLyAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbi8vICAgICAgICAgaGVhZGVyczoge1xyXG4vLyAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4vLyAgICAgICAgIH0sXHJcbi8vICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobmV3VXNlclRvQWRkKVxyXG4vLyAgICAgfSlcclxuLy8gICAgIH0sXHJcblxyXG4vLyAgICAgcG9zdE5ld01lc3NhZ2UobmV3TWVzc2FnZVRvQWRkKSB7XHJcbi8vICAgICAgICAgZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvbWVzc2FnZXNcIiwge1xyXG4vLyAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4vLyAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbi8vICAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4vLyAgICAgICAgICAgICB9LFxyXG4vLyAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShuZXdNZXNzYWdlVG9BZGQpXHJcbi8vICAgICB9KVxyXG4vLyAgICAgfSxcclxuXHJcbi8vICAgICBwb3N0TmV3TmV3c0FydGljbGUobmV3TmV3c0FydGljbGVUb0FkZCkge1xyXG4vLyAgICAgZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvbmV3c0FydGljbGVzXCIsIHtcclxuLy8gICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4vLyAgICAgICAgIGhlYWRlcnM6IHtcclxuLy8gICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuLy8gICAgICAgICB9LFxyXG4vLyAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5ld05ld3NBcnRpY2xlVG9BZGQpXHJcbi8vICAgICB9KVxyXG4vLyAgICAgfSxcclxuXHJcbi8vICAgICBwb3N0TmV3VGFzayhuZXdUYXNrVG9BZGQpIHtcclxuLy8gICAgICAgICBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC90YXNrc1wiLCB7XHJcbi8vICAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbi8vICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuLy8gICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbi8vICAgICAgICAgICAgIH0sXHJcbi8vICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5ld1Rhc2tUb0FkZClcclxuLy8gICAgIH0pXHJcbi8vICAgICB9LFxyXG5cclxuXHJcbi8vIH1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFQSSIsImltcG9ydCBBUEkgZnJvbSBcIi4vYXBpXCJcclxuY29uc3QgdXNlck5hbWVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuY29uc3QgcGFzc3dvcmRJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuXHJcbmNvbnN0IGxvZ2luID0ge1xyXG4vLyBGdW5jdGlvbiB0byBjcmVhdGUgYW5kIGFwcGVuZCBsb2dpbiBpbnB1dCBmaWVsZHMgYW5kIGxvZ2luIGJ1dHRvbi5cclxuICAgIGNyZWF0ZUFuZEFwcGVuZExvZ2luSW5wdXQoKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IG91dEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vdXRwdXRfX2xvZ2luXCIpO1xyXG4gICAgICAgIHVzZXJOYW1lSW5wdXQudHlwZSA9IFwidGV4dFwiO1xyXG4gICAgICAgIHVzZXJOYW1lSW5wdXQucGxhY2Vob2xkZXIgPSBcInVzZXJuYW1lXCI7XHJcbiAgICAgICAgcGFzc3dvcmRJbnB1dC50eXBlID0gXCJwYXNzd29yZFwiO1xyXG4gICAgICAgIHBhc3N3b3JkSW5wdXQucGxhY2Vob2xkZXIgPSBcInBhc3N3b3JkXCI7XHJcbiAgICAgICAgb3V0RWwuYXBwZW5kQ2hpbGQodXNlck5hbWVJbnB1dCk7XHJcbiAgICAgICAgb3V0RWwuYXBwZW5kQ2hpbGQocGFzc3dvcmRJbnB1dCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGxvZ2luQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgICAgICBsb2dpbkJ1dHRvbi50ZXh0Q29udGVudCA9IChcImxvZ2luXCIpO1xyXG4gICAgICAgIG91dEVsLmFwcGVuZENoaWxkKGxvZ2luQnV0dG9uKTtcclxuLy8gUnVucyB0aGUgZ2V0VXNlckRhdGEoKSBmdW5jdGlvbiB3aGVuIExvZ2luIGJ1dHRvbiBpcyBjbGlja2VkLlxyXG4gICAgICAgIGxvZ2luQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmdldFVzZXJEYXRhKTtcclxuICAgIH0sXHJcbi8vIEdhdGhlcnMgZGF0YSBlbnRlcmVkIGludG8gTG9naW4gaW5wdXQgZmllbGRzLiBGZXRjaGVzIHVzZXJkYXRhIGZyb20gQVBJIGFuZCBjb21wYXJlcyBpbnB1dCBkYXRhIHdpdGggZXhpc3RpbmcgdXNlciBkYXRhIGluIEFQSS4gSWYgaW5wdXQgZGF0YSBtYXRjaGVzIHVzZXIgZGF0YSBpbiBBUEksIHJ1bnMgbG9hZFVzZXJTcGVjaWZpY1BhZ2UoKS4gSWYgaW5wdXQgZGF0YSBkb2VzIG5vdCBtYXRjaCBhbnkgdXNlciBkYXRhIGluIEFQSSwgYWxlcnQgaXMgc2VudC5cclxuICAgIGdldFVzZXJEYXRhICgpIHtcclxuICAgICAgICBjb25zdCB1c2VybmFtZSA9IHVzZXJOYW1lSW5wdXQudmFsdWU7XHJcbiAgICAgICAgY29uc3QgcGFzc3dvcmQgPSBwYXNzd29yZElucHV0LnZhbHVlO1xyXG4gICAgICAgIEFQSS5nZXREYXRhKFwidXNlcnNcIilcclxuICAgICAgICAudGhlbihhbGxVc2VycyA9PiB7XHJcbiAgICAgICAgICAgIGFsbFVzZXJzLmZvckVhY2godXNlciA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHVzZXJuYW1lID09PSB1c2VyLnVzZXJOYW1lICYmIHBhc3N3b3JkID09PSB1c2VyLnBhc3N3b3JkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFRoaXMgb25lOiAke3VzZXIuaWR9YClcclxuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCd1c2VySWQnLCB1c2VyLmlkKVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB1c2VySWQgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd1c2VySWQnKTtcclxuICAgICAgICAgICAgICAgICAgICBsb2FkVXNlclNwZWNpZmljUGFnZSh1c2VySWQpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChcIlVzZXJuYW1lL3Bhc3N3b3JkIGludmFsaWQuIElmIG5ldyB1c2VyLCBwbGVhc2UgcmVnaXN0ZXIuIDopXCIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBsb2FkVXNlclNwZWNpZmljUGFnZSh1c2VySWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgVGhpcyBpcyB0aGUgdXNlciBwYWdlISAke3VzZXJJZH1gKTtcclxuICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgXHJcbiAgICAgICAgfSlcclxuICAgICAgICBcclxuICAgICB9LCAgICAgXHJcbiAgICBcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbG9naW4iLCJpbXBvcnQgbWVzc2FnZXNMaXN0IGZyb20gXCIuL21lc3NhZ2VzL21lc3NhZ2VzTGlzdFwiXHJcbmltcG9ydCBtZXNzYWdlc0Zvcm0gZnJvbSBcIi4vbWVzc2FnZXMvbWVzc2FnZXNGb3JtXCJcclxuaW1wb3J0IGxvZ2luIGZyb20gXCIuL2xvZ2luXCJcclxuXHJcbmxvZ2luLmNyZWF0ZUFuZEFwcGVuZExvZ2luSW5wdXQoKTtcclxubWVzc2FnZXNMaXN0LnBvc3RNZXNzYWdlKCk7XHJcbm1lc3NhZ2VzRm9ybS5jcmVhdGVBbmRBcHBlbmRGb3JtKCk7XHJcbiIsIi8vIENvbXBvbmVudCByZXNwb25zaWJsZSBmb3IgaW50ZXJhY3Rpbmcgd2l0aCB0aGUgQVBJLiBBbGwgZmV0Y2ggY2FsbHMgZm9yIHRoaXMgYXBwbGljYXRpb24gd2lsbCBiZSBkZWZpbmVkIGhlcmVcclxuXHJcbmNvbnN0IG1lc3NhZ2VzQ29sbGVjdGlvbiA9IHtcclxuICAvLyBUaGlzIG1ldGhvZCByZXR1cm5zIGEgZmV0Y2gsIHdoaWNoIG1lYW5zIGl0IGlzIHJldHVybmluZyBhIHByb21pc2UuIFdoaWNoIG1lYW5zIHRvIGFjY2VzcyB0aGUgcmVzcG9uc2UgZnJvbSB0aGUgYXN5bmNocm9ub3VzIEhUVFAgR0VUIHJlcXVlc3QgdGhhdCBpcyBiZWluZyBtYWRlIGJ5IHRoaXMgZmV0Y2gsIHdlIGNhbiBjaGFpbiBhIC50aGVuIGF0IHRoZSBwb2ludCB3aGVyZSB0aGlzIG1ldGhvZChnZXRBbGxNZXNzYWdlcykgaXMgY2FsbGVkLiBUaGUgLnRoZW4gdGhlbiBpcyBjaGFpbmVkIHRvIHRoZSBmZXRjaCBpbnNpZGUgdGhlIG1ldGhvZCBpcyBwYXJzaW5nIHRoZSBkYXRhIGZyb20gSlNPTiB0byBkYXRhIHN0cnVjdHVyZXMgSmF2YXNjcmlwdCB3aWxsIHVuZGVyc3RhbmQuIEluIHRoaXMgY2FzZSwgYmVjYXVzZSB3ZSBoYXZlIGEgY29sbGVjdGlvbiBvZiBtZXNzYWdlcywgaXQgd2lsbCBiZSBhbiBhcnJheSBvZiBvYmplY3RzLlxyXG4gIGdldEFsbE1lc3NhZ2VzKCkge1xyXG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L21lc3NhZ2VzXCIpXHJcbiAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgfSxcclxuXHJcbiAgLy8gVGhpcyBtZXRob2Qgd2lsbCBtYWtlIGEgSFRUUCBQT1NUIHJlcXVlc3QgdG8gdGhlIEFQSS4gQmVjYXVzZSBhIFBPU1QgaGFzIGEgYm9keSB3aXRoIHRoZSBkYXRhIGZvciB0aGUgbWVzc2FnZSwgdGhpcyBtZXRob2Qgd2lsbCB0YWtlIG9uZSBhcmd1bWVudCB3aGljaCB3aWxsIGJlIHRoZSBvYmplY3QgZm9yIHRoZSBuZXcgbWVzc2FnZSB3ZSB3YW50IHRvIGFkZCB0byBvdXIgY29sbGVjdGlvbiBpbiB0aGUgQVBJLlxyXG4gIHBvc3ROZXdNZXNzYWdlKG5ld01lc3NhZ2VUb1NhdmUpIHtcclxuICAgIC8vIFdlIHdhbnQgdG8gcmV0dXJuIHRoaXMgZmV0Y2ggcmVxdWVzdCBzbyB0aGF0IGF0IHRoZSBwb2ludCBpdCBpcyBjYWxsZWQsIHdlIGNhbiB0YWtlIGFkdmFudGFnZSBvZiB0aGUgYXN5bmNocm9ub3VzIG5hdHVyZSBvZiBwcm9taXNlcyB0byB3YWl0IGZvciB0aGlzIHRvIGJlIGRvbmUgYmVmb3JlIGdldHRpbmcgdGhlIGxhdGVzdCBkYXRhIGFuZCByZXJlbmRlcmluZyB0aGUgRE9NLlxyXG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L21lc3NhZ2VzXCIsIHtcclxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgfSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobmV3TWVzc2FnZVRvU2F2ZSlcclxuICAgIH0pXHJcbiAgfSxcclxuICAvLyBJbiBvcmRlciB0byBkZWxldGUgYSBpdGVtIGZyb20gdGhlIEpTT04gU2VydmVyIEFQSSwgYWxsIHdlIG5lZWQgaXMgdGhlIGlkIG9mIHRoZSBpdGVtIGluIG9yZGVyIHRvIHRhcmdldCBpdCwgd2hpY2ggaXMgdGhlIG9ubHkgYXJndW1lbnQgdGhpcyBtZXRob2QgaGFzLlxyXG4gIGRlbGV0ZUZvb2QobWVzc2FnZUlkKSB7XHJcbiAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvbWVzc2FnZXMvJHttZXNzYWdlSWR9YCwge1xyXG4gICAgbWV0aG9kOiBcIkRFTEVURVwiLFxyXG4gICAgaGVhZGVyczoge1xyXG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSxcclxuICAvLyBBZ2FpbiwgeW91IG5lZWQgdGhlIGlkIG9mIHRoZSBmb29kIGl0ZW0gaW4gb3JkZXIgdG8gZ2V0IGRhdGEgZm9yIHRoYXQgaXRlbSBiYWNrIGZyb20gdGhlIEFQSS5cclxuICBnZXRNZXNzYWdlKG1lc3NhZ2VJZCkge1xyXG4gICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvbWVzc2FnZXMvJHttZXNzYWdlSWR9YClcclxuICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICB9LFxyXG4gIC8vIEluIG9yZGVyIHRvIGVkaXQgYW4gZXhpc3RpbmcgZm9vZCBpdGVtLCB3ZSBuZWVkIHRoZSBpZCB0byBpZGVudGlmeSB3aGljaCBmb29kIGl0ZW0gd2Ugd2FudCB0byBlZGl0IGFuZCB0aGUgbmV3IGRhdGEgd2Ugd2FudCB0byByZXBsYWNlIHRoZSBleGlzdGluZyBkYXRhIHdpdGguIFNvIHRoaXMgdGltZSwgd2UgaGF2ZSB0d28gYXJndW1lbnRzIGZvciB0aGUgbWV0aG9kLlxyXG4gIHB1dEV4aXN0aW5nTWVzc2FnZShtZXNzYWdlSWQsIG1lc3NhZ2VUb0VkaXQpIHtcclxuICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L21lc3NhZ2VzLyR7bWVzc2FnZUlkfWAsIHtcclxuICAgICAgbWV0aG9kOiBcIlBVVFwiLFxyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICB9LFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShtZXNzYWdlVG9FZGl0KVxyXG4gICAgfSlcclxuICB9LFxyXG4gIC8vIEluIG9yZGVyIHRvIGVkaXQgYW4gZXhpc3RpbmcgZm9vZCBpdGVtLCB3ZSBuZWVkIHRoZSBpZCB0byBpZGVudGlmeSB3aGljaCBmb29kIGl0ZW0gd2Ugd2FudCB0byBlZGl0IGFuZCB0aGUgbmV3IGRhdGEgd2Ugd2FudCB0byByZXBsYWNlIHRoZSBleGlzdGluZyBkYXRhIHdpdGguIFNvIHRoaXMgdGltZSwgd2UgaGF2ZSB0d28gYXJndW1lbnRzIGZvciB0aGUgbWV0aG9kLlxyXG4gIHBhdGNoRXhpc3RpbmdNZXNzYWdlKG1lc3NhZ2VJZCwgbWVzc2FnZVRvRWRpdCkge1xyXG4gICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvbWVzc2FnZXMvJHttZXNzYWdlSWR9YCwge1xyXG4gICAgICBtZXRob2Q6IFwiUEFUQ0hcIixcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgfSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobWVzc2FnZVRvRWRpdClcclxuICAgIH0pXHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbWVzc2FnZXNDb2xsZWN0aW9uXHJcbiIsImltcG9ydCBtZXNzYWdlc0NvbGxlY3Rpb24gZnJvbSBcIi4vbWVzc2FnZXNDb2xsZWN0aW9uXCJcclxuaW1wb3J0IG1lc3NhZ2VzTGlzdCBmcm9tIFwiLi9tZXNzYWdlc0xpc3RcIlxyXG5cclxuY29uc3QgbWVzc2FnZXNGb3JtID0ge1xyXG5cclxuICAvLyBUaGlzIG1vZHVsZSB3aWxsIGJ1aWxkIGEgZm9ybSBhbmQgYXBwZW5kIGl0IHRvIHRoZSBET00uIFRoZSBmb3JtIHdpbGwgY29udGFpbiBpbnB1dCBmaWVsZHMgZm9yIGEgdXNlciB0byBhZGQgYSBtZXNzYWdlIHRvIHRoZSByb2xsaW5nIG1lc3NhZ2UgYm9hcmQgYW5kIGEgYnV0dG9uIHdpdGggYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCB3aWxsIGxpc3RlbiBmb3IgdGhlIGNsaWNrLlxyXG4gIGNyZWF0ZUFuZEFwcGVuZEZvcm0gKCkge1xyXG4gICAgLy8gMS4gQnVpbGQgSFRNTCBmb3JtXHJcbiAgICBsZXQgZm9ybUhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKVxyXG4gICAgZm9ybUhlYWRlci50ZXh0Q29udGVudCA9IFwiUG9zdCBhIE1lc3NhZ2VcIlxyXG5cclxuICAgIGxldCBtZXNzYWdlRmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZmllbGRzZXRcIilcclxuXHJcbiAgICBsZXQgbWVzc2FnZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpXHJcbiAgICBtZXNzYWdlTGFiZWwudGV4dENvbnRlbnQgPSBcIk1lc3NhZ2VcIlxyXG4gICAgbWVzc2FnZUxhYmVsLnNldEF0dHJpYnV0ZShcImZvclwiLCBcIm1lc3NhZ2VcIilcclxuICAgIGxldCBtZXNzYWdlSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIilcclxuICAgIG1lc3NhZ2VJbnB1dC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcIm1lc3NhZ2VcIilcclxuICAgIG1lc3NhZ2VJbnB1dC5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIsIFwibWVzc2FnZVwiKVxyXG5cclxuICAgIG1lc3NhZ2VGaWVsZC5hcHBlbmRDaGlsZChtZXNzYWdlTGFiZWwpXHJcbiAgICBtZXNzYWdlRmllbGQuYXBwZW5kQ2hpbGQobWVzc2FnZUlucHV0KVxyXG4gICAgXHJcbiAgICBsZXQgcG9zdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIilcclxuICAgIHBvc3RCdXR0b24udGV4dENvbnRlbnQgPSBcIlBvc3QgTWVzc2FnZVwiXHJcbiAgICBwb3N0QnV0dG9uLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibWVzc2FnZV9fcG9zdFwiKVxyXG5cclxuICAgIC8vIDIuIEF0dGFjaCBldmVudCBsaXN0ZW5lciB0byBidXR0b24gaW4gZm9ybVxyXG4gICAgcG9zdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5oYW5kbGVBZGROZXdNZXNzYWdlKVxyXG5cclxuICAgIC8vIDMuIEFwcGVuZCB0aGUgSFRNTCBmb3JtIHRvIHRoZSBET01cclxuICAgIC8vTm90aWNlIHRoYXQgSSBoYXZlIGFkZGVkIGFuIGFydGljbGUgZWxlbWVudCB0byBteSBpbmRleC5odG1sIHdpdGggdGhlIGNsYXNzIFwiZm9ybVwiLlxyXG4gICAgbGV0IG1lc3NhZ2VGb3JtRnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcclxuICAgIG1lc3NhZ2VGb3JtRnJhZ21lbnQuYXBwZW5kQ2hpbGQoZm9ybUhlYWRlcilcclxuICAgIG1lc3NhZ2VGb3JtRnJhZ21lbnQuYXBwZW5kQ2hpbGQobWVzc2FnZUZpZWxkKVxyXG4gICAgbWVzc2FnZUZvcm1GcmFnbWVudC5hcHBlbmRDaGlsZChwb3N0QnV0dG9uKVxyXG5cclxuICAgIGxldCBmb3JtQXJ0aWNsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9ybV9fbWVzc2FnZXNcIik7XHJcbiAgICBmb3JtQXJ0aWNsZS5hcHBlbmRDaGlsZChtZXNzYWdlRm9ybUZyYWdtZW50KTtcclxuXHJcbiAgfSxcclxuICAvLyBUaGlzIG1vZHVsZSB3aWxsIGFsc28gY29udGFpbiB0aGUgZnVuY3Rpb24gdGhhdCBleGVjdXRlcyB3aGVuIHRoZSBidXR0b24gaW4gdGhlIGZvcm0gaXMgY2xpY2tlZC4gV2hlbiB0aGUgYnV0dG9uIGluIHRoZSBmb3JtIGlzIGNsaWNrZWQsIHRoZSBmb2xsb3dpbmcgd2lsbCBoYXBwZW46XHJcbiAgaGFuZGxlQWRkTmV3TWVzc2FnZSAoZXZlbnQpIHtcclxuICAgIC8vIDEuIEdldCB1c2VyIGlucHV0IHRoYXQgdXNlciBlbnRlcmVkXHJcbiAgICBsZXQgaW5wdXRNZXNzYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtZXNzYWdlXCIpLnZhbHVlXHJcbiAgICBsZXQgbWVzc2FnZVRpbWVTdGFtcCA9IG5ldyBEYXRlKCkudG9Mb2NhbGVTdHJpbmcoKTtcclxuXHJcbiAgICAvLyAyLiBDcmVhdGUgYSBuZXcgb2JqZWN0IHdpdGggdGhlIHNhbWUgc3RydWN0dXJlIHdlIGhhdmUgYmVlbiB1c2luZyB0aHJvdWdob3V0IHRoZSBhcHBsaWNhdGlvbiB0byByZXByZXNlbnQgYSBtZXNzYWdlOlxyXG4gICAgLy8ge1xyXG4gICAgLy8gICBpZDogXCJhIG51bWJlciB0aGF0IHJlcHJlc2VudHMgdGhlIHByaW1hcnkga2V5IG9mIHRoZSBtZXNzYWdlcyBvYmplY3RcIixcclxuICAgIC8vICAgdGV4dDogXCJ0aGUgbWVzc2FnZSBpdHNlbGZcIixcclxuICAgIC8vICAgdXNlcklkOiBcInByaW1hcnkga2V5IGZyb20gdXNlciBvYmplY3RcIlxyXG4gICAgLy8gICB0aW1lU3RhbXA6IFwiTU0vREQvWVlZWSwgSEg6TU06U1MgQU0vUE1cIlxyXG4gICAgLy8gfVxyXG5cclxuICAgIGxldCBuZXdNZXNzYWdlID0ge1xyXG4gICAgICB0ZXh0OiBpbnB1dE1lc3NhZ2UsXHJcbiAgICAgIHRpbWVTdGFtcDogbWVzc2FnZVRpbWVTdGFtcCxcclxuICAgICAgZWRpdFZhbHVlOiAwLFxyXG4gICAgICB1c2VySWQ6IFwicGxhY2Vob2xkZXJcIlxyXG4gICAgfVxyXG5cclxuICAgIC8vIDMuIENhbGwgdGhlIG1ldGhvZChwb3N0TmV3TWVzc2FnZSkgd2l0aCB0aGUgZmV0Y2ggcmVxdWVzdCB0byBQT1NUIHRvIHRoZSBBUEkgYW5kIHBhc3MgaXQgdGhlIG9iamVjdCB3ZSBjcmVhdGVkIGluIHRoZSBwcmV2aW91cyBzdGVwXHJcblxyXG4gICAgLy8gTm90aWNlIHRoZSBpbXBvcnQgc3RhdGVtZW50IGF0IHRoZSB0b3Agb2YgdGhlIG1vZHVsZSBzbyBJIGNhbiBjYWxsIGEgbWV0aG9kIGluIHRoZSBtZXNzYWdlc0NvbGxlY3Rpb24gbW9kdWxlLlxyXG5cclxuICAgIC8vICoqKioqSU1QT1JUQU5UKioqKipcclxuICAgIC8vIFlvdSB3aWxsIG5vdGljZSBhdCB0aGlzIHBvaW50IHRoYXQgd2hpbGUgYSBuZXcgbWVzc2FnZSBpcyBiZWluZyBhZGRlZCB0byBvdXIgQVBJLCB1bmxlc3MgeW91IHJlZnJlc2ggdGhlIGFwcGxpY2F0aW9uLCB0aGUgbmV3bHkgYWRkZWQgbWVzc2FnZSB3aWxsIG5vdCBzaG93IHVwIG9uIHRoZSBET00uIFdlIGRlZmluaXRlbHkgZG8gbm90IHdhbnQgb3VyIHVzZXIgdG8gaGF2ZSB0byBoaXQgcmVmcmVzaCBldmVyeSB0aW1lIHRoZXkgYWRkIG5ldyBtZXNzYWdlLlxyXG5cclxuICAgIC8vIFdlIGFsc28gZG8gTk9UIHdhbnQgdG8gbWFudWFsbHkgYWRkIG91ciBuZXcgbWVzc2FnZSB0byB0aGUgbGlzdCBvZiBtZXNzYWdlcyBvbiB0aGUgRE9NLiBJbnN0ZWFkLCB3ZSB3YW50IG91ciBkYXRhIHRvIGJlIG91ciBwb2ludCBvZiB0cnV0aC4gT3VyIERPTSBzaG91bGQgYWx3YXlzIHVzZSB0aGUgZGF0YSBmcm9tIG91ciBBUEkgdG8gcmVuZGVyIHRoZSBET00uIExvZ2ljYWxseSwgaGVyZSBhcmUgdGhlIHN0ZXBzIHdlIHdhbnQgdG8gdGFrZSBwbGFjZS5cclxuICAgIC8vIDEuIEFkZCBuZXcgbWVzc2FnZSB0byB0aGUgQVBJIHVzaW5nIGEgUE9TVCBIVFRQIHJlcXVlc3QuXHJcbiAgICAvLyAgICAgV2UgYXJlIGFscmVhZHkgZG9pbmcgdGhpcy4gV2UgYXJlIHVzaW5nIHRoZSBmZXRjaCBkZWZpbmVkIGluIHRoZSBtZXNzYWdlc0NvbGxlY3Rpb24gbW9kdWxlIHRvIGFkZCBhIG5ldyBtZXNzYWdlIG9iamVjdCB0byB0aGUgQVBJLlxyXG4gICAgLy8gMi4gQWZ0ZXIgdGhlIG5ldyBtZXNzYWdlIGhhcyBiZWVuIGFkZGVkLCB3ZSB3YW50IHRvIGdldCBhIGxpc3Qgb2YgYWxsIG1lc3NhZ2VzICh1c2luZyBhIEdFVCBIVFRQIHJlcXVlc3QpIGFuZCByZW5kZXIgdGhlbSB0byB0aGUgRE9NLlxyXG4gICAgICAgICAgLy8gQmVjYXVzZSB3ZSB3YW50IHRvIG1ha2Ugc3VyZSB3ZSBvbmx5IGRvIHRoaXMgYWZ0ZXIgdGhlIGZpcnN0IHN0ZXAgaXMgZG9uZSwgd2Ugd2lsbCByZXR1cm4gdGhlIGZldGNoIGNhbGwgdGhhdCBpcyBkb2luZyB0aGUgUE9TVCBhbmQgY2hhaW4gYSAudGhlbiB0byB0aGUgY2FsbCAoanVzdCBsaWtlIHdlIGRvIHdpdGggdGhlIEdFVCkuIFRoaXMgbWVhbnMgd2UgYXJlIGRvaW5nIHRoZSBQT1NUIGFuZCB0aGVuIHdhaXRpbmcgdW50aWwgYSByZXNwb25zZSBjb21lcyBiYWNrIGJlZm9yZSBkb2luZyB0aGlzIHN0ZXAuIFRoZSByZWFzb24gd2Ugd2FudCB0byB3YWl0IGlzIGJlY2F1c2Ugd2Ugd2FudCB0byBiZSBzdXJlIHRoYXQgd2hlbiB3ZSBhc2sgb3VyIEFQSSBmb3IgdGhlIGxpc3Qgb2YgbWVzc2FnZXMsIHRoZSBuZXdseSBhZGRlZCBtZXNzYWdlIGlzIG9uIHRoYXQgbGlzdC4gU28gd2Ugd2FpdCB1bnRpbCBpdCBoYXMgYmVlbiBhZGRlZCBiZWZvcmUgdXNpbmcgYSBHRVQgcmVxdWVzdCB0byBnZXQgYSBsaXN0IG9mIGFsbCBtZXNzYWdlcyBhbmQgcmVuZGVyaW5nIHRoZW0gdG8gdGhlIERPTS5cclxuICAgICAgICAgIFxyXG4gICAgICAgICAgLy8gQnV0IHRoYXQgc291bmRzIGF3ZnVsbHkgZmFtaWxpYXI6IG1ha2UgYSBHRVQgSFRUUCByZXF1ZXN0IHRvIHRoZSBBUEkgZm9yIGEgbGlzdCBvZiBhbGwgbWVzc2FnZXMsIGl0ZXJhdGUgb3ZlciB0aGF0IGxpc3QgYW5kIGJ1aWxkIHRoZSBIVE1MIGZvciBlYWNoIG1lc3NhZ2UsIGFwcGVuZCB0aGUgSFRNTCB0byB0aGUgRE9NLiBUaGlzIGlzIGV4YWN0bHkgd2hhdCBvdXIgcG9zdE1lc3NhZ2UgbWV0aG9kIGluIG91ciBtZXNzYWdlc0xpc3QgbW9kdWxlIGlzIGFscmVhZHkgZG9pbmcuIFdoaWNoIG1lYW5zIEkgY2FuIHNpbXBseSBjYWxsIHRoYXQgbWV0aG9kIGZyb20gaGVyZS4gT25jZSBhZ2Fpbiwgbm90ZSB0aGF0IEkgYW0gaW1wb3J0aW5nIHRoZSBhcHByb3ByaWF0ZSBtb2R1bGUgYXQgdGhlIHRvcCBvZiB0aGlzIGZpbGUuXHJcbiAgICAvLyBUbyBzdW1tYXJpemUsIHdlIGFyZSBhZGRpbmcgYSBtZXNzYWdlIHRvIHRoZSBBUEksIHRoZW4gZ2V0dGluZyBhbiB1cGRhdGVkIGxpc3Qgb2YgbWVzc2FnZXMgZnJvbSB0aGUgQVBJIGFuZCByZXJlbmRlcmluZyB0aGUgRE9NLlxyXG4gICAgLy8gKioqKioqKioqKioqKioqKioqKlxyXG4gICAgbWVzc2FnZXNDb2xsZWN0aW9uLnBvc3ROZXdNZXNzYWdlKG5ld01lc3NhZ2UpXHJcbiAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgIG1lc3NhZ2VzTGlzdC5wb3N0TWVzc2FnZSgpXHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbWVzc2FnZXNGb3JtXHJcbiIsIi8vIFRoaXMgY29tcG9uZW50IHdpbGwgZ2V0IHRoZSBkYXRhLCBidWlsZCB0aGUgSFRNTCBmcm9tIHRoZSBkYXRhIGFuZCBhcHBlbmQgaXQgdG8gdGhlIERPTS5cclxuXHJcbi8vIFRoZSBtZXNzYWdlQ29sbGVjdGlvbiBjb21wb25lbnQgZ2V0cyB0aGUgZGF0YS5cclxuaW1wb3J0IG1lc3NhZ2VzQ29sbGVjdGlvbiBmcm9tIFwiLi9tZXNzYWdlc0NvbGxlY3Rpb25cIlxyXG4vLyBUbyBidWlsZCB0aGUgSFRNTCBmb3IgZWFjaCBvYmplY3QgaW4gdGhlIG1lc3NhZ2VzIGFycmF5ICh3aGljaCBpcyB3aGF0IHRoZSBkYXRhIGNvbWluZyBmcm9tIHRoZSBBUEkgYmVjb21lcyBvbmNlIHdlIHBhcnNlIGl0KSwgd2Ugd2lsbCB1c2UgdGhlIG1lc3NhZ2VzIGNvbXBvbmVudC5cclxuLy8gaW1wb3J0IG1lc3NhZ2VzIGZyb20gXCIuL21lc3NhZ2VzXCJcclxuXHJcbmNvbnN0IG1lc3NhZ2VzTGlzdCA9IHtcclxuICBwb3N0TWVzc2FnZSgpe1xyXG4gICAgLy8gMS4gR2V0IGRhdGFcclxuICAgIC8vIFRoZSBnZXRBbGxNZXNzYWdlcyBtZXRob2Qgd2lsbCBkbyBhIGZldGNoIGFuZCByZXR1cm4gYSBwcm9taXNlLiBUaGlzIGNhbGwgd2lsbCByZXR1cm4gdGhlIGRhdGEgZnJvbSB0aGUgQVBJIGluIHRoZSByZXNwb25zZS5cclxuICAgIG1lc3NhZ2VzQ29sbGVjdGlvbi5nZXRBbGxNZXNzYWdlcygpXHJcbiAgICAudGhlbihhbGxNZXNzYWdlcyA9PiB7XHJcblxyXG4gICAgICAvLyBBbiBlbXB0eSBkb2N1bWVudCBmcmFnbWVudFxyXG4gICAgICBsZXQgbWVzc2FnZURvY0ZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpXHJcblxyXG4gICAgICAvLyAyLiBJdGVyYXRlIG92ZXIgZGF0YSBhbmQgYnVpbGQgSFRNTCBmb3IgZWFjaCBtZXNzYWdlXHJcbiAgICAgIC8vIFdlIGxvb3Agb3ZlciB0aGUgYXJyYXkgb2Ygb2JqZWN0cyByZXR1cm5lZCBmcm9tIG91ciBBUEkgYW5kIGZvciBlYWNoIG9iZWN0LCB3ZSBtYWtlIGEgY2FsbCB0byB0aGUgbWVzc2FnZUJ1aWxkZXIgbWV0aG9kIGluIHRoZSBtZXNzYWdlcyBtb2R1bGUuIFRoaXMgbWV0aG9kIHRha2VzIGEgbWVzc2FnZSBvYmplY3QgYXMgYW4gYXJndW1lbnQgYW5kIHJldHVybnMgYW4gSFRNTCBjb21wb25lbnQuIE9uY2Ugd2UgaGF2ZSB0aGF0IEhUTUwsIHdlIGFwcGVuZCBpdCB0byBvdXIgZG9jdW1lbnQgZnJhZ21lbnQgc28gdGhhdCBpdCBpcyBzbG93bHkgYnVpbHQgdXAuIEJ5IHRoZSBlbmQgb2YgdGhlIGZvckVhY2ggbG9vcCwgb3VyIGRvY3VtZW50IGZyYWdtZW50IGNvbnRhaW5zIGFsbCB0aGUgSFRNTCBmb3IgYWxsIG91ciBkYXRhLlxyXG4gICAgICBhbGxNZXNzYWdlcy5mb3JFYWNoKG1lc3NhZ2UgPT4ge1xyXG4gICAgICAgIGxldCBtZXNzYWdlSHRtbCA9IG1lc3NhZ2VzLm1lc3NhZ2VCdWlsZGVyKG1lc3NhZ2UpXHJcbiAgICAgICAgbWVzc2FnZURvY0ZyYWdtZW50LmFwcGVuZENoaWxkKG1lc3NhZ2VIdG1sKVxyXG4gICAgICB9KVxyXG4gICAgICBcclxuICAgICAgLy8gMy4gQXBwZW5kIHRoZSBIVE1MIHRvIHRoZSBET01cclxuICAgICAgLy8gV2UgZ2V0IGEgcmVmZXJlbmNlIHRvIGEgSFRNTCBlbGVtZW50IHdpdGggdGhlIGNsYXNzIFwib3V0cHV0X19tZXNzYWdlc1wiIGFuZCBhcHBlbmQgb3VyIGRvY3VtZW50IGZyYWdtZW50IHRvIHRoYXQgZWxlbWVudC4gQmVjYXVzZSB0aGUgSFRNTCBlbGVtZW50IHdpdGggY2xhc3MgXCJvdXRwdXRfX21lc3NhZ2VzXCIgaXMgYWxyZWFkeSBvbiB0aGUgRE9NLCB0aGUgSFRNTCBpbiB0aGUgZG9jdW1lbnQgZnJhZ21lbnQgaXMgYXBwZW5kZWQgdG8gdGhlIERPTS5cclxuICAgICAgbGV0IG91dHB1dEFydGljbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm91dHB1dF9fbWVzc2FnZXNcIilcclxuXHJcbiAgICAgIC8vVGhpcyB3aGlsZSBsb29wIGVzc2VudGlhbGx5IHJlbW92ZXMgYWxsIGNoaWxkIG5vZGVzIG9mIGFuIGVsZW1lbnQgdW50aWwgdGhlIGVsZW1lbnQgaGFzIG5vIGNoaWxkIG5vZGVzIGxlZnQuIEl0IGlzIGVxdWl2YWxlbnQgdG8gdGhlIGZvbGxvd2luZzpcclxuICAgICAgLy8gb3V0cHV0QXJ0aWNsZS5pbm5lckhUTUwgPSBcIlwiXHJcblxyXG4gICAgICAvLyBJZiB3ZSBkbyBub3QgZG8gdGhpcywgZWFjaCB0aW1lIHdlIGFkZCBhIG5ldyBtZXNzYWdlIHVzaW5nIG91ciBmb3JtLCBhbGwgdGhlIG1lc3NhZ2VzIHdpbGwgYmUgYXBwZW5kZWQgdG8gdGhlIGJvdHRvbSBvZiBvdXIgbGlzdCBzbyB0aGF0IHdlIHdpbGwgaGF2ZSBkdXBsaWNhdGVzLiBFc3NlbnRpYWxseSwgd2UgYXJlIGNsZWFyaW5nIG91dCBvdXIgb3V0cHV0IGNvbnRhaW5lciAob3VyIGFydGljbGUgdGFnIHdpdGggY2xhc3MgXCJvdXRwdXRcIikgc28gdGhhdCB3ZSByZXBvcHVsYXRlIGl0LlxyXG4gICAgICB3aGlsZSAob3V0cHV0QXJ0aWNsZS5maXJzdENoaWxkKSB7XHJcbiAgICAgICAgb3V0cHV0QXJ0aWNsZS5yZW1vdmVDaGlsZChvdXRwdXRBcnRpY2xlLmZpcnN0Q2hpbGQpO1xyXG4gICAgICB9XHJcbiAgICAgIG91dHB1dEFydGljbGUuYXBwZW5kQ2hpbGQobWVzc2FnZURvY0ZyYWdtZW50KVxyXG5cclxuICAgIH0pXHJcbiAgfVxyXG59XHJcblxyXG4vL0dpdmVuIGEgc2luZ2xlIG1lc3NhZ2VzIG9iamVjdCwgdGhpcyBjb21wb25lbnQgYnVpbGRzIG91dCB0aGUgSFRNTCBhbmQgcmV0dXJucyBpdFxyXG5jb25zdCBtZXNzYWdlcyA9IHtcclxuXHJcbiAgLy8gVGhpcyBtZXRob2QgdGFrZXMgb25lIGFyZ3VtZW50LCB3aGljaCB3ZSBleHBlY3QgdG8gYmUgYW4gb2JqZWN0IHRoYXQgcmVwcmVzZW50cyBhIG1lc3NhZ2UgYW5kIHdpbGwgaGF2ZSB0aGUgZm9sbG93aW5nIHN0cnVjdHVyZTpcclxuICAvLyB7XHJcbiAgLy8gICBpZDogXCJhIG51bWJlciB0aGF0IHJlcHJlc2VudHMgdGhlIHByaW1hcnkga2V5IG9mIHRoZSBtZXNzYWdlcyBvYmplY3RcIixcclxuICAvLyAgIHRleHQ6IFwidGhlIG1lc3NhZ2UgaXRzZWxmXCIsXHJcbiAgLy8gICB1c2VySWQ6IFwicHJpbWFyeSBrZXkgZnJvbSB1c2VyIG9iamVjdFwiXHJcbiAgLy8gICB0aW1lU3RhbXA6IFwiTU0vREQvWVlZWSwgSEg6TU06U1MgQU0vUE1cIlxyXG4gIC8vIH1cclxuXHJcbiAgLy8gR2l2ZW4gdGhpcyBvYmplY3QsIHRoZSBtZXRob2Qgd2lsbCBidWlsZCBIVE1MIGVsZW1lbnRzIGFuZCBhcHBlbmQgdGhlbSBhcHByb3ByaWF0ZWx5IHNvIHRoYXQgaXQgd2lsbCBsb29rIGxpa2UgdGhpczpcclxuICAvLyA8YXJ0aWNsZT5cclxuICAvLyAgIDxoNT51c2VybmFtZTwvaDU+XHJcbiAgLy8gICA8cD5tZXNzYWdlIHRlc3h0PC9wPlxyXG4gIC8vICAgPHA+dGltZXN0YW1wPC9wPlxyXG4gIC8vIDwvYXJ0aWNsZT5cclxuXHJcbiAgLy8gVGhpcyBIVE1MIGlzIHRoZW4gcmV0dXJuZWQgdG8gdGhlIHBvaW50IGZyb20gd2hlcmUgdGhpcyBtZXRob2Qgd2FzIGNhbGxlZFxyXG4gIG1lc3NhZ2VCdWlsZGVyKG1lc3NhZ2VPYmplY3QpIHtcclxuICAgIGxldCBtZXNzYWdlQXJ0aWNsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhcnRpY2xlXCIpXHJcbiAgICBtZXNzYWdlQXJ0aWNsZS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgbWVzc2FnZS0tJHttZXNzYWdlT2JqZWN0LmlkfWApXHJcblxyXG4gICAgbGV0IG1lc3NhZ2VVc2VySWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDVcIilcclxuICAgIG1lc3NhZ2VVc2VySWQudGV4dENvbnRlbnQgPSBtZXNzYWdlT2JqZWN0LnVzZXJJZFxyXG5cclxuICAgIGxldCBtZXNzYWdlVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpXHJcbiAgICBtZXNzYWdlVGV4dC50ZXh0Q29udGVudCA9IG1lc3NhZ2VPYmplY3QudGV4dFxyXG5cclxuICAgIGxldCBtZXNzYWdlVGltZVN0YW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIilcclxuICAgIG1lc3NhZ2VUaW1lU3RhbXAudGV4dENvbnRlbnQgPSBtZXNzYWdlT2JqZWN0LnRpbWVTdGFtcFxyXG5cclxuICAgIC8vIEluIG9yZGVyIHRvIGNoYW5nZSB0aGUgZGF0YSBmb3IgYW4gZXhpc3RpbmcgZm9vZCBpdGVtIGluIG91ciBBUEksIHdlIG5lZWQgdG8gcHJvdmlkZSB0aGUgdXNlciB3aXRoIGEgd2F5IHRvIGVkaXQgdGhlIGV4aXN0aW5nIHZhbHVlcy4gVGhpcyBtZWFucyB3ZSB3aWxsIHNob3cgdGhlIHVzZXIgYSBmb3JtIHdpdGggdGhlIGV4aXN0aW5nIHZhbHVlcyBhbHJlYWR5IHBvcHVsYXRlZC4gT25jZSBhZ2Fpbiwgd2Ugd2FudCBvdXIgZGF0YSB0byBiZSBvdXIgcG9pbnQgb2YgdHJ1dGguIFNvIHdlIG1ha2UgYSBIVFRQIEdFVCByZXF1ZXN0IHRhcmdldGluZyB0aGUgc3BlY2lmaWMgZm9vZCBpdGVtIHRoZSB1c2VyIHdhbnRzIHRvIGVkaXQgdG8gZ2V0IHRoZSBkYXRhIHRoYXQgd2lsbCBiZSBwb3B1bGF0ZWQgaW4gdGhlIGZvcm0uIE9uY2Ugd2UgaGF2ZSB0aGF0IGRhdGEsIHdlIGNhbiBidWlsZCB0aGUgZm9ybSwgcG9wdWxhdGUgdGhlIGlucHV0IGZpZWxkcyB3aXRoIG91ciBkYXRhIGZvcm0gdGhlIEdFVCByZXF1ZXN0IGFuZCB0aGVuIGFwcGVuZCB0aGF0IGZvcm0gdG8gdGhlIGFwcHJvcHJpYXRlIHBsYWNlIG9uIHRoZSBET00uXHJcbiAgICBsZXQgZWRpdE1lc3NhZ2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpXHJcbiAgICBlZGl0TWVzc2FnZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiRWRpdFwiXHJcbiAgICBlZGl0TWVzc2FnZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICBsZXQgYXJ0aWNsZUlkID0gZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUuaWRcclxuICAgICAgbGV0IG1lc3NhZ2VJZCA9IGFydGljbGVJZC5zcGxpdChcIi0tXCIpWzFdXHJcbiAgICAgIG1lc3NhZ2VzQ29sbGVjdGlvbi5nZXRNZXNzYWdlKG1lc3NhZ2VJZClcclxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgIG1lc3NhZ2VzRWRpdEZvcm0uY3JlYXRlQW5kQXBwZW5kRm9ybShhcnRpY2xlSWQsIHJlc3BvbnNlKVxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuXHJcbiAgICAvLyBTaW5jZSB3ZSBjYW4gZ2V0IHRoZSBpZCBvZiB0aGUgZm9vZCBpdGVtIHRvIGJlIGRlbGV0ZWQgZnJvbSB0aGUgcGFyZW50IGVsZW1lbnQodGhlIGFydGljbGUgZWxlbWVudCksIHdlIGNhbiB1c2UgdGhhdCB0byBtYWtlIGFuIEhUVFAgREVMRVRFIHJlcXVlc3QgdG8gb3VyIEFQSS4gT25jZSBhZ2FpbiBhZnRlciB0aGlzIHdlIHdhbnQgdG8gZ2V0IHRoZSBsaXN0IG9mIGZvb2QgaXRlbXMgZnJvbSB0aGUgQVBJIHVzaW5nIGEgSFRUUCBHRVQgcmVxdWVzdCBhbmQgZGlzcGxheSBpdCB0byB0aGUgdXNlciBzbyB0aGF0IHRoZSB1c2VyIGRvZXMgbm90IGhhdmUgdG8gcmVmcmVzaCB0aGUgcGFnZSBpbiBvcmRlciB0byBzZWUgdGhhdCB0aGUgaXRlbSB0aGV5IGRlbGV0ZWQgaGFzIGFjdHVhbGx5IGJlZW4gZGVsZXRlZC5cclxuICAgIC8vIGxldCBkZWxldGVNZXNzYWdlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKVxyXG4gICAgLy8gZGVsZXRlTWVzc2FnZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiRGVsZXRlXCJcclxuICAgIC8vIGRlbGV0ZU1lc3NhZ2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgIC8vICAgbGV0IG1lc3NhZ2VJZCA9IGV2ZW50LnRhcmdldC5wYXJlbnROb2RlLmlkLnNwbGl0KFwiLS1cIilbMV1cclxuICAgIC8vICAgbWVzc2FnZXNDb2xsZWN0aW9uLmRlbGV0ZUZvb2QobWVzc2FnZUlkKVxyXG4gICAgLy8gICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgXHJcbiAgICAvLyAgICAgbWVzc2FnZXNMaXN0LnBvc3RNZXNzYWdlKClcclxuICAgIC8vICAgfSlcclxuICAgIC8vIH0pXHJcblxyXG5cclxuXHJcbiAgICBtZXNzYWdlQXJ0aWNsZS5hcHBlbmRDaGlsZChtZXNzYWdlVXNlcklkKVxyXG4gICAgbWVzc2FnZUFydGljbGUuYXBwZW5kQ2hpbGQobWVzc2FnZVRleHQpXHJcbiAgICBtZXNzYWdlQXJ0aWNsZS5hcHBlbmRDaGlsZChtZXNzYWdlVGltZVN0YW1wKVxyXG4gICAgLy8gbWVzc2FnZUFydGljbGUuYXBwZW5kQ2hpbGQoZGVsZXRlTWVzc2FnZUJ1dHRvbilcclxuICAgIG1lc3NhZ2VBcnRpY2xlLmFwcGVuZENoaWxkKGVkaXRNZXNzYWdlQnV0dG9uKVxyXG5cclxuICAgIHJldHVybiBtZXNzYWdlQXJ0aWNsZVxyXG4gIH1cclxufVxyXG5cclxuY29uc3QgbWVzc2FnZXNFZGl0Rm9ybSA9IHtcclxuICAvLyBUaGlzIG1vZHVsZSB3aWxsIGJ1aWxkIGFuIGVkaXQgZm9ybSBhbmQgYXBwZW5kIGl0IHRvIHRoZSBET00uIFRoZSBmb3JtIHdpbGwgY29udGFpbiBpbnB1dCBmaWVsZHMgd2l0aCBleGlzdGluZyB2YWx1ZXMgZnJvbSB0aGUgQVBJIGFuZCBhbiBVcGRhdGUgYnV0dG9uLiBUaGUgdXNlciBjYW4gZWRpdCB0aGUgdGhlIHZhbHVlcyBpbiB0aGUgaW5wdXQgZmllbGRzLiBBbiBldmVudCBsaXN0ZW5lciBvbiB0aGUgVXBkYXRlIGJ1dHRvbiB3aWxsIGhhbmRsZSB0YWtpbmcgdGhlIG5ldyB2YWx1ZXMgZW50ZXJlZCBieSB0aGUgdXNlciBhbmQgY2FsbGluZyB0aGUgQVBJIHRvIHVwZGF0ZSB0aGUgZGF0YS5cclxuICBjcmVhdGVBbmRBcHBlbmRGb3JtIChhcnRpY2xlSWQsIG1lc3NhZ2VPYmpUb0VkaXQpIHtcclxuXHJcbiAgICAvLyBCdWlsZGluZyB0aGUgZWRpdCBmb3JtIHdpdGggZmllbGRzIGZvciB0aGUgbmFtZSwgZXhwaXJhdGlvbiBhbmQgdHlwZSBvZiB0aGUgZm9vZCBpdGVtLiBFYWNoIG9mIHRoZSBpbnB1dCBmaWVsZHMgY29udGFpbnMgdGhlIGV4aXN0aW5nIHZhbHVlcyBmcm9tIHRoZSBkYXRhYmFzZS5cclxuICAgIGxldCBtZXNzYWdlRmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKVxyXG5cclxuICAgIGxldCBtZXNzYWdlTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIilcclxuICAgIG1lc3NhZ2VMYWJlbC50ZXh0Q29udGVudCA9IFwiTWVzc2FnZVwiXHJcbiAgICBsZXQgbWVzc2FnZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpXHJcbiAgICBtZXNzYWdlSW5wdXQudmFsdWUgPSBtZXNzYWdlT2JqVG9FZGl0LnRleHRcclxuXHJcbiAgICBtZXNzYWdlRmllbGQuYXBwZW5kQ2hpbGQobWVzc2FnZUxhYmVsKVxyXG4gICAgbWVzc2FnZUZpZWxkLmFwcGVuZENoaWxkKG1lc3NhZ2VJbnB1dClcclxuXHJcbiAgICBsZXQgc3VibWl0RWRpdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIilcclxuICAgIHN1Ym1pdEVkaXRCdXR0b24udGV4dENvbnRlbnQgPSBcIlN1Ym1pdCBFZGl0XCJcclxuXHJcbiAgICAvLyBUaGVyZSBpcyBhbiBldmVudCBsaXN0ZW5lciBvbiB0aGUgVXBkYXRlIGJ1dHRvbiB3aGljaCB3aWxsIHRha2UgdGhlIG5ldyB2YWx1ZXMgaW4gdGhlIGlucHV0IGZpZWxkcyBhbmQgYnVpbGQgYW4gb2JqZWN0IGZvciB0aGUgZm9vZCBpdGVtIHRvIGJlIGVkaXRlZC4gVGhlbiB3ZSBtYWtlIGEgSFRUUCBQVVQgcmVxdWVzdCB3aGVyZSB3ZSB0YXJnZXQgdGhlIGZvb2QgaXRlbSB3ZSB3YW50IHRvIGVkaXQgYnkgc3BlY2lmeWluZyB0aGUgaWQgaW4gdGhlIFVSTC4gV2UgYWxzbyBwYXNzIHRoZSBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBmb29kIGl0ZW0gd2l0aCB0aGUgbmV3IHZhbHVlcyBhcyBkYXRhIGluIG91ciBIVFRQIHJlcXVlc3QuIE9uY2UgYWdhaW4sIGJlY2F1c2Ugb3VyIGRhdGEgaGFzIGJlZW4gbW9kaWZpZWQsIHdlIG1ha2UgYW4gSFRUUCBHRVQgcmVxdWVzdCB0byBnZXQgYWxsIHRoZSBmb29kIGl0ZW1zIGFuZCBkaXNwbGF5IHRoZW0uXHJcbiAgICBzdWJtaXRFZGl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgIGxldCBlZGl0ZWRNZXNzYWdlID0ge1xyXG4gICAgICAgIHRleHQ6IG1lc3NhZ2VJbnB1dC52YWx1ZSxcclxuICAgICAgICBlZGl0VmFsdWU6IDFcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgICAgbWVzc2FnZXNDb2xsZWN0aW9uLnBhdGNoRXhpc3RpbmdNZXNzYWdlKG1lc3NhZ2VPYmpUb0VkaXQuaWQsIGVkaXRlZE1lc3NhZ2UpXHJcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICBtZXNzYWdlc0xpc3QucG9zdE1lc3NhZ2UoKVxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuXHJcbiAgICAvLyBXZSBwYXNzZWQgaW4gdGhlIGlkIG9mIHRoZSBhcnRpY2xlIHNvIHdlIGtub3cgZXhhY3RseSB3aGVyZSB0byBhcHBlbmQgdGhlIGVkaXQgZm9ybS5cclxuICAgIGxldCBtZXNzYWdlQXJ0aWNsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2FydGljbGVJZH1gKVxyXG5cclxuICAgIC8vIEJlY2F1c2Ugd2Ugd2FudCB0byByZXBsYWNlIHdoYXQgaXMgY3VycmVudGx5IGluIHRoZSBhcnRpY2xlIGVsZW1lbnQgd2l0aCB0aGUgZWRpdCBmb3JtLCB3ZSBjbGVhciBvdXQgYWxsIGNoaWxkcmVuIEhUTUwgZWxlbWVudHMgaW4gb3VyIHRhcmdldGVkIGVsZW1lbnQgYmVmb3JlIGFwcGVuZGluZyBvdXIgZWRpdCBmb3JtIHRvIGl0LlxyXG4gICAgd2hpbGUgKG1lc3NhZ2VBcnRpY2xlLmZpcnN0Q2hpbGQpIHtcclxuICAgICAgbWVzc2FnZUFydGljbGUucmVtb3ZlQ2hpbGQobWVzc2FnZUFydGljbGUuZmlyc3RDaGlsZCk7XHJcbiAgICB9XHJcbiAgICBtZXNzYWdlQXJ0aWNsZS5hcHBlbmRDaGlsZChtZXNzYWdlRmllbGQpXHJcbiAgICBtZXNzYWdlQXJ0aWNsZS5hcHBlbmRDaGlsZChzdWJtaXRFZGl0QnV0dG9uKVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbWVzc2FnZXNMaXN0XHJcbiJdfQ==
