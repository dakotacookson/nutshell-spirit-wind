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

_messagesList.default.fridgify();

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
  foodBuilder(foodObject) {
    let foodArticle = document.createElement("article");
    let foodName = document.createElement("h3");
    foodName.textContent = foodObject.name;
    let foodExp = document.createElement("p");
    foodExp.textContent = foodObject.expiration;
    let foodType = document.createElement("p");
    foodType.textContent = foodObject.type;
    foodArticle.appendChild(foodName);
    foodArticle.appendChild(foodExp);
    foodArticle.appendChild(foodType);
    return foodArticle;
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
  getAllFoods() {
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
    let messagePlaceHolderField = document.createElement("fieldset");
    let foodExpirationLabel = document.createElement("label");
    foodExpirationLabel.textContent = "Expiration";
    foodExpirationLabel.setAttribute("for", "food__expiration");
    let foodExpirationInput = document.createElement("input");
    foodExpirationInput.setAttribute("id", "food__expiration");
    foodExpirationInput.setAttribute("name", "food__expiration");
    messagePlaceHolderField.appendChild(foodExpirationLabel);
    messagePlaceHolderField.appendChild(foodExpirationInput);
    let foodTypeField = document.createElement("fieldset");
    let foodTypeLabel = document.createElement("label");
    foodTypeLabel.textContent = "Type";
    foodTypeLabel.setAttribute("for", "food__type");
    let foodTypeInput = document.createElement("input");
    foodTypeInput.setAttribute("id", "food__type");
    foodTypeInput.setAttribute("name", "food__type");
    foodTypeField.appendChild(foodTypeLabel);
    foodTypeField.appendChild(foodTypeInput);
    let submitButton = document.createElement("button");
    submitButton.textContent = "Add Food";
    submitButton.setAttribute("class", "food__save"); // 2. Attach event listener to button in form

    submitButton.addEventListener("click", this.handleAddNewFood); // 3. Append the HTML form to the DOM
    //Notice that I have added an article element to my index.html with the class "form".

    let foodFormFragment = document.createDocumentFragment();
    foodFormFragment.appendChild(formHeader);
    foodFormFragment.appendChild(messageField);
    foodFormFragment.appendChild(messagePlaceHolderField);
    foodFormFragment.appendChild(foodTypeField);
    foodFormFragment.appendChild(submitButton);
    let formArticle = document.querySelector(".form");
    formArticle.appendChild(foodFormFragment);
  },

  // This module will also contain the function that executes when the button in the form is clicked. When the button in the form is clicked, the following will happen:
  handleAddNewFood(event) {
    // 1. Get user input that user entered
    let inputMessage = document.querySelector("#message").value;
    let inputFoodExpiration = document.querySelector("#food__expiration").value;
    let inputFoodType = document.querySelector("#food__type").value; // 2. Create a new object with the same structure we have been using throughout the application to represent a food item:
    // {
    //   name: "user input name",
    //   expiration: "user input expiration",
    //   type: "user input type"
    // }

    let newMessage = {
      name: inputMessage,
      expiration: inputFoodExpiration,
      type: inputFoodType // 3. Call the method(postNewFood) with the fetch request to POST to the API and pass it the object we created in the previous step
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
      _messagesList.default.fridgify();
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
// To build the HTML for each object in the array of food(which is what the data coming from the API becomes once we parse it), we will use the food component.
const foodList = {
  fridgify() {
    // 1. Get data
    // The getAllFoods method will do a fetch and return a promise. This call will return the data from the API in the response.
    _messagesCollection.default.getAllFoods().then(allFoods => {
      // An empty document fragment
      let foodDocFragment = document.createDocumentFragment(); // 2. Iterate over data and build HTML for each item
      // We loop over the array of objects returned from our API and for each obect, we make a call to the foodBuilder method in the food module. This method takes a food object as an argument and returns an HTML component. Once we have that HTML, we append it to our document fragment so that it is slowly built up. By the end of the forEach loop, our document fragment contains all the HTML for all our data.

      allFoods.forEach(foodItem => {
        let foodHtml = _messages.default.foodBuilder(foodItem);

        foodDocFragment.appendChild(foodHtml);
      }); // 3. Append the HTML to the DOM
      // We get a reference to a HTML element with the class "output" and append our document fragment to that element. Because the HTML element with class "output" is already on the DOM, the HTML in the document fragment is appended to the DOM.

      let outputArticle = document.querySelector(".output"); //This while loop essentially removes all child nodes of an element until the element has no child nodes left. It is equivalent to the following:
      // outputArticle.innerHTML = ""
      // If we do not do this, each time we add a new food item using our form, all the food items will be appended to the bottom of our list so that we will have duplicates. To understand why this while loop is needed, try commenting it out and observe the behavior of the application. Essentially, we are clearing out our output container (our article tag with class "output") so that we repopulate it.

      while (outputArticle.firstChild) {
        outputArticle.removeChild(outputArticle.firstChild);
      }

      outputArticle.appendChild(foodDocFragment);
    });
  }

};
var _default = foodList;
exports.default = _default;

},{"./messages":4,"./messagesCollection":5}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2FwaS5qcyIsIi4uL3NjcmlwdHMvbG9naW4uanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL21lc3NhZ2VzL21lc3NhZ2VzLmpzIiwiLi4vc2NyaXB0cy9tZXNzYWdlcy9tZXNzYWdlc0NvbGxlY3Rpb24uanMiLCIuLi9zY3JpcHRzL21lc3NhZ2VzL21lc3NhZ2VzRm9ybS5qcyIsIi4uL3NjcmlwdHMvbWVzc2FnZXMvbWVzc2FnZXNMaXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDQUEsTUFBTSxHQUFHLEdBQUc7QUFFUixFQUFBLE9BQU8sQ0FBQyxRQUFELEVBQVc7QUFDZCxXQUFPLEtBQUssQ0FBRSx5QkFBd0IsUUFBUyxFQUFuQyxDQUFMLENBQ04sSUFETSxDQUNELFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBVCxFQURYLENBQVA7QUFFSDs7QUFMTyxDQUFaLEMsQ0FTQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTs7ZUFFZSxHOzs7Ozs7Ozs7OztBQ25GZjs7OztBQUNBLE1BQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLE9BQXZCLENBQXRCO0FBQ0EsTUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FB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QUFBLGFBQWEsQ0FBQyxXQUFkLENBQTBCLGVBQTFCO0FBRUQsS0ExQkQ7QUEyQkQ7O0FBL0JjLENBQWpCO2VBa0NlLFEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjb25zdCBBUEkgPSB7XHJcblxyXG4gICAgZ2V0RGF0YShyZXNvdXJjZSkge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4LyR7cmVzb3VyY2V9YClcclxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICB9LFxyXG5cclxufVxyXG5cclxuLy8gICAgIGdldEFsbFVzZXJzKCkge1xyXG4vLyAgICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC91c2Vyc1wiKVxyXG4vLyAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuLy8gICAgICAgfSxcclxuXHJcbi8vICAgICBnZXRBbGxNZXNzYWdlcygpIHtcclxuLy8gICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvbWVzc2FnZXNcIilcclxuLy8gICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKVxyXG4vLyAgICAgICB9LFxyXG5cclxuLy8gICAgIGdldEFsbE5ld3NBcnRpY2xlcygpIHtcclxuLy8gICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvbmV3c0FydGljbGVzXCIpXHJcbi8vICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4vLyAgICAgICB9LFxyXG5cclxuLy8gICAgIGdldEFsbFRhc2tzKCkge1xyXG4vLyAgICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC90YXNrc1wiKVxyXG4vLyAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuLy8gICAgICAgfSxcclxuXHJcbi8vICAgICBnZXRBbGxFdmVudHMoKSB7XHJcbi8vICAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2V2ZW50c1wiKVxyXG4vLyAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuLy8gICAgICAgfSxcclxuXHJcbi8vICAgICBnZXRBbGxGcmllbmRzKCkge1xyXG4vLyAgICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9mcmllbmRzXCIpXHJcbi8vICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4vLyAgICAgICB9LFxyXG5cclxuXHJcbi8vICAgICBwb3N0TmV3VXNlcihuZXdVc2VyVG9BZGQpIHtcclxuLy8gICAgIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L3VzZXJzXCIsIHtcclxuLy8gICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4vLyAgICAgICAgIGhlYWRlcnM6IHtcclxuLy8gICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuLy8gICAgICAgICB9LFxyXG4vLyAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5ld1VzZXJUb0FkZClcclxuLy8gICAgIH0pXHJcbi8vICAgICB9LFxyXG5cclxuLy8gICAgIHBvc3ROZXdNZXNzYWdlKG5ld01lc3NhZ2VUb0FkZCkge1xyXG4vLyAgICAgICAgIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L21lc3NhZ2VzXCIsIHtcclxuLy8gICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuLy8gICAgICAgICAgICAgaGVhZGVyczoge1xyXG4vLyAgICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuLy8gICAgICAgICAgICAgfSxcclxuLy8gICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobmV3TWVzc2FnZVRvQWRkKVxyXG4vLyAgICAgfSlcclxuLy8gICAgIH0sXHJcblxyXG4vLyAgICAgcG9zdE5ld05ld3NBcnRpY2xlKG5ld05ld3NBcnRpY2xlVG9BZGQpIHtcclxuLy8gICAgIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L25ld3NBcnRpY2xlc1wiLCB7XHJcbi8vICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuLy8gICAgICAgICBoZWFkZXJzOiB7XHJcbi8vICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbi8vICAgICAgICAgfSxcclxuLy8gICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShuZXdOZXdzQXJ0aWNsZVRvQWRkKVxyXG4vLyAgICAgfSlcclxuLy8gICAgIH0sXHJcblxyXG4vLyAgICAgcG9zdE5ld1Rhc2sobmV3VGFza1RvQWRkKSB7XHJcbi8vICAgICAgICAgZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvdGFza3NcIiwge1xyXG4vLyAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4vLyAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbi8vICAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4vLyAgICAgICAgICAgICB9LFxyXG4vLyAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShuZXdUYXNrVG9BZGQpXHJcbi8vICAgICB9KVxyXG4vLyAgICAgfSxcclxuXHJcblxyXG4vLyB9XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBUEkiLCJpbXBvcnQgQVBJIGZyb20gXCIuL2FwaVwiXHJcbmNvbnN0IHVzZXJOYW1lSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbmNvbnN0IHBhc3N3b3JkSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcblxyXG5jb25zdCBsb2dpbiA9IHtcclxuLy8gRnVuY3Rpb24gdG8gY3JlYXRlIGFuZCBhcHBlbmQgbG9naW4gaW5wdXQgZmllbGRzIGFuZCBsb2dpbiBidXR0b24uXHJcbiAgICBjcmVhdGVBbmRBcHBlbmRMb2dpbklucHV0KCkge1xyXG5cclxuICAgICAgICBjb25zdCBvdXRFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub3V0cHV0X19sb2dpblwiKTtcclxuICAgICAgICB1c2VyTmFtZUlucHV0LnR5cGUgPSBcInRleHRcIjtcclxuICAgICAgICB1c2VyTmFtZUlucHV0LnBsYWNlaG9sZGVyID0gXCJ1c2VybmFtZVwiO1xyXG4gICAgICAgIHBhc3N3b3JkSW5wdXQudHlwZSA9IFwicGFzc3dvcmRcIjtcclxuICAgICAgICBwYXNzd29yZElucHV0LnBsYWNlaG9sZGVyID0gXCJwYXNzd29yZFwiO1xyXG4gICAgICAgIG91dEVsLmFwcGVuZENoaWxkKHVzZXJOYW1lSW5wdXQpO1xyXG4gICAgICAgIG91dEVsLmFwcGVuZENoaWxkKHBhc3N3b3JkSW5wdXQpO1xyXG5cclxuICAgICAgICBjb25zdCBsb2dpbkJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICAgICAgbG9naW5CdXR0b24udGV4dENvbnRlbnQgPSAoXCJsb2dpblwiKTtcclxuICAgICAgICBvdXRFbC5hcHBlbmRDaGlsZChsb2dpbkJ1dHRvbik7XHJcbi8vIFJ1bnMgdGhlIGdldFVzZXJEYXRhKCkgZnVuY3Rpb24gd2hlbiBMb2dpbiBidXR0b24gaXMgY2xpY2tlZC5cclxuICAgICAgICBsb2dpbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5nZXRVc2VyRGF0YSk7XHJcbiAgICB9LFxyXG4vLyBHYXRoZXJzIGRhdGEgZW50ZXJlZCBpbnRvIExvZ2luIGlucHV0IGZpZWxkcy4gRmV0Y2hlcyB1c2VyZGF0YSBmcm9tIEFQSSBhbmQgY29tcGFyZXMgaW5wdXQgZGF0YSB3aXRoIGV4aXN0aW5nIHVzZXIgZGF0YSBpbiBBUEkuIElmIGlucHV0IGRhdGEgbWF0Y2hlcyB1c2VyIGRhdGEgaW4gQVBJLCBydW5zIGxvYWRVc2VyU3BlY2lmaWNQYWdlKCkuIElmIGlucHV0IGRhdGEgZG9lcyBub3QgbWF0Y2ggYW55IHVzZXIgZGF0YSBpbiBBUEksIGFsZXJ0IGlzIHNlbnQuXHJcbiAgICBnZXRVc2VyRGF0YSAoKSB7XHJcbiAgICAgICAgY29uc3QgdXNlcm5hbWUgPSB1c2VyTmFtZUlucHV0LnZhbHVlO1xyXG4gICAgICAgIGNvbnN0IHBhc3N3b3JkID0gcGFzc3dvcmRJbnB1dC52YWx1ZTtcclxuICAgICAgICBBUEkuZ2V0RGF0YShcInVzZXJzXCIpXHJcbiAgICAgICAgLnRoZW4oYWxsVXNlcnMgPT4ge1xyXG4gICAgICAgICAgICBhbGxVc2Vycy5mb3JFYWNoKHVzZXIgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh1c2VybmFtZSA9PT0gdXNlci51c2VyTmFtZSAmJiBwYXNzd29yZCA9PT0gdXNlci5wYXNzd29yZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBUaGlzIG9uZTogJHt1c2VyLmlkfWApXHJcbiAgICAgICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgndXNlcklkJywgdXNlci5pZClcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdXNlcklkID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgndXNlcklkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9hZFVzZXJTcGVjaWZpY1BhZ2UodXNlcklkKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJVc2VybmFtZS9wYXNzd29yZCBpbnZhbGlkLiBJZiBuZXcgdXNlciwgcGxlYXNlIHJlZ2lzdGVyLiA6KVwiKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gbG9hZFVzZXJTcGVjaWZpY1BhZ2UodXNlcklkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFRoaXMgaXMgdGhlIHVzZXIgcGFnZSEgJHt1c2VySWR9YCk7XHJcbiAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgXHJcbiAgICAgfSwgICAgIFxyXG4gICAgXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxvZ2luIiwiaW1wb3J0IGxvZ2luIGZyb20gXCIuL2xvZ2luXCJcclxuaW1wb3J0IGZvb2RMaXN0IGZyb20gXCIuL21lc3NhZ2VzL21lc3NhZ2VzTGlzdFwiXHJcbmltcG9ydCBtZXNzYWdlc0Zvcm0gZnJvbSBcIi4vbWVzc2FnZXMvbWVzc2FnZXNGb3JtXCJcclxuXHJcbmxvZ2luLmNyZWF0ZUFuZEFwcGVuZExvZ2luSW5wdXQoKTtcclxuZm9vZExpc3QuZnJpZGdpZnkoKTtcclxubWVzc2FnZXNGb3JtLmNyZWF0ZUFuZEFwcGVuZEZvcm0oKTtcclxuIiwiLy9HaXZlbiBhIHNpbmdsZSBmb29kIG9iamVjdCwgdGhpcyBjb21wb25lbnQgYnVpbGRzIG91dCB0aGUgSFRNTCBhbmQgcmV0dXJucyBpdFxyXG5jb25zdCBtZXNzYWdlcyA9IHtcclxuXHJcbiAgLy8gVGhpcyBtZXRob2QgdGFrZXMgb25lIGFyZ3VtZW50LCB3aGljaCB3ZSBleHBlY3QgdG8gYmUgYW4gb2JqZWN0IHRoYXQgcmVwcmVzZW50cyBhIGZvb2QgYW5kIHdpbGwgaGF2ZSB0aGUgZm9sbG93aW5nIHN0cnVjdHVyZTpcclxuICAvLyB7XHJcbiAgLy8gICBuYW1lOiBcIm5hbWUgdmFsdWVcIixcclxuICAvLyAgIGV4cGlyYXRpb246IFwiZXhwaXJhdGlvbiB2YWx1ZVwiLFxyXG4gIC8vICAgdHlwZTogXCJ0eXBlIHZhbHVlXCJcclxuICAvLyB9XHJcblxyXG4gIC8vIEdpdmVuIHRoaXMgb2JqZWN0LCB0aGUgbWV0aG9kIHdpbGwgYnVpbGQgSFRNTCBlbGVtZW50cyBhbmQgYXBwZW5kIHRoZW0gYXBwcm9wcmlhdGVseSBzbyB0aGF0IGl0IHdpbGwgbG9vayBsaWtlIHRoaXM6XHJcbiAgLy8gPGFydGljbGU+XHJcbiAgLy8gICA8aDM+bmFtZSB2YWx1ZTwvaDM+XHJcbiAgLy8gICA8cD5leHBpcmF0aW9uIHZhbHVlPC9wPlxyXG4gIC8vICAgPHA+dHlwZSB2YWx1ZTwvcD5cclxuICAvLyA8L2FydGljbGU+XHJcblxyXG4gIC8vIFRoaXMgSFRNTCBpcyB0aGVuIHJldHVybmVkIHRvIHRoZSBwb2ludCBmcm9tIHdoZXJlIHRoaXMgbWV0aG9kIHdhcyBjYWxsZWRcclxuICBmb29kQnVpbGRlcihmb29kT2JqZWN0KSB7XHJcbiAgICBsZXQgZm9vZEFydGljbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYXJ0aWNsZVwiKVxyXG4gICAgXHJcbiAgICBsZXQgZm9vZE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIilcclxuICAgIGZvb2ROYW1lLnRleHRDb250ZW50ID0gZm9vZE9iamVjdC5uYW1lXHJcblxyXG4gICAgbGV0IGZvb2RFeHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKVxyXG4gICAgZm9vZEV4cC50ZXh0Q29udGVudCA9IGZvb2RPYmplY3QuZXhwaXJhdGlvblxyXG5cclxuICAgIGxldCBmb29kVHlwZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpXHJcbiAgICBmb29kVHlwZS50ZXh0Q29udGVudCA9IGZvb2RPYmplY3QudHlwZVxyXG5cclxuICAgIGZvb2RBcnRpY2xlLmFwcGVuZENoaWxkKGZvb2ROYW1lKVxyXG4gICAgZm9vZEFydGljbGUuYXBwZW5kQ2hpbGQoZm9vZEV4cClcclxuICAgIGZvb2RBcnRpY2xlLmFwcGVuZENoaWxkKGZvb2RUeXBlKVxyXG5cclxuICAgIHJldHVybiBmb29kQXJ0aWNsZVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbWVzc2FnZXNcclxuIiwiLy8gQ29tcG9uZW50IHJlc3BvbnNpYmxlIGZvciBpbnRlcmFjdGluZyB3aXRoIHRoZSBBUEkuIEFsbCBmZXRjaCBjYWxscyBmb3IgdGhpcyBhcHBsaWNhdGlvbiB3aWxsIGJlIGRlZmluZWQgaGVyZVxyXG5cclxuY29uc3QgbWVzc2FnZXNDb2xsZWN0aW9uID0ge1xyXG4gIC8vIFRoaXMgbWV0aG9kIHJldHVybnMgYSBmZXRjaCwgd2hpY2ggbWVhbnMgaXQgaXMgcmV0dXJuaW5nIGEgcHJvbWlzZS4gV2hpY2ggbWVhbnMgdG8gYWNjZXNzIHRoZSByZXNwb25zZSBmcm9tIHRoZSBhc3luY2hyb25vdXMgSFRUUCBHRVQgcmVxdWVzdCB0aGF0IGlzIGJlaW5nIG1hZGUgYnkgdGhpcyBmZXRjaCwgd2UgY2FuIGNoYWluIGEgLnRoZW4gYXQgdGhlIHBvaW50IHdoZXJlIHRoaXMgbWV0aG9kKGdldEFsbEZvb2RzKSBpcyBjYWxsZWQuIFRoZSAudGhlbiB0aGVuIGlzIGNoYWluZWQgdG8gdGhlIGZldGNoIGluc2lkZSB0aGUgbWV0aG9kIGlzIHBhcnNpbmcgdGhlIGRhdGEgZnJvbSBKU09OIHRvIGRhdGEgc3RydWN0dXJlcyBKYXZhc2NyaXB0IHdpbGwgdW5kZXJzdGFuZC4gSW4gdGhpcyBjYXNlLCBiZWNhdXNlIHdlIGhhdmUgYSBjb2xsZWN0aW9uIG9mIGl0ZW1zLCBpdCB3aWxsIGJlIGFuIGFycmF5IG9mIG9iamVjdHMuXHJcbiAgZ2V0QWxsRm9vZHMoKSB7XHJcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvbWVzc2FnZXNcIilcclxuICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICB9LFxyXG5cclxuICAvLyBUaGlzIG1ldGhvZCB3aWxsIG1ha2UgYSBIVFRQIFBPU1QgcmVxdWVzdCB0byB0aGUgQVBJLiBCZWNhdXNlIGEgUE9TVCBoYXMgYSBib2R5IHdpdGggdGhlIGRhdGEgZm9yIHRoZSBuZXcgaXRlbSB5b3Ugd2FudCBjcmVhdGVkLCB0aGlzIG1ldGhvZCB3aWxsIHRha2Ugb25lIGFyZ3VtZW50IHdoaWNoIHdpbGwgYmUgdGhlIG9iamVjdCBmb3IgdGhlIG5ldyBmb29kIGl0ZW0gd2Ugd2FudCB0byBhZGQgdG8gb3VyIGNvbGxlY3Rpb24gaW4gdGhlIEFQSS5cclxuICBwb3N0TmV3TWVzc2FnZShuZXdNZXNzYWdlVG9TYXZlKSB7XHJcbiAgICAvLyBXZSB3YW50IHRvIHJldHVybiB0aGlzIGZldGNoIHJlcXVlc3Qgc28gdGhhdCBhdCB0aGUgcG9pbnQgaXQgaXMgY2FsbGVkLCB3ZSBjYW4gdGFrZSBhZHZhbnRhZ2Ugb2YgdGhlIGFzeW5jaHJvbm91cyBuYXR1cmUgb2YgcHJvbWlzZXMgdG8gd2FpdCBmb3IgdGhpcyB0byBiZSBkb25lIGJlZm9yZSBnZXR0aW5nIHRoZSBsYXRlc3QgZGF0YSBhbmQgcmVyZW5kZXJpbmcgdGhlIERPTS5cclxuICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9tZXNzYWdlc1wiLCB7XHJcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgIH0sXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5ld01lc3NhZ2VUb1NhdmUpXHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbWVzc2FnZXNDb2xsZWN0aW9uXHJcbiIsImltcG9ydCBtZXNzYWdlc0NvbGxlY3Rpb24gZnJvbSBcIi4vbWVzc2FnZXNDb2xsZWN0aW9uXCJcclxuaW1wb3J0IG1lc3NhZ2VzTGlzdCBmcm9tIFwiLi9tZXNzYWdlc0xpc3RcIlxyXG5cclxuY29uc3QgbWVzc2FnZXNGb3JtID0ge1xyXG5cclxuICAvLyBUaGlzIG1vZHVsZSB3aWxsIGJ1aWxkIGEgZm9ybSBhbmQgYXBwZW5kIGl0IHRvIHRoZSBET00uIFRoZSBmb3JtIHdpbGwgY29udGFpbiBpbnB1dCBmaWVsZHMgZm9yIGEgdXNlciB0byBhZGQgYSBuZXcgZm9vZCB0byB0aGVpciByZWZyaWdlcmF0b3IgYW5kIGEgYnV0dG9uIHdpdGggYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCB3aWxsIGxpc3RlbiBmb3IgdGhlIGNsaWNrXHJcbiAgY3JlYXRlQW5kQXBwZW5kRm9ybSAoKSB7XHJcbiAgICAvLyAxLiBCdWlsZCBIVE1MIGZvcm1cclxuICAgIGxldCBmb3JtSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpXHJcbiAgICBmb3JtSGVhZGVyLnRleHRDb250ZW50ID0gXCJQb3N0IGEgTWVzc2FnZVwiXHJcblxyXG4gICAgbGV0IG1lc3NhZ2VGaWVsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmaWVsZHNldFwiKVxyXG5cclxuICAgIGxldCBtZXNzYWdlTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIilcclxuICAgIG1lc3NhZ2VMYWJlbC50ZXh0Q29udGVudCA9IFwiTWVzc2FnZVwiXHJcbiAgICBtZXNzYWdlTGFiZWwuc2V0QXR0cmlidXRlKFwiZm9yXCIsIFwibWVzc2FnZVwiKVxyXG4gICAgbGV0IG1lc3NhZ2VJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKVxyXG4gICAgbWVzc2FnZUlucHV0LnNldEF0dHJpYnV0ZShcImlkXCIsIFwibWVzc2FnZVwiKVxyXG4gICAgbWVzc2FnZUlucHV0LnNldEF0dHJpYnV0ZShcIm5hbWVcIiwgXCJtZXNzYWdlXCIpXHJcblxyXG4gICAgbWVzc2FnZUZpZWxkLmFwcGVuZENoaWxkKG1lc3NhZ2VMYWJlbClcclxuICAgIG1lc3NhZ2VGaWVsZC5hcHBlbmRDaGlsZChtZXNzYWdlSW5wdXQpXHJcblxyXG4gICAgbGV0IG1lc3NhZ2VQbGFjZUhvbGRlckZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZpZWxkc2V0XCIpXHJcblxyXG4gICAgbGV0IGZvb2RFeHBpcmF0aW9uTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIilcclxuICAgIGZvb2RFeHBpcmF0aW9uTGFiZWwudGV4dENvbnRlbnQgPSBcIkV4cGlyYXRpb25cIlxyXG4gICAgZm9vZEV4cGlyYXRpb25MYWJlbC5zZXRBdHRyaWJ1dGUoXCJmb3JcIiwgXCJmb29kX19leHBpcmF0aW9uXCIpXHJcbiAgICBsZXQgZm9vZEV4cGlyYXRpb25JbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKVxyXG4gICAgZm9vZEV4cGlyYXRpb25JbnB1dC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImZvb2RfX2V4cGlyYXRpb25cIilcclxuICAgIGZvb2RFeHBpcmF0aW9uSW5wdXQuc2V0QXR0cmlidXRlKFwibmFtZVwiLCBcImZvb2RfX2V4cGlyYXRpb25cIilcclxuXHJcbiAgICBtZXNzYWdlUGxhY2VIb2xkZXJGaWVsZC5hcHBlbmRDaGlsZChmb29kRXhwaXJhdGlvbkxhYmVsKVxyXG4gICAgbWVzc2FnZVBsYWNlSG9sZGVyRmllbGQuYXBwZW5kQ2hpbGQoZm9vZEV4cGlyYXRpb25JbnB1dClcclxuXHJcbiAgICBsZXQgZm9vZFR5cGVGaWVsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmaWVsZHNldFwiKVxyXG5cclxuICAgIGxldCBmb29kVHlwZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpXHJcbiAgICBmb29kVHlwZUxhYmVsLnRleHRDb250ZW50ID0gXCJUeXBlXCJcclxuICAgIGZvb2RUeXBlTGFiZWwuc2V0QXR0cmlidXRlKFwiZm9yXCIsIFwiZm9vZF9fdHlwZVwiKVxyXG4gICAgbGV0IGZvb2RUeXBlSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIilcclxuICAgIGZvb2RUeXBlSW5wdXQuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJmb29kX190eXBlXCIpXHJcbiAgICBmb29kVHlwZUlucHV0LnNldEF0dHJpYnV0ZShcIm5hbWVcIiwgXCJmb29kX190eXBlXCIpXHJcblxyXG4gICAgZm9vZFR5cGVGaWVsZC5hcHBlbmRDaGlsZChmb29kVHlwZUxhYmVsKVxyXG4gICAgZm9vZFR5cGVGaWVsZC5hcHBlbmRDaGlsZChmb29kVHlwZUlucHV0KVxyXG5cclxuICAgIGxldCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpXHJcbiAgICBzdWJtaXRCdXR0b24udGV4dENvbnRlbnQgPSBcIkFkZCBGb29kXCJcclxuICAgIHN1Ym1pdEJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImZvb2RfX3NhdmVcIilcclxuXHJcbiAgICAvLyAyLiBBdHRhY2ggZXZlbnQgbGlzdGVuZXIgdG8gYnV0dG9uIGluIGZvcm1cclxuICAgIHN1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5oYW5kbGVBZGROZXdGb29kKVxyXG5cclxuICAgIC8vIDMuIEFwcGVuZCB0aGUgSFRNTCBmb3JtIHRvIHRoZSBET01cclxuICAgIC8vTm90aWNlIHRoYXQgSSBoYXZlIGFkZGVkIGFuIGFydGljbGUgZWxlbWVudCB0byBteSBpbmRleC5odG1sIHdpdGggdGhlIGNsYXNzIFwiZm9ybVwiLlxyXG4gICAgbGV0IGZvb2RGb3JtRnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcclxuICAgIGZvb2RGb3JtRnJhZ21lbnQuYXBwZW5kQ2hpbGQoZm9ybUhlYWRlcilcclxuICAgIGZvb2RGb3JtRnJhZ21lbnQuYXBwZW5kQ2hpbGQobWVzc2FnZUZpZWxkKVxyXG4gICAgZm9vZEZvcm1GcmFnbWVudC5hcHBlbmRDaGlsZChtZXNzYWdlUGxhY2VIb2xkZXJGaWVsZClcclxuICAgIGZvb2RGb3JtRnJhZ21lbnQuYXBwZW5kQ2hpbGQoZm9vZFR5cGVGaWVsZClcclxuICAgIGZvb2RGb3JtRnJhZ21lbnQuYXBwZW5kQ2hpbGQoc3VibWl0QnV0dG9uKVxyXG5cclxuICAgIGxldCBmb3JtQXJ0aWNsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9ybVwiKTtcclxuICAgIGZvcm1BcnRpY2xlLmFwcGVuZENoaWxkKGZvb2RGb3JtRnJhZ21lbnQpO1xyXG5cclxuICB9LFxyXG4gIC8vIFRoaXMgbW9kdWxlIHdpbGwgYWxzbyBjb250YWluIHRoZSBmdW5jdGlvbiB0aGF0IGV4ZWN1dGVzIHdoZW4gdGhlIGJ1dHRvbiBpbiB0aGUgZm9ybSBpcyBjbGlja2VkLiBXaGVuIHRoZSBidXR0b24gaW4gdGhlIGZvcm0gaXMgY2xpY2tlZCwgdGhlIGZvbGxvd2luZyB3aWxsIGhhcHBlbjpcclxuICBoYW5kbGVBZGROZXdGb29kIChldmVudCkge1xyXG4gICAgLy8gMS4gR2V0IHVzZXIgaW5wdXQgdGhhdCB1c2VyIGVudGVyZWRcclxuICAgIGxldCBpbnB1dE1lc3NhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21lc3NhZ2VcIikudmFsdWVcclxuICAgIGxldCBpbnB1dEZvb2RFeHBpcmF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb29kX19leHBpcmF0aW9uXCIpLnZhbHVlXHJcbiAgICBsZXQgaW5wdXRGb29kVHlwZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9vZF9fdHlwZVwiKS52YWx1ZVxyXG5cclxuICAgIC8vIDIuIENyZWF0ZSBhIG5ldyBvYmplY3Qgd2l0aCB0aGUgc2FtZSBzdHJ1Y3R1cmUgd2UgaGF2ZSBiZWVuIHVzaW5nIHRocm91Z2hvdXQgdGhlIGFwcGxpY2F0aW9uIHRvIHJlcHJlc2VudCBhIGZvb2QgaXRlbTpcclxuICAgIC8vIHtcclxuICAgICAgLy8gICBuYW1lOiBcInVzZXIgaW5wdXQgbmFtZVwiLFxyXG4gICAgICAvLyAgIGV4cGlyYXRpb246IFwidXNlciBpbnB1dCBleHBpcmF0aW9uXCIsXHJcbiAgICAgIC8vICAgdHlwZTogXCJ1c2VyIGlucHV0IHR5cGVcIlxyXG4gICAgLy8gfVxyXG5cclxuICAgIGxldCBuZXdNZXNzYWdlID0ge1xyXG4gICAgICBuYW1lOiBpbnB1dE1lc3NhZ2UsXHJcbiAgICAgIGV4cGlyYXRpb246IGlucHV0Rm9vZEV4cGlyYXRpb24sXHJcbiAgICAgIHR5cGU6IGlucHV0Rm9vZFR5cGVcclxuICAgIH1cclxuXHJcbiAgICAvLyAzLiBDYWxsIHRoZSBtZXRob2QocG9zdE5ld0Zvb2QpIHdpdGggdGhlIGZldGNoIHJlcXVlc3QgdG8gUE9TVCB0byB0aGUgQVBJIGFuZCBwYXNzIGl0IHRoZSBvYmplY3Qgd2UgY3JlYXRlZCBpbiB0aGUgcHJldmlvdXMgc3RlcFxyXG5cclxuICAgIC8vIE5vdGljZSB0aGUgaW1wb3J0IHN0YXRlbWVudCBhdCB0aGUgdG9wIG9mIHRoZSBtb2R1bGUgc28gSSBjYW4gY2FsbCBhIG1ldGhvZCBpbiB0aGUgZm9vZENvbGxlY3Rpb24gbW9kdWxlLlxyXG5cclxuICAgIC8vICoqKioqSU1QT1JUQU5UKioqKipcclxuICAgIC8vIFlvdSB3aWxsIG5vdGljZSBhdCB0aGlzIHBvaW50IHRoYXQgd2hpbGUgYSBuZXcgZm9vZCBpdGVtIGlzIGJlaW5nIGFkZGVkIHRvIG91ciBBUEksIHVubGVzcyB5b3UgcmVmcmVzaCB0aGUgYXBwbGljYXRpb24sIHRoZSBuZXdseSBhZGRlZCBpdGVtIHdpbGwgbm90IHNob3cgdXAgb24gdGhlIERPTS4gV2UgZGVmaW5pdGVseSBkbyBub3Qgd2FudCBvdXIgdXNlciB0byBoYXZlIHRvIGhpdCByZWZyZXNoIGV2ZXJ5IHRpbWUgdGhleSBhZGQgbmV3IGZvb2QgdG8gdGhlaXIgcmVmcmlnZXJhdG9yLlxyXG5cclxuICAgIC8vIFdlIGFsc28gZG8gTk9UIHdhbnQgdG8gbWFudWFsbHkgYWRkIG91ciBuZXcgZm9vZCBpdGVtIHRvIHRoZSBsaXN0IG9mIGZvb2Qgb24gdGhlIERPTS4gSW5zdGVhZCwgd2Ugd2FudCBvdXIgZGF0YSB0byBiZSBvdXIgcG9pbnQgb2YgdHJ1dGguIE91ciBET00gc2hvdWxkIGFsd2F5cyB1c2UgdGhlIGRhdGEgZnJvbSBvdXIgQVBJIHRvIHJlbmRlciB0aGUgRE9NLiBMb2dpY2FsbHksIGhlcmUgYXJlIHRoZSBzdGVwcyB3ZSB3YW50IHRvIHRha2UgcGxhY2UuXHJcbiAgICAvLyAxLiBBZGQgbmV3IGZvb2QgaXRlbSB0byB0aGUgQVBJIHVzaW5nIGEgUE9TVCBIVFRQIHJlcXVlc3QuXHJcbiAgICAvLyAgICAgV2UgYXJlIGFscmVhZHkgZG9pbmcgdGhpcy4gV2UgYXJlIHVzaW5nIHRoZSBmZXRjaCBkZWZpbmVkIGluIHRoZSBmb29kQ29sbGVjdGlvbiBtb2R1bGUgdG8gYWRkIGEgbmV3IGZvb2QgaXRlbSB0byB0aGUgQVBJLlxyXG4gICAgLy8gMi4gQWZ0ZXIgdGhlIG5ldyBpdGVtIGhhcyBiZWVuIGFkZGVkLCB3ZSB3YW50IHRvIGdldCBhIGxpc3Qgb2YgYWxsIHRoZSBmb29kIGl0ZW1zICh1c2luZyBhIEdFVCBIVFRQIHJlcXVlc3QpIGFuZCByZW5kZXIgdGhlbSB0byB0aGUgRE9NLlxyXG4gICAgICAgICAgLy8gQmVjYXVzZSB3ZSB3YW50IHRvIG1ha2Ugc3VyZSB3ZSBvbmx5IGRvIHRoaXMgYWZ0ZXIgdGhlIGZpcnN0IHN0ZXAgaXMgZG9uZSwgd2Ugd2lsbCByZXR1cm4gdGhlIGZldGNoIGNhbGwgdGhhdCBpcyBkb2luZyB0aGUgUE9TVCBhbmQgY2hhaW4gYSAudGhlbiB0byB0aGUgY2FsbCAoanVzdCBsaWtlIHdlIGRvIHdpdGggdGhlIEdFVCkuIFRoaXMgbWVhbnMgd2UgYXJlIGRvaW5nIHRoZSBQT1NUIGFuZCB0aGVuIHdhaXRpbmcgdW50aWwgYSByZXNwb25zZSBjb21lcyBiYWNrIGJlZm9yZSBkb2luZyB0aGlzIHN0ZXAuIFRoZSByZWFzb24gd2Ugd2FudCB0byB3YWl0IGlzIGJlY2F1c2Ugd2Ugd2FudCB0byBiZSBzdXJlIHRoYXQgd2hlbiB3ZSBhc2sgb3VyIEFQSSBmb3IgdGhlIGxpc3Qgb2YgZm9vZCBpdGVtcywgdGhlIG5ld2x5IGFkZGVkIGl0ZW0gaXMgb24gdGhhdCBsaXN0LiBTbyB3ZSB3YWl0IHVudGlsIGl0IGhhcyBiZWVuIGFkZGVkIGJlZm9yZSB1c2luZyBhIEdFVCByZXF1ZXN0IHRvIGdldCBhIGxpc3Qgb2YgYWxsIGZvb2QgaXRlbXMgYW5kIHJlbmRlcmluZyB0aGVtIHRvIHRoZSBET00uXHJcbiAgICAgICAgICBcclxuICAgICAgICAgIC8vIEJ1dCB0aGF0IHNvdW5kcyBhd2Z1bGx5IGZhbWlsaWFyOiBtYWtlIGEgR0VUIEhUVFAgcmVxdWVzdCB0byB0aGUgQVBJIGZvciBhIGxpc3Qgb2YgYWxsIGZvb2QgaXRlbXMsIGl0ZXJhdGUgb3ZlciB0aGF0IGxpc3QgYW5kIGJ1aWxkIHRoZSBIVE1MIGZvciBlYWNoIGl0ZW0sIGFwcGVuZCB0aGUgSFRNTCB0byB0aGUgRE9NLiBUaGlzIGlzIGV4YWN0bHkgd2hhdCBvdXIgZnJpZGdpZnkgbWV0aG9kIGluIG91ciBmb29kTGlzdCBtb2R1bGUgaXMgYWxyZWFkeSBkb2luZy4gV2hpY2ggbWVhbnMgSSBjYW4gc2ltcGx5IGNhbGwgdGhhdCBtZXRob2QgZnJvbSBoZXJlLiBPbmNlIGFnYWluLCBub3RlIHRoYXQgSSBhbSBpbXBvcnRpbmcgdGhlIGFwcHJvcHJpYXRlIG1vZHVsZSBhdCB0aGUgdG9wIG9mIHRoaXMgZmlsZS5cclxuICAgIC8vIFRvIHN1bW1hcml6ZSwgd2UgYXJlIGFkZGluZyBhIG5ldyBpdGVtIHRvIHRoZSBBUEksIHRoZW4gZ2V0dGluZyBhbiB1cGRhdGVkIGxpc3Qgb2YgaXRlbXMgZnJvbSB0aGUgQVBJIGFuZCByZXJlbmRlcmluZyB0aGUgRE9NLlxyXG4gICAgLy8gKioqKioqKioqKioqKioqKioqKlxyXG4gICAgbWVzc2FnZXNDb2xsZWN0aW9uLnBvc3ROZXdNZXNzYWdlKG5ld01lc3NhZ2UpXHJcbiAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgIG1lc3NhZ2VzTGlzdC5mcmlkZ2lmeSgpXHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbWVzc2FnZXNGb3JtXHJcbiIsIi8vIFRoaXMgY29tcG9uZW50IHdpbGwgZ2V0IHRoZSBkYXRhLCBidWlsZCB0aGUgSFRNTCBmcm9tIHRoZSBkYXRhIGFuZCBhcHBlbmQgaXQgdG8gdGhlIERPTS5cclxuXHJcbi8vIFRvIGdldCB0aGUgZGF0YSwgd2Ugd2lsbCB1c2UgdGhlIGZvb2RDb2xsZWN0aW9uIGNvbXBvbmVudC5cclxuaW1wb3J0IGZvb2RDb2xsZWN0aW9uIGZyb20gXCIuL21lc3NhZ2VzQ29sbGVjdGlvblwiXHJcbi8vIFRvIGJ1aWxkIHRoZSBIVE1MIGZvciBlYWNoIG9iamVjdCBpbiB0aGUgYXJyYXkgb2YgZm9vZCh3aGljaCBpcyB3aGF0IHRoZSBkYXRhIGNvbWluZyBmcm9tIHRoZSBBUEkgYmVjb21lcyBvbmNlIHdlIHBhcnNlIGl0KSwgd2Ugd2lsbCB1c2UgdGhlIGZvb2QgY29tcG9uZW50LlxyXG5pbXBvcnQgZm9vZCBmcm9tIFwiLi9tZXNzYWdlc1wiXHJcblxyXG5jb25zdCBmb29kTGlzdCA9IHtcclxuICBmcmlkZ2lmeSgpe1xyXG4gICAgLy8gMS4gR2V0IGRhdGFcclxuICAgIC8vIFRoZSBnZXRBbGxGb29kcyBtZXRob2Qgd2lsbCBkbyBhIGZldGNoIGFuZCByZXR1cm4gYSBwcm9taXNlLiBUaGlzIGNhbGwgd2lsbCByZXR1cm4gdGhlIGRhdGEgZnJvbSB0aGUgQVBJIGluIHRoZSByZXNwb25zZS5cclxuICAgIGZvb2RDb2xsZWN0aW9uLmdldEFsbEZvb2RzKClcclxuICAgIC50aGVuKGFsbEZvb2RzID0+IHtcclxuXHJcbiAgICAgIC8vIEFuIGVtcHR5IGRvY3VtZW50IGZyYWdtZW50XHJcbiAgICAgIGxldCBmb29kRG9jRnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcclxuXHJcbiAgICAgIC8vIDIuIEl0ZXJhdGUgb3ZlciBkYXRhIGFuZCBidWlsZCBIVE1MIGZvciBlYWNoIGl0ZW1cclxuICAgICAgLy8gV2UgbG9vcCBvdmVyIHRoZSBhcnJheSBvZiBvYmplY3RzIHJldHVybmVkIGZyb20gb3VyIEFQSSBhbmQgZm9yIGVhY2ggb2JlY3QsIHdlIG1ha2UgYSBjYWxsIHRvIHRoZSBmb29kQnVpbGRlciBtZXRob2QgaW4gdGhlIGZvb2QgbW9kdWxlLiBUaGlzIG1ldGhvZCB0YWtlcyBhIGZvb2Qgb2JqZWN0IGFzIGFuIGFyZ3VtZW50IGFuZCByZXR1cm5zIGFuIEhUTUwgY29tcG9uZW50LiBPbmNlIHdlIGhhdmUgdGhhdCBIVE1MLCB3ZSBhcHBlbmQgaXQgdG8gb3VyIGRvY3VtZW50IGZyYWdtZW50IHNvIHRoYXQgaXQgaXMgc2xvd2x5IGJ1aWx0IHVwLiBCeSB0aGUgZW5kIG9mIHRoZSBmb3JFYWNoIGxvb3AsIG91ciBkb2N1bWVudCBmcmFnbWVudCBjb250YWlucyBhbGwgdGhlIEhUTUwgZm9yIGFsbCBvdXIgZGF0YS5cclxuICAgICAgYWxsRm9vZHMuZm9yRWFjaChmb29kSXRlbSA9PiB7XHJcbiAgICAgICAgbGV0IGZvb2RIdG1sID0gZm9vZC5mb29kQnVpbGRlcihmb29kSXRlbSlcclxuICAgICAgICBmb29kRG9jRnJhZ21lbnQuYXBwZW5kQ2hpbGQoZm9vZEh0bWwpXHJcbiAgICAgIH0pXHJcbiAgICAgIFxyXG4gICAgICAvLyAzLiBBcHBlbmQgdGhlIEhUTUwgdG8gdGhlIERPTVxyXG4gICAgICAvLyBXZSBnZXQgYSByZWZlcmVuY2UgdG8gYSBIVE1MIGVsZW1lbnQgd2l0aCB0aGUgY2xhc3MgXCJvdXRwdXRcIiBhbmQgYXBwZW5kIG91ciBkb2N1bWVudCBmcmFnbWVudCB0byB0aGF0IGVsZW1lbnQuIEJlY2F1c2UgdGhlIEhUTUwgZWxlbWVudCB3aXRoIGNsYXNzIFwib3V0cHV0XCIgaXMgYWxyZWFkeSBvbiB0aGUgRE9NLCB0aGUgSFRNTCBpbiB0aGUgZG9jdW1lbnQgZnJhZ21lbnQgaXMgYXBwZW5kZWQgdG8gdGhlIERPTS5cclxuICAgICAgbGV0IG91dHB1dEFydGljbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm91dHB1dFwiKVxyXG5cclxuICAgICAgLy9UaGlzIHdoaWxlIGxvb3AgZXNzZW50aWFsbHkgcmVtb3ZlcyBhbGwgY2hpbGQgbm9kZXMgb2YgYW4gZWxlbWVudCB1bnRpbCB0aGUgZWxlbWVudCBoYXMgbm8gY2hpbGQgbm9kZXMgbGVmdC4gSXQgaXMgZXF1aXZhbGVudCB0byB0aGUgZm9sbG93aW5nOlxyXG4gICAgICAvLyBvdXRwdXRBcnRpY2xlLmlubmVySFRNTCA9IFwiXCJcclxuXHJcbiAgICAgIC8vIElmIHdlIGRvIG5vdCBkbyB0aGlzLCBlYWNoIHRpbWUgd2UgYWRkIGEgbmV3IGZvb2QgaXRlbSB1c2luZyBvdXIgZm9ybSwgYWxsIHRoZSBmb29kIGl0ZW1zIHdpbGwgYmUgYXBwZW5kZWQgdG8gdGhlIGJvdHRvbSBvZiBvdXIgbGlzdCBzbyB0aGF0IHdlIHdpbGwgaGF2ZSBkdXBsaWNhdGVzLiBUbyB1bmRlcnN0YW5kIHdoeSB0aGlzIHdoaWxlIGxvb3AgaXMgbmVlZGVkLCB0cnkgY29tbWVudGluZyBpdCBvdXQgYW5kIG9ic2VydmUgdGhlIGJlaGF2aW9yIG9mIHRoZSBhcHBsaWNhdGlvbi4gRXNzZW50aWFsbHksIHdlIGFyZSBjbGVhcmluZyBvdXQgb3VyIG91dHB1dCBjb250YWluZXIgKG91ciBhcnRpY2xlIHRhZyB3aXRoIGNsYXNzIFwib3V0cHV0XCIpIHNvIHRoYXQgd2UgcmVwb3B1bGF0ZSBpdC5cclxuICAgICAgd2hpbGUgKG91dHB1dEFydGljbGUuZmlyc3RDaGlsZCkge1xyXG4gICAgICAgIG91dHB1dEFydGljbGUucmVtb3ZlQ2hpbGQob3V0cHV0QXJ0aWNsZS5maXJzdENoaWxkKTtcclxuICAgICAgfVxyXG4gICAgICBvdXRwdXRBcnRpY2xlLmFwcGVuZENoaWxkKGZvb2REb2NGcmFnbWVudClcclxuXHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZm9vZExpc3RcclxuIl19
