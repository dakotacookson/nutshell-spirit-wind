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

var _login = _interopRequireDefault(require("./login"));

var _messagesList = _interopRequireDefault(require("./messages/messagesList"));

var _messagesForm = _interopRequireDefault(require("./messages/messagesForm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_login.default.createAndAppendLoginInput();

_messagesList.default.postMessage();

_messagesForm.default.createAndAppendForm();

},{"./login":2,"./messages/messagesForm":6,"./messages/messagesList":7}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//Given a single messages object, this component builds out the HTML and returns it
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
  //   <p>message text</p>
  //   <p>timestamp</p>
  // </article>
  // This HTML is then returned to the point from where this method was called
  messageBuilder(messageObject) {
    let messageArticle = document.createElement("article");
    let messageUserId = document.createElement("h5");
    messageUserId.textContent = messageObject.userId;
    let messageText = document.createElement("p");
    messageText.textContent = messageObject.text;
    let messageTimeStamp = document.createElement("p");
    messageTimeStamp.textContent = messageObject.timeStamp;
    messageArticle.appendChild(messageUserId);
    messageArticle.appendChild(messageText);
    messageArticle.appendChild(messageTimeStamp);
    return messageArticle;
  }

};
var _default = messages;
exports.default = _default;

},{}],5:[function(require,module,exports){
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
  }

};
var _default = messagesCollection;
exports.default = _default;

},{}],6:[function(require,module,exports){
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

},{"./messagesCollection":5,"./messagesList":7}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _messagesCollection = _interopRequireDefault(require("./messagesCollection"));

var _messages = _interopRequireDefault(require("./messages"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This component will get the data, build the HTML from the data and append it to the DOM.
// The messageCollection component gets the data.
// To build the HTML for each object in the messages array (which is what the data coming from the API becomes once we parse it), we will use the messages component.
const messagesList = {
  postMessage() {
    // 1. Get data
    // The getAllMessages method will do a fetch and return a promise. This call will return the data from the API in the response.
    _messagesCollection.default.getAllMessages().then(allMessages => {
      // An empty document fragment
      let messageDocFragment = document.createDocumentFragment(); // 2. Iterate over data and build HTML for each message
      // We loop over the array of objects returned from our API and for each obect, we make a call to the messageBuilder method in the messages module. This method takes a message object as an argument and returns an HTML component. Once we have that HTML, we append it to our document fragment so that it is slowly built up. By the end of the forEach loop, our document fragment contains all the HTML for all our data.

      allMessages.forEach(message => {
        let messageHtml = _messages.default.messageBuilder(message);

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

};
var _default = messagesList;
exports.default = _default;

},{"./messages":4,"./messagesCollection":5}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2FwaS5qcyIsIi4uL3NjcmlwdHMvbG9naW4uanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL21lc3NhZ2VzL21lc3NhZ2VzLmpzIiwiLi4vc2NyaXB0cy9tZXNzYWdlcy9tZXNzYWdlc0NvbGxlY3Rpb24uanMiLCIuLi9zY3JpcHRzL21lc3NhZ2VzL21lc3NhZ2VzRm9ybS5qcyIsIi4uL3NjcmlwdHMvbWVzc2FnZXMvbWVzc2FnZXNMaXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDQUEsTUFBTSxHQUFHLEdBQUc7QUFFUixFQUFBLE9BQU8sQ0FBQyxRQUFELEVBQVc7QUFDZCxXQUFPLEtBQUssQ0FBRSx5QkFBd0IsUUFBUyxFQUFuQyxDQUFMLENBQ04sSUFETSxDQUNELFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBVCxFQURYLENBQVA7QUFFSDs7QUFMTyxDQUFaLEMsQ0FTQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTs7ZUFFZSxHOzs7Ozs7Ozs7OztBQ25GZjs7OztBQUNBLE1BQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLE9BQXZCLENBQXRCO0FBQ0EsTUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FB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ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IEFQSSA9IHtcclxuXHJcbiAgICBnZXREYXRhKHJlc291cmNlKSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvJHtyZXNvdXJjZX1gKVxyXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgIH0sXHJcblxyXG59XHJcblxyXG4vLyAgICAgZ2V0QWxsVXNlcnMoKSB7XHJcbi8vICAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L3VzZXJzXCIpXHJcbi8vICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4vLyAgICAgICB9LFxyXG5cclxuLy8gICAgIGdldEFsbE1lc3NhZ2VzKCkge1xyXG4vLyAgICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9tZXNzYWdlc1wiKVxyXG4vLyAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24pXHJcbi8vICAgICAgIH0sXHJcblxyXG4vLyAgICAgZ2V0QWxsTmV3c0FydGljbGVzKCkge1xyXG4vLyAgICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9uZXdzQXJ0aWNsZXNcIilcclxuLy8gICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbi8vICAgICAgIH0sXHJcblxyXG4vLyAgICAgZ2V0QWxsVGFza3MoKSB7XHJcbi8vICAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L3Rhc2tzXCIpXHJcbi8vICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4vLyAgICAgICB9LFxyXG5cclxuLy8gICAgIGdldEFsbEV2ZW50cygpIHtcclxuLy8gICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvZXZlbnRzXCIpXHJcbi8vICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4vLyAgICAgICB9LFxyXG5cclxuLy8gICAgIGdldEFsbEZyaWVuZHMoKSB7XHJcbi8vICAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2ZyaWVuZHNcIilcclxuLy8gICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbi8vICAgICAgIH0sXHJcblxyXG5cclxuLy8gICAgIHBvc3ROZXdVc2VyKG5ld1VzZXJUb0FkZCkge1xyXG4vLyAgICAgZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvdXNlcnNcIiwge1xyXG4vLyAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbi8vICAgICAgICAgaGVhZGVyczoge1xyXG4vLyAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4vLyAgICAgICAgIH0sXHJcbi8vICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobmV3VXNlclRvQWRkKVxyXG4vLyAgICAgfSlcclxuLy8gICAgIH0sXHJcblxyXG4vLyAgICAgcG9zdE5ld01lc3NhZ2UobmV3TWVzc2FnZVRvQWRkKSB7XHJcbi8vICAgICAgICAgZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvbWVzc2FnZXNcIiwge1xyXG4vLyAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4vLyAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbi8vICAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4vLyAgICAgICAgICAgICB9LFxyXG4vLyAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShuZXdNZXNzYWdlVG9BZGQpXHJcbi8vICAgICB9KVxyXG4vLyAgICAgfSxcclxuXHJcbi8vICAgICBwb3N0TmV3TmV3c0FydGljbGUobmV3TmV3c0FydGljbGVUb0FkZCkge1xyXG4vLyAgICAgZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvbmV3c0FydGljbGVzXCIsIHtcclxuLy8gICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4vLyAgICAgICAgIGhlYWRlcnM6IHtcclxuLy8gICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuLy8gICAgICAgICB9LFxyXG4vLyAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5ld05ld3NBcnRpY2xlVG9BZGQpXHJcbi8vICAgICB9KVxyXG4vLyAgICAgfSxcclxuXHJcbi8vICAgICBwb3N0TmV3VGFzayhuZXdUYXNrVG9BZGQpIHtcclxuLy8gICAgICAgICBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC90YXNrc1wiLCB7XHJcbi8vICAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbi8vICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuLy8gICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbi8vICAgICAgICAgICAgIH0sXHJcbi8vICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5ld1Rhc2tUb0FkZClcclxuLy8gICAgIH0pXHJcbi8vICAgICB9LFxyXG5cclxuXHJcbi8vIH1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFQSSIsImltcG9ydCBBUEkgZnJvbSBcIi4vYXBpXCJcclxuY29uc3QgdXNlck5hbWVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuY29uc3QgcGFzc3dvcmRJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuXHJcbmNvbnN0IGxvZ2luID0ge1xyXG4vLyBGdW5jdGlvbiB0byBjcmVhdGUgYW5kIGFwcGVuZCBsb2dpbiBpbnB1dCBmaWVsZHMgYW5kIGxvZ2luIGJ1dHRvbi5cclxuICAgIGNyZWF0ZUFuZEFwcGVuZExvZ2luSW5wdXQoKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IG91dEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vdXRwdXRfX2xvZ2luXCIpO1xyXG4gICAgICAgIHVzZXJOYW1lSW5wdXQudHlwZSA9IFwidGV4dFwiO1xyXG4gICAgICAgIHVzZXJOYW1lSW5wdXQucGxhY2Vob2xkZXIgPSBcInVzZXJuYW1lXCI7XHJcbiAgICAgICAgcGFzc3dvcmRJbnB1dC50eXBlID0gXCJwYXNzd29yZFwiO1xyXG4gICAgICAgIHBhc3N3b3JkSW5wdXQucGxhY2Vob2xkZXIgPSBcInBhc3N3b3JkXCI7XHJcbiAgICAgICAgb3V0RWwuYXBwZW5kQ2hpbGQodXNlck5hbWVJbnB1dCk7XHJcbiAgICAgICAgb3V0RWwuYXBwZW5kQ2hpbGQocGFzc3dvcmRJbnB1dCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGxvZ2luQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgICAgICBsb2dpbkJ1dHRvbi50ZXh0Q29udGVudCA9IChcImxvZ2luXCIpO1xyXG4gICAgICAgIG91dEVsLmFwcGVuZENoaWxkKGxvZ2luQnV0dG9uKTtcclxuLy8gUnVucyB0aGUgZ2V0VXNlckRhdGEoKSBmdW5jdGlvbiB3aGVuIExvZ2luIGJ1dHRvbiBpcyBjbGlja2VkLlxyXG4gICAgICAgIGxvZ2luQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmdldFVzZXJEYXRhKTtcclxuICAgIH0sXHJcbi8vIEdhdGhlcnMgZGF0YSBlbnRlcmVkIGludG8gTG9naW4gaW5wdXQgZmllbGRzLiBGZXRjaGVzIHVzZXJkYXRhIGZyb20gQVBJIGFuZCBjb21wYXJlcyBpbnB1dCBkYXRhIHdpdGggZXhpc3RpbmcgdXNlciBkYXRhIGluIEFQSS4gSWYgaW5wdXQgZGF0YSBtYXRjaGVzIHVzZXIgZGF0YSBpbiBBUEksIHJ1bnMgbG9hZFVzZXJTcGVjaWZpY1BhZ2UoKS4gSWYgaW5wdXQgZGF0YSBkb2VzIG5vdCBtYXRjaCBhbnkgdXNlciBkYXRhIGluIEFQSSwgYWxlcnQgaXMgc2VudC5cclxuICAgIGdldFVzZXJEYXRhICgpIHtcclxuICAgICAgICBjb25zdCB1c2VybmFtZSA9IHVzZXJOYW1lSW5wdXQudmFsdWU7XHJcbiAgICAgICAgY29uc3QgcGFzc3dvcmQgPSBwYXNzd29yZElucHV0LnZhbHVlO1xyXG4gICAgICAgIEFQSS5nZXREYXRhKFwidXNlcnNcIilcclxuICAgICAgICAudGhlbihhbGxVc2VycyA9PiB7XHJcbiAgICAgICAgICAgIGFsbFVzZXJzLmZvckVhY2godXNlciA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHVzZXJuYW1lID09PSB1c2VyLnVzZXJOYW1lICYmIHBhc3N3b3JkID09PSB1c2VyLnBhc3N3b3JkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFRoaXMgb25lOiAke3VzZXIuaWR9YClcclxuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCd1c2VySWQnLCB1c2VyLmlkKVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB1c2VySWQgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd1c2VySWQnKTtcclxuICAgICAgICAgICAgICAgICAgICBsb2FkVXNlclNwZWNpZmljUGFnZSh1c2VySWQpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChcIlVzZXJuYW1lL3Bhc3N3b3JkIGludmFsaWQuIElmIG5ldyB1c2VyLCBwbGVhc2UgcmVnaXN0ZXIuIDopXCIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBsb2FkVXNlclNwZWNpZmljUGFnZSh1c2VySWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgVGhpcyBpcyB0aGUgdXNlciBwYWdlISAke3VzZXJJZH1gKTtcclxuICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgXHJcbiAgICAgICAgfSlcclxuICAgICAgICBcclxuICAgICB9LCAgICAgXHJcbiAgICBcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbG9naW4iLCJpbXBvcnQgbG9naW4gZnJvbSBcIi4vbG9naW5cIlxyXG5pbXBvcnQgbWVzc2FnZXNMaXN0IGZyb20gXCIuL21lc3NhZ2VzL21lc3NhZ2VzTGlzdFwiXHJcbmltcG9ydCBtZXNzYWdlc0Zvcm0gZnJvbSBcIi4vbWVzc2FnZXMvbWVzc2FnZXNGb3JtXCJcclxuXHJcbmxvZ2luLmNyZWF0ZUFuZEFwcGVuZExvZ2luSW5wdXQoKTtcclxubWVzc2FnZXNMaXN0LnBvc3RNZXNzYWdlKCk7XHJcbm1lc3NhZ2VzRm9ybS5jcmVhdGVBbmRBcHBlbmRGb3JtKCk7XHJcbiIsIi8vR2l2ZW4gYSBzaW5nbGUgbWVzc2FnZXMgb2JqZWN0LCB0aGlzIGNvbXBvbmVudCBidWlsZHMgb3V0IHRoZSBIVE1MIGFuZCByZXR1cm5zIGl0XHJcbmNvbnN0IG1lc3NhZ2VzID0ge1xyXG5cclxuICAvLyBUaGlzIG1ldGhvZCB0YWtlcyBvbmUgYXJndW1lbnQsIHdoaWNoIHdlIGV4cGVjdCB0byBiZSBhbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIGEgbWVzc2FnZSBhbmQgd2lsbCBoYXZlIHRoZSBmb2xsb3dpbmcgc3RydWN0dXJlOlxyXG4gIC8vIHtcclxuICAvLyAgIGlkOiBcImEgbnVtYmVyIHRoYXQgcmVwcmVzZW50cyB0aGUgcHJpbWFyeSBrZXkgb2YgdGhlIG1lc3NhZ2VzIG9iamVjdFwiLFxyXG4gIC8vICAgdGV4dDogXCJ0aGUgbWVzc2FnZSBpdHNlbGZcIixcclxuICAvLyAgIHVzZXJJZDogXCJwcmltYXJ5IGtleSBmcm9tIHVzZXIgb2JqZWN0XCJcclxuICAvLyAgIHRpbWVTdGFtcDogXCJNTS9ERC9ZWVlZLCBISDpNTTpTUyBBTS9QTVwiXHJcbiAgLy8gfVxyXG5cclxuICAvLyBHaXZlbiB0aGlzIG9iamVjdCwgdGhlIG1ldGhvZCB3aWxsIGJ1aWxkIEhUTUwgZWxlbWVudHMgYW5kIGFwcGVuZCB0aGVtIGFwcHJvcHJpYXRlbHkgc28gdGhhdCBpdCB3aWxsIGxvb2sgbGlrZSB0aGlzOlxyXG4gIC8vIDxhcnRpY2xlPlxyXG4gIC8vICAgPGg1PnVzZXJuYW1lPC9oNT5cclxuICAvLyAgIDxwPm1lc3NhZ2UgdGV4dDwvcD5cclxuICAvLyAgIDxwPnRpbWVzdGFtcDwvcD5cclxuICAvLyA8L2FydGljbGU+XHJcblxyXG4gIC8vIFRoaXMgSFRNTCBpcyB0aGVuIHJldHVybmVkIHRvIHRoZSBwb2ludCBmcm9tIHdoZXJlIHRoaXMgbWV0aG9kIHdhcyBjYWxsZWRcclxuICBtZXNzYWdlQnVpbGRlcihtZXNzYWdlT2JqZWN0KSB7XHJcbiAgICBsZXQgbWVzc2FnZUFydGljbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYXJ0aWNsZVwiKVxyXG4gICAgXHJcbiAgICBsZXQgbWVzc2FnZVVzZXJJZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoNVwiKVxyXG4gICAgbWVzc2FnZVVzZXJJZC50ZXh0Q29udGVudCA9IG1lc3NhZ2VPYmplY3QudXNlcklkXHJcblxyXG4gICAgbGV0IG1lc3NhZ2VUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIilcclxuICAgIG1lc3NhZ2VUZXh0LnRleHRDb250ZW50ID0gbWVzc2FnZU9iamVjdC50ZXh0XHJcblxyXG4gICAgbGV0IG1lc3NhZ2VUaW1lU3RhbXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKVxyXG4gICAgbWVzc2FnZVRpbWVTdGFtcC50ZXh0Q29udGVudCA9IG1lc3NhZ2VPYmplY3QudGltZVN0YW1wXHJcblxyXG4gICAgbWVzc2FnZUFydGljbGUuYXBwZW5kQ2hpbGQobWVzc2FnZVVzZXJJZClcclxuICAgIG1lc3NhZ2VBcnRpY2xlLmFwcGVuZENoaWxkKG1lc3NhZ2VUZXh0KVxyXG4gICAgbWVzc2FnZUFydGljbGUuYXBwZW5kQ2hpbGQobWVzc2FnZVRpbWVTdGFtcClcclxuXHJcbiAgICByZXR1cm4gbWVzc2FnZUFydGljbGVcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG1lc3NhZ2VzXHJcbiIsIi8vIENvbXBvbmVudCByZXNwb25zaWJsZSBmb3IgaW50ZXJhY3Rpbmcgd2l0aCB0aGUgQVBJLiBBbGwgZmV0Y2ggY2FsbHMgZm9yIHRoaXMgYXBwbGljYXRpb24gd2lsbCBiZSBkZWZpbmVkIGhlcmVcclxuXHJcbmNvbnN0IG1lc3NhZ2VzQ29sbGVjdGlvbiA9IHtcclxuICAvLyBUaGlzIG1ldGhvZCByZXR1cm5zIGEgZmV0Y2gsIHdoaWNoIG1lYW5zIGl0IGlzIHJldHVybmluZyBhIHByb21pc2UuIFdoaWNoIG1lYW5zIHRvIGFjY2VzcyB0aGUgcmVzcG9uc2UgZnJvbSB0aGUgYXN5bmNocm9ub3VzIEhUVFAgR0VUIHJlcXVlc3QgdGhhdCBpcyBiZWluZyBtYWRlIGJ5IHRoaXMgZmV0Y2gsIHdlIGNhbiBjaGFpbiBhIC50aGVuIGF0IHRoZSBwb2ludCB3aGVyZSB0aGlzIG1ldGhvZChnZXRBbGxNZXNzYWdlcykgaXMgY2FsbGVkLiBUaGUgLnRoZW4gdGhlbiBpcyBjaGFpbmVkIHRvIHRoZSBmZXRjaCBpbnNpZGUgdGhlIG1ldGhvZCBpcyBwYXJzaW5nIHRoZSBkYXRhIGZyb20gSlNPTiB0byBkYXRhIHN0cnVjdHVyZXMgSmF2YXNjcmlwdCB3aWxsIHVuZGVyc3RhbmQuIEluIHRoaXMgY2FzZSwgYmVjYXVzZSB3ZSBoYXZlIGEgY29sbGVjdGlvbiBvZiBtZXNzYWdlcywgaXQgd2lsbCBiZSBhbiBhcnJheSBvZiBvYmplY3RzLlxyXG4gIGdldEFsbE1lc3NhZ2VzKCkge1xyXG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L21lc3NhZ2VzXCIpXHJcbiAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgfSxcclxuXHJcbiAgLy8gVGhpcyBtZXRob2Qgd2lsbCBtYWtlIGEgSFRUUCBQT1NUIHJlcXVlc3QgdG8gdGhlIEFQSS4gQmVjYXVzZSBhIFBPU1QgaGFzIGEgYm9keSB3aXRoIHRoZSBkYXRhIGZvciB0aGUgbWVzc2FnZSwgdGhpcyBtZXRob2Qgd2lsbCB0YWtlIG9uZSBhcmd1bWVudCB3aGljaCB3aWxsIGJlIHRoZSBvYmplY3QgZm9yIHRoZSBuZXcgbWVzc2FnZSB3ZSB3YW50IHRvIGFkZCB0byBvdXIgY29sbGVjdGlvbiBpbiB0aGUgQVBJLlxyXG4gIHBvc3ROZXdNZXNzYWdlKG5ld01lc3NhZ2VUb1NhdmUpIHtcclxuICAgIC8vIFdlIHdhbnQgdG8gcmV0dXJuIHRoaXMgZmV0Y2ggcmVxdWVzdCBzbyB0aGF0IGF0IHRoZSBwb2ludCBpdCBpcyBjYWxsZWQsIHdlIGNhbiB0YWtlIGFkdmFudGFnZSBvZiB0aGUgYXN5bmNocm9ub3VzIG5hdHVyZSBvZiBwcm9taXNlcyB0byB3YWl0IGZvciB0aGlzIHRvIGJlIGRvbmUgYmVmb3JlIGdldHRpbmcgdGhlIGxhdGVzdCBkYXRhIGFuZCByZXJlbmRlcmluZyB0aGUgRE9NLlxyXG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L21lc3NhZ2VzXCIsIHtcclxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgfSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobmV3TWVzc2FnZVRvU2F2ZSlcclxuICAgIH0pXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBtZXNzYWdlc0NvbGxlY3Rpb25cclxuIiwiaW1wb3J0IG1lc3NhZ2VzQ29sbGVjdGlvbiBmcm9tIFwiLi9tZXNzYWdlc0NvbGxlY3Rpb25cIlxyXG5pbXBvcnQgbWVzc2FnZXNMaXN0IGZyb20gXCIuL21lc3NhZ2VzTGlzdFwiXHJcblxyXG5jb25zdCBtZXNzYWdlc0Zvcm0gPSB7XHJcblxyXG4gIC8vIFRoaXMgbW9kdWxlIHdpbGwgYnVpbGQgYSBmb3JtIGFuZCBhcHBlbmQgaXQgdG8gdGhlIERPTS4gVGhlIGZvcm0gd2lsbCBjb250YWluIGlucHV0IGZpZWxkcyBmb3IgYSB1c2VyIHRvIGFkZCBhIG1lc3NhZ2UgdG8gdGhlIHJvbGxpbmcgbWVzc2FnZSBib2FyZCBhbmQgYSBidXR0b24gd2l0aCBhbiBldmVudCBsaXN0ZW5lciB0aGF0IHdpbGwgbGlzdGVuIGZvciB0aGUgY2xpY2suXHJcbiAgY3JlYXRlQW5kQXBwZW5kRm9ybSAoKSB7XHJcbiAgICAvLyAxLiBCdWlsZCBIVE1MIGZvcm1cclxuICAgIGxldCBmb3JtSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpXHJcbiAgICBmb3JtSGVhZGVyLnRleHRDb250ZW50ID0gXCJQb3N0IGEgTWVzc2FnZVwiXHJcblxyXG4gICAgbGV0IG1lc3NhZ2VGaWVsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmaWVsZHNldFwiKVxyXG5cclxuICAgIGxldCBtZXNzYWdlTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIilcclxuICAgIG1lc3NhZ2VMYWJlbC50ZXh0Q29udGVudCA9IFwiTWVzc2FnZVwiXHJcbiAgICBtZXNzYWdlTGFiZWwuc2V0QXR0cmlidXRlKFwiZm9yXCIsIFwibWVzc2FnZVwiKVxyXG4gICAgbGV0IG1lc3NhZ2VJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKVxyXG4gICAgbWVzc2FnZUlucHV0LnNldEF0dHJpYnV0ZShcImlkXCIsIFwibWVzc2FnZVwiKVxyXG4gICAgbWVzc2FnZUlucHV0LnNldEF0dHJpYnV0ZShcIm5hbWVcIiwgXCJtZXNzYWdlXCIpXHJcblxyXG4gICAgbWVzc2FnZUZpZWxkLmFwcGVuZENoaWxkKG1lc3NhZ2VMYWJlbClcclxuICAgIG1lc3NhZ2VGaWVsZC5hcHBlbmRDaGlsZChtZXNzYWdlSW5wdXQpXHJcbiAgICBcclxuICAgIGxldCBwb3N0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKVxyXG4gICAgcG9zdEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiUG9zdCBNZXNzYWdlXCJcclxuICAgIHBvc3RCdXR0b24uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJtZXNzYWdlX19wb3N0XCIpXHJcblxyXG4gICAgLy8gMi4gQXR0YWNoIGV2ZW50IGxpc3RlbmVyIHRvIGJ1dHRvbiBpbiBmb3JtXHJcbiAgICBwb3N0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmhhbmRsZUFkZE5ld01lc3NhZ2UpXHJcblxyXG4gICAgLy8gMy4gQXBwZW5kIHRoZSBIVE1MIGZvcm0gdG8gdGhlIERPTVxyXG4gICAgLy9Ob3RpY2UgdGhhdCBJIGhhdmUgYWRkZWQgYW4gYXJ0aWNsZSBlbGVtZW50IHRvIG15IGluZGV4Lmh0bWwgd2l0aCB0aGUgY2xhc3MgXCJmb3JtXCIuXHJcbiAgICBsZXQgbWVzc2FnZUZvcm1GcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxyXG4gICAgbWVzc2FnZUZvcm1GcmFnbWVudC5hcHBlbmRDaGlsZChmb3JtSGVhZGVyKVxyXG4gICAgbWVzc2FnZUZvcm1GcmFnbWVudC5hcHBlbmRDaGlsZChtZXNzYWdlRmllbGQpXHJcbiAgICBtZXNzYWdlRm9ybUZyYWdtZW50LmFwcGVuZENoaWxkKHBvc3RCdXR0b24pXHJcblxyXG4gICAgbGV0IGZvcm1BcnRpY2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb3JtX19tZXNzYWdlc1wiKTtcclxuICAgIGZvcm1BcnRpY2xlLmFwcGVuZENoaWxkKG1lc3NhZ2VGb3JtRnJhZ21lbnQpO1xyXG5cclxuICB9LFxyXG4gIC8vIFRoaXMgbW9kdWxlIHdpbGwgYWxzbyBjb250YWluIHRoZSBmdW5jdGlvbiB0aGF0IGV4ZWN1dGVzIHdoZW4gdGhlIGJ1dHRvbiBpbiB0aGUgZm9ybSBpcyBjbGlja2VkLiBXaGVuIHRoZSBidXR0b24gaW4gdGhlIGZvcm0gaXMgY2xpY2tlZCwgdGhlIGZvbGxvd2luZyB3aWxsIGhhcHBlbjpcclxuICBoYW5kbGVBZGROZXdNZXNzYWdlIChldmVudCkge1xyXG4gICAgLy8gMS4gR2V0IHVzZXIgaW5wdXQgdGhhdCB1c2VyIGVudGVyZWRcclxuICAgIGxldCBpbnB1dE1lc3NhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21lc3NhZ2VcIikudmFsdWVcclxuICAgIGxldCBtZXNzYWdlVGltZVN0YW1wID0gbmV3IERhdGUoKS50b0xvY2FsZVN0cmluZygpO1xyXG5cclxuICAgIC8vIDIuIENyZWF0ZSBhIG5ldyBvYmplY3Qgd2l0aCB0aGUgc2FtZSBzdHJ1Y3R1cmUgd2UgaGF2ZSBiZWVuIHVzaW5nIHRocm91Z2hvdXQgdGhlIGFwcGxpY2F0aW9uIHRvIHJlcHJlc2VudCBhIG1lc3NhZ2U6XHJcbiAgICAvLyB7XHJcbiAgICAvLyAgIGlkOiBcImEgbnVtYmVyIHRoYXQgcmVwcmVzZW50cyB0aGUgcHJpbWFyeSBrZXkgb2YgdGhlIG1lc3NhZ2VzIG9iamVjdFwiLFxyXG4gICAgLy8gICB0ZXh0OiBcInRoZSBtZXNzYWdlIGl0c2VsZlwiLFxyXG4gICAgLy8gICB1c2VySWQ6IFwicHJpbWFyeSBrZXkgZnJvbSB1c2VyIG9iamVjdFwiXHJcbiAgICAvLyAgIHRpbWVTdGFtcDogXCJNTS9ERC9ZWVlZLCBISDpNTTpTUyBBTS9QTVwiXHJcbiAgICAvLyB9XHJcblxyXG4gICAgbGV0IG5ld01lc3NhZ2UgPSB7XHJcbiAgICAgIHRleHQ6IGlucHV0TWVzc2FnZSxcclxuICAgICAgdGltZVN0YW1wOiBtZXNzYWdlVGltZVN0YW1wLFxyXG4gICAgICB1c2VySWQ6IFwicGxhY2Vob2xkZXJcIlxyXG4gICAgfVxyXG5cclxuICAgIC8vIDMuIENhbGwgdGhlIG1ldGhvZChwb3N0TmV3TWVzc2FnZSkgd2l0aCB0aGUgZmV0Y2ggcmVxdWVzdCB0byBQT1NUIHRvIHRoZSBBUEkgYW5kIHBhc3MgaXQgdGhlIG9iamVjdCB3ZSBjcmVhdGVkIGluIHRoZSBwcmV2aW91cyBzdGVwXHJcblxyXG4gICAgLy8gTm90aWNlIHRoZSBpbXBvcnQgc3RhdGVtZW50IGF0IHRoZSB0b3Agb2YgdGhlIG1vZHVsZSBzbyBJIGNhbiBjYWxsIGEgbWV0aG9kIGluIHRoZSBtZXNzYWdlc0NvbGxlY3Rpb24gbW9kdWxlLlxyXG5cclxuICAgIC8vICoqKioqSU1QT1JUQU5UKioqKipcclxuICAgIC8vIFlvdSB3aWxsIG5vdGljZSBhdCB0aGlzIHBvaW50IHRoYXQgd2hpbGUgYSBuZXcgbWVzc2FnZSBpcyBiZWluZyBhZGRlZCB0byBvdXIgQVBJLCB1bmxlc3MgeW91IHJlZnJlc2ggdGhlIGFwcGxpY2F0aW9uLCB0aGUgbmV3bHkgYWRkZWQgbWVzc2FnZSB3aWxsIG5vdCBzaG93IHVwIG9uIHRoZSBET00uIFdlIGRlZmluaXRlbHkgZG8gbm90IHdhbnQgb3VyIHVzZXIgdG8gaGF2ZSB0byBoaXQgcmVmcmVzaCBldmVyeSB0aW1lIHRoZXkgYWRkIG5ldyBtZXNzYWdlLlxyXG5cclxuICAgIC8vIFdlIGFsc28gZG8gTk9UIHdhbnQgdG8gbWFudWFsbHkgYWRkIG91ciBuZXcgbWVzc2FnZSB0byB0aGUgbGlzdCBvZiBtZXNzYWdlcyBvbiB0aGUgRE9NLiBJbnN0ZWFkLCB3ZSB3YW50IG91ciBkYXRhIHRvIGJlIG91ciBwb2ludCBvZiB0cnV0aC4gT3VyIERPTSBzaG91bGQgYWx3YXlzIHVzZSB0aGUgZGF0YSBmcm9tIG91ciBBUEkgdG8gcmVuZGVyIHRoZSBET00uIExvZ2ljYWxseSwgaGVyZSBhcmUgdGhlIHN0ZXBzIHdlIHdhbnQgdG8gdGFrZSBwbGFjZS5cclxuICAgIC8vIDEuIEFkZCBuZXcgbWVzc2FnZSB0byB0aGUgQVBJIHVzaW5nIGEgUE9TVCBIVFRQIHJlcXVlc3QuXHJcbiAgICAvLyAgICAgV2UgYXJlIGFscmVhZHkgZG9pbmcgdGhpcy4gV2UgYXJlIHVzaW5nIHRoZSBmZXRjaCBkZWZpbmVkIGluIHRoZSBtZXNzYWdlc0NvbGxlY3Rpb24gbW9kdWxlIHRvIGFkZCBhIG5ldyBtZXNzYWdlIG9iamVjdCB0byB0aGUgQVBJLlxyXG4gICAgLy8gMi4gQWZ0ZXIgdGhlIG5ldyBtZXNzYWdlIGhhcyBiZWVuIGFkZGVkLCB3ZSB3YW50IHRvIGdldCBhIGxpc3Qgb2YgYWxsIG1lc3NhZ2VzICh1c2luZyBhIEdFVCBIVFRQIHJlcXVlc3QpIGFuZCByZW5kZXIgdGhlbSB0byB0aGUgRE9NLlxyXG4gICAgICAgICAgLy8gQmVjYXVzZSB3ZSB3YW50IHRvIG1ha2Ugc3VyZSB3ZSBvbmx5IGRvIHRoaXMgYWZ0ZXIgdGhlIGZpcnN0IHN0ZXAgaXMgZG9uZSwgd2Ugd2lsbCByZXR1cm4gdGhlIGZldGNoIGNhbGwgdGhhdCBpcyBkb2luZyB0aGUgUE9TVCBhbmQgY2hhaW4gYSAudGhlbiB0byB0aGUgY2FsbCAoanVzdCBsaWtlIHdlIGRvIHdpdGggdGhlIEdFVCkuIFRoaXMgbWVhbnMgd2UgYXJlIGRvaW5nIHRoZSBQT1NUIGFuZCB0aGVuIHdhaXRpbmcgdW50aWwgYSByZXNwb25zZSBjb21lcyBiYWNrIGJlZm9yZSBkb2luZyB0aGlzIHN0ZXAuIFRoZSByZWFzb24gd2Ugd2FudCB0byB3YWl0IGlzIGJlY2F1c2Ugd2Ugd2FudCB0byBiZSBzdXJlIHRoYXQgd2hlbiB3ZSBhc2sgb3VyIEFQSSBmb3IgdGhlIGxpc3Qgb2YgbWVzc2FnZXMsIHRoZSBuZXdseSBhZGRlZCBtZXNzYWdlIGlzIG9uIHRoYXQgbGlzdC4gU28gd2Ugd2FpdCB1bnRpbCBpdCBoYXMgYmVlbiBhZGRlZCBiZWZvcmUgdXNpbmcgYSBHRVQgcmVxdWVzdCB0byBnZXQgYSBsaXN0IG9mIGFsbCBtZXNzYWdlcyBhbmQgcmVuZGVyaW5nIHRoZW0gdG8gdGhlIERPTS5cclxuICAgICAgICAgIFxyXG4gICAgICAgICAgLy8gQnV0IHRoYXQgc291bmRzIGF3ZnVsbHkgZmFtaWxpYXI6IG1ha2UgYSBHRVQgSFRUUCByZXF1ZXN0IHRvIHRoZSBBUEkgZm9yIGEgbGlzdCBvZiBhbGwgbWVzc2FnZXMsIGl0ZXJhdGUgb3ZlciB0aGF0IGxpc3QgYW5kIGJ1aWxkIHRoZSBIVE1MIGZvciBlYWNoIG1lc3NhZ2UsIGFwcGVuZCB0aGUgSFRNTCB0byB0aGUgRE9NLiBUaGlzIGlzIGV4YWN0bHkgd2hhdCBvdXIgcG9zdE1lc3NhZ2UgbWV0aG9kIGluIG91ciBtZXNzYWdlc0xpc3QgbW9kdWxlIGlzIGFscmVhZHkgZG9pbmcuIFdoaWNoIG1lYW5zIEkgY2FuIHNpbXBseSBjYWxsIHRoYXQgbWV0aG9kIGZyb20gaGVyZS4gT25jZSBhZ2Fpbiwgbm90ZSB0aGF0IEkgYW0gaW1wb3J0aW5nIHRoZSBhcHByb3ByaWF0ZSBtb2R1bGUgYXQgdGhlIHRvcCBvZiB0aGlzIGZpbGUuXHJcbiAgICAvLyBUbyBzdW1tYXJpemUsIHdlIGFyZSBhZGRpbmcgYSBtZXNzYWdlIHRvIHRoZSBBUEksIHRoZW4gZ2V0dGluZyBhbiB1cGRhdGVkIGxpc3Qgb2YgbWVzc2FnZXMgZnJvbSB0aGUgQVBJIGFuZCByZXJlbmRlcmluZyB0aGUgRE9NLlxyXG4gICAgLy8gKioqKioqKioqKioqKioqKioqKlxyXG4gICAgbWVzc2FnZXNDb2xsZWN0aW9uLnBvc3ROZXdNZXNzYWdlKG5ld01lc3NhZ2UpXHJcbiAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgIG1lc3NhZ2VzTGlzdC5wb3N0TWVzc2FnZSgpXHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbWVzc2FnZXNGb3JtXHJcbiIsIi8vIFRoaXMgY29tcG9uZW50IHdpbGwgZ2V0IHRoZSBkYXRhLCBidWlsZCB0aGUgSFRNTCBmcm9tIHRoZSBkYXRhIGFuZCBhcHBlbmQgaXQgdG8gdGhlIERPTS5cclxuXHJcbi8vIFRoZSBtZXNzYWdlQ29sbGVjdGlvbiBjb21wb25lbnQgZ2V0cyB0aGUgZGF0YS5cclxuaW1wb3J0IG1lc3NhZ2VzQ29sbGVjdGlvbiBmcm9tIFwiLi9tZXNzYWdlc0NvbGxlY3Rpb25cIlxyXG4vLyBUbyBidWlsZCB0aGUgSFRNTCBmb3IgZWFjaCBvYmplY3QgaW4gdGhlIG1lc3NhZ2VzIGFycmF5ICh3aGljaCBpcyB3aGF0IHRoZSBkYXRhIGNvbWluZyBmcm9tIHRoZSBBUEkgYmVjb21lcyBvbmNlIHdlIHBhcnNlIGl0KSwgd2Ugd2lsbCB1c2UgdGhlIG1lc3NhZ2VzIGNvbXBvbmVudC5cclxuaW1wb3J0IG1lc3NhZ2VzIGZyb20gXCIuL21lc3NhZ2VzXCJcclxuXHJcbmNvbnN0IG1lc3NhZ2VzTGlzdCA9IHtcclxuICBwb3N0TWVzc2FnZSgpe1xyXG4gICAgLy8gMS4gR2V0IGRhdGFcclxuICAgIC8vIFRoZSBnZXRBbGxNZXNzYWdlcyBtZXRob2Qgd2lsbCBkbyBhIGZldGNoIGFuZCByZXR1cm4gYSBwcm9taXNlLiBUaGlzIGNhbGwgd2lsbCByZXR1cm4gdGhlIGRhdGEgZnJvbSB0aGUgQVBJIGluIHRoZSByZXNwb25zZS5cclxuICAgIG1lc3NhZ2VzQ29sbGVjdGlvbi5nZXRBbGxNZXNzYWdlcygpXHJcbiAgICAudGhlbihhbGxNZXNzYWdlcyA9PiB7XHJcblxyXG4gICAgICAvLyBBbiBlbXB0eSBkb2N1bWVudCBmcmFnbWVudFxyXG4gICAgICBsZXQgbWVzc2FnZURvY0ZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpXHJcblxyXG4gICAgICAvLyAyLiBJdGVyYXRlIG92ZXIgZGF0YSBhbmQgYnVpbGQgSFRNTCBmb3IgZWFjaCBtZXNzYWdlXHJcbiAgICAgIC8vIFdlIGxvb3Agb3ZlciB0aGUgYXJyYXkgb2Ygb2JqZWN0cyByZXR1cm5lZCBmcm9tIG91ciBBUEkgYW5kIGZvciBlYWNoIG9iZWN0LCB3ZSBtYWtlIGEgY2FsbCB0byB0aGUgbWVzc2FnZUJ1aWxkZXIgbWV0aG9kIGluIHRoZSBtZXNzYWdlcyBtb2R1bGUuIFRoaXMgbWV0aG9kIHRha2VzIGEgbWVzc2FnZSBvYmplY3QgYXMgYW4gYXJndW1lbnQgYW5kIHJldHVybnMgYW4gSFRNTCBjb21wb25lbnQuIE9uY2Ugd2UgaGF2ZSB0aGF0IEhUTUwsIHdlIGFwcGVuZCBpdCB0byBvdXIgZG9jdW1lbnQgZnJhZ21lbnQgc28gdGhhdCBpdCBpcyBzbG93bHkgYnVpbHQgdXAuIEJ5IHRoZSBlbmQgb2YgdGhlIGZvckVhY2ggbG9vcCwgb3VyIGRvY3VtZW50IGZyYWdtZW50IGNvbnRhaW5zIGFsbCB0aGUgSFRNTCBmb3IgYWxsIG91ciBkYXRhLlxyXG4gICAgICBhbGxNZXNzYWdlcy5mb3JFYWNoKG1lc3NhZ2UgPT4ge1xyXG4gICAgICAgIGxldCBtZXNzYWdlSHRtbCA9IG1lc3NhZ2VzLm1lc3NhZ2VCdWlsZGVyKG1lc3NhZ2UpXHJcbiAgICAgICAgbWVzc2FnZURvY0ZyYWdtZW50LmFwcGVuZENoaWxkKG1lc3NhZ2VIdG1sKVxyXG4gICAgICB9KVxyXG4gICAgICBcclxuICAgICAgLy8gMy4gQXBwZW5kIHRoZSBIVE1MIHRvIHRoZSBET01cclxuICAgICAgLy8gV2UgZ2V0IGEgcmVmZXJlbmNlIHRvIGEgSFRNTCBlbGVtZW50IHdpdGggdGhlIGNsYXNzIFwib3V0cHV0X19tZXNzYWdlc1wiIGFuZCBhcHBlbmQgb3VyIGRvY3VtZW50IGZyYWdtZW50IHRvIHRoYXQgZWxlbWVudC4gQmVjYXVzZSB0aGUgSFRNTCBlbGVtZW50IHdpdGggY2xhc3MgXCJvdXRwdXRfX21lc3NhZ2VzXCIgaXMgYWxyZWFkeSBvbiB0aGUgRE9NLCB0aGUgSFRNTCBpbiB0aGUgZG9jdW1lbnQgZnJhZ21lbnQgaXMgYXBwZW5kZWQgdG8gdGhlIERPTS5cclxuICAgICAgbGV0IG91dHB1dEFydGljbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm91dHB1dF9fbWVzc2FnZXNcIilcclxuXHJcbiAgICAgIC8vVGhpcyB3aGlsZSBsb29wIGVzc2VudGlhbGx5IHJlbW92ZXMgYWxsIGNoaWxkIG5vZGVzIG9mIGFuIGVsZW1lbnQgdW50aWwgdGhlIGVsZW1lbnQgaGFzIG5vIGNoaWxkIG5vZGVzIGxlZnQuIEl0IGlzIGVxdWl2YWxlbnQgdG8gdGhlIGZvbGxvd2luZzpcclxuICAgICAgLy8gb3V0cHV0QXJ0aWNsZS5pbm5lckhUTUwgPSBcIlwiXHJcblxyXG4gICAgICAvLyBJZiB3ZSBkbyBub3QgZG8gdGhpcywgZWFjaCB0aW1lIHdlIGFkZCBhIG5ldyBtZXNzYWdlIHVzaW5nIG91ciBmb3JtLCBhbGwgdGhlIG1lc3NhZ2VzIHdpbGwgYmUgYXBwZW5kZWQgdG8gdGhlIGJvdHRvbSBvZiBvdXIgbGlzdCBzbyB0aGF0IHdlIHdpbGwgaGF2ZSBkdXBsaWNhdGVzLiBFc3NlbnRpYWxseSwgd2UgYXJlIGNsZWFyaW5nIG91dCBvdXIgb3V0cHV0IGNvbnRhaW5lciAob3VyIGFydGljbGUgdGFnIHdpdGggY2xhc3MgXCJvdXRwdXRcIikgc28gdGhhdCB3ZSByZXBvcHVsYXRlIGl0LlxyXG4gICAgICB3aGlsZSAob3V0cHV0QXJ0aWNsZS5maXJzdENoaWxkKSB7XHJcbiAgICAgICAgb3V0cHV0QXJ0aWNsZS5yZW1vdmVDaGlsZChvdXRwdXRBcnRpY2xlLmZpcnN0Q2hpbGQpO1xyXG4gICAgICB9XHJcbiAgICAgIG91dHB1dEFydGljbGUuYXBwZW5kQ2hpbGQobWVzc2FnZURvY0ZyYWdtZW50KVxyXG5cclxuICAgIH0pXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBtZXNzYWdlc0xpc3RcclxuIl19
