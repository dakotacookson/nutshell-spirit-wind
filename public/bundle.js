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
//Given a single food object, this component builds out the HTML and returns it
const messages = {
  // This method takes one argument, which we expect to be an object that represents a food and will have the following structure:
  // {
  //   name: "name value",
  //   expiration: "expiration value",
  //   type: "type value"
  // }
  // Given this object, the method will build HTML elements and append them appropriately so that it will look like this:
  // <article>
  //   <h3>name value</h3>
  //   <p>expiration value</p>
  //   <p>type value</p>
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
  // This method returns a fetch, which means it is returning a promise. Which means to access the response from the asynchronous HTTP GET request that is being made by this fetch, we can chain a .then at the point where this method(getAllFoods) is called. The .then then is chained to the fetch inside the method is parsing the data from JSON to data structures Javascript will understand. In this case, because we have a collection of items, it will be an array of objects.
  getAllMessages() {
    return fetch("http://localhost:8088/messages").then(response => response.json());
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
  // This module will build a form and append it to the DOM. The form will contain input fields for a user to add a new food to their refrigerator and a button with an event listener that will listen for the click
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
    let formArticle = document.querySelector(".form");
    formArticle.appendChild(messageFormFragment);
  },

  // This module will also contain the function that executes when the button in the form is clicked. When the button in the form is clicked, the following will happen:
  handleAddNewMessage(event) {
    // 1. Get user input that user entered
    let inputMessage = document.querySelector("#message").value;
    let messageTimeStamp = new Date().toLocaleString(); // 2. Create a new object with the same structure we have been using throughout the application to represent a food item:
    // {
    //   name: "user input name",
    //   expiration: "user input expiration",
    //   type: "user input type"
    // }

    let newMessage = {
      text: inputMessage,
      timeStamp: messageTimeStamp,
      userId: "placeholder" // 3. Call the method(postNewFood) with the fetch request to POST to the API and pass it the object we created in the previous step
      // Notice the import statement at the top of the module so I can call a method in the foodCollection module.
      // *****IMPORTANT*****
      // You will notice at this point that while a new food item is being added to our API, unless you refresh the application, the newly added item will not show up on the DOM. We definitely do not want our user to have to hit refresh every time they add new food to their refrigerator.
      // We also do NOT want to manually add our new food item to the list of food on the DOM. Instead, we want our data to be our point of truth. Our DOM should always use the data from our API to render the DOM. Logically, here are the steps we want to take place.
      // 1. Add new food item to the API using a POST HTTP request.
      //     We are already doing this. We are using the fetch defined in the foodCollection module to add a new food item to the API.
      // 2. After the new item has been added, we want to get a list of all the food items (using a GET HTTP request) and render them to the DOM.
      // Because we want to make sure we only do this after the first step is done, we will return the fetch call that is doing the POST and chain a .then to the call (just like we do with the GET). This means we are doing the POST and then waiting until a response comes back before doing this step. The reason we want to wait is because we want to be sure that when we ask our API for the list of food items, the newly added item is on that list. So we wait until it has been added before using a GET request to get a list of all food items and rendering them to the DOM.
      // But that sounds awfully familiar: make a GET HTTP request to the API for a list of all food items, iterate over that list and build the HTML for each item, append the HTML to the DOM. This is exactly what our fridgify method in our foodList module is already doing. Which means I can simply call that method from here. Once again, note that I am importing the appropriate module at the top of this file.
      // To summarize, we are adding a new item to the API, then getting an updated list of items from the API and rerendering the DOM.
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
// To get the data, we will use the foodCollection component.
// To build the HTML for each object in the messages array (which is what the data coming from the API becomes once we parse it), we will use the messages component.
const messagesList = {
  postMessage() {
    // 1. Get data
    // The getAllMessages method will do a fetch and return a promise. This call will return the data from the API in the response.
    _messagesCollection.default.getAllMessages().then(allMessages => {
      // An empty document fragment
      let messageDocFragment = document.createDocumentFragment(); // 2. Iterate over data and build HTML for each item
      // We loop over the array of objects returned from our API and for each obect, we make a call to the messageBuilder method in the messages module. This method takes a food object as an argument and returns an HTML component. Once we have that HTML, we append it to our document fragment so that it is slowly built up. By the end of the forEach loop, our document fragment contains all the HTML for all our data.

      allMessages.forEach(messageItem => {
        let messageHtml = _messages.default.messageBuilder(messageItem);

        messageDocFragment.appendChild(messageHtml);
      }); // 3. Append the HTML to the DOM
      // We get a reference to a HTML element with the class "output" and append our document fragment to that element. Because the HTML element with class "output" is already on the DOM, the HTML in the document fragment is appended to the DOM.

      let outputArticle = document.querySelector(".output"); //This while loop essentially removes all child nodes of an element until the element has no child nodes left. It is equivalent to the following:
      // outputArticle.innerHTML = ""
      // If we do not do this, each time we add a new message using our form, all the messages will be appended to the bottom of our list so that we will have duplicates. To understand why this while loop is needed, try commenting it out and observe the behavior of the application. Essentially, we are clearing out our output container (our article tag with class "output") so that we repopulate it.

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2FwaS5qcyIsIi4uL3NjcmlwdHMvbG9naW4uanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL21lc3NhZ2VzL21lc3NhZ2VzLmpzIiwiLi4vc2NyaXB0cy9tZXNzYWdlcy9tZXNzYWdlc0NvbGxlY3Rpb24uanMiLCIuLi9zY3JpcHRzL21lc3NhZ2VzL21lc3NhZ2VzRm9ybS5qcyIsIi4uL3NjcmlwdHMvbWVzc2FnZXMvbWVzc2FnZXNMaXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDQUEsTUFBTSxHQUFHLEdBQUc7QUFFUixFQUFBLE9BQU8sQ0FBQyxRQUFELEVBQVc7QUFDZCxXQUFPLEtBQUssQ0FBRSx5QkFBd0IsUUFBUyxFQUFuQyxDQUFMLENBQ04sSUFETSxDQUNELFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBVCxFQURYLENBQVA7QUFFSDs7QUFMTyxDQUFaLEMsQ0FTQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTs7ZUFFZSxHOzs7Ozs7Ozs7OztBQ25GZjs7OztBQUNBLE1BQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLE9BQXZCLENBQXRCO0FBQ0EsTUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FB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Y2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IEFQSSA9IHtcclxuXHJcbiAgICBnZXREYXRhKHJlc291cmNlKSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvJHtyZXNvdXJjZX1gKVxyXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgIH0sXHJcblxyXG59XHJcblxyXG4vLyAgICAgZ2V0QWxsVXNlcnMoKSB7XHJcbi8vICAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L3VzZXJzXCIpXHJcbi8vICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4vLyAgICAgICB9LFxyXG5cclxuLy8gICAgIGdldEFsbE1lc3NhZ2VzKCkge1xyXG4vLyAgICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9tZXNzYWdlc1wiKVxyXG4vLyAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24pXHJcbi8vICAgICAgIH0sXHJcblxyXG4vLyAgICAgZ2V0QWxsTmV3c0FydGljbGVzKCkge1xyXG4vLyAgICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9uZXdzQXJ0aWNsZXNcIilcclxuLy8gICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbi8vICAgICAgIH0sXHJcblxyXG4vLyAgICAgZ2V0QWxsVGFza3MoKSB7XHJcbi8vICAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L3Rhc2tzXCIpXHJcbi8vICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4vLyAgICAgICB9LFxyXG5cclxuLy8gICAgIGdldEFsbEV2ZW50cygpIHtcclxuLy8gICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvZXZlbnRzXCIpXHJcbi8vICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4vLyAgICAgICB9LFxyXG5cclxuLy8gICAgIGdldEFsbEZyaWVuZHMoKSB7XHJcbi8vICAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2ZyaWVuZHNcIilcclxuLy8gICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbi8vICAgICAgIH0sXHJcblxyXG5cclxuLy8gICAgIHBvc3ROZXdVc2VyKG5ld1VzZXJUb0FkZCkge1xyXG4vLyAgICAgZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvdXNlcnNcIiwge1xyXG4vLyAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbi8vICAgICAgICAgaGVhZGVyczoge1xyXG4vLyAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4vLyAgICAgICAgIH0sXHJcbi8vICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobmV3VXNlclRvQWRkKVxyXG4vLyAgICAgfSlcclxuLy8gICAgIH0sXHJcblxyXG4vLyAgICAgcG9zdE5ld01lc3NhZ2UobmV3TWVzc2FnZVRvQWRkKSB7XHJcbi8vICAgICAgICAgZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvbWVzc2FnZXNcIiwge1xyXG4vLyAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4vLyAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbi8vICAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4vLyAgICAgICAgICAgICB9LFxyXG4vLyAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShuZXdNZXNzYWdlVG9BZGQpXHJcbi8vICAgICB9KVxyXG4vLyAgICAgfSxcclxuXHJcbi8vICAgICBwb3N0TmV3TmV3c0FydGljbGUobmV3TmV3c0FydGljbGVUb0FkZCkge1xyXG4vLyAgICAgZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvbmV3c0FydGljbGVzXCIsIHtcclxuLy8gICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4vLyAgICAgICAgIGhlYWRlcnM6IHtcclxuLy8gICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuLy8gICAgICAgICB9LFxyXG4vLyAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5ld05ld3NBcnRpY2xlVG9BZGQpXHJcbi8vICAgICB9KVxyXG4vLyAgICAgfSxcclxuXHJcbi8vICAgICBwb3N0TmV3VGFzayhuZXdUYXNrVG9BZGQpIHtcclxuLy8gICAgICAgICBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC90YXNrc1wiLCB7XHJcbi8vICAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbi8vICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuLy8gICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbi8vICAgICAgICAgICAgIH0sXHJcbi8vICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5ld1Rhc2tUb0FkZClcclxuLy8gICAgIH0pXHJcbi8vICAgICB9LFxyXG5cclxuXHJcbi8vIH1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFQSSIsImltcG9ydCBBUEkgZnJvbSBcIi4vYXBpXCJcclxuY29uc3QgdXNlck5hbWVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuY29uc3QgcGFzc3dvcmRJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuXHJcbmNvbnN0IGxvZ2luID0ge1xyXG4vLyBGdW5jdGlvbiB0byBjcmVhdGUgYW5kIGFwcGVuZCBsb2dpbiBpbnB1dCBmaWVsZHMgYW5kIGxvZ2luIGJ1dHRvbi5cclxuICAgIGNyZWF0ZUFuZEFwcGVuZExvZ2luSW5wdXQoKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IG91dEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vdXRwdXRfX2xvZ2luXCIpO1xyXG4gICAgICAgIHVzZXJOYW1lSW5wdXQudHlwZSA9IFwidGV4dFwiO1xyXG4gICAgICAgIHVzZXJOYW1lSW5wdXQucGxhY2Vob2xkZXIgPSBcInVzZXJuYW1lXCI7XHJcbiAgICAgICAgcGFzc3dvcmRJbnB1dC50eXBlID0gXCJwYXNzd29yZFwiO1xyXG4gICAgICAgIHBhc3N3b3JkSW5wdXQucGxhY2Vob2xkZXIgPSBcInBhc3N3b3JkXCI7XHJcbiAgICAgICAgb3V0RWwuYXBwZW5kQ2hpbGQodXNlck5hbWVJbnB1dCk7XHJcbiAgICAgICAgb3V0RWwuYXBwZW5kQ2hpbGQocGFzc3dvcmRJbnB1dCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGxvZ2luQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgICAgICBsb2dpbkJ1dHRvbi50ZXh0Q29udGVudCA9IChcImxvZ2luXCIpO1xyXG4gICAgICAgIG91dEVsLmFwcGVuZENoaWxkKGxvZ2luQnV0dG9uKTtcclxuLy8gUnVucyB0aGUgZ2V0VXNlckRhdGEoKSBmdW5jdGlvbiB3aGVuIExvZ2luIGJ1dHRvbiBpcyBjbGlja2VkLlxyXG4gICAgICAgIGxvZ2luQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmdldFVzZXJEYXRhKTtcclxuICAgIH0sXHJcbi8vIEdhdGhlcnMgZGF0YSBlbnRlcmVkIGludG8gTG9naW4gaW5wdXQgZmllbGRzLiBGZXRjaGVzIHVzZXJkYXRhIGZyb20gQVBJIGFuZCBjb21wYXJlcyBpbnB1dCBkYXRhIHdpdGggZXhpc3RpbmcgdXNlciBkYXRhIGluIEFQSS4gSWYgaW5wdXQgZGF0YSBtYXRjaGVzIHVzZXIgZGF0YSBpbiBBUEksIHJ1bnMgbG9hZFVzZXJTcGVjaWZpY1BhZ2UoKS4gSWYgaW5wdXQgZGF0YSBkb2VzIG5vdCBtYXRjaCBhbnkgdXNlciBkYXRhIGluIEFQSSwgYWxlcnQgaXMgc2VudC5cclxuICAgIGdldFVzZXJEYXRhICgpIHtcclxuICAgICAgICBjb25zdCB1c2VybmFtZSA9IHVzZXJOYW1lSW5wdXQudmFsdWU7XHJcbiAgICAgICAgY29uc3QgcGFzc3dvcmQgPSBwYXNzd29yZElucHV0LnZhbHVlO1xyXG4gICAgICAgIEFQSS5nZXREYXRhKFwidXNlcnNcIilcclxuICAgICAgICAudGhlbihhbGxVc2VycyA9PiB7XHJcbiAgICAgICAgICAgIGFsbFVzZXJzLmZvckVhY2godXNlciA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHVzZXJuYW1lID09PSB1c2VyLnVzZXJOYW1lICYmIHBhc3N3b3JkID09PSB1c2VyLnBhc3N3b3JkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFRoaXMgb25lOiAke3VzZXIuaWR9YClcclxuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCd1c2VySWQnLCB1c2VyLmlkKVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB1c2VySWQgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd1c2VySWQnKTtcclxuICAgICAgICAgICAgICAgICAgICBsb2FkVXNlclNwZWNpZmljUGFnZSh1c2VySWQpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChcIlVzZXJuYW1lL3Bhc3N3b3JkIGludmFsaWQuIElmIG5ldyB1c2VyLCBwbGVhc2UgcmVnaXN0ZXIuIDopXCIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBsb2FkVXNlclNwZWNpZmljUGFnZSh1c2VySWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgVGhpcyBpcyB0aGUgdXNlciBwYWdlISAke3VzZXJJZH1gKTtcclxuICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgXHJcbiAgICAgICAgfSlcclxuICAgICAgICBcclxuICAgICB9LCAgICAgXHJcbiAgICBcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbG9naW4iLCJpbXBvcnQgbG9naW4gZnJvbSBcIi4vbG9naW5cIlxyXG5pbXBvcnQgbWVzc2FnZXNMaXN0IGZyb20gXCIuL21lc3NhZ2VzL21lc3NhZ2VzTGlzdFwiXHJcbmltcG9ydCBtZXNzYWdlc0Zvcm0gZnJvbSBcIi4vbWVzc2FnZXMvbWVzc2FnZXNGb3JtXCJcclxuXHJcbmxvZ2luLmNyZWF0ZUFuZEFwcGVuZExvZ2luSW5wdXQoKTtcclxubWVzc2FnZXNMaXN0LnBvc3RNZXNzYWdlKCk7XHJcbm1lc3NhZ2VzRm9ybS5jcmVhdGVBbmRBcHBlbmRGb3JtKCk7XHJcbiIsIi8vR2l2ZW4gYSBzaW5nbGUgZm9vZCBvYmplY3QsIHRoaXMgY29tcG9uZW50IGJ1aWxkcyBvdXQgdGhlIEhUTUwgYW5kIHJldHVybnMgaXRcclxuY29uc3QgbWVzc2FnZXMgPSB7XHJcblxyXG4gIC8vIFRoaXMgbWV0aG9kIHRha2VzIG9uZSBhcmd1bWVudCwgd2hpY2ggd2UgZXhwZWN0IHRvIGJlIGFuIG9iamVjdCB0aGF0IHJlcHJlc2VudHMgYSBmb29kIGFuZCB3aWxsIGhhdmUgdGhlIGZvbGxvd2luZyBzdHJ1Y3R1cmU6XHJcbiAgLy8ge1xyXG4gIC8vICAgbmFtZTogXCJuYW1lIHZhbHVlXCIsXHJcbiAgLy8gICBleHBpcmF0aW9uOiBcImV4cGlyYXRpb24gdmFsdWVcIixcclxuICAvLyAgIHR5cGU6IFwidHlwZSB2YWx1ZVwiXHJcbiAgLy8gfVxyXG5cclxuICAvLyBHaXZlbiB0aGlzIG9iamVjdCwgdGhlIG1ldGhvZCB3aWxsIGJ1aWxkIEhUTUwgZWxlbWVudHMgYW5kIGFwcGVuZCB0aGVtIGFwcHJvcHJpYXRlbHkgc28gdGhhdCBpdCB3aWxsIGxvb2sgbGlrZSB0aGlzOlxyXG4gIC8vIDxhcnRpY2xlPlxyXG4gIC8vICAgPGgzPm5hbWUgdmFsdWU8L2gzPlxyXG4gIC8vICAgPHA+ZXhwaXJhdGlvbiB2YWx1ZTwvcD5cclxuICAvLyAgIDxwPnR5cGUgdmFsdWU8L3A+XHJcbiAgLy8gPC9hcnRpY2xlPlxyXG5cclxuICAvLyBUaGlzIEhUTUwgaXMgdGhlbiByZXR1cm5lZCB0byB0aGUgcG9pbnQgZnJvbSB3aGVyZSB0aGlzIG1ldGhvZCB3YXMgY2FsbGVkXHJcbiAgbWVzc2FnZUJ1aWxkZXIobWVzc2FnZU9iamVjdCkge1xyXG4gICAgbGV0IG1lc3NhZ2VBcnRpY2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFydGljbGVcIilcclxuICAgIFxyXG4gICAgbGV0IG1lc3NhZ2VVc2VySWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDVcIilcclxuICAgIG1lc3NhZ2VVc2VySWQudGV4dENvbnRlbnQgPSBtZXNzYWdlT2JqZWN0LnVzZXJJZFxyXG5cclxuICAgIGxldCBtZXNzYWdlVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpXHJcbiAgICBtZXNzYWdlVGV4dC50ZXh0Q29udGVudCA9IG1lc3NhZ2VPYmplY3QudGV4dFxyXG5cclxuICAgIGxldCBtZXNzYWdlVGltZVN0YW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIilcclxuICAgIG1lc3NhZ2VUaW1lU3RhbXAudGV4dENvbnRlbnQgPSBtZXNzYWdlT2JqZWN0LnRpbWVTdGFtcFxyXG5cclxuICAgIG1lc3NhZ2VBcnRpY2xlLmFwcGVuZENoaWxkKG1lc3NhZ2VVc2VySWQpXHJcbiAgICBtZXNzYWdlQXJ0aWNsZS5hcHBlbmRDaGlsZChtZXNzYWdlVGV4dClcclxuICAgIG1lc3NhZ2VBcnRpY2xlLmFwcGVuZENoaWxkKG1lc3NhZ2VUaW1lU3RhbXApXHJcblxyXG4gICAgcmV0dXJuIG1lc3NhZ2VBcnRpY2xlXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBtZXNzYWdlc1xyXG4iLCIvLyBDb21wb25lbnQgcmVzcG9uc2libGUgZm9yIGludGVyYWN0aW5nIHdpdGggdGhlIEFQSS4gQWxsIGZldGNoIGNhbGxzIGZvciB0aGlzIGFwcGxpY2F0aW9uIHdpbGwgYmUgZGVmaW5lZCBoZXJlXHJcblxyXG5jb25zdCBtZXNzYWdlc0NvbGxlY3Rpb24gPSB7XHJcbiAgLy8gVGhpcyBtZXRob2QgcmV0dXJucyBhIGZldGNoLCB3aGljaCBtZWFucyBpdCBpcyByZXR1cm5pbmcgYSBwcm9taXNlLiBXaGljaCBtZWFucyB0byBhY2Nlc3MgdGhlIHJlc3BvbnNlIGZyb20gdGhlIGFzeW5jaHJvbm91cyBIVFRQIEdFVCByZXF1ZXN0IHRoYXQgaXMgYmVpbmcgbWFkZSBieSB0aGlzIGZldGNoLCB3ZSBjYW4gY2hhaW4gYSAudGhlbiBhdCB0aGUgcG9pbnQgd2hlcmUgdGhpcyBtZXRob2QoZ2V0QWxsRm9vZHMpIGlzIGNhbGxlZC4gVGhlIC50aGVuIHRoZW4gaXMgY2hhaW5lZCB0byB0aGUgZmV0Y2ggaW5zaWRlIHRoZSBtZXRob2QgaXMgcGFyc2luZyB0aGUgZGF0YSBmcm9tIEpTT04gdG8gZGF0YSBzdHJ1Y3R1cmVzIEphdmFzY3JpcHQgd2lsbCB1bmRlcnN0YW5kLiBJbiB0aGlzIGNhc2UsIGJlY2F1c2Ugd2UgaGF2ZSBhIGNvbGxlY3Rpb24gb2YgaXRlbXMsIGl0IHdpbGwgYmUgYW4gYXJyYXkgb2Ygb2JqZWN0cy5cclxuICBnZXRBbGxNZXNzYWdlcygpIHtcclxuICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9tZXNzYWdlc1wiKVxyXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gIH0sXHJcblxyXG4gIC8vIFRoaXMgbWV0aG9kIHdpbGwgbWFrZSBhIEhUVFAgUE9TVCByZXF1ZXN0IHRvIHRoZSBBUEkuIEJlY2F1c2UgYSBQT1NUIGhhcyBhIGJvZHkgd2l0aCB0aGUgZGF0YSBmb3IgdGhlIG5ldyBpdGVtIHlvdSB3YW50IGNyZWF0ZWQsIHRoaXMgbWV0aG9kIHdpbGwgdGFrZSBvbmUgYXJndW1lbnQgd2hpY2ggd2lsbCBiZSB0aGUgb2JqZWN0IGZvciB0aGUgbmV3IGZvb2QgaXRlbSB3ZSB3YW50IHRvIGFkZCB0byBvdXIgY29sbGVjdGlvbiBpbiB0aGUgQVBJLlxyXG4gIHBvc3ROZXdNZXNzYWdlKG5ld01lc3NhZ2VUb1NhdmUpIHtcclxuICAgIC8vIFdlIHdhbnQgdG8gcmV0dXJuIHRoaXMgZmV0Y2ggcmVxdWVzdCBzbyB0aGF0IGF0IHRoZSBwb2ludCBpdCBpcyBjYWxsZWQsIHdlIGNhbiB0YWtlIGFkdmFudGFnZSBvZiB0aGUgYXN5bmNocm9ub3VzIG5hdHVyZSBvZiBwcm9taXNlcyB0byB3YWl0IGZvciB0aGlzIHRvIGJlIGRvbmUgYmVmb3JlIGdldHRpbmcgdGhlIGxhdGVzdCBkYXRhIGFuZCByZXJlbmRlcmluZyB0aGUgRE9NLlxyXG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L21lc3NhZ2VzXCIsIHtcclxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgfSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobmV3TWVzc2FnZVRvU2F2ZSlcclxuICAgIH0pXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBtZXNzYWdlc0NvbGxlY3Rpb25cclxuIiwiaW1wb3J0IG1lc3NhZ2VzQ29sbGVjdGlvbiBmcm9tIFwiLi9tZXNzYWdlc0NvbGxlY3Rpb25cIlxyXG5pbXBvcnQgbWVzc2FnZXNMaXN0IGZyb20gXCIuL21lc3NhZ2VzTGlzdFwiXHJcblxyXG5jb25zdCBtZXNzYWdlc0Zvcm0gPSB7XHJcblxyXG4gIC8vIFRoaXMgbW9kdWxlIHdpbGwgYnVpbGQgYSBmb3JtIGFuZCBhcHBlbmQgaXQgdG8gdGhlIERPTS4gVGhlIGZvcm0gd2lsbCBjb250YWluIGlucHV0IGZpZWxkcyBmb3IgYSB1c2VyIHRvIGFkZCBhIG5ldyBmb29kIHRvIHRoZWlyIHJlZnJpZ2VyYXRvciBhbmQgYSBidXR0b24gd2l0aCBhbiBldmVudCBsaXN0ZW5lciB0aGF0IHdpbGwgbGlzdGVuIGZvciB0aGUgY2xpY2tcclxuICBjcmVhdGVBbmRBcHBlbmRGb3JtICgpIHtcclxuICAgIC8vIDEuIEJ1aWxkIEhUTUwgZm9ybVxyXG4gICAgbGV0IGZvcm1IZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIilcclxuICAgIGZvcm1IZWFkZXIudGV4dENvbnRlbnQgPSBcIlBvc3QgYSBNZXNzYWdlXCJcclxuXHJcbiAgICBsZXQgbWVzc2FnZUZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZpZWxkc2V0XCIpXHJcblxyXG4gICAgbGV0IG1lc3NhZ2VMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKVxyXG4gICAgbWVzc2FnZUxhYmVsLnRleHRDb250ZW50ID0gXCJNZXNzYWdlXCJcclxuICAgIG1lc3NhZ2VMYWJlbC5zZXRBdHRyaWJ1dGUoXCJmb3JcIiwgXCJtZXNzYWdlXCIpXHJcbiAgICBsZXQgbWVzc2FnZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpXHJcbiAgICBtZXNzYWdlSW5wdXQuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJtZXNzYWdlXCIpXHJcbiAgICBtZXNzYWdlSW5wdXQuc2V0QXR0cmlidXRlKFwibmFtZVwiLCBcIm1lc3NhZ2VcIilcclxuXHJcbiAgICBtZXNzYWdlRmllbGQuYXBwZW5kQ2hpbGQobWVzc2FnZUxhYmVsKVxyXG4gICAgbWVzc2FnZUZpZWxkLmFwcGVuZENoaWxkKG1lc3NhZ2VJbnB1dClcclxuICAgIFxyXG4gICAgbGV0IHBvc3RCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpXHJcbiAgICBwb3N0QnV0dG9uLnRleHRDb250ZW50ID0gXCJQb3N0IE1lc3NhZ2VcIlxyXG4gICAgcG9zdEJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcIm1lc3NhZ2VfX3Bvc3RcIilcclxuXHJcbiAgICAvLyAyLiBBdHRhY2ggZXZlbnQgbGlzdGVuZXIgdG8gYnV0dG9uIGluIGZvcm1cclxuICAgIHBvc3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuaGFuZGxlQWRkTmV3TWVzc2FnZSlcclxuXHJcbiAgICAvLyAzLiBBcHBlbmQgdGhlIEhUTUwgZm9ybSB0byB0aGUgRE9NXHJcbiAgICAvL05vdGljZSB0aGF0IEkgaGF2ZSBhZGRlZCBhbiBhcnRpY2xlIGVsZW1lbnQgdG8gbXkgaW5kZXguaHRtbCB3aXRoIHRoZSBjbGFzcyBcImZvcm1cIi5cclxuICAgIGxldCBtZXNzYWdlRm9ybUZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpXHJcbiAgICBtZXNzYWdlRm9ybUZyYWdtZW50LmFwcGVuZENoaWxkKGZvcm1IZWFkZXIpXHJcbiAgICBtZXNzYWdlRm9ybUZyYWdtZW50LmFwcGVuZENoaWxkKG1lc3NhZ2VGaWVsZClcclxuICAgIG1lc3NhZ2VGb3JtRnJhZ21lbnQuYXBwZW5kQ2hpbGQocG9zdEJ1dHRvbilcclxuXHJcbiAgICBsZXQgZm9ybUFydGljbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvcm1cIik7XHJcbiAgICBmb3JtQXJ0aWNsZS5hcHBlbmRDaGlsZChtZXNzYWdlRm9ybUZyYWdtZW50KTtcclxuXHJcbiAgfSxcclxuICAvLyBUaGlzIG1vZHVsZSB3aWxsIGFsc28gY29udGFpbiB0aGUgZnVuY3Rpb24gdGhhdCBleGVjdXRlcyB3aGVuIHRoZSBidXR0b24gaW4gdGhlIGZvcm0gaXMgY2xpY2tlZC4gV2hlbiB0aGUgYnV0dG9uIGluIHRoZSBmb3JtIGlzIGNsaWNrZWQsIHRoZSBmb2xsb3dpbmcgd2lsbCBoYXBwZW46XHJcbiAgaGFuZGxlQWRkTmV3TWVzc2FnZSAoZXZlbnQpIHtcclxuICAgIC8vIDEuIEdldCB1c2VyIGlucHV0IHRoYXQgdXNlciBlbnRlcmVkXHJcbiAgICBsZXQgaW5wdXRNZXNzYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtZXNzYWdlXCIpLnZhbHVlXHJcbiAgICBsZXQgbWVzc2FnZVRpbWVTdGFtcCA9IG5ldyBEYXRlKCkudG9Mb2NhbGVTdHJpbmcoKTtcclxuXHJcbiAgICAvLyAyLiBDcmVhdGUgYSBuZXcgb2JqZWN0IHdpdGggdGhlIHNhbWUgc3RydWN0dXJlIHdlIGhhdmUgYmVlbiB1c2luZyB0aHJvdWdob3V0IHRoZSBhcHBsaWNhdGlvbiB0byByZXByZXNlbnQgYSBmb29kIGl0ZW06XHJcbiAgICAvLyB7XHJcbiAgICAgIC8vICAgbmFtZTogXCJ1c2VyIGlucHV0IG5hbWVcIixcclxuICAgICAgLy8gICBleHBpcmF0aW9uOiBcInVzZXIgaW5wdXQgZXhwaXJhdGlvblwiLFxyXG4gICAgICAvLyAgIHR5cGU6IFwidXNlciBpbnB1dCB0eXBlXCJcclxuICAgIC8vIH1cclxuXHJcbiAgICBsZXQgbmV3TWVzc2FnZSA9IHtcclxuICAgICAgdGV4dDogaW5wdXRNZXNzYWdlLFxyXG4gICAgICB0aW1lU3RhbXA6IG1lc3NhZ2VUaW1lU3RhbXAsXHJcbiAgICAgIHVzZXJJZDogXCJwbGFjZWhvbGRlclwiXHJcbiAgICB9XHJcblxyXG4gICAgLy8gMy4gQ2FsbCB0aGUgbWV0aG9kKHBvc3ROZXdGb29kKSB3aXRoIHRoZSBmZXRjaCByZXF1ZXN0IHRvIFBPU1QgdG8gdGhlIEFQSSBhbmQgcGFzcyBpdCB0aGUgb2JqZWN0IHdlIGNyZWF0ZWQgaW4gdGhlIHByZXZpb3VzIHN0ZXBcclxuXHJcbiAgICAvLyBOb3RpY2UgdGhlIGltcG9ydCBzdGF0ZW1lbnQgYXQgdGhlIHRvcCBvZiB0aGUgbW9kdWxlIHNvIEkgY2FuIGNhbGwgYSBtZXRob2QgaW4gdGhlIGZvb2RDb2xsZWN0aW9uIG1vZHVsZS5cclxuXHJcbiAgICAvLyAqKioqKklNUE9SVEFOVCoqKioqXHJcbiAgICAvLyBZb3Ugd2lsbCBub3RpY2UgYXQgdGhpcyBwb2ludCB0aGF0IHdoaWxlIGEgbmV3IGZvb2QgaXRlbSBpcyBiZWluZyBhZGRlZCB0byBvdXIgQVBJLCB1bmxlc3MgeW91IHJlZnJlc2ggdGhlIGFwcGxpY2F0aW9uLCB0aGUgbmV3bHkgYWRkZWQgaXRlbSB3aWxsIG5vdCBzaG93IHVwIG9uIHRoZSBET00uIFdlIGRlZmluaXRlbHkgZG8gbm90IHdhbnQgb3VyIHVzZXIgdG8gaGF2ZSB0byBoaXQgcmVmcmVzaCBldmVyeSB0aW1lIHRoZXkgYWRkIG5ldyBmb29kIHRvIHRoZWlyIHJlZnJpZ2VyYXRvci5cclxuXHJcbiAgICAvLyBXZSBhbHNvIGRvIE5PVCB3YW50IHRvIG1hbnVhbGx5IGFkZCBvdXIgbmV3IGZvb2QgaXRlbSB0byB0aGUgbGlzdCBvZiBmb29kIG9uIHRoZSBET00uIEluc3RlYWQsIHdlIHdhbnQgb3VyIGRhdGEgdG8gYmUgb3VyIHBvaW50IG9mIHRydXRoLiBPdXIgRE9NIHNob3VsZCBhbHdheXMgdXNlIHRoZSBkYXRhIGZyb20gb3VyIEFQSSB0byByZW5kZXIgdGhlIERPTS4gTG9naWNhbGx5LCBoZXJlIGFyZSB0aGUgc3RlcHMgd2Ugd2FudCB0byB0YWtlIHBsYWNlLlxyXG4gICAgLy8gMS4gQWRkIG5ldyBmb29kIGl0ZW0gdG8gdGhlIEFQSSB1c2luZyBhIFBPU1QgSFRUUCByZXF1ZXN0LlxyXG4gICAgLy8gICAgIFdlIGFyZSBhbHJlYWR5IGRvaW5nIHRoaXMuIFdlIGFyZSB1c2luZyB0aGUgZmV0Y2ggZGVmaW5lZCBpbiB0aGUgZm9vZENvbGxlY3Rpb24gbW9kdWxlIHRvIGFkZCBhIG5ldyBmb29kIGl0ZW0gdG8gdGhlIEFQSS5cclxuICAgIC8vIDIuIEFmdGVyIHRoZSBuZXcgaXRlbSBoYXMgYmVlbiBhZGRlZCwgd2Ugd2FudCB0byBnZXQgYSBsaXN0IG9mIGFsbCB0aGUgZm9vZCBpdGVtcyAodXNpbmcgYSBHRVQgSFRUUCByZXF1ZXN0KSBhbmQgcmVuZGVyIHRoZW0gdG8gdGhlIERPTS5cclxuICAgICAgICAgIC8vIEJlY2F1c2Ugd2Ugd2FudCB0byBtYWtlIHN1cmUgd2Ugb25seSBkbyB0aGlzIGFmdGVyIHRoZSBmaXJzdCBzdGVwIGlzIGRvbmUsIHdlIHdpbGwgcmV0dXJuIHRoZSBmZXRjaCBjYWxsIHRoYXQgaXMgZG9pbmcgdGhlIFBPU1QgYW5kIGNoYWluIGEgLnRoZW4gdG8gdGhlIGNhbGwgKGp1c3QgbGlrZSB3ZSBkbyB3aXRoIHRoZSBHRVQpLiBUaGlzIG1lYW5zIHdlIGFyZSBkb2luZyB0aGUgUE9TVCBhbmQgdGhlbiB3YWl0aW5nIHVudGlsIGEgcmVzcG9uc2UgY29tZXMgYmFjayBiZWZvcmUgZG9pbmcgdGhpcyBzdGVwLiBUaGUgcmVhc29uIHdlIHdhbnQgdG8gd2FpdCBpcyBiZWNhdXNlIHdlIHdhbnQgdG8gYmUgc3VyZSB0aGF0IHdoZW4gd2UgYXNrIG91ciBBUEkgZm9yIHRoZSBsaXN0IG9mIGZvb2QgaXRlbXMsIHRoZSBuZXdseSBhZGRlZCBpdGVtIGlzIG9uIHRoYXQgbGlzdC4gU28gd2Ugd2FpdCB1bnRpbCBpdCBoYXMgYmVlbiBhZGRlZCBiZWZvcmUgdXNpbmcgYSBHRVQgcmVxdWVzdCB0byBnZXQgYSBsaXN0IG9mIGFsbCBmb29kIGl0ZW1zIGFuZCByZW5kZXJpbmcgdGhlbSB0byB0aGUgRE9NLlxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAvLyBCdXQgdGhhdCBzb3VuZHMgYXdmdWxseSBmYW1pbGlhcjogbWFrZSBhIEdFVCBIVFRQIHJlcXVlc3QgdG8gdGhlIEFQSSBmb3IgYSBsaXN0IG9mIGFsbCBmb29kIGl0ZW1zLCBpdGVyYXRlIG92ZXIgdGhhdCBsaXN0IGFuZCBidWlsZCB0aGUgSFRNTCBmb3IgZWFjaCBpdGVtLCBhcHBlbmQgdGhlIEhUTUwgdG8gdGhlIERPTS4gVGhpcyBpcyBleGFjdGx5IHdoYXQgb3VyIGZyaWRnaWZ5IG1ldGhvZCBpbiBvdXIgZm9vZExpc3QgbW9kdWxlIGlzIGFscmVhZHkgZG9pbmcuIFdoaWNoIG1lYW5zIEkgY2FuIHNpbXBseSBjYWxsIHRoYXQgbWV0aG9kIGZyb20gaGVyZS4gT25jZSBhZ2Fpbiwgbm90ZSB0aGF0IEkgYW0gaW1wb3J0aW5nIHRoZSBhcHByb3ByaWF0ZSBtb2R1bGUgYXQgdGhlIHRvcCBvZiB0aGlzIGZpbGUuXHJcbiAgICAvLyBUbyBzdW1tYXJpemUsIHdlIGFyZSBhZGRpbmcgYSBuZXcgaXRlbSB0byB0aGUgQVBJLCB0aGVuIGdldHRpbmcgYW4gdXBkYXRlZCBsaXN0IG9mIGl0ZW1zIGZyb20gdGhlIEFQSSBhbmQgcmVyZW5kZXJpbmcgdGhlIERPTS5cclxuICAgIC8vICoqKioqKioqKioqKioqKioqKipcclxuICAgIG1lc3NhZ2VzQ29sbGVjdGlvbi5wb3N0TmV3TWVzc2FnZShuZXdNZXNzYWdlKVxyXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICBtZXNzYWdlc0xpc3QucG9zdE1lc3NhZ2UoKVxyXG4gICAgfSlcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG1lc3NhZ2VzRm9ybVxyXG4iLCIvLyBUaGlzIGNvbXBvbmVudCB3aWxsIGdldCB0aGUgZGF0YSwgYnVpbGQgdGhlIEhUTUwgZnJvbSB0aGUgZGF0YSBhbmQgYXBwZW5kIGl0IHRvIHRoZSBET00uXHJcblxyXG4vLyBUbyBnZXQgdGhlIGRhdGEsIHdlIHdpbGwgdXNlIHRoZSBmb29kQ29sbGVjdGlvbiBjb21wb25lbnQuXHJcbmltcG9ydCBtZXNzYWdlc0NvbGxlY3Rpb24gZnJvbSBcIi4vbWVzc2FnZXNDb2xsZWN0aW9uXCJcclxuLy8gVG8gYnVpbGQgdGhlIEhUTUwgZm9yIGVhY2ggb2JqZWN0IGluIHRoZSBtZXNzYWdlcyBhcnJheSAod2hpY2ggaXMgd2hhdCB0aGUgZGF0YSBjb21pbmcgZnJvbSB0aGUgQVBJIGJlY29tZXMgb25jZSB3ZSBwYXJzZSBpdCksIHdlIHdpbGwgdXNlIHRoZSBtZXNzYWdlcyBjb21wb25lbnQuXHJcbmltcG9ydCBtZXNzYWdlcyBmcm9tIFwiLi9tZXNzYWdlc1wiXHJcblxyXG5jb25zdCBtZXNzYWdlc0xpc3QgPSB7XHJcbiAgcG9zdE1lc3NhZ2UoKXtcclxuICAgIC8vIDEuIEdldCBkYXRhXHJcbiAgICAvLyBUaGUgZ2V0QWxsTWVzc2FnZXMgbWV0aG9kIHdpbGwgZG8gYSBmZXRjaCBhbmQgcmV0dXJuIGEgcHJvbWlzZS4gVGhpcyBjYWxsIHdpbGwgcmV0dXJuIHRoZSBkYXRhIGZyb20gdGhlIEFQSSBpbiB0aGUgcmVzcG9uc2UuXHJcbiAgICBtZXNzYWdlc0NvbGxlY3Rpb24uZ2V0QWxsTWVzc2FnZXMoKVxyXG4gICAgLnRoZW4oYWxsTWVzc2FnZXMgPT4ge1xyXG5cclxuICAgICAgLy8gQW4gZW1wdHkgZG9jdW1lbnQgZnJhZ21lbnRcclxuICAgICAgbGV0IG1lc3NhZ2VEb2NGcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxyXG5cclxuICAgICAgLy8gMi4gSXRlcmF0ZSBvdmVyIGRhdGEgYW5kIGJ1aWxkIEhUTUwgZm9yIGVhY2ggaXRlbVxyXG4gICAgICAvLyBXZSBsb29wIG92ZXIgdGhlIGFycmF5IG9mIG9iamVjdHMgcmV0dXJuZWQgZnJvbSBvdXIgQVBJIGFuZCBmb3IgZWFjaCBvYmVjdCwgd2UgbWFrZSBhIGNhbGwgdG8gdGhlIG1lc3NhZ2VCdWlsZGVyIG1ldGhvZCBpbiB0aGUgbWVzc2FnZXMgbW9kdWxlLiBUaGlzIG1ldGhvZCB0YWtlcyBhIGZvb2Qgb2JqZWN0IGFzIGFuIGFyZ3VtZW50IGFuZCByZXR1cm5zIGFuIEhUTUwgY29tcG9uZW50LiBPbmNlIHdlIGhhdmUgdGhhdCBIVE1MLCB3ZSBhcHBlbmQgaXQgdG8gb3VyIGRvY3VtZW50IGZyYWdtZW50IHNvIHRoYXQgaXQgaXMgc2xvd2x5IGJ1aWx0IHVwLiBCeSB0aGUgZW5kIG9mIHRoZSBmb3JFYWNoIGxvb3AsIG91ciBkb2N1bWVudCBmcmFnbWVudCBjb250YWlucyBhbGwgdGhlIEhUTUwgZm9yIGFsbCBvdXIgZGF0YS5cclxuICAgICAgYWxsTWVzc2FnZXMuZm9yRWFjaChtZXNzYWdlSXRlbSA9PiB7XHJcbiAgICAgICAgbGV0IG1lc3NhZ2VIdG1sID0gbWVzc2FnZXMubWVzc2FnZUJ1aWxkZXIobWVzc2FnZUl0ZW0pXHJcbiAgICAgICAgbWVzc2FnZURvY0ZyYWdtZW50LmFwcGVuZENoaWxkKG1lc3NhZ2VIdG1sKVxyXG4gICAgICB9KVxyXG4gICAgICBcclxuICAgICAgLy8gMy4gQXBwZW5kIHRoZSBIVE1MIHRvIHRoZSBET01cclxuICAgICAgLy8gV2UgZ2V0IGEgcmVmZXJlbmNlIHRvIGEgSFRNTCBlbGVtZW50IHdpdGggdGhlIGNsYXNzIFwib3V0cHV0XCIgYW5kIGFwcGVuZCBvdXIgZG9jdW1lbnQgZnJhZ21lbnQgdG8gdGhhdCBlbGVtZW50LiBCZWNhdXNlIHRoZSBIVE1MIGVsZW1lbnQgd2l0aCBjbGFzcyBcIm91dHB1dFwiIGlzIGFscmVhZHkgb24gdGhlIERPTSwgdGhlIEhUTUwgaW4gdGhlIGRvY3VtZW50IGZyYWdtZW50IGlzIGFwcGVuZGVkIHRvIHRoZSBET00uXHJcbiAgICAgIGxldCBvdXRwdXRBcnRpY2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vdXRwdXRcIilcclxuXHJcbiAgICAgIC8vVGhpcyB3aGlsZSBsb29wIGVzc2VudGlhbGx5IHJlbW92ZXMgYWxsIGNoaWxkIG5vZGVzIG9mIGFuIGVsZW1lbnQgdW50aWwgdGhlIGVsZW1lbnQgaGFzIG5vIGNoaWxkIG5vZGVzIGxlZnQuIEl0IGlzIGVxdWl2YWxlbnQgdG8gdGhlIGZvbGxvd2luZzpcclxuICAgICAgLy8gb3V0cHV0QXJ0aWNsZS5pbm5lckhUTUwgPSBcIlwiXHJcblxyXG4gICAgICAvLyBJZiB3ZSBkbyBub3QgZG8gdGhpcywgZWFjaCB0aW1lIHdlIGFkZCBhIG5ldyBtZXNzYWdlIHVzaW5nIG91ciBmb3JtLCBhbGwgdGhlIG1lc3NhZ2VzIHdpbGwgYmUgYXBwZW5kZWQgdG8gdGhlIGJvdHRvbSBvZiBvdXIgbGlzdCBzbyB0aGF0IHdlIHdpbGwgaGF2ZSBkdXBsaWNhdGVzLiBUbyB1bmRlcnN0YW5kIHdoeSB0aGlzIHdoaWxlIGxvb3AgaXMgbmVlZGVkLCB0cnkgY29tbWVudGluZyBpdCBvdXQgYW5kIG9ic2VydmUgdGhlIGJlaGF2aW9yIG9mIHRoZSBhcHBsaWNhdGlvbi4gRXNzZW50aWFsbHksIHdlIGFyZSBjbGVhcmluZyBvdXQgb3VyIG91dHB1dCBjb250YWluZXIgKG91ciBhcnRpY2xlIHRhZyB3aXRoIGNsYXNzIFwib3V0cHV0XCIpIHNvIHRoYXQgd2UgcmVwb3B1bGF0ZSBpdC5cclxuICAgICAgd2hpbGUgKG91dHB1dEFydGljbGUuZmlyc3RDaGlsZCkge1xyXG4gICAgICAgIG91dHB1dEFydGljbGUucmVtb3ZlQ2hpbGQob3V0cHV0QXJ0aWNsZS5maXJzdENoaWxkKTtcclxuICAgICAgfVxyXG4gICAgICBvdXRwdXRBcnRpY2xlLmFwcGVuZENoaWxkKG1lc3NhZ2VEb2NGcmFnbWVudClcclxuXHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbWVzc2FnZXNMaXN0XHJcbiJdfQ==
