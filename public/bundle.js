(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const API = {
  getData(resource) {
    return fetch(`http://localhost:8088/${resource}`).then(response => response.json());
  },

  postNewData(resource, payload) {
    return fetch(`http://localhost:8088/${resource}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
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

var _register = _interopRequireDefault(require("./register"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userNameInput = document.createElement("input");
const passwordInput = document.createElement("input");
const registrationPage = document.querySelector(".output__registration");
const loginPage = document.querySelector(".output__login");
registrationPage.style.display = "none";
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
    const registerButton = document.createElement("button");
    registerButton.textContent = "register";
    outEl.appendChild(loginButton);
    outEl.appendChild(registerButton); // Runs the getUserData() function when Login button is clicked.

    loginButton.addEventListener("click", this.getUserData); // Runs the replaceWithRegistrationForm() function when Register button is clicked.

    registerButton.addEventListener("click", this.replaceWithRegistrationForm);
  },

  // Gathers data entered into Login input fields. Fetches userdata from API and compares input data with existing user data in API. If input data matches user data in API, runs loadUserSpecificPage(). If input data does not match any user data in API, alert is sent.
  getUserData() {
    const username = userNameInput.value;
    const password = passwordInput.value;

    _api.default.getData("users").then(allUsers => {
      let usersProcessed = 1;
      allUsers.forEach(user => {
        let formArticle2 = document.querySelector(".output__news");
        let userIdtytpe = sessionStorage.getItem('userId');

        if (userIdtytpe >= 1) {
          formArticle2.className = "output__news3";
        } else if (username === user.userName && password === user.password) {
          console.log(`This one: ${user.id}`);
          sessionStorage.setItem('userId', user.id);
          let userId = sessionStorage.getItem('userId');
          loadUserSpecificPage(userId);
        } else if (usersProcessed === allUsers.length) {
          alert("Username/password invalid. If new user, please register. :)");
        } else {
          usersProcessed++;
        }

        ; // This function will load the dashboard for the user that signed in. (Work in Progress)

        function loadUserSpecificPage(userId) {
          loginPage.style.display = "none";
          console.log(`This is the user page! ${userId}`);
          const dashboard = document.createElement("h2");
          const taskContainer = document.querySelector(".output__tasks");
          dashboard.textContent = "Dashboard";
          taskContainer.appendChild(dashboard);
        }
      });
    });
  },

  // Function to hide the login form and display the register form.  
  replaceWithRegistrationForm() {
    console.log("testing");
    const registrationPage = document.querySelector(".output__registration");
    const loginPage = document.querySelector(".output__login");
    loginPage.style.display = "none";
    registrationPage.style.display = "block";
  },

  // Function to hide the register form and display the login form.
  replaceWithLoginForm() {
    console.log("LoginForm");
    loginPage.style.display = "block";
    registrationPage.style.display = "none";
  }

};
var _default = login;
exports.default = _default;

},{"./api":1,"./register":9}],3:[function(require,module,exports){
"use strict";

var _login = _interopRequireDefault(require("./login"));

var _register = _interopRequireDefault(require("./register"));

var _newsList = _interopRequireDefault(require("./news/newsList"));

var _newsForm = _interopRequireDefault(require("./news/newsForm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_login.default.createAndAppendLoginInput();

_register.default.createAndAppendRegistrationForm();

_newsList.default.fridgify();

_newsForm.default.createAndAppendForm();

let formArticle2 = document.querySelector(".output__news");
let userIdtytpe = sessionStorage.getItem('userId');

if (userIdtytpe >= 1) {
  formArticle2.className = "output__news3";
}

},{"./login":2,"./news/newsForm":7,"./news/newsList":8,"./register":9}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _newsCollection = _interopRequireDefault(require("./newsCollection"));

var _newsList = _interopRequireDefault(require("./newsList"));

var _newsEditForm = _interopRequireDefault(require("./newsEditForm"));

var _login = _interopRequireDefault(require("../login"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const News = {
  NewsBuilder(NewsObject) {
    let NewsArticle = document.createElement("article");
    NewsArticle.setAttribute("id", `News--${NewsObject.id}`);
    let NewsName = document.createElement("h3");
    NewsName.textContent = NewsObject.name;
    let NewsExp = document.createElement("p");
    NewsExp.textContent = NewsObject.expiration;
    let NewsType = document.createElement("a");
    let NewsType2 = NewsObject.type;
    NewsType.textContent = NewsType2;
    NewsType.setAttribute("href", `${NewsType2}`);
    let editNewsButton = document.createElement("button");
    editNewsButton.textContent = "Edit";
    editNewsButton.addEventListener("click", () => {
      let articleId = event.target.parentNode.id;
      let NewsId = articleId.split("--")[1];

      _newsCollection.default.getNews(NewsId).then(response => {
        _newsEditForm.default.createAndAppendForm(articleId, response);
      });
    });
    let deleteNewsButton = document.createElement("button");
    deleteNewsButton.textContent = "Delete";
    deleteNewsButton.addEventListener("click", () => {
      let NewsId = event.target.parentNode.id.split("--")[1];

      _newsCollection.default.deleteNews(NewsId).then(response => {
        _newsList.default.fridgify();

        return response;
      });
    });
    NewsArticle.appendChild(NewsName);
    NewsArticle.appendChild(NewsExp);
    NewsArticle.appendChild(NewsType);
    NewsArticle.appendChild(editNewsButton);
    NewsArticle.appendChild(deleteNewsButton);
    return NewsArticle;
  }

};
var _default = News;
exports.default = _default;

},{"../login":2,"./newsCollection":5,"./newsEditForm":6,"./newsList":8}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const NewsCollection = {
  getAllNewss() {
    return fetch("http://localhost:8088/News").then(response => response.json());
  },

  getAllids(userids) {
    return fetch("http://localhost:8088/friends").then(response => response.json());
  },

  postNewNews(newNewsToSave) {
    return fetch("http://localhost:8088/News", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newNewsToSave)
    });
  },

  deleteNews(NewsId) {
    return fetch(`http://localhost:8088/News/${NewsId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
  },

  getNews(NewsId) {
    return fetch(`http://localhost:8088/News/${NewsId}`).then(response => response.json());
  },

  putExistingNews(NewsId, NewsToEdit) {
    return fetch(`http://localhost:8088/News/${NewsId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(NewsToEdit)
    });
  }

};
console.table(NewsCollection.getAllNewss());
console.table(NewsCollection.getAllids());
var _default = NewsCollection;
exports.default = _default;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _newsCollection = _interopRequireDefault(require("./newsCollection"));

var _newsList = _interopRequireDefault(require("./newsList"));

var _login = _interopRequireDefault(require("../login"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const NewsEditForm = {
  createAndAppendForm(articleId, NewsObjToEdit) {
    let NewsNameField = document.createElement("p");
    let NewsNameLabel = document.createElement("label");
    NewsNameLabel.textContent = "Title";
    let NewsNameInput = document.createElement("input");
    NewsNameInput.value = NewsObjToEdit.name;
    NewsNameField.appendChild(NewsNameLabel);
    NewsNameField.appendChild(NewsNameInput);
    let NewsExpirationField = document.createElement("p");
    let NewsExpirationLabel = document.createElement("label");
    NewsExpirationLabel.textContent = "Summary";
    let NewsExpirationInput = document.createElement("input");
    NewsExpirationInput.value = NewsObjToEdit.expiration;
    NewsExpirationField.appendChild(NewsExpirationLabel);
    NewsExpirationField.appendChild(NewsExpirationInput);
    let NewsTypeField = document.createElement("p");
    let NewsTypeLabel = document.createElement("label");
    NewsTypeLabel.textContent = "URL";
    let NewsTypeInput = document.createElement("input");
    NewsTypeInput.value = NewsObjToEdit.type;
    NewsTypeField.appendChild(NewsTypeLabel);
    NewsTypeField.appendChild(NewsTypeInput);
    let updateButton = document.createElement("button");
    updateButton.textContent = "Update";
    let userIdtytpe = sessionStorage.getItem('userId');
    updateButton.addEventListener("click", () => {
      let editedNews = {
        name: NewsNameInput.value,
        expiration: NewsExpirationInput.value,
        type: NewsTypeInput.value,
        userId: userIdtytpe
      };

      _newsCollection.default.putExistingNews(NewsObjToEdit.id, editedNews).then(response => {
        _newsList.default.fridgify();

        return response;
      });
    });
    let NewsItemArticle = document.querySelector(`#${articleId}`);

    while (NewsItemArticle.firstChild) {
      NewsItemArticle.removeChild(NewsItemArticle.firstChild);
    }

    NewsItemArticle.appendChild(NewsNameField);
    NewsItemArticle.appendChild(NewsExpirationField);
    NewsItemArticle.appendChild(NewsTypeField);
    NewsItemArticle.appendChild(updateButton);
  }

};
var _default = NewsEditForm;
exports.default = _default;

},{"../login":2,"./newsCollection":5,"./newsList":8}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _newsCollection = _interopRequireDefault(require("./newsCollection"));

var _newsList = _interopRequireDefault(require("./newsList"));

var _login = _interopRequireDefault(require("../login"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const NewsForm = {
  // This module will build a form and append it to the DOM. The form will contain input fields for a user to add a new News to their refrigerator and a button with an event listener that will listen for the click
  createAndAppendForm() {
    // 1. Build HTML form
    let formHeader = document.createElement("h3");
    formHeader.textContent = "Your Spooky News ";
    let NewsNameField = document.createElement("fieldset");
    let NewsNameLabel = document.createElement("label");
    NewsNameLabel.textContent = "Title";
    NewsNameLabel.setAttribute("for", "News__name");
    let NewsNameInput = document.createElement("input");
    NewsNameInput.setAttribute("id", "News__name");
    NewsNameInput.setAttribute("name", "News__name");
    NewsNameField.appendChild(NewsNameLabel);
    NewsNameField.appendChild(NewsNameInput);
    let NewsExpirationField = document.createElement("fieldset");
    let NewsExpirationLabel = document.createElement("label");
    NewsExpirationLabel.textContent = "Summary";
    NewsExpirationLabel.setAttribute("for", "News__expiration");
    let NewsExpirationInput = document.createElement("input");
    NewsExpirationInput.setAttribute("id", "News__expiration");
    NewsExpirationInput.setAttribute("name", "News__expiration");
    NewsExpirationField.appendChild(NewsExpirationLabel);
    NewsExpirationField.appendChild(NewsExpirationInput);
    let NewsTypeField = document.createElement("fieldset");
    let NewsTypeLabel = document.createElement("label");
    NewsTypeLabel.textContent = "URL";
    NewsTypeLabel.setAttribute("for", "News__type");
    let NewsTypeInput = document.createElement("input");
    NewsTypeInput.setAttribute("id", "News__type");
    NewsTypeInput.setAttribute("name", "News__type");
    NewsTypeField.appendChild(NewsTypeLabel);
    NewsTypeField.appendChild(NewsTypeInput);
    let submitButton = document.createElement("button");
    submitButton.textContent = "Add Article";
    submitButton.setAttribute("class", "News__save"); // 2. Attach event listener to button in form

    submitButton.addEventListener("click", this.handleAddNewNews); // 3. Append the HTML form to the DOM
    //Notice that I have added an article element to my index.html with the class "form".

    let NewsFormFragment = document.createDocumentFragment();
    NewsFormFragment.appendChild(formHeader);
    NewsFormFragment.appendChild(NewsNameField);
    NewsFormFragment.appendChild(NewsExpirationField);
    NewsFormFragment.appendChild(NewsTypeField);
    NewsFormFragment.appendChild(submitButton);
    let formArticle = document.querySelector(".output__news");
    formArticle.appendChild(NewsFormFragment);
  },

  handleAddNewNews() {
    let inputNewsName = document.querySelector("#News__name").value;
    let inputNewsExpiration = document.querySelector("#News__expiration").value;
    let inputNewsType = document.querySelector("#News__type").value;
    let userIdtytpe = sessionStorage.getItem('userId');
    let newNews = {
      name: inputNewsName,
      expiration: inputNewsExpiration,
      type: inputNewsType,
      userId: userIdtytpe
    };

    _newsCollection.default.postNewNews(newNews).then(response => {
      _newsList.default.fridgify();

      return response;
    });
  }

};
var _default = NewsForm;
exports.default = _default;

},{"../login":2,"./newsCollection":5,"./newsList":8}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _newsCollection = _interopRequireDefault(require("./newsCollection"));

var _news = _interopRequireDefault(require("./news"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const NewsList = {
  fridgify() {
    _newsCollection.default.getAllNewss().then(allNewss => {
      let NewsDocFragment = document.createDocumentFragment();
      let UserId2 = sessionStorage.getItem('userId');
      console.log(UserId2);
      allNewss.forEach(NewsItem => {
        if (UserId2 === NewsItem.userId) {
          let NewsHtml = _news.default.NewsBuilder(NewsItem);

          NewsDocFragment.appendChild(NewsHtml);
        }
      });
      let outputArticle = document.querySelector(".output__newsSection2");

      while (outputArticle.firstChild) {
        outputArticle.removeChild(outputArticle.firstChild);
      }

      outputArticle.appendChild(NewsDocFragment);
    });
  }

};
var _default = NewsList;
exports.default = _default;

},{"./news":4,"./newsCollection":5}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _api = _interopRequireDefault(require("./api"));

var _login = _interopRequireDefault(require("./login"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Declare variables to hold user input
const userNameInput = document.createElement("input");
const userPasswordInput = document.createElement("input");
const userEmailInput = document.createElement("input");
const createNewUser = document.createElement("button"); // Declare variable to be exported

const registrationForm = {
  // This module will build a form and append it to the DOM. The form will contain input fields for a user to add themselves to the database of registered users and a button with an event listener that will listen for the click
  createAndAppendRegistrationForm() {
    const registerContainer = document.querySelector(".output__registration");
    const registerHeader = document.createElement("h3");
    registerContainer.appendChild(registerHeader);
    registerHeader.textContent = "Register User"; // setting type for variables

    userNameInput.type = "text";
    userPasswordInput.type = "text";
    userEmailInput.type = "text"; // Create what the user sees in fields

    userNameInput.placeholder = "Input UserName";
    userPasswordInput.placeholder = "Create Password";
    userEmailInput.placeholder = "Input Email Address";
    createNewUser.textContent = "Register User"; // Add fields to DOM

    registerContainer.appendChild(userNameInput);
    registerContainer.appendChild(userPasswordInput);
    registerContainer.appendChild(userEmailInput);
    registerContainer.appendChild(createNewUser); // Add event listener to createNewUser button

    createNewUser.addEventListener("click", this.registerUser);
  },

  registerUser() {
    const userNameValue = userNameInput.value;
    const userPasswordValue = userPasswordInput.value;
    const userEmailValue = userEmailInput.value;
    let newUserToSave = {
      userName: userNameValue,
      password: userPasswordValue,
      email: userEmailValue
    };

    _api.default.postNewData("users", newUserToSave);

    _login.default.replaceWithLoginForm();
  }

};
var _default = registrationForm;
exports.default = _default;

},{"./api":1,"./login":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2FwaS5qcyIsIi4uL3NjcmlwdHMvbG9naW4uanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL25ld3MvbmV3cy5qcyIsIi4uL3NjcmlwdHMvbmV3cy9uZXdzQ29sbGVjdGlvbi5qcyIsIi4uL3NjcmlwdHMvbmV3cy9uZXdzRWRpdEZvcm0uanMiLCIuLi9zY3JpcHRzL25ld3MvbmV3c0Zvcm0uanMiLCIuLi9zY3JpcHRzL25ld3MvbmV3c0xpc3QuanMiLCIuLi9zY3JpcHRzL3JlZ2lzdGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDQUEsTUFBTSxHQUFHLEdBQUc7QUFFUixFQUFBLE9BQU8sQ0FBQyxRQUFELEVBQVc7QUFDZCxXQUFPLEtBQUssQ0FBRSx5QkFBd0IsUUFBUyxFQUFuQyxDQUFMLENBQ04sSUFETSxDQUNELFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBVCxFQURYLENBQVA7QUFFSCxHQUxPOztBQU1SLEVBQUEsV0FBVyxDQUFDLFFBQUQsRUFBVSxPQUFWLEVBQW1CO0FBQzFCLFdBQU8sS0FBSyxDQUFFLHlCQUF3QixRQUFTLEVBQW5DLEVBQXNDO0FBQ2hELE1BQUEsTUFBTSxFQUFFLE1BRHdDO0FBRWhELE1BQUEsT0FBTyxFQUFFO0FBQ0wsd0JBQWdCO0FBRFgsT0FGdUM7QUFLaEQsTUFBQSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQUwsQ0FBZSxPQUFmO0FBTDBDLEtBQXRDLENBQVo7QUFPRDs7QUFkSyxDQUFaLEMsQ0FvQkE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUFsQixDQUE4QixpQkFBOUI7QUFDQSxJQUFBLGlCQUFpQixDQUFDLFdBQWxCLENBQThCLGNBQTlCO0FBQ0EsSUFBQSxpQkFBaUIsQ0FBQyxXQUFsQixDQUE4QixhQUE5QixFQTFCbUMsQ0E0Qm5DOztBQUVBLElBQUEsYUFBYSxDQUFDLGdCQUFkLENBQStCLE9BQS9CLEVBQXdDLEtBQUssWUFBN0M7QUFDQyxHQWxDb0I7O0FBb0NyQixFQUFBLFlBQVksR0FBSTtBQUNaLFVBQU0sYUFBYSxHQUFHLGFBQWEsQ0FBQyxLQUFwQztBQUNBLFVBQU0saUJBQWlCLEdBQUcsaUJBQWlCLENBQUMsS0FBNUM7QUFDQSxVQUFNLGNBQWMsR0FBRyxjQUFjLENBQUMsS0FBdEM7QUFFQSxRQUFJLGFBQWEsR0FBRztBQUNoQixNQUFBLFFBQVEsRUFBRSxhQURNO0FBRWhCLE1BQUEsUUFBUSxFQUFFLGlCQUZNO0FBR2hCLE1BQUEsS0FBSyxFQUFFO0FBSFMsS0FBcEI7O0FBTUEsaUJBQUksV0FBSixDQUFnQixPQUFoQixFQUF3QixhQUF4Qjs7QUFFQSxtQkFBTSxvQkFBTjtBQUNIOztBQWxEb0IsQ0FBekI7ZUFzRGlCLGdCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY29uc3QgQVBJID0ge1xyXG5cclxuICAgIGdldERhdGEocmVzb3VyY2UpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC8ke3Jlc291cmNlfWApXHJcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgfSxcclxuICAgIHBvc3ROZXdEYXRhKHJlc291cmNlLHBheWxvYWQpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC8ke3Jlc291cmNlfWAsIHtcclxuICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkKVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuXHJcbn1cclxuXHJcblxyXG5cclxuLy8gICAgIGdldEFsbFVzZXJzKCkge1xyXG4vLyAgICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC91c2Vyc1wiKVxyXG4vLyAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuLy8gICAgICAgfSxcclxuXHJcbi8vICAgICBnZXRBbGxNZXNzYWdlcygpIHtcclxuLy8gICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvbWVzc2FnZXNcIilcclxuLy8gICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKVxyXG4vLyAgICAgICB9LFxyXG5cclxuLy8gICAgIGdldEFsbE5ld3NBcnRpY2xlcygpIHtcclxuLy8gICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvbmV3c0FydGljbGVzXCIpXHJcbi8vICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4vLyAgICAgICB9LFxyXG5cclxuLy8gICAgIGdldEFsbFRhc2tzKCkge1xyXG4vLyAgICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC90YXNrc1wiKVxyXG4vLyAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuLy8gICAgICAgfSxcclxuXHJcbi8vICAgICBnZXRBbGxFdmVudHMoKSB7XHJcbi8vICAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2V2ZW50c1wiKVxyXG4vLyAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuLy8gICAgICAgfSxcclxuXHJcbi8vICAgICBnZXRBbGxGcmllbmRzKCkge1xyXG4vLyAgICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9mcmllbmRzXCIpXHJcbi8vICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4vLyAgICAgICB9LFxyXG5cclxuXHJcbi8vICAgICBwb3N0TmV3VXNlcihuZXdVc2VyVG9BZGQpIHtcclxuLy8gICAgIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L3VzZXJzXCIsIHtcclxuLy8gICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4vLyAgICAgICAgIGhlYWRlcnM6IHtcclxuLy8gICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuLy8gICAgICAgICB9LFxyXG4vLyAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5ld1VzZXJUb0FkZClcclxuLy8gICAgIH0pXHJcbi8vICAgICB9LFxyXG5cclxuLy8gICAgIHBvc3ROZXdNZXNzYWdlKG5ld01lc3NhZ2VUb0FkZCkge1xyXG4vLyAgICAgICAgIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L21lc3NhZ2VzXCIsIHtcclxuLy8gICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuLy8gICAgICAgICAgICAgaGVhZGVyczoge1xyXG4vLyAgICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuLy8gICAgICAgICAgICAgfSxcclxuLy8gICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobmV3TWVzc2FnZVRvQWRkKVxyXG4vLyAgICAgfSlcclxuLy8gICAgIH0sXHJcblxyXG4vLyAgICAgcG9zdE5ld05ld3NBcnRpY2xlKG5ld05ld3NBcnRpY2xlVG9BZGQpIHtcclxuLy8gICAgIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L25ld3NBcnRpY2xlc1wiLCB7XHJcbi8vICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuLy8gICAgICAgICBoZWFkZXJzOiB7XHJcbi8vICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbi8vICAgICAgICAgfSxcclxuLy8gICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShuZXdOZXdzQXJ0aWNsZVRvQWRkKVxyXG4vLyAgICAgfSlcclxuLy8gICAgIH0sXHJcblxyXG4vLyAgICAgcG9zdE5ld1Rhc2sobmV3VGFza1RvQWRkKSB7XHJcbi8vICAgICAgICAgZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvdGFza3NcIiwge1xyXG4vLyAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4vLyAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbi8vICAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4vLyAgICAgICAgICAgICB9LFxyXG4vLyAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShuZXdUYXNrVG9BZGQpXHJcbi8vICAgICB9KVxyXG4vLyAgICAgfSxcclxuXHJcblxyXG4vLyB9XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBUEkiLCJpbXBvcnQgQVBJIGZyb20gXCIuL2FwaVwiXHJcbmltcG9ydCByZWdpc3RyYXRpb25Gb3JtIGZyb20gXCIuL3JlZ2lzdGVyXCJcclxuY29uc3QgdXNlck5hbWVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuY29uc3QgcGFzc3dvcmRJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuY29uc3QgcmVnaXN0cmF0aW9uUGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub3V0cHV0X19yZWdpc3RyYXRpb25cIilcclxuY29uc3QgbG9naW5QYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vdXRwdXRfX2xvZ2luXCIpO1xyXG5yZWdpc3RyYXRpb25QYWdlLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuXHJcbmNvbnN0IGxvZ2luID0ge1xyXG4gICAgLy8gRnVuY3Rpb24gdG8gY3JlYXRlIGFuZCBhcHBlbmQgbG9naW4gaW5wdXQgZmllbGRzIGFuZCBsb2dpbiBidXR0b24uXHJcbiAgICBjcmVhdGVBbmRBcHBlbmRMb2dpbklucHV0KCkge1xyXG5cclxuICAgICAgICBjb25zdCBvdXRFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub3V0cHV0X19sb2dpblwiKTtcclxuICAgICAgICB1c2VyTmFtZUlucHV0LnR5cGUgPSBcInRleHRcIjtcclxuICAgICAgICB1c2VyTmFtZUlucHV0LnBsYWNlaG9sZGVyID0gXCJ1c2VybmFtZVwiO1xyXG4gICAgICAgIHBhc3N3b3JkSW5wdXQudHlwZSA9IFwicGFzc3dvcmRcIjtcclxuICAgICAgICBwYXNzd29yZElucHV0LnBsYWNlaG9sZGVyID0gXCJwYXNzd29yZFwiO1xyXG4gICAgICAgIG91dEVsLmFwcGVuZENoaWxkKHVzZXJOYW1lSW5wdXQpO1xyXG4gICAgICAgIG91dEVsLmFwcGVuZENoaWxkKHBhc3N3b3JkSW5wdXQpO1xyXG5cclxuICAgICAgICBjb25zdCBsb2dpbkJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICAgICAgbG9naW5CdXR0b24udGV4dENvbnRlbnQgPSAoXCJsb2dpblwiKTtcclxuICAgICAgICBjb25zdCByZWdpc3RlckJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICAgICAgcmVnaXN0ZXJCdXR0b24udGV4dENvbnRlbnQgPSAoXCJyZWdpc3RlclwiKTtcclxuICAgICAgICBvdXRFbC5hcHBlbmRDaGlsZChsb2dpbkJ1dHRvbik7XHJcbiAgICAgICAgb3V0RWwuYXBwZW5kQ2hpbGQocmVnaXN0ZXJCdXR0b24pO1xyXG4gICAgICAgIC8vIFJ1bnMgdGhlIGdldFVzZXJEYXRhKCkgZnVuY3Rpb24gd2hlbiBMb2dpbiBidXR0b24gaXMgY2xpY2tlZC5cclxuICAgICAgICBsb2dpbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5nZXRVc2VyRGF0YSk7XHJcbiAgICAgICAgLy8gUnVucyB0aGUgcmVwbGFjZVdpdGhSZWdpc3RyYXRpb25Gb3JtKCkgZnVuY3Rpb24gd2hlbiBSZWdpc3RlciBidXR0b24gaXMgY2xpY2tlZC5cclxuICAgICAgICByZWdpc3RlckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5yZXBsYWNlV2l0aFJlZ2lzdHJhdGlvbkZvcm0pO1xyXG4gICAgfSxcclxuICAgIC8vIEdhdGhlcnMgZGF0YSBlbnRlcmVkIGludG8gTG9naW4gaW5wdXQgZmllbGRzLiBGZXRjaGVzIHVzZXJkYXRhIGZyb20gQVBJIGFuZCBjb21wYXJlcyBpbnB1dCBkYXRhIHdpdGggZXhpc3RpbmcgdXNlciBkYXRhIGluIEFQSS4gSWYgaW5wdXQgZGF0YSBtYXRjaGVzIHVzZXIgZGF0YSBpbiBBUEksIHJ1bnMgbG9hZFVzZXJTcGVjaWZpY1BhZ2UoKS4gSWYgaW5wdXQgZGF0YSBkb2VzIG5vdCBtYXRjaCBhbnkgdXNlciBkYXRhIGluIEFQSSwgYWxlcnQgaXMgc2VudC5cclxuICAgIGdldFVzZXJEYXRhKCkge1xyXG4gICAgICAgIGNvbnN0IHVzZXJuYW1lID0gdXNlck5hbWVJbnB1dC52YWx1ZTtcclxuICAgICAgICBjb25zdCBwYXNzd29yZCA9IHBhc3N3b3JkSW5wdXQudmFsdWU7XHJcbiAgICAgICAgQVBJLmdldERhdGEoXCJ1c2Vyc1wiKVxyXG4gICAgICAgICAgICAudGhlbihhbGxVc2VycyA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdXNlcnNQcm9jZXNzZWQgPSAxO1xyXG4gICAgICAgICAgICAgICAgYWxsVXNlcnMuZm9yRWFjaCh1c2VyID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZvcm1BcnRpY2xlMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub3V0cHV0X19uZXdzXCIpXHJcbmxldCB1c2VySWR0eXRwZSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3VzZXJJZCcpO1xyXG5pZiAodXNlcklkdHl0cGUgPj0gMSkge1xyXG4gIGZvcm1BcnRpY2xlMi5jbGFzc05hbWUgPSBcIm91dHB1dF9fbmV3czNcIlxyXG59XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXNlcm5hbWUgPT09IHVzZXIudXNlck5hbWUgJiYgcGFzc3dvcmQgPT09IHVzZXIucGFzc3dvcmQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFRoaXMgb25lOiAke3VzZXIuaWR9YClcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgndXNlcklkJywgdXNlci5pZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHVzZXJJZCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3VzZXJJZCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9hZFVzZXJTcGVjaWZpY1BhZ2UodXNlcklkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh1c2Vyc1Byb2Nlc3NlZCA9PT0gYWxsVXNlcnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiVXNlcm5hbWUvcGFzc3dvcmQgaW52YWxpZC4gSWYgbmV3IHVzZXIsIHBsZWFzZSByZWdpc3Rlci4gOilcIilcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2Vyc1Byb2Nlc3NlZCsrXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBUaGlzIGZ1bmN0aW9uIHdpbGwgbG9hZCB0aGUgZGFzaGJvYXJkIGZvciB0aGUgdXNlciB0aGF0IHNpZ25lZCBpbi4gKFdvcmsgaW4gUHJvZ3Jlc3MpXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gbG9hZFVzZXJTcGVjaWZpY1BhZ2UodXNlcklkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZ2luUGFnZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBUaGlzIGlzIHRoZSB1c2VyIHBhZ2UhICR7dXNlcklkfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXNoYm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhc2tDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm91dHB1dF9fdGFza3NcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhc2hib2FyZC50ZXh0Q29udGVudCA9IFwiRGFzaGJvYXJkXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQoZGFzaGJvYXJkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgfSxcclxuICAgIC8vIEZ1bmN0aW9uIHRvIGhpZGUgdGhlIGxvZ2luIGZvcm0gYW5kIGRpc3BsYXkgdGhlIHJlZ2lzdGVyIGZvcm0uICBcclxuICAgIHJlcGxhY2VXaXRoUmVnaXN0cmF0aW9uRm9ybSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInRlc3RpbmdcIik7XHJcbiAgICAgICAgY29uc3QgcmVnaXN0cmF0aW9uUGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub3V0cHV0X19yZWdpc3RyYXRpb25cIilcclxuICAgICAgICBjb25zdCBsb2dpblBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm91dHB1dF9fbG9naW5cIik7XHJcbiAgICAgICAgbG9naW5QYWdlLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICByZWdpc3RyYXRpb25QYWdlLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICB9LFxyXG4gICAgLy8gRnVuY3Rpb24gdG8gaGlkZSB0aGUgcmVnaXN0ZXIgZm9ybSBhbmQgZGlzcGxheSB0aGUgbG9naW4gZm9ybS5cclxuICAgIHJlcGxhY2VXaXRoTG9naW5Gb3JtKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTG9naW5Gb3JtXCIpO1xyXG4gICAgICAgIGxvZ2luUGFnZS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgIHJlZ2lzdHJhdGlvblBhZ2Uuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxvZ2luIiwiaW1wb3J0IGxvZ2luIGZyb20gXCIuL2xvZ2luXCJcclxuaW1wb3J0IHJlZ2lzdHJhdGlvbkZvcm0gZnJvbSBcIi4vcmVnaXN0ZXJcIjtcclxubG9naW4uY3JlYXRlQW5kQXBwZW5kTG9naW5JbnB1dCgpO1xyXG5yZWdpc3RyYXRpb25Gb3JtLmNyZWF0ZUFuZEFwcGVuZFJlZ2lzdHJhdGlvbkZvcm0oKTtcclxuaW1wb3J0IE5ld3NMaXN0IGZyb20gXCIuL25ld3MvbmV3c0xpc3RcIlxyXG5pbXBvcnQgTmV3c0Zvcm0gZnJvbSBcIi4vbmV3cy9uZXdzRm9ybVwiXHJcbk5ld3NMaXN0LmZyaWRnaWZ5KClcclxuTmV3c0Zvcm0uY3JlYXRlQW5kQXBwZW5kRm9ybSgpXHJcbmxldCBmb3JtQXJ0aWNsZTIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm91dHB1dF9fbmV3c1wiKVxyXG5sZXQgdXNlcklkdHl0cGUgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd1c2VySWQnKTtcclxuaWYgKHVzZXJJZHR5dHBlID49IDEpIHtcclxuICBmb3JtQXJ0aWNsZTIuY2xhc3NOYW1lID0gXCJvdXRwdXRfX25ld3MzXCJcclxufSIsImltcG9ydCBOZXdzQ29sbGVjdGlvbiBmcm9tIFwiLi9uZXdzQ29sbGVjdGlvblwiXHJcbmltcG9ydCBOZXdzTGlzdCBmcm9tIFwiLi9uZXdzTGlzdFwiXHJcbmltcG9ydCBOZXdzRWRpdEZvcm0gZnJvbSBcIi4vbmV3c0VkaXRGb3JtXCJcclxuaW1wb3J0IGxvZ2luIGZyb20gXCIuLi9sb2dpblwiXHJcblxyXG5cclxuY29uc3QgTmV3cyA9IHtcclxuXHJcbiAgTmV3c0J1aWxkZXIoTmV3c09iamVjdCkge1xyXG4gICAgbGV0IE5ld3NBcnRpY2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFydGljbGVcIilcclxuICAgIE5ld3NBcnRpY2xlLnNldEF0dHJpYnV0ZShcImlkXCIsIGBOZXdzLS0ke05ld3NPYmplY3QuaWR9YClcclxuXHJcbiAgICBsZXQgTmV3c05hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIilcclxuICAgIE5ld3NOYW1lLnRleHRDb250ZW50ID0gTmV3c09iamVjdC5uYW1lXHJcblxyXG4gICAgbGV0IE5ld3NFeHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKVxyXG4gICAgTmV3c0V4cC50ZXh0Q29udGVudCA9IE5ld3NPYmplY3QuZXhwaXJhdGlvblxyXG5cclxuICAgIGxldCBOZXdzVHlwZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpXHJcbiAgICBsZXQgTmV3c1R5cGUyID0gTmV3c09iamVjdC50eXBlXHJcbiAgICBOZXdzVHlwZS50ZXh0Q29udGVudCA9IE5ld3NUeXBlMlxyXG4gICAgTmV3c1R5cGUuc2V0QXR0cmlidXRlKFwiaHJlZlwiLCBgJHtOZXdzVHlwZTJ9YClcclxuICAgIGxldCBlZGl0TmV3c0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIilcclxuICAgIGVkaXROZXdzQnV0dG9uLnRleHRDb250ZW50ID0gXCJFZGl0XCJcclxuICAgIGVkaXROZXdzQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgIGxldCBhcnRpY2xlSWQgPSBldmVudC50YXJnZXQucGFyZW50Tm9kZS5pZFxyXG4gICAgICBsZXQgTmV3c0lkID0gYXJ0aWNsZUlkLnNwbGl0KFwiLS1cIilbMV1cclxuICAgICAgTmV3c0NvbGxlY3Rpb24uZ2V0TmV3cyhOZXdzSWQpXHJcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgTmV3c0VkaXRGb3JtLmNyZWF0ZUFuZEFwcGVuZEZvcm0oYXJ0aWNsZUlkLCByZXNwb25zZSlcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxuICAgIGxldCBkZWxldGVOZXdzQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKVxyXG4gICAgZGVsZXRlTmV3c0J1dHRvbi50ZXh0Q29udGVudCA9IFwiRGVsZXRlXCJcclxuICAgIGRlbGV0ZU5ld3NCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgbGV0IE5ld3NJZCA9IGV2ZW50LnRhcmdldC5wYXJlbnROb2RlLmlkLnNwbGl0KFwiLS1cIilbMV1cclxuICAgICAgTmV3c0NvbGxlY3Rpb24uZGVsZXRlTmV3cyhOZXdzSWQpXHJcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgTmV3c0xpc3QuZnJpZGdpZnkoKVxyXG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlXHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcblxyXG5cclxuXHJcbiAgICBOZXdzQXJ0aWNsZS5hcHBlbmRDaGlsZChOZXdzTmFtZSlcclxuICAgIE5ld3NBcnRpY2xlLmFwcGVuZENoaWxkKE5ld3NFeHApXHJcbiAgICBOZXdzQXJ0aWNsZS5hcHBlbmRDaGlsZChOZXdzVHlwZSlcclxuICAgIE5ld3NBcnRpY2xlLmFwcGVuZENoaWxkKGVkaXROZXdzQnV0dG9uKVxyXG4gICAgTmV3c0FydGljbGUuYXBwZW5kQ2hpbGQoZGVsZXRlTmV3c0J1dHRvbilcclxuXHJcbiAgICByZXR1cm4gTmV3c0FydGljbGVcclxufVxyXG59ICBcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBOZXdzXHJcbiIsIlxyXG5jb25zdCBOZXdzQ29sbGVjdGlvbiA9IHtcclxuICAgIGdldEFsbE5ld3NzKCkge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9OZXdzXCIpXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgIH0sXHJcbiAgICBcclxuICAgIGdldEFsbGlkcyh1c2VyaWRzKSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2ZyaWVuZHNcIilcclxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgcG9zdE5ld05ld3MobmV3TmV3c1RvU2F2ZSkge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9OZXdzXCIsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobmV3TmV3c1RvU2F2ZSlcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGRlbGV0ZU5ld3MoTmV3c0lkKSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvTmV3cy8ke05ld3NJZH1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgZ2V0TmV3cyhOZXdzSWQpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9OZXdzLyR7TmV3c0lkfWApXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgIH0sXHJcbiAgICBwdXRFeGlzdGluZ05ld3MoTmV3c0lkLCBOZXdzVG9FZGl0KSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvTmV3cy8ke05ld3NJZH1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQVVRcIixcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoTmV3c1RvRWRpdClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcbmNvbnNvbGUudGFibGUoTmV3c0NvbGxlY3Rpb24uZ2V0QWxsTmV3c3MoKSlcclxuY29uc29sZS50YWJsZShOZXdzQ29sbGVjdGlvbi5nZXRBbGxpZHMoKSlcclxuZXhwb3J0IGRlZmF1bHQgTmV3c0NvbGxlY3Rpb25cclxuIiwiaW1wb3J0IE5ld3NDb2xsZWN0aW9uIGZyb20gXCIuL25ld3NDb2xsZWN0aW9uXCJcclxuaW1wb3J0IE5ld3NMaXN0IGZyb20gXCIuL25ld3NMaXN0XCJcclxuaW1wb3J0IGxvZ2luIGZyb20gXCIuLi9sb2dpblwiXHJcbmNvbnN0IE5ld3NFZGl0Rm9ybSA9IHtcclxuICBjcmVhdGVBbmRBcHBlbmRGb3JtKGFydGljbGVJZCwgTmV3c09ialRvRWRpdCkge1xyXG5cclxuICAgIGxldCBOZXdzTmFtZUZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIilcclxuXHJcbiAgICBsZXQgTmV3c05hbWVMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKVxyXG4gICAgTmV3c05hbWVMYWJlbC50ZXh0Q29udGVudCA9IFwiVGl0bGVcIlxyXG4gICAgbGV0IE5ld3NOYW1lSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIilcclxuICAgIE5ld3NOYW1lSW5wdXQudmFsdWUgPSBOZXdzT2JqVG9FZGl0Lm5hbWVcclxuXHJcbiAgICBOZXdzTmFtZUZpZWxkLmFwcGVuZENoaWxkKE5ld3NOYW1lTGFiZWwpXHJcbiAgICBOZXdzTmFtZUZpZWxkLmFwcGVuZENoaWxkKE5ld3NOYW1lSW5wdXQpXHJcblxyXG4gICAgbGV0IE5ld3NFeHBpcmF0aW9uRmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKVxyXG5cclxuICAgIGxldCBOZXdzRXhwaXJhdGlvbkxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpXHJcbiAgICBOZXdzRXhwaXJhdGlvbkxhYmVsLnRleHRDb250ZW50ID0gXCJTdW1tYXJ5XCJcclxuICAgIGxldCBOZXdzRXhwaXJhdGlvbklucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpXHJcbiAgICBOZXdzRXhwaXJhdGlvbklucHV0LnZhbHVlID0gTmV3c09ialRvRWRpdC5leHBpcmF0aW9uXHJcblxyXG4gICAgTmV3c0V4cGlyYXRpb25GaWVsZC5hcHBlbmRDaGlsZChOZXdzRXhwaXJhdGlvbkxhYmVsKVxyXG4gICAgTmV3c0V4cGlyYXRpb25GaWVsZC5hcHBlbmRDaGlsZChOZXdzRXhwaXJhdGlvbklucHV0KVxyXG5cclxuICAgIGxldCBOZXdzVHlwZUZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIilcclxuXHJcbiAgICBsZXQgTmV3c1R5cGVMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKVxyXG4gICAgTmV3c1R5cGVMYWJlbC50ZXh0Q29udGVudCA9IFwiVVJMXCJcclxuICAgIGxldCBOZXdzVHlwZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpXHJcbiAgICBOZXdzVHlwZUlucHV0LnZhbHVlID0gTmV3c09ialRvRWRpdC50eXBlXHJcbiAgICBOZXdzVHlwZUZpZWxkLmFwcGVuZENoaWxkKE5ld3NUeXBlTGFiZWwpXHJcbiAgICBOZXdzVHlwZUZpZWxkLmFwcGVuZENoaWxkKE5ld3NUeXBlSW5wdXQpXHJcblxyXG4gICAgbGV0IHVwZGF0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIilcclxuICAgIHVwZGF0ZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiVXBkYXRlXCJcclxuICAgIGxldCB1c2VySWR0eXRwZSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3VzZXJJZCcpO1xyXG4gICAgdXBkYXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgIGxldCBlZGl0ZWROZXdzID0ge1xyXG4gICAgICAgIG5hbWU6IE5ld3NOYW1lSW5wdXQudmFsdWUsXHJcbiAgICAgICAgZXhwaXJhdGlvbjogTmV3c0V4cGlyYXRpb25JbnB1dC52YWx1ZSxcclxuICAgICAgICB0eXBlOiBOZXdzVHlwZUlucHV0LnZhbHVlLFxyXG4gICAgICAgIHVzZXJJZDogdXNlcklkdHl0cGVcclxuICAgICAgfVxyXG5cclxuICAgICAgTmV3c0NvbGxlY3Rpb24ucHV0RXhpc3RpbmdOZXdzKE5ld3NPYmpUb0VkaXQuaWQsIGVkaXRlZE5ld3MpXHJcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgTmV3c0xpc3QuZnJpZGdpZnkoKVxyXG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlXHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcblxyXG4gICAgbGV0IE5ld3NJdGVtQXJ0aWNsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2FydGljbGVJZH1gKVxyXG5cclxuICAgIHdoaWxlIChOZXdzSXRlbUFydGljbGUuZmlyc3RDaGlsZCkge1xyXG4gICAgICBOZXdzSXRlbUFydGljbGUucmVtb3ZlQ2hpbGQoTmV3c0l0ZW1BcnRpY2xlLmZpcnN0Q2hpbGQpO1xyXG4gICAgfVxyXG4gICAgTmV3c0l0ZW1BcnRpY2xlLmFwcGVuZENoaWxkKE5ld3NOYW1lRmllbGQpXHJcbiAgICBOZXdzSXRlbUFydGljbGUuYXBwZW5kQ2hpbGQoTmV3c0V4cGlyYXRpb25GaWVsZClcclxuICAgIE5ld3NJdGVtQXJ0aWNsZS5hcHBlbmRDaGlsZChOZXdzVHlwZUZpZWxkKVxyXG4gICAgTmV3c0l0ZW1BcnRpY2xlLmFwcGVuZENoaWxkKHVwZGF0ZUJ1dHRvbilcclxuICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgTmV3c0VkaXRGb3JtXHJcbiIsImltcG9ydCBOZXdzQ29sbGVjdGlvbiBmcm9tIFwiLi9uZXdzQ29sbGVjdGlvblwiXHJcbmltcG9ydCBOZXdzTGlzdCBmcm9tIFwiLi9uZXdzTGlzdFwiXHJcbmltcG9ydCBsb2dpbiBmcm9tIFwiLi4vbG9naW5cIlxyXG5cclxuY29uc3QgTmV3c0Zvcm0gPSB7XHJcblxyXG4gIC8vIFRoaXMgbW9kdWxlIHdpbGwgYnVpbGQgYSBmb3JtIGFuZCBhcHBlbmQgaXQgdG8gdGhlIERPTS4gVGhlIGZvcm0gd2lsbCBjb250YWluIGlucHV0IGZpZWxkcyBmb3IgYSB1c2VyIHRvIGFkZCBhIG5ldyBOZXdzIHRvIHRoZWlyIHJlZnJpZ2VyYXRvciBhbmQgYSBidXR0b24gd2l0aCBhbiBldmVudCBsaXN0ZW5lciB0aGF0IHdpbGwgbGlzdGVuIGZvciB0aGUgY2xpY2tcclxuICBjcmVhdGVBbmRBcHBlbmRGb3JtKCkge1xyXG4gICAgLy8gMS4gQnVpbGQgSFRNTCBmb3JtXHJcbiAgICBsZXQgZm9ybUhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKVxyXG4gICAgZm9ybUhlYWRlci50ZXh0Q29udGVudCA9IFwiWW91ciBTcG9va3kgTmV3cyBcIlxyXG5cclxuICAgIGxldCBOZXdzTmFtZUZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZpZWxkc2V0XCIpXHJcblxyXG4gICAgbGV0IE5ld3NOYW1lTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIilcclxuICAgIE5ld3NOYW1lTGFiZWwudGV4dENvbnRlbnQgPSBcIlRpdGxlXCJcclxuICAgIE5ld3NOYW1lTGFiZWwuc2V0QXR0cmlidXRlKFwiZm9yXCIsIFwiTmV3c19fbmFtZVwiKVxyXG4gICAgbGV0IE5ld3NOYW1lSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIilcclxuICAgIE5ld3NOYW1lSW5wdXQuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJOZXdzX19uYW1lXCIpXHJcbiAgICBOZXdzTmFtZUlucHV0LnNldEF0dHJpYnV0ZShcIm5hbWVcIiwgXCJOZXdzX19uYW1lXCIpXHJcblxyXG4gICAgTmV3c05hbWVGaWVsZC5hcHBlbmRDaGlsZChOZXdzTmFtZUxhYmVsKVxyXG4gICAgTmV3c05hbWVGaWVsZC5hcHBlbmRDaGlsZChOZXdzTmFtZUlucHV0KVxyXG5cclxuICAgIGxldCBOZXdzRXhwaXJhdGlvbkZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZpZWxkc2V0XCIpXHJcblxyXG4gICAgbGV0IE5ld3NFeHBpcmF0aW9uTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIilcclxuICAgIE5ld3NFeHBpcmF0aW9uTGFiZWwudGV4dENvbnRlbnQgPSBcIlN1bW1hcnlcIlxyXG4gICAgTmV3c0V4cGlyYXRpb25MYWJlbC5zZXRBdHRyaWJ1dGUoXCJmb3JcIiwgXCJOZXdzX19leHBpcmF0aW9uXCIpXHJcbiAgICBsZXQgTmV3c0V4cGlyYXRpb25JbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKVxyXG4gICAgTmV3c0V4cGlyYXRpb25JbnB1dC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcIk5ld3NfX2V4cGlyYXRpb25cIilcclxuICAgIE5ld3NFeHBpcmF0aW9uSW5wdXQuc2V0QXR0cmlidXRlKFwibmFtZVwiLCBcIk5ld3NfX2V4cGlyYXRpb25cIilcclxuXHJcbiAgICBOZXdzRXhwaXJhdGlvbkZpZWxkLmFwcGVuZENoaWxkKE5ld3NFeHBpcmF0aW9uTGFiZWwpXHJcbiAgICBOZXdzRXhwaXJhdGlvbkZpZWxkLmFwcGVuZENoaWxkKE5ld3NFeHBpcmF0aW9uSW5wdXQpXHJcblxyXG4gICAgbGV0IE5ld3NUeXBlRmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZmllbGRzZXRcIilcclxuXHJcbiAgICBsZXQgTmV3c1R5cGVMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKVxyXG4gICAgTmV3c1R5cGVMYWJlbC50ZXh0Q29udGVudCA9IFwiVVJMXCJcclxuICAgIE5ld3NUeXBlTGFiZWwuc2V0QXR0cmlidXRlKFwiZm9yXCIsIFwiTmV3c19fdHlwZVwiKVxyXG4gICAgbGV0IE5ld3NUeXBlSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIilcclxuICAgIE5ld3NUeXBlSW5wdXQuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJOZXdzX190eXBlXCIpXHJcbiAgICBOZXdzVHlwZUlucHV0LnNldEF0dHJpYnV0ZShcIm5hbWVcIiwgXCJOZXdzX190eXBlXCIpXHJcblxyXG5cclxuICAgIE5ld3NUeXBlRmllbGQuYXBwZW5kQ2hpbGQoTmV3c1R5cGVMYWJlbClcclxuICAgIE5ld3NUeXBlRmllbGQuYXBwZW5kQ2hpbGQoTmV3c1R5cGVJbnB1dClcclxuXHJcbiAgICBsZXQgc3VibWl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKVxyXG4gICAgc3VibWl0QnV0dG9uLnRleHRDb250ZW50ID0gXCJBZGQgQXJ0aWNsZVwiXHJcbiAgICBzdWJtaXRCdXR0b24uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJOZXdzX19zYXZlXCIpXHJcblxyXG4gICAgLy8gMi4gQXR0YWNoIGV2ZW50IGxpc3RlbmVyIHRvIGJ1dHRvbiBpbiBmb3JtXHJcbiAgICBzdWJtaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuaGFuZGxlQWRkTmV3TmV3cylcclxuXHJcbiAgICAvLyAzLiBBcHBlbmQgdGhlIEhUTUwgZm9ybSB0byB0aGUgRE9NXHJcbiAgICAvL05vdGljZSB0aGF0IEkgaGF2ZSBhZGRlZCBhbiBhcnRpY2xlIGVsZW1lbnQgdG8gbXkgaW5kZXguaHRtbCB3aXRoIHRoZSBjbGFzcyBcImZvcm1cIi5cclxuICAgIGxldCBOZXdzRm9ybUZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpXHJcbiAgICBOZXdzRm9ybUZyYWdtZW50LmFwcGVuZENoaWxkKGZvcm1IZWFkZXIpXHJcbiAgICBOZXdzRm9ybUZyYWdtZW50LmFwcGVuZENoaWxkKE5ld3NOYW1lRmllbGQpXHJcbiAgICBOZXdzRm9ybUZyYWdtZW50LmFwcGVuZENoaWxkKE5ld3NFeHBpcmF0aW9uRmllbGQpXHJcbiAgICBOZXdzRm9ybUZyYWdtZW50LmFwcGVuZENoaWxkKE5ld3NUeXBlRmllbGQpXHJcbiAgICBOZXdzRm9ybUZyYWdtZW50LmFwcGVuZENoaWxkKHN1Ym1pdEJ1dHRvbilcclxuICAgIGxldCBmb3JtQXJ0aWNsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub3V0cHV0X19uZXdzXCIpXHJcbiAgICBmb3JtQXJ0aWNsZS5hcHBlbmRDaGlsZChOZXdzRm9ybUZyYWdtZW50KVxyXG4gIH0sXHJcblxyXG5cclxuICBoYW5kbGVBZGROZXdOZXdzKCkge1xyXG4gICAgbGV0IGlucHV0TmV3c05hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI05ld3NfX25hbWVcIikudmFsdWVcclxuICAgIGxldCBpbnB1dE5ld3NFeHBpcmF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNOZXdzX19leHBpcmF0aW9uXCIpLnZhbHVlXHJcbiAgICBsZXQgaW5wdXROZXdzVHlwZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjTmV3c19fdHlwZVwiKS52YWx1ZVxyXG4gICAgbGV0IHVzZXJJZHR5dHBlID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgndXNlcklkJyk7XHJcbiBcclxuICAgIGxldCBuZXdOZXdzID0ge1xyXG4gICAgICBuYW1lOiBpbnB1dE5ld3NOYW1lLFxyXG4gICAgICBleHBpcmF0aW9uOiBpbnB1dE5ld3NFeHBpcmF0aW9uLFxyXG4gICAgICB0eXBlOiBpbnB1dE5ld3NUeXBlLFxyXG4gICAgICB1c2VySWQ6IHVzZXJJZHR5dHBlXHJcbiAgICB9XHJcblxyXG4gICAgTmV3c0NvbGxlY3Rpb24ucG9zdE5ld05ld3MobmV3TmV3cylcclxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gIHtcclxuICAgICAgICBOZXdzTGlzdC5mcmlkZ2lmeSgpXHJcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlXHJcblxyXG4gICAgICB9KVxyXG4gIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE5ld3NGb3JtXHJcbiIsImltcG9ydCBOZXdzQ29sbGVjdGlvbiBmcm9tIFwiLi9uZXdzQ29sbGVjdGlvblwiXHJcbmltcG9ydCBOZXdzIGZyb20gXCIuL25ld3NcIlxyXG5jb25zdCBOZXdzTGlzdCA9IHtcclxuICAgIGZyaWRnaWZ5KCkge1xyXG4gICAgICAgIE5ld3NDb2xsZWN0aW9uLmdldEFsbE5ld3NzKClcclxuICAgICAgICAgICAgLnRoZW4oYWxsTmV3c3MgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBOZXdzRG9jRnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcclxuICAgIGxldCBVc2VySWQyID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgndXNlcklkJyk7XHJcbmNvbnNvbGUubG9nKFVzZXJJZDIpXHJcbiAgICAgICAgICAgICAgICBhbGxOZXdzcy5mb3JFYWNoKE5ld3NJdGVtID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoVXNlcklkMiA9PT0gTmV3c0l0ZW0udXNlcklkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBOZXdzSHRtbCA9IE5ld3MuTmV3c0J1aWxkZXIoTmV3c0l0ZW0pXHJcbiAgICAgICAgICAgICAgICAgICAgTmV3c0RvY0ZyYWdtZW50LmFwcGVuZENoaWxkKE5ld3NIdG1sKVxyXG4gICAgICAgICAgICAgICAgICAgIH19KVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBvdXRwdXRBcnRpY2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vdXRwdXRfX25ld3NTZWN0aW9uMlwiKVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgd2hpbGUgKG91dHB1dEFydGljbGUuZmlyc3RDaGlsZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dEFydGljbGUucmVtb3ZlQ2hpbGQob3V0cHV0QXJ0aWNsZS5maXJzdENoaWxkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG91dHB1dEFydGljbGUuYXBwZW5kQ2hpbGQoTmV3c0RvY0ZyYWdtZW50KVxyXG5cclxuICAgICAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTmV3c0xpc3RcclxuIiwiaW1wb3J0IEFQSSBmcm9tIFwiLi9hcGlcIlxyXG5pbXBvcnQgbG9naW4gZnJvbSBcIi4vbG9naW5cIlxyXG4vLyBEZWNsYXJlIHZhcmlhYmxlcyB0byBob2xkIHVzZXIgaW5wdXRcclxuY29uc3QgdXNlck5hbWVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKVxyXG5jb25zdCB1c2VyUGFzc3dvcmRJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKVxyXG5jb25zdCB1c2VyRW1haWxJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKVxyXG5cclxuY29uc3QgY3JlYXRlTmV3VXNlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIilcclxuXHJcbi8vIERlY2xhcmUgdmFyaWFibGUgdG8gYmUgZXhwb3J0ZWRcclxuY29uc3QgcmVnaXN0cmF0aW9uRm9ybSA9IHtcclxuXHJcbiAgICAvLyBUaGlzIG1vZHVsZSB3aWxsIGJ1aWxkIGEgZm9ybSBhbmQgYXBwZW5kIGl0IHRvIHRoZSBET00uIFRoZSBmb3JtIHdpbGwgY29udGFpbiBpbnB1dCBmaWVsZHMgZm9yIGEgdXNlciB0byBhZGQgdGhlbXNlbHZlcyB0byB0aGUgZGF0YWJhc2Ugb2YgcmVnaXN0ZXJlZCB1c2VycyBhbmQgYSBidXR0b24gd2l0aCBhbiBldmVudCBsaXN0ZW5lciB0aGF0IHdpbGwgbGlzdGVuIGZvciB0aGUgY2xpY2tcclxuICAgIGNyZWF0ZUFuZEFwcGVuZFJlZ2lzdHJhdGlvbkZvcm0gKCkge1xyXG5cclxuICAgIGNvbnN0IHJlZ2lzdGVyQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vdXRwdXRfX3JlZ2lzdHJhdGlvblwiKVxyXG4gICAgY29uc3QgcmVnaXN0ZXJIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIilcclxuICAgIHJlZ2lzdGVyQ29udGFpbmVyLmFwcGVuZENoaWxkKHJlZ2lzdGVySGVhZGVyKVxyXG4gICAgcmVnaXN0ZXJIZWFkZXIudGV4dENvbnRlbnQ9XCJSZWdpc3RlciBVc2VyXCJcclxuXHJcblxyXG4vLyBzZXR0aW5nIHR5cGUgZm9yIHZhcmlhYmxlc1xyXG5cclxuICAgIHVzZXJOYW1lSW5wdXQudHlwZSA9IFwidGV4dFwiXHJcbiAgICB1c2VyUGFzc3dvcmRJbnB1dC50eXBlID0gXCJ0ZXh0XCJcclxuICAgIHVzZXJFbWFpbElucHV0LnR5cGUgPSBcInRleHRcIlxyXG5cclxuICAgIC8vIENyZWF0ZSB3aGF0IHRoZSB1c2VyIHNlZXMgaW4gZmllbGRzXHJcblxyXG4gICAgdXNlck5hbWVJbnB1dC5wbGFjZWhvbGRlciA9IFwiSW5wdXQgVXNlck5hbWVcIlxyXG4gICAgdXNlclBhc3N3b3JkSW5wdXQucGxhY2Vob2xkZXIgPSBcIkNyZWF0ZSBQYXNzd29yZFwiXHJcbiAgICB1c2VyRW1haWxJbnB1dC5wbGFjZWhvbGRlciA9IFwiSW5wdXQgRW1haWwgQWRkcmVzc1wiXHJcbiAgICBjcmVhdGVOZXdVc2VyLnRleHRDb250ZW50ID0gXCJSZWdpc3RlciBVc2VyXCJcclxuXHJcbiAgICAvLyBBZGQgZmllbGRzIHRvIERPTVxyXG5cclxuICAgIHJlZ2lzdGVyQ29udGFpbmVyLmFwcGVuZENoaWxkKHVzZXJOYW1lSW5wdXQpXHJcbiAgICByZWdpc3RlckNvbnRhaW5lci5hcHBlbmRDaGlsZCh1c2VyUGFzc3dvcmRJbnB1dClcclxuICAgIHJlZ2lzdGVyQ29udGFpbmVyLmFwcGVuZENoaWxkKHVzZXJFbWFpbElucHV0KVxyXG4gICAgcmVnaXN0ZXJDb250YWluZXIuYXBwZW5kQ2hpbGQoY3JlYXRlTmV3VXNlcilcclxuXHJcbiAgICAvLyBBZGQgZXZlbnQgbGlzdGVuZXIgdG8gY3JlYXRlTmV3VXNlciBidXR0b25cclxuXHJcbiAgICBjcmVhdGVOZXdVc2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnJlZ2lzdGVyVXNlcikgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIHJlZ2lzdGVyVXNlciAoKSB7XHJcbiAgICAgICAgY29uc3QgdXNlck5hbWVWYWx1ZSA9IHVzZXJOYW1lSW5wdXQudmFsdWU7XHJcbiAgICAgICAgY29uc3QgdXNlclBhc3N3b3JkVmFsdWUgPSB1c2VyUGFzc3dvcmRJbnB1dC52YWx1ZTtcclxuICAgICAgICBjb25zdCB1c2VyRW1haWxWYWx1ZSA9IHVzZXJFbWFpbElucHV0LnZhbHVlO1xyXG5cclxuICAgICAgICBsZXQgbmV3VXNlclRvU2F2ZSA9IHtcclxuICAgICAgICAgICAgdXNlck5hbWU6IHVzZXJOYW1lVmFsdWUsXHJcbiAgICAgICAgICAgIHBhc3N3b3JkOiB1c2VyUGFzc3dvcmRWYWx1ZSxcclxuICAgICAgICAgICAgZW1haWw6IHVzZXJFbWFpbFZhbHVlXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIEFQSS5wb3N0TmV3RGF0YShcInVzZXJzXCIsbmV3VXNlclRvU2F2ZSlcclxuXHJcbiAgICAgICAgbG9naW4ucmVwbGFjZVdpdGhMb2dpbkZvcm0oKTtcclxuICAgIH1cclxuXHJcbiAgICAgICAgXHJcbn1cclxuICBleHBvcnQgZGVmYXVsdCByZWdpc3RyYXRpb25Gb3JtXHJcbiJdfQ==
