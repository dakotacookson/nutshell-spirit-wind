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
        if (username === user.userName && password === user.password) {
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

},{"./login":2,"./news/newsForm":7,"./news/newsList":8,"./register":9}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _newsCollection = _interopRequireDefault(require("./newsCollection"));

var _newsList = _interopRequireDefault(require("./newsList"));

var _newsEditForm = _interopRequireDefault(require("./newsEditForm"));

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

},{"./newsCollection":5,"./newsEditForm":6,"./newsList":8}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const NewsCollection = {
  getAllNewss() {
    return fetch("http://localhost:8088/News").then(response => response.json());
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
    updateButton.addEventListener("click", () => {
      let editedNews = {
        name: NewsNameInput.value,
        expiration: NewsExpirationInput.value,
        type: NewsTypeInput.value
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

},{"./newsCollection":5,"./newsList":8}],7:[function(require,module,exports){
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
    let userIdtytpe = sessionStorage;
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
      allNewss.forEach(NewsItem => {
        let NewsHtml = _news.default.NewsBuilder(NewsItem);

        NewsDocFragment.appendChild(NewsHtml);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2FwaS5qcyIsIi4uL3NjcmlwdHMvbG9naW4uanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL25ld3MvbmV3cy5qcyIsIi4uL3NjcmlwdHMvbmV3cy9uZXdzQ29sbGVjdGlvbi5qcyIsIi4uL3NjcmlwdHMvbmV3cy9uZXdzRWRpdEZvcm0uanMiLCIuLi9zY3JpcHRzL25ld3MvbmV3c0Zvcm0uanMiLCIuLi9zY3JpcHRzL25ld3MvbmV3c0xpc3QuanMiLCIuLi9zY3JpcHRzL3JlZ2lzdGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDQUEsTUFBTSxHQUFHLEdBQUc7QUFFUixFQUFBLE9BQU8sQ0FBQyxRQUFELEVBQVc7QUFDZCxXQUFPLEtBQUssQ0FBRSx5QkFBd0IsUUFBUyxFQUFuQyxDQUFMLENBQ04sSUFETSxDQUNELFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBVCxFQURYLENBQVA7QUFFSCxHQUxPOztBQU1SLEVBQUEsV0FBVyxDQUFDLFFBQUQsRUFBVSxPQUFWLEVBQW1CO0FBQzFCLFdBQU8sS0FBSyxDQUFFLHlCQUF3QixRQUFTLEVBQW5DLEVBQXNDO0FBQ2hELE1BQUEsTUFBTSxFQUFFLE1BRHdDO0FBRWhELE1BQUEsT0FBTyxFQUFFO0FBQ0wsd0JBQWdCO0FBRFgsT0FGdUM7QUFLaEQsTUFBQSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQUwsQ0FBZSxPQUFmO0FBTDBDLEtBQXRDLENBQVo7QUFPRDs7QUFkSyxDQUFaLEMsQ0FvQkE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7O2VBRWUsRzs7Ozs7Ozs7Ozs7QUM5RmY7O0FBQ0E7Ozs7QUFDQSxNQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixPQUF2QixDQUF0QjtBQUNBLE1BQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLE9BQXZCLENBQXRCO0FBQ0EsTUFBTSxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1Qix1QkFBdkIsQ0FBekI7QUFDQSxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixnQkFBdkIsQ0FBbEI7QUFDQSxnQkFBZ0IsQ0FBQyxLQUFqQixDQUF1QixPQUF2QixHQUFpQyxNQUFqQztBQUVBLE1BQU0sS0FBSyxHQUFHO0FBQ1Y7QUFDQSxFQUFBLHlCQUF5QixHQUFHO0FBRXhCLFVBQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLGdCQUF2QixDQUFkO0FBQ0EsSUFBQSxhQUFhLENBQUMsSUFBZCxHQUFxQixNQUFyQjtBQUNBLElBQUEsYUFBYSxDQUFDLFdBQWQsR0FBNEIsVUFBNUI7QUFDQSxJQUFBLGFBQWEsQ0FBQyxJQUFkLEdBQXFCLFVBQXJCO0FBQ0EsSUFBQSxhQUFhLENBQUMsV0FBZCxHQUE0QixVQUE1QjtBQUNBLElBQUEsS0FBSyxDQUFDLFdBQU4sQ0FBa0IsYUFBbEI7QUFDQSxJQUFBLEtBQUssQ0FBQyxXQUFOLENBQWtCLGFBQWxCO0FBRUEsVUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBcEI7QUFDQSxJQUFBLFdBQVcsQ0FBQyxXQUFaLEdBQTJCLE9BQTNCO0FBQ0EsVUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBdkI7QUFDQSxJQUFBLGNBQWMsQ0FBQyxXQUFmLEdBQThCLFVBQTlCO0FBQ0EsSUFBQSxLQUFLLENBQUMsV0FBTixDQUFrQixXQUFsQjtBQUNBLElBQUEsS0FBSyxDQUFDLFdBQU4sQ0FBa0IsY0FBbEIsRUFmd0IsQ0FnQnhCOztBQUNBLElBQUEsV0FBVyxDQUFDLGdCQUFaLENBQTZCLE9BQTdCLEVBQXNDLEtBQUssV0FBM0MsRUFqQndCLENBa0J4Qjs7QUFDQSxJQUFBLGNBQWMsQ0FBQyxnQkFBZixDQUFnQyxPQUFoQyxFQUF5QyxLQUFLLDJCQUE5QztBQUNILEdBdEJTOztBQXVCVjtBQUNBLEVBQUEsV0FBVyxHQUFHO0FBQ1YsVUFBTSxRQUFRLEdBQUcsYUFBYSxDQUFDLEtBQS9CO0FBQ0EsVUFBTSxRQUFRLEdBQUcsYUFBYSxDQUFDLEtBQS9COztBQUNBLGlCQUFJLE9BQUosQ0FBWSxPQUFaLEVBQ0ssSUFETCxDQUNVLFFBQVEsSUFBSTtBQUNkLFVBQUksY0FBYyxHQUFHLENBQXJCO0FBQ0EsTUFBQSxRQUFRLENBQUMsT0FBVCxDQUFpQixJQUFJLElBQUk7QUFDckIsWUFBSSxRQUFRLEtBQUssSUFBSSxDQUFDLFFBQWxCLElBQThCLFFBQVEsS0FBSyxJQUFJLENBQUMsUUFBcEQsRUFBOEQ7QUFDMUQsVUFBQSxPQUFPLENBQUMsR0FBUixDQUFhLGFBQVksSUFBSSxDQUFDLEVBQUcsRUFBakM7QUFDQSxVQUFBLGNBQWMsQ0FBQyxPQUFmLENBQXVCLFFBQXZCLEVBQWlDLElBQUksQ0FBQyxFQUF0QztBQUNBLGNBQUksTUFBTSxHQUFHLGNBQWMsQ0FBQyxPQUFmLENBQXVCLFFBQXZCLENBQWI7QUFFQSxVQUFBLG9CQUFvQixDQUFDLE1BQUQsQ0FBcEI7QUFFSCxTQVBELE1BT08sSUFBSSxjQUFjLEtBQUssUUFBUSxDQUFDLE1BQWhDLEVBQXdDO0FBQzNDLFVBQUEsS0FBSyxDQUFDLDZEQUFELENBQUw7QUFDSCxTQUZNLE1BRUE7QUFDSCxVQUFBLGNBQWM7QUFDakI7O0FBQUEsU0Fab0IsQ0FhckI7O0FBQ0EsaUJBQVMsb0JBQVQsQ0FBOEIsTUFBOUIsRUFBc0M7QUFDbEMsVUFBQSxTQUFTLENBQUMsS0FBVixDQUFnQixPQUFoQixHQUEwQixNQUExQjtBQUNBLFVBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBYSwwQkFBeUIsTUFBTyxFQUE3QztBQUNBLGdCQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixJQUF2QixDQUFsQjtBQUNBLGdCQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixnQkFBdkIsQ0FBdEI7QUFDQSxVQUFBLFNBQVMsQ0FBQyxXQUFWLEdBQXdCLFdBQXhCO0FBQ0EsVUFBQSxhQUFhLENBQUMsV0FBZCxDQUEwQixTQUExQjtBQUVIO0FBQ0osT0F2QkQ7QUE0QkgsS0EvQkw7QUFpQ0gsR0E1RFM7O0FBNkRWO0FBQ0EsRUFBQSwyQkFBMkIsR0FBRztBQUMxQixJQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksU0FBWjtBQUNBLFVBQU0sZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsdUJBQXZCLENBQXpCO0FBQ0EsVUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsZ0JBQXZCLENBQWxCO0FBQ0EsSUFBQSxTQUFTLENBQUMsS0FBVixDQUFnQixPQUFoQixHQUEwQixNQUExQjtBQUNBLElBQUEsZ0JBQWdCLENBQUMsS0FBakIsQ0FBdUIsT0FBdkIsR0FBaUMsT0FBakM7QUFDSCxHQXBFUzs7QUFxRVY7QUFDQSxFQUFBLG9CQUFvQixHQUFHO0FBQ25CLElBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxXQUFaO0FBQ0EsSUFBQSxTQUFTLENBQUMsS0FBVixDQUFnQixPQUFoQixHQUEwQixPQUExQjtBQUNBLElBQUEsZ0JBQWdCLENBQUMsS0FBakIsQ0FBdUIsT0FBdkIsR0FBaUMsTUFBakM7QUFDSDs7QUExRVMsQ0FBZDtlQStFZSxLOzs7Ozs7QUN2RmY7O0FBQ0E7O0FBR0E7O0FBQ0E7Ozs7QUFIQSxlQUFNLHlCQUFOOztBQUNBLGtCQUFpQiwrQkFBakI7O0FBR0Esa0JBQVMsUUFBVDs7QUFDQSxrQkFBUyxtQkFBVDs7Ozs7Ozs7OztBQ1BBOztBQUNBOztBQUNBOzs7O0FBRUEsTUFBTSxJQUFJLEdBQUc7QUFFWCxFQUFBLFdBQVcsQ0FBQyxVQUFELEVBQWE7QUFDdEIsUUFBSSxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsU0FBdkIsQ0FBbEI7QUFDQSxJQUFBLFdBQVcsQ0FBQyxZQUFaLENBQXlCLElBQXpCLEVBQWdDLFNBQVEsVUFBVSxDQUFDLEVBQUcsRUFBdEQ7QUFFQSxRQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixJQUF2QixDQUFmO0FBQ0EsSUFBQSxRQUFRLENBQUMsV0FBVCxHQUF1QixVQUFVLENBQUMsSUFBbEM7QUFFQSxRQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixHQUF2QixDQUFkO0FBQ0EsSUFBQSxPQUFPLENBQUMsV0FBUixHQUFzQixVQUFVLENBQUMsVUFBakM7QUFFQSxRQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixHQUF2QixDQUFmO0FBQ0EsUUFBSSxTQUFTLEdBQUcsVUFBVSxDQUFDLElBQTNCO0FBQ0EsSUFBQSxRQUFRLENBQUMsV0FBVCxHQUF1QixTQUF2QjtBQUNBLElBQUEsUUFBUSxDQUFDLFlBQVQsQ0FBc0IsTUFBdEIsRUFBK0IsR0FBRSxTQUFVLEVBQTNDO0FBQ0EsUUFBSSxjQUFjLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBckI7QUFDQSxJQUFBLGNBQWMsQ0FBQyxXQUFmLEdBQTZCLE1BQTdCO0FBQ0EsSUFBQSxjQUFjLENBQUMsZ0JBQWYsQ0FBZ0MsT0FBaEMsRUFBeUMsTUFBTTtBQUM3QyxVQUFJLFNBQVMsR0FBRyxLQUFLLENBQUMsTUFBTixDQUFhLFVBQWIsQ0FBd0IsRUFBeEM7QUFDQSxVQUFJLE1BQU0sR0FBRyxTQUFTLENBQUMsS0FBVixDQUFnQixJQUFoQixFQUFzQixDQUF0QixDQUFiOztBQUNBLDhCQUFlLE9BQWYsQ0FBdUIsTUFBdkIsRUFDRyxJQURILENBQ1EsUUFBUSxJQUFJO0FBQ2hCLDhCQUFhLG1CQUFiLENBQWlDLFNBQWpDLEVBQTRDLFFBQTVDO0FBQ0QsT0FISDtBQUlELEtBUEQ7QUFTQSxRQUFJLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLFFBQXZCLENBQXZCO0FBQ0EsSUFBQSxnQkFBZ0IsQ0FBQyxXQUFqQixHQUErQixRQUEvQjtBQUNBLElBQUEsZ0JBQWdCLENBQUMsZ0JBQWpCLENBQWtDLE9BQWxDLEVBQTJDLE1BQU07QUFDL0MsVUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU4sQ0FBYSxVQUFiLENBQXdCLEVBQXhCLENBQTJCLEtBQTNCLENBQWlDLElBQWpDLEVBQXVDLENBQXZDLENBQWI7O0FBQ0EsOEJBQWUsVUFBZixDQUEwQixNQUExQixFQUNHLElBREgsQ0FDUSxRQUFRLElBQUk7QUFDaEIsMEJBQVMsUUFBVDs7QUFDQSxlQUFPLFFBQVA7QUFDRCxPQUpIO0FBS0QsS0FQRDtBQVNBLElBQUEsV0FBVyxDQUFDLFdBQVosQ0FBd0IsUUFBeEI7QUFDQSxJQUFBLFdBQVcsQ0FBQyxXQUFaLENBQXdCLE9BQXhCO0FBQ0EsSUFBQSxXQUFXLENBQUMsV0FBWixDQUF3QixRQUF4QjtBQUNBLElBQUEsV0FBVyxDQUFDLFdBQVosQ0FBd0IsY0FBeEI7QUFDQSxJQUFBLFdBQVcsQ0FBQyxXQUFaLENBQXdCLGdCQUF4QjtBQUVBLFdBQU8sV0FBUDtBQUNEOztBQTdDVSxDQUFiO2VBZ0RlLEk7Ozs7Ozs7Ozs7QUNuRGYsTUFBTSxjQUFjLEdBQUc7QUFDbkIsRUFBQSxXQUFXLEdBQUc7QUFDVixXQUFPLEtBQUssQ0FBQyw0QkFBRCxDQUFMLENBQ0YsSUFERSxDQUNHLFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBVCxFQURmLENBQVA7QUFFSCxHQUprQjs7QUFPbkIsRUFBQSxXQUFXLENBQUMsYUFBRCxFQUFnQjtBQUN2QixXQUFPLEtBQUssQ0FBQyw0QkFBRCxFQUErQjtBQUN2QyxNQUFBLE1BQU0sRUFBRSxNQUQrQjtBQUV2QyxNQUFBLE9BQU8sRUFBRTtBQUNMLHdCQUFnQjtBQURYLE9BRjhCO0FBS3ZDLE1BQUEsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFMLENBQWUsYUFBZjtBQUxpQyxLQUEvQixDQUFaO0FBT0gsR0Fma0I7O0FBZ0JuQixFQUFBLFVBQVUsQ0FBQyxNQUFELEVBQVM7QUFDZixXQUFPLEtBQUssQ0FBRSw4QkFBNkIsTUFBTyxFQUF0QyxFQUF5QztBQUNqRCxNQUFBLE1BQU0sRUFBRSxRQUR5QztBQUVqRCxNQUFBLE9BQU8sRUFBRTtBQUNMLHdCQUFnQjtBQURYO0FBRndDLEtBQXpDLENBQVo7QUFNSCxHQXZCa0I7O0FBd0JuQixFQUFBLE9BQU8sQ0FBQyxNQUFELEVBQVM7QUFDWixXQUFPLEtBQUssQ0FBRSw4QkFBNkIsTUFBTyxFQUF0QyxDQUFMLENBQ0YsSUFERSxDQUNHLFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBVCxFQURmLENBQVA7QUFFSCxHQTNCa0I7O0FBNEJuQixFQUFBLGVBQWUsQ0FBQyxNQUFELEVBQVMsVUFBVCxFQUFxQjtBQUNoQyxXQUFPLEtBQUssQ0FBRSw4QkFBNkIsTUFBTyxFQUF0QyxFQUF5QztBQUNqRCxNQUFBLE1BQU0sRUFBRSxLQUR5QztBQUVqRCxNQUFBLE9BQU8sRUFBRTtBQUNMLHdCQUFnQjtBQURYLE9BRndDO0FBS2pELE1BQUEsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFMLENBQWUsVUFBZjtBQUwyQyxLQUF6QyxDQUFaO0FBT0g7O0FBcENrQixDQUF2QjtBQXNDQSxPQUFPLENBQUMsS0FBUixDQUFjLGNBQWMsQ0FBQyxXQUFmLEVBQWQ7ZUFFZSxjOzs7Ozs7Ozs7OztBQ3pDZjs7QUFDQTs7OztBQUVBLE1BQU0sWUFBWSxHQUFHO0FBQ25CLEVBQUEsbUJBQW1CLENBQUMsU0FBRCxFQUFZLGFBQVosRUFBMkI7QUFFNUMsUUFBSSxhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBcEI7QUFFQSxRQUFJLGFBQWEsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixPQUF2QixDQUFwQjtBQUNBLElBQUEsYUFBYSxDQUFDLFdBQWQsR0FBNEIsT0FBNUI7QUFDQSxRQUFJLGFBQWEsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixPQUF2QixDQUFwQjtBQUNBLElBQUEsYUFBYSxDQUFDLEtBQWQsR0FBc0IsYUFBYSxDQUFDLElBQXBDO0FBRUEsSUFBQSxhQUFhLENBQUMsV0FBZCxDQUEwQixhQUExQjtBQUNBLElBQUEsYUFBYSxDQUFDLFdBQWQsQ0FBMEIsYUFBMUI7QUFFQSxRQUFJLG1CQUFtQixHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLEdBQXZCLENBQTFCO0FBRUEsUUFBSSxtQkFBbUIsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixPQUF2QixDQUExQjtBQUNBLElBQUEsbUJBQW1CLENBQUMsV0FBcEIsR0FBa0MsU0FBbEM7QUFDQSxRQUFJLG1CQUFtQixHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLE9BQXZCLENBQTFCO0FBQ0EsSUFBQSxtQkFBbUIsQ0FBQyxLQUFwQixHQUE0QixhQUFhLENBQUMsVUFBMUM7QUFFQSxJQUFBLG1CQUFtQixDQUFDLFdBQXBCLENBQWdDLG1CQUFoQztBQUNBLElBQUEsbUJBQW1CLENBQUMsV0FBcEIsQ0FBZ0MsbUJBQWhDO0FBRUEsUUFBSSxhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBcEI7QUFFQSxRQUFJLGFBQWEsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixPQUF2QixDQUFwQjtBQUNBLElBQUEsYUFBYSxDQUFDLFdBQWQsR0FBNEIsS0FBNUI7QUFDQSxRQUFJLGFBQWEsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixPQUF2QixDQUFwQjtBQUNBLElBQUEsYUFBYSxDQUFDLEtBQWQsR0FBc0IsYUFBYSxDQUFDLElBQXBDO0FBQ0EsSUFBQSxhQUFhLENBQUMsV0FBZCxDQUEwQixhQUExQjtBQUNBLElBQUEsYUFBYSxDQUFDLFdBQWQsQ0FBMEIsYUFBMUI7QUFFQSxRQUFJLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixRQUF2QixDQUFuQjtBQUNBLElBQUEsWUFBWSxDQUFDLFdBQWIsR0FBMkIsUUFBM0I7QUFFQSxJQUFBLFlBQVksQ0FBQyxnQkFBYixDQUE4QixPQUE5QixFQUF1QyxNQUFNO0FBQzNDLFVBQUksVUFBVSxHQUFHO0FBQ2YsUUFBQSxJQUFJLEVBQUUsYUFBYSxDQUFDLEtBREw7QUFFZixRQUFBLFVBQVUsRUFBRSxtQkFBbUIsQ0FBQyxLQUZqQjtBQUdmLFFBQUEsSUFBSSxFQUFFLGFBQWEsQ0FBQztBQUhMLE9BQWpCOztBQU1BLDhCQUFlLGVBQWYsQ0FBK0IsYUFBYSxDQUFDLEVBQTdDLEVBQWlELFVBQWpELEVBQ0csSUFESCxDQUNRLFFBQVEsSUFBSTtBQUNoQiwwQkFBUyxRQUFUOztBQUNBLGVBQU8sUUFBUDtBQUNELE9BSkg7QUFLRCxLQVpEO0FBY0EsUUFBSSxlQUFlLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBd0IsSUFBRyxTQUFVLEVBQXJDLENBQXRCOztBQUVBLFdBQU8sZUFBZSxDQUFDLFVBQXZCLEVBQW1DO0FBQ2pDLE1BQUEsZUFBZSxDQUFDLFdBQWhCLENBQTRCLGVBQWUsQ0FBQyxVQUE1QztBQUNEOztBQUNELElBQUEsZUFBZSxDQUFDLFdBQWhCLENBQTRCLGFBQTVCO0FBQ0EsSUFBQSxlQUFlLENBQUMsV0FBaEIsQ0FBNEIsbUJBQTVCO0FBQ0EsSUFBQSxlQUFlLENBQUMsV0FBaEIsQ0FBNEIsYUFBNUI7QUFDQSxJQUFBLGVBQWUsQ0FBQyxXQUFoQixDQUE0QixZQUE1QjtBQUNEOztBQTFEa0IsQ0FBckI7ZUE0RGUsWTs7Ozs7Ozs7Ozs7QUMvRGY7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxNQUFNLFFBQVEsR0FBRztBQUVmO0FBQ0EsRUFBQSxtQkFBbUIsR0FBRztBQUNwQjtBQUNBLFFBQUksVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLElBQXZCLENBQWpCO0FBQ0EsSUFBQSxVQUFVLENBQUMsV0FBWCxHQUF5QixtQkFBekI7QUFFQSxRQUFJLGFBQWEsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixVQUF2QixDQUFwQjtBQUVBLFFBQUksYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLE9BQXZCLENBQXBCO0FBQ0EsSUFBQSxhQUFhLENBQUMsV0FBZCxHQUE0QixPQUE1QjtBQUNBLElBQUEsYUFBYSxDQUFDLFlBQWQsQ0FBMkIsS0FBM0IsRUFBa0MsWUFBbEM7QUFDQSxRQUFJLGFBQWEsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixPQUF2QixDQUFwQjtBQUNBLElBQUEsYUFBYSxDQUFDLFlBQWQsQ0FBMkIsSUFBM0IsRUFBaUMsWUFBakM7QUFDQSxJQUFBLGFBQWEsQ0FBQyxZQUFkLENBQTJCLE1BQTNCLEVBQW1DLFlBQW5DO0FBRUEsSUFBQSxhQUFhLENBQUMsV0FBZCxDQUEwQixhQUExQjtBQUNBLElBQUEsYUFBYSxDQUFDLFdBQWQsQ0FBMEIsYUFBMUI7QUFFQSxRQUFJLG1CQUFtQixHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLFVBQXZCLENBQTFCO0FBRUEsUUFBSSxtQkFBbUIsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixPQUF2QixDQUExQjtBQUNBLElBQUEsbUJBQW1CLENBQUMsV0FBcEIsR0FBa0MsU0FBbEM7QUFDQSxJQUFBLG1CQUFtQixDQUFDLFlBQXBCLENBQWlDLEtBQWpDLEVBQXdDLGtCQUF4QztBQUNBLFFBQUksbUJBQW1CLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBMUI7QUFDQSxJQUFBLG1CQUFtQixDQUFDLFlBQXBCLENBQWlDLElBQWpDLEVBQXVDLGtCQUF2QztBQUNBLElBQUEsbUJBQW1CLENBQUMsWUFBcEIsQ0FBaUMsTUFBakMsRUFBeUMsa0JBQXpDO0FBRUEsSUFBQSxtQkFBbUIsQ0FBQyxXQUFwQixDQUFnQyxtQkFBaEM7QUFDQSxJQUFBLG1CQUFtQixDQUFDLFdBQXBCLENBQWdDLG1CQUFoQztBQUVBLFFBQUksYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLFVBQXZCLENBQXBCO0FBRUEsUUFBSSxhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBcEI7QUFDQSxJQUFBLGFBQWEsQ0FBQyxXQUFkLEdBQTRCLEtBQTVCO0FBQ0EsSUFBQSxhQUFhLENBQUMsWUFBZCxDQUEyQixLQUEzQixFQUFrQyxZQUFsQztBQUNBLFFBQUksYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLE9BQXZCLENBQXBCO0FBQ0EsSUFBQSxhQUFhLENBQUMsWUFBZCxDQUEyQixJQUEzQixFQUFpQyxZQUFqQztBQUNBLElBQUEsYUFBYSxDQUFDLFlBQWQsQ0FBMkIsTUFBM0IsRUFBbUMsWUFBbkM7QUFHQSxJQUFBLGFBQWEsQ0FBQyxXQUFkLENBQTBCLGFBQTFCO0FBQ0EsSUFBQSxhQUFhLENBQUMsV0FBZCxDQUEwQixhQUExQjtBQUVBLFFBQUksWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLFFBQXZCLENBQW5CO0FBQ0EsSUFBQSxZQUFZLENBQUMsV0FBYixHQUEyQixhQUEzQjtBQUNBLElBQUEsWUFBWSxDQUFDLFlBQWIsQ0FBMEIsT0FBMUIsRUFBbUMsWUFBbkMsRUE1Q29CLENBOENwQjs7QUFDQSxJQUFBLFlBQVksQ0FBQyxnQkFBYixDQUE4QixPQUE5QixFQUF1QyxLQUFLLGdCQUE1QyxFQS9Db0IsQ0FpRHBCO0FBQ0E7O0FBQ0EsUUFBSSxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsc0JBQVQsRUFBdkI7QUFDQSxJQUFBLGdCQUFnQixDQUFDLFdBQWpCLENBQTZCLFVBQTdCO0FBQ0EsSUFBQSxnQkFBZ0IsQ0FBQyxXQUFqQixDQUE2QixhQUE3QjtBQUNBLElBQUEsZ0JBQWdCLENBQUMsV0FBakIsQ0FBNkIsbUJBQTdCO0FBQ0EsSUFBQSxnQkFBZ0IsQ0FBQyxXQUFqQixDQUE2QixhQUE3QjtBQUNBLElBQUEsZ0JBQWdCLENBQUMsV0FBakIsQ0FBNkIsWUFBN0I7QUFFQSxRQUFJLFdBQVcsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixlQUF2QixDQUFsQjtBQUNBLElBQUEsV0FBVyxDQUFDLFdBQVosQ0FBd0IsZ0JBQXhCO0FBRUQsR0FoRWM7O0FBaUVmLEVBQUEsZ0JBQWdCLEdBQUc7QUFDakIsUUFBSSxhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsYUFBdkIsRUFBc0MsS0FBMUQ7QUFDQSxRQUFJLG1CQUFtQixHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLG1CQUF2QixFQUE0QyxLQUF0RTtBQUNBLFFBQUksYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLGFBQXZCLEVBQXNDLEtBQTFEO0FBQ0EsUUFBSSxXQUFXLEdBQUcsY0FBbEI7QUFFQSxRQUFJLE9BQU8sR0FBRztBQUNaLE1BQUEsSUFBSSxFQUFFLGFBRE07QUFFWixNQUFBLFVBQVUsRUFBRSxtQkFGQTtBQUdaLE1BQUEsSUFBSSxFQUFFLGFBSE07QUFJWixNQUFBLE1BQU0sRUFBRTtBQUpJLEtBQWQ7O0FBT0EsNEJBQWUsV0FBZixDQUEyQixPQUEzQixFQUNHLElBREgsQ0FDUSxRQUFRLElBQUs7QUFDakIsd0JBQVMsUUFBVDs7QUFDQSxhQUFPLFFBQVA7QUFFRCxLQUxIO0FBTUQ7O0FBcEZjLENBQWpCO2VBdUZlLFE7Ozs7Ozs7Ozs7O0FDM0ZmOztBQUNBOzs7O0FBRUEsTUFBTSxRQUFRLEdBQUc7QUFDYixFQUFBLFFBQVEsR0FBRztBQUNQLDRCQUFlLFdBQWYsR0FDSyxJQURMLENBQ1UsUUFBUSxJQUFJO0FBRWQsVUFBSSxlQUFlLEdBQUcsUUFBUSxDQUFDLHNCQUFULEVBQXRCO0FBRUEsTUFBQSxRQUFRLENBQUMsT0FBVCxDQUFpQixRQUFRLElBQUk7QUFDekIsWUFBSSxRQUFRLEdBQUcsY0FBSyxXQUFMLENBQWlCLFFBQWpCLENBQWY7O0FBQ0EsUUFBQSxlQUFlLENBQUMsV0FBaEIsQ0FBNEIsUUFBNUI7QUFDSCxPQUhEO0FBS0EsVUFBSSxhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsdUJBQXZCLENBQXBCOztBQUlBLGFBQU8sYUFBYSxDQUFDLFVBQXJCLEVBQWlDO0FBQzdCLFFBQUEsYUFBYSxDQUFDLFdBQWQsQ0FBMEIsYUFBYSxDQUFDLFVBQXhDO0FBQ0g7O0FBQ0QsTUFBQSxhQUFhLENBQUMsV0FBZCxDQUEwQixlQUExQjtBQUVILEtBbkJMO0FBb0JIOztBQXRCWSxDQUFqQjtlQXlCZSxROzs7Ozs7Ozs7OztBQzVCZjs7QUFDQTs7OztBQUNBO0FBQ0EsTUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBdEI7QUFDQSxNQUFNLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLE9BQXZCLENBQTFCO0FBQ0EsTUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBdkI7QUFFQSxNQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixRQUF2QixDQUF0QixDLENBRUE7O0FBQ0EsTUFBTSxnQkFBZ0IsR0FBRztBQUVyQjtBQUNBLEVBQUEsK0JBQStCLEdBQUk7QUFFbkMsVUFBTSxpQkFBaUIsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1Qix1QkFBdkIsQ0FBMUI7QUFDQSxVQUFNLGNBQWMsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixJQUF2QixDQUF2QjtBQUNBLElBQUEsaUJBQWlCLENBQUMsV0FBbEIsQ0FBOEIsY0FBOUI7QUFDQSxJQUFBLGNBQWMsQ0FBQyxXQUFmLEdBQTJCLGVBQTNCLENBTG1DLENBUXZDOztBQUVJLElBQUEsYUFBYSxDQUFDLElBQWQsR0FBcUIsTUFBckI7QUFDQSxJQUFBLGlCQUFpQixDQUFDLElBQWxCLEdBQXlCLE1BQXpCO0FBQ0EsSUFBQSxjQUFjLENBQUMsSUFBZixHQUFzQixNQUF0QixDQVptQyxDQWNuQzs7QUFFQSxJQUFBLGFBQWEsQ0FBQyxXQUFkLEdBQTRCLGdCQUE1QjtBQUNBLElBQUEsaUJBQWlCLENBQUMsV0FBbEIsR0FBZ0MsaUJBQWhDO0FBQ0EsSUFBQSxjQUFjLENBQUMsV0FBZixHQUE2QixxQkFBN0I7QUFDQSxJQUFBLGFBQWEsQ0FBQyxXQUFkLEdBQTRCLGVBQTVCLENBbkJtQyxDQXFCbkM7O0FBRUEsSUFBQSxpQkFBaUIsQ0FBQyxXQUFsQixDQUE4QixhQUE5QjtBQUNBLElBQUEsaUJBQWlCLENBQUMsV0FBbEIsQ0FBOEIsaUJBQTlCO0FBQ0EsSUFBQSxpQkFBaUIsQ0FBQyxXQUFsQixDQUE4QixjQUE5QjtBQUNBLElBQUEsaUJBQWlCLENBQUMsV0FBbEIsQ0FBOEIsYUFBOUIsRUExQm1DLENBNEJuQzs7QUFFQSxJQUFBLGFBQWEsQ0FBQyxnQkFBZCxDQUErQixPQUEvQixFQUF3QyxLQUFLLFlBQTdDO0FBQ0MsR0FsQ29COztBQW9DckIsRUFBQSxZQUFZLEdBQUk7QUFDWixVQUFNLGFBQWEsR0FBRyxhQUFhLENBQUMsS0FBcEM7QUFDQSxVQUFNLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDLEtBQTVDO0FBQ0EsVUFBTSxjQUFjLEdBQUcsY0FBYyxDQUFDLEtBQXRDO0FBRUEsUUFBSSxhQUFhLEdBQUc7QUFDaEIsTUFBQSxRQUFRLEVBQUUsYUFETTtBQUVoQixNQUFBLFFBQVEsRUFBRSxpQkFGTTtBQUdoQixNQUFBLEtBQUssRUFBRTtBQUhTLEtBQXBCOztBQU1BLGlCQUFJLFdBQUosQ0FBZ0IsT0FBaEIsRUFBd0IsYUFBeEI7O0FBRUEsbUJBQU0sb0JBQU47QUFDSDs7QUFsRG9CLENBQXpCO2VBc0RpQixnQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IEFQSSA9IHtcclxuXHJcbiAgICBnZXREYXRhKHJlc291cmNlKSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvJHtyZXNvdXJjZX1gKVxyXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgIH0sXHJcbiAgICBwb3N0TmV3RGF0YShyZXNvdXJjZSxwYXlsb2FkKSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvJHtyZXNvdXJjZX1gLCB7XHJcbiAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZClcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcblxyXG59XHJcblxyXG5cclxuXHJcbi8vICAgICBnZXRBbGxVc2VycygpIHtcclxuLy8gICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvdXNlcnNcIilcclxuLy8gICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbi8vICAgICAgIH0sXHJcblxyXG4vLyAgICAgZ2V0QWxsTWVzc2FnZXMoKSB7XHJcbi8vICAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L21lc3NhZ2VzXCIpXHJcbi8vICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbilcclxuLy8gICAgICAgfSxcclxuXHJcbi8vICAgICBnZXRBbGxOZXdzQXJ0aWNsZXMoKSB7XHJcbi8vICAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L25ld3NBcnRpY2xlc1wiKVxyXG4vLyAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuLy8gICAgICAgfSxcclxuXHJcbi8vICAgICBnZXRBbGxUYXNrcygpIHtcclxuLy8gICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvdGFza3NcIilcclxuLy8gICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbi8vICAgICAgIH0sXHJcblxyXG4vLyAgICAgZ2V0QWxsRXZlbnRzKCkge1xyXG4vLyAgICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9ldmVudHNcIilcclxuLy8gICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbi8vICAgICAgIH0sXHJcblxyXG4vLyAgICAgZ2V0QWxsRnJpZW5kcygpIHtcclxuLy8gICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvZnJpZW5kc1wiKVxyXG4vLyAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuLy8gICAgICAgfSxcclxuXHJcblxyXG4vLyAgICAgcG9zdE5ld1VzZXIobmV3VXNlclRvQWRkKSB7XHJcbi8vICAgICBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC91c2Vyc1wiLCB7XHJcbi8vICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuLy8gICAgICAgICBoZWFkZXJzOiB7XHJcbi8vICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbi8vICAgICAgICAgfSxcclxuLy8gICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShuZXdVc2VyVG9BZGQpXHJcbi8vICAgICB9KVxyXG4vLyAgICAgfSxcclxuXHJcbi8vICAgICBwb3N0TmV3TWVzc2FnZShuZXdNZXNzYWdlVG9BZGQpIHtcclxuLy8gICAgICAgICBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9tZXNzYWdlc1wiLCB7XHJcbi8vICAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbi8vICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuLy8gICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbi8vICAgICAgICAgICAgIH0sXHJcbi8vICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5ld01lc3NhZ2VUb0FkZClcclxuLy8gICAgIH0pXHJcbi8vICAgICB9LFxyXG5cclxuLy8gICAgIHBvc3ROZXdOZXdzQXJ0aWNsZShuZXdOZXdzQXJ0aWNsZVRvQWRkKSB7XHJcbi8vICAgICBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9uZXdzQXJ0aWNsZXNcIiwge1xyXG4vLyAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbi8vICAgICAgICAgaGVhZGVyczoge1xyXG4vLyAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4vLyAgICAgICAgIH0sXHJcbi8vICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobmV3TmV3c0FydGljbGVUb0FkZClcclxuLy8gICAgIH0pXHJcbi8vICAgICB9LFxyXG5cclxuLy8gICAgIHBvc3ROZXdUYXNrKG5ld1Rhc2tUb0FkZCkge1xyXG4vLyAgICAgICAgIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L3Rhc2tzXCIsIHtcclxuLy8gICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuLy8gICAgICAgICAgICAgaGVhZGVyczoge1xyXG4vLyAgICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuLy8gICAgICAgICAgICAgfSxcclxuLy8gICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobmV3VGFza1RvQWRkKVxyXG4vLyAgICAgfSlcclxuLy8gICAgIH0sXHJcblxyXG5cclxuLy8gfVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQVBJIiwiaW1wb3J0IEFQSSBmcm9tIFwiLi9hcGlcIlxyXG5pbXBvcnQgcmVnaXN0cmF0aW9uRm9ybSBmcm9tIFwiLi9yZWdpc3RlclwiXHJcbmNvbnN0IHVzZXJOYW1lSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbmNvbnN0IHBhc3N3b3JkSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbmNvbnN0IHJlZ2lzdHJhdGlvblBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm91dHB1dF9fcmVnaXN0cmF0aW9uXCIpXHJcbmNvbnN0IGxvZ2luUGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub3V0cHV0X19sb2dpblwiKTtcclxucmVnaXN0cmF0aW9uUGFnZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcblxyXG5jb25zdCBsb2dpbiA9IHtcclxuICAgIC8vIEZ1bmN0aW9uIHRvIGNyZWF0ZSBhbmQgYXBwZW5kIGxvZ2luIGlucHV0IGZpZWxkcyBhbmQgbG9naW4gYnV0dG9uLlxyXG4gICAgY3JlYXRlQW5kQXBwZW5kTG9naW5JbnB1dCgpIHtcclxuXHJcbiAgICAgICAgY29uc3Qgb3V0RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm91dHB1dF9fbG9naW5cIik7XHJcbiAgICAgICAgdXNlck5hbWVJbnB1dC50eXBlID0gXCJ0ZXh0XCI7XHJcbiAgICAgICAgdXNlck5hbWVJbnB1dC5wbGFjZWhvbGRlciA9IFwidXNlcm5hbWVcIjtcclxuICAgICAgICBwYXNzd29yZElucHV0LnR5cGUgPSBcInBhc3N3b3JkXCI7XHJcbiAgICAgICAgcGFzc3dvcmRJbnB1dC5wbGFjZWhvbGRlciA9IFwicGFzc3dvcmRcIjtcclxuICAgICAgICBvdXRFbC5hcHBlbmRDaGlsZCh1c2VyTmFtZUlucHV0KTtcclxuICAgICAgICBvdXRFbC5hcHBlbmRDaGlsZChwYXNzd29yZElucHV0KTtcclxuXHJcbiAgICAgICAgY29uc3QgbG9naW5CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgICAgIGxvZ2luQnV0dG9uLnRleHRDb250ZW50ID0gKFwibG9naW5cIik7XHJcbiAgICAgICAgY29uc3QgcmVnaXN0ZXJCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgICAgIHJlZ2lzdGVyQnV0dG9uLnRleHRDb250ZW50ID0gKFwicmVnaXN0ZXJcIik7XHJcbiAgICAgICAgb3V0RWwuYXBwZW5kQ2hpbGQobG9naW5CdXR0b24pO1xyXG4gICAgICAgIG91dEVsLmFwcGVuZENoaWxkKHJlZ2lzdGVyQnV0dG9uKTtcclxuICAgICAgICAvLyBSdW5zIHRoZSBnZXRVc2VyRGF0YSgpIGZ1bmN0aW9uIHdoZW4gTG9naW4gYnV0dG9uIGlzIGNsaWNrZWQuXHJcbiAgICAgICAgbG9naW5CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuZ2V0VXNlckRhdGEpO1xyXG4gICAgICAgIC8vIFJ1bnMgdGhlIHJlcGxhY2VXaXRoUmVnaXN0cmF0aW9uRm9ybSgpIGZ1bmN0aW9uIHdoZW4gUmVnaXN0ZXIgYnV0dG9uIGlzIGNsaWNrZWQuXHJcbiAgICAgICAgcmVnaXN0ZXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMucmVwbGFjZVdpdGhSZWdpc3RyYXRpb25Gb3JtKTtcclxuICAgIH0sXHJcbiAgICAvLyBHYXRoZXJzIGRhdGEgZW50ZXJlZCBpbnRvIExvZ2luIGlucHV0IGZpZWxkcy4gRmV0Y2hlcyB1c2VyZGF0YSBmcm9tIEFQSSBhbmQgY29tcGFyZXMgaW5wdXQgZGF0YSB3aXRoIGV4aXN0aW5nIHVzZXIgZGF0YSBpbiBBUEkuIElmIGlucHV0IGRhdGEgbWF0Y2hlcyB1c2VyIGRhdGEgaW4gQVBJLCBydW5zIGxvYWRVc2VyU3BlY2lmaWNQYWdlKCkuIElmIGlucHV0IGRhdGEgZG9lcyBub3QgbWF0Y2ggYW55IHVzZXIgZGF0YSBpbiBBUEksIGFsZXJ0IGlzIHNlbnQuXHJcbiAgICBnZXRVc2VyRGF0YSgpIHtcclxuICAgICAgICBjb25zdCB1c2VybmFtZSA9IHVzZXJOYW1lSW5wdXQudmFsdWU7XHJcbiAgICAgICAgY29uc3QgcGFzc3dvcmQgPSBwYXNzd29yZElucHV0LnZhbHVlO1xyXG4gICAgICAgIEFQSS5nZXREYXRhKFwidXNlcnNcIilcclxuICAgICAgICAgICAgLnRoZW4oYWxsVXNlcnMgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHVzZXJzUHJvY2Vzc2VkID0gMTtcclxuICAgICAgICAgICAgICAgIGFsbFVzZXJzLmZvckVhY2godXNlciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzZXJuYW1lID09PSB1c2VyLnVzZXJOYW1lICYmIHBhc3N3b3JkID09PSB1c2VyLnBhc3N3b3JkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBUaGlzIG9uZTogJHt1c2VyLmlkfWApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ3VzZXJJZCcsIHVzZXIuaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB1c2VySWQgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd1c2VySWQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRVc2VyU3BlY2lmaWNQYWdlKHVzZXJJZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodXNlcnNQcm9jZXNzZWQgPT09IGFsbFVzZXJzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIlVzZXJuYW1lL3Bhc3N3b3JkIGludmFsaWQuIElmIG5ldyB1c2VyLCBwbGVhc2UgcmVnaXN0ZXIuIDopXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcnNQcm9jZXNzZWQrK1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVGhpcyBmdW5jdGlvbiB3aWxsIGxvYWQgdGhlIGRhc2hib2FyZCBmb3IgdGhlIHVzZXIgdGhhdCBzaWduZWQgaW4uIChXb3JrIGluIFByb2dyZXNzKVxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGxvYWRVc2VyU3BlY2lmaWNQYWdlKHVzZXJJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2dpblBhZ2Uuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgVGhpcyBpcyB0aGUgdXNlciBwYWdlISAke3VzZXJJZH1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGFzaGJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXNrQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vdXRwdXRfX3Rhc2tzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXNoYm9hcmQudGV4dENvbnRlbnQgPSBcIkRhc2hib2FyZFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKGRhc2hib2FyZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgIH0sXHJcbiAgICAvLyBGdW5jdGlvbiB0byBoaWRlIHRoZSBsb2dpbiBmb3JtIGFuZCBkaXNwbGF5IHRoZSByZWdpc3RlciBmb3JtLiAgXHJcbiAgICByZXBsYWNlV2l0aFJlZ2lzdHJhdGlvbkZvcm0oKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ0ZXN0aW5nXCIpO1xyXG4gICAgICAgIGNvbnN0IHJlZ2lzdHJhdGlvblBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm91dHB1dF9fcmVnaXN0cmF0aW9uXCIpXHJcbiAgICAgICAgY29uc3QgbG9naW5QYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vdXRwdXRfX2xvZ2luXCIpO1xyXG4gICAgICAgIGxvZ2luUGFnZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgcmVnaXN0cmF0aW9uUGFnZS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgfSxcclxuICAgIC8vIEZ1bmN0aW9uIHRvIGhpZGUgdGhlIHJlZ2lzdGVyIGZvcm0gYW5kIGRpc3BsYXkgdGhlIGxvZ2luIGZvcm0uXHJcbiAgICByZXBsYWNlV2l0aExvZ2luRm9ybSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkxvZ2luRm9ybVwiKTtcclxuICAgICAgICBsb2dpblBhZ2Uuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgICByZWdpc3RyYXRpb25QYWdlLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBsb2dpbiIsImltcG9ydCBsb2dpbiBmcm9tIFwiLi9sb2dpblwiXHJcbmltcG9ydCByZWdpc3RyYXRpb25Gb3JtIGZyb20gXCIuL3JlZ2lzdGVyXCI7XHJcbmxvZ2luLmNyZWF0ZUFuZEFwcGVuZExvZ2luSW5wdXQoKTtcclxucmVnaXN0cmF0aW9uRm9ybS5jcmVhdGVBbmRBcHBlbmRSZWdpc3RyYXRpb25Gb3JtKCk7XHJcbmltcG9ydCBOZXdzTGlzdCBmcm9tIFwiLi9uZXdzL25ld3NMaXN0XCJcclxuaW1wb3J0IE5ld3NGb3JtIGZyb20gXCIuL25ld3MvbmV3c0Zvcm1cIlxyXG5OZXdzTGlzdC5mcmlkZ2lmeSgpXHJcbk5ld3NGb3JtLmNyZWF0ZUFuZEFwcGVuZEZvcm0oKSIsImltcG9ydCBOZXdzQ29sbGVjdGlvbiBmcm9tIFwiLi9uZXdzQ29sbGVjdGlvblwiXHJcbmltcG9ydCBOZXdzTGlzdCBmcm9tIFwiLi9uZXdzTGlzdFwiXHJcbmltcG9ydCBOZXdzRWRpdEZvcm0gZnJvbSBcIi4vbmV3c0VkaXRGb3JtXCJcclxuXHJcbmNvbnN0IE5ld3MgPSB7XHJcblxyXG4gIE5ld3NCdWlsZGVyKE5ld3NPYmplY3QpIHtcclxuICAgIGxldCBOZXdzQXJ0aWNsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhcnRpY2xlXCIpXHJcbiAgICBOZXdzQXJ0aWNsZS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgTmV3cy0tJHtOZXdzT2JqZWN0LmlkfWApXHJcblxyXG4gICAgbGV0IE5ld3NOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpXHJcbiAgICBOZXdzTmFtZS50ZXh0Q29udGVudCA9IE5ld3NPYmplY3QubmFtZVxyXG5cclxuICAgIGxldCBOZXdzRXhwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIilcclxuICAgIE5ld3NFeHAudGV4dENvbnRlbnQgPSBOZXdzT2JqZWN0LmV4cGlyYXRpb25cclxuXHJcbiAgICBsZXQgTmV3c1R5cGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKVxyXG4gICAgbGV0IE5ld3NUeXBlMiA9IE5ld3NPYmplY3QudHlwZVxyXG4gICAgTmV3c1R5cGUudGV4dENvbnRlbnQgPSBOZXdzVHlwZTJcclxuICAgIE5ld3NUeXBlLnNldEF0dHJpYnV0ZShcImhyZWZcIiwgYCR7TmV3c1R5cGUyfWApXHJcbiAgICBsZXQgZWRpdE5ld3NCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpXHJcbiAgICBlZGl0TmV3c0J1dHRvbi50ZXh0Q29udGVudCA9IFwiRWRpdFwiXHJcbiAgICBlZGl0TmV3c0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICBsZXQgYXJ0aWNsZUlkID0gZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUuaWRcclxuICAgICAgbGV0IE5ld3NJZCA9IGFydGljbGVJZC5zcGxpdChcIi0tXCIpWzFdXHJcbiAgICAgIE5ld3NDb2xsZWN0aW9uLmdldE5ld3MoTmV3c0lkKVxyXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgIE5ld3NFZGl0Rm9ybS5jcmVhdGVBbmRBcHBlbmRGb3JtKGFydGljbGVJZCwgcmVzcG9uc2UpXHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcblxyXG4gICAgbGV0IGRlbGV0ZU5ld3NCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpXHJcbiAgICBkZWxldGVOZXdzQnV0dG9uLnRleHRDb250ZW50ID0gXCJEZWxldGVcIlxyXG4gICAgZGVsZXRlTmV3c0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICBsZXQgTmV3c0lkID0gZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUuaWQuc3BsaXQoXCItLVwiKVsxXVxyXG4gICAgICBOZXdzQ29sbGVjdGlvbi5kZWxldGVOZXdzKE5ld3NJZClcclxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICBOZXdzTGlzdC5mcmlkZ2lmeSgpXHJcbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2VcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxuXHJcbiAgICBOZXdzQXJ0aWNsZS5hcHBlbmRDaGlsZChOZXdzTmFtZSlcclxuICAgIE5ld3NBcnRpY2xlLmFwcGVuZENoaWxkKE5ld3NFeHApXHJcbiAgICBOZXdzQXJ0aWNsZS5hcHBlbmRDaGlsZChOZXdzVHlwZSlcclxuICAgIE5ld3NBcnRpY2xlLmFwcGVuZENoaWxkKGVkaXROZXdzQnV0dG9uKVxyXG4gICAgTmV3c0FydGljbGUuYXBwZW5kQ2hpbGQoZGVsZXRlTmV3c0J1dHRvbilcclxuXHJcbiAgICByZXR1cm4gTmV3c0FydGljbGVcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE5ld3NcclxuIiwiXHJcbmNvbnN0IE5ld3NDb2xsZWN0aW9uID0ge1xyXG4gICAgZ2V0QWxsTmV3c3MoKSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L05ld3NcIilcclxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgcG9zdE5ld05ld3MobmV3TmV3c1RvU2F2ZSkge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9OZXdzXCIsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobmV3TmV3c1RvU2F2ZSlcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGRlbGV0ZU5ld3MoTmV3c0lkKSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvTmV3cy8ke05ld3NJZH1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgZ2V0TmV3cyhOZXdzSWQpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9OZXdzLyR7TmV3c0lkfWApXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgIH0sXHJcbiAgICBwdXRFeGlzdGluZ05ld3MoTmV3c0lkLCBOZXdzVG9FZGl0KSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvTmV3cy8ke05ld3NJZH1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQVVRcIixcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoTmV3c1RvRWRpdClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcbmNvbnNvbGUudGFibGUoTmV3c0NvbGxlY3Rpb24uZ2V0QWxsTmV3c3MoKSlcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE5ld3NDb2xsZWN0aW9uXHJcbiIsImltcG9ydCBOZXdzQ29sbGVjdGlvbiBmcm9tIFwiLi9uZXdzQ29sbGVjdGlvblwiXHJcbmltcG9ydCBOZXdzTGlzdCBmcm9tIFwiLi9uZXdzTGlzdFwiXHJcblxyXG5jb25zdCBOZXdzRWRpdEZvcm0gPSB7XHJcbiAgY3JlYXRlQW5kQXBwZW5kRm9ybShhcnRpY2xlSWQsIE5ld3NPYmpUb0VkaXQpIHtcclxuXHJcbiAgICBsZXQgTmV3c05hbWVGaWVsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpXHJcblxyXG4gICAgbGV0IE5ld3NOYW1lTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIilcclxuICAgIE5ld3NOYW1lTGFiZWwudGV4dENvbnRlbnQgPSBcIlRpdGxlXCJcclxuICAgIGxldCBOZXdzTmFtZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpXHJcbiAgICBOZXdzTmFtZUlucHV0LnZhbHVlID0gTmV3c09ialRvRWRpdC5uYW1lXHJcblxyXG4gICAgTmV3c05hbWVGaWVsZC5hcHBlbmRDaGlsZChOZXdzTmFtZUxhYmVsKVxyXG4gICAgTmV3c05hbWVGaWVsZC5hcHBlbmRDaGlsZChOZXdzTmFtZUlucHV0KVxyXG5cclxuICAgIGxldCBOZXdzRXhwaXJhdGlvbkZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIilcclxuXHJcbiAgICBsZXQgTmV3c0V4cGlyYXRpb25MYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKVxyXG4gICAgTmV3c0V4cGlyYXRpb25MYWJlbC50ZXh0Q29udGVudCA9IFwiU3VtbWFyeVwiXHJcbiAgICBsZXQgTmV3c0V4cGlyYXRpb25JbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKVxyXG4gICAgTmV3c0V4cGlyYXRpb25JbnB1dC52YWx1ZSA9IE5ld3NPYmpUb0VkaXQuZXhwaXJhdGlvblxyXG5cclxuICAgIE5ld3NFeHBpcmF0aW9uRmllbGQuYXBwZW5kQ2hpbGQoTmV3c0V4cGlyYXRpb25MYWJlbClcclxuICAgIE5ld3NFeHBpcmF0aW9uRmllbGQuYXBwZW5kQ2hpbGQoTmV3c0V4cGlyYXRpb25JbnB1dClcclxuXHJcbiAgICBsZXQgTmV3c1R5cGVGaWVsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpXHJcblxyXG4gICAgbGV0IE5ld3NUeXBlTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIilcclxuICAgIE5ld3NUeXBlTGFiZWwudGV4dENvbnRlbnQgPSBcIlVSTFwiXHJcbiAgICBsZXQgTmV3c1R5cGVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKVxyXG4gICAgTmV3c1R5cGVJbnB1dC52YWx1ZSA9IE5ld3NPYmpUb0VkaXQudHlwZVxyXG4gICAgTmV3c1R5cGVGaWVsZC5hcHBlbmRDaGlsZChOZXdzVHlwZUxhYmVsKVxyXG4gICAgTmV3c1R5cGVGaWVsZC5hcHBlbmRDaGlsZChOZXdzVHlwZUlucHV0KVxyXG5cclxuICAgIGxldCB1cGRhdGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpXHJcbiAgICB1cGRhdGVCdXR0b24udGV4dENvbnRlbnQgPSBcIlVwZGF0ZVwiXHJcblxyXG4gICAgdXBkYXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgIGxldCBlZGl0ZWROZXdzID0ge1xyXG4gICAgICAgIG5hbWU6IE5ld3NOYW1lSW5wdXQudmFsdWUsXHJcbiAgICAgICAgZXhwaXJhdGlvbjogTmV3c0V4cGlyYXRpb25JbnB1dC52YWx1ZSxcclxuICAgICAgICB0eXBlOiBOZXdzVHlwZUlucHV0LnZhbHVlXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIE5ld3NDb2xsZWN0aW9uLnB1dEV4aXN0aW5nTmV3cyhOZXdzT2JqVG9FZGl0LmlkLCBlZGl0ZWROZXdzKVxyXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgIE5ld3NMaXN0LmZyaWRnaWZ5KClcclxuICAgICAgICAgIHJldHVybiByZXNwb25zZVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG5cclxuICAgIGxldCBOZXdzSXRlbUFydGljbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHthcnRpY2xlSWR9YClcclxuXHJcbiAgICB3aGlsZSAoTmV3c0l0ZW1BcnRpY2xlLmZpcnN0Q2hpbGQpIHtcclxuICAgICAgTmV3c0l0ZW1BcnRpY2xlLnJlbW92ZUNoaWxkKE5ld3NJdGVtQXJ0aWNsZS5maXJzdENoaWxkKTtcclxuICAgIH1cclxuICAgIE5ld3NJdGVtQXJ0aWNsZS5hcHBlbmRDaGlsZChOZXdzTmFtZUZpZWxkKVxyXG4gICAgTmV3c0l0ZW1BcnRpY2xlLmFwcGVuZENoaWxkKE5ld3NFeHBpcmF0aW9uRmllbGQpXHJcbiAgICBOZXdzSXRlbUFydGljbGUuYXBwZW5kQ2hpbGQoTmV3c1R5cGVGaWVsZClcclxuICAgIE5ld3NJdGVtQXJ0aWNsZS5hcHBlbmRDaGlsZCh1cGRhdGVCdXR0b24pXHJcbiAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IE5ld3NFZGl0Rm9ybVxyXG4iLCJpbXBvcnQgTmV3c0NvbGxlY3Rpb24gZnJvbSBcIi4vbmV3c0NvbGxlY3Rpb25cIlxyXG5pbXBvcnQgTmV3c0xpc3QgZnJvbSBcIi4vbmV3c0xpc3RcIlxyXG5pbXBvcnQgbG9naW4gZnJvbSBcIi4uL2xvZ2luXCJcclxuXHJcbmNvbnN0IE5ld3NGb3JtID0ge1xyXG5cclxuICAvLyBUaGlzIG1vZHVsZSB3aWxsIGJ1aWxkIGEgZm9ybSBhbmQgYXBwZW5kIGl0IHRvIHRoZSBET00uIFRoZSBmb3JtIHdpbGwgY29udGFpbiBpbnB1dCBmaWVsZHMgZm9yIGEgdXNlciB0byBhZGQgYSBuZXcgTmV3cyB0byB0aGVpciByZWZyaWdlcmF0b3IgYW5kIGEgYnV0dG9uIHdpdGggYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCB3aWxsIGxpc3RlbiBmb3IgdGhlIGNsaWNrXHJcbiAgY3JlYXRlQW5kQXBwZW5kRm9ybSgpIHtcclxuICAgIC8vIDEuIEJ1aWxkIEhUTUwgZm9ybVxyXG4gICAgbGV0IGZvcm1IZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIilcclxuICAgIGZvcm1IZWFkZXIudGV4dENvbnRlbnQgPSBcIllvdXIgU3Bvb2t5IE5ld3MgXCJcclxuXHJcbiAgICBsZXQgTmV3c05hbWVGaWVsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmaWVsZHNldFwiKVxyXG5cclxuICAgIGxldCBOZXdzTmFtZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpXHJcbiAgICBOZXdzTmFtZUxhYmVsLnRleHRDb250ZW50ID0gXCJUaXRsZVwiXHJcbiAgICBOZXdzTmFtZUxhYmVsLnNldEF0dHJpYnV0ZShcImZvclwiLCBcIk5ld3NfX25hbWVcIilcclxuICAgIGxldCBOZXdzTmFtZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpXHJcbiAgICBOZXdzTmFtZUlucHV0LnNldEF0dHJpYnV0ZShcImlkXCIsIFwiTmV3c19fbmFtZVwiKVxyXG4gICAgTmV3c05hbWVJbnB1dC5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIsIFwiTmV3c19fbmFtZVwiKVxyXG5cclxuICAgIE5ld3NOYW1lRmllbGQuYXBwZW5kQ2hpbGQoTmV3c05hbWVMYWJlbClcclxuICAgIE5ld3NOYW1lRmllbGQuYXBwZW5kQ2hpbGQoTmV3c05hbWVJbnB1dClcclxuXHJcbiAgICBsZXQgTmV3c0V4cGlyYXRpb25GaWVsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmaWVsZHNldFwiKVxyXG5cclxuICAgIGxldCBOZXdzRXhwaXJhdGlvbkxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpXHJcbiAgICBOZXdzRXhwaXJhdGlvbkxhYmVsLnRleHRDb250ZW50ID0gXCJTdW1tYXJ5XCJcclxuICAgIE5ld3NFeHBpcmF0aW9uTGFiZWwuc2V0QXR0cmlidXRlKFwiZm9yXCIsIFwiTmV3c19fZXhwaXJhdGlvblwiKVxyXG4gICAgbGV0IE5ld3NFeHBpcmF0aW9uSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIilcclxuICAgIE5ld3NFeHBpcmF0aW9uSW5wdXQuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJOZXdzX19leHBpcmF0aW9uXCIpXHJcbiAgICBOZXdzRXhwaXJhdGlvbklucHV0LnNldEF0dHJpYnV0ZShcIm5hbWVcIiwgXCJOZXdzX19leHBpcmF0aW9uXCIpXHJcblxyXG4gICAgTmV3c0V4cGlyYXRpb25GaWVsZC5hcHBlbmRDaGlsZChOZXdzRXhwaXJhdGlvbkxhYmVsKVxyXG4gICAgTmV3c0V4cGlyYXRpb25GaWVsZC5hcHBlbmRDaGlsZChOZXdzRXhwaXJhdGlvbklucHV0KVxyXG5cclxuICAgIGxldCBOZXdzVHlwZUZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZpZWxkc2V0XCIpXHJcblxyXG4gICAgbGV0IE5ld3NUeXBlTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIilcclxuICAgIE5ld3NUeXBlTGFiZWwudGV4dENvbnRlbnQgPSBcIlVSTFwiXHJcbiAgICBOZXdzVHlwZUxhYmVsLnNldEF0dHJpYnV0ZShcImZvclwiLCBcIk5ld3NfX3R5cGVcIilcclxuICAgIGxldCBOZXdzVHlwZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpXHJcbiAgICBOZXdzVHlwZUlucHV0LnNldEF0dHJpYnV0ZShcImlkXCIsIFwiTmV3c19fdHlwZVwiKVxyXG4gICAgTmV3c1R5cGVJbnB1dC5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIsIFwiTmV3c19fdHlwZVwiKVxyXG5cclxuXHJcbiAgICBOZXdzVHlwZUZpZWxkLmFwcGVuZENoaWxkKE5ld3NUeXBlTGFiZWwpXHJcbiAgICBOZXdzVHlwZUZpZWxkLmFwcGVuZENoaWxkKE5ld3NUeXBlSW5wdXQpXHJcblxyXG4gICAgbGV0IHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIilcclxuICAgIHN1Ym1pdEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiQWRkIEFydGljbGVcIlxyXG4gICAgc3VibWl0QnV0dG9uLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiTmV3c19fc2F2ZVwiKVxyXG5cclxuICAgIC8vIDIuIEF0dGFjaCBldmVudCBsaXN0ZW5lciB0byBidXR0b24gaW4gZm9ybVxyXG4gICAgc3VibWl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmhhbmRsZUFkZE5ld05ld3MpXHJcblxyXG4gICAgLy8gMy4gQXBwZW5kIHRoZSBIVE1MIGZvcm0gdG8gdGhlIERPTVxyXG4gICAgLy9Ob3RpY2UgdGhhdCBJIGhhdmUgYWRkZWQgYW4gYXJ0aWNsZSBlbGVtZW50IHRvIG15IGluZGV4Lmh0bWwgd2l0aCB0aGUgY2xhc3MgXCJmb3JtXCIuXHJcbiAgICBsZXQgTmV3c0Zvcm1GcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxyXG4gICAgTmV3c0Zvcm1GcmFnbWVudC5hcHBlbmRDaGlsZChmb3JtSGVhZGVyKVxyXG4gICAgTmV3c0Zvcm1GcmFnbWVudC5hcHBlbmRDaGlsZChOZXdzTmFtZUZpZWxkKVxyXG4gICAgTmV3c0Zvcm1GcmFnbWVudC5hcHBlbmRDaGlsZChOZXdzRXhwaXJhdGlvbkZpZWxkKVxyXG4gICAgTmV3c0Zvcm1GcmFnbWVudC5hcHBlbmRDaGlsZChOZXdzVHlwZUZpZWxkKVxyXG4gICAgTmV3c0Zvcm1GcmFnbWVudC5hcHBlbmRDaGlsZChzdWJtaXRCdXR0b24pXHJcblxyXG4gICAgbGV0IGZvcm1BcnRpY2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vdXRwdXRfX25ld3NcIilcclxuICAgIGZvcm1BcnRpY2xlLmFwcGVuZENoaWxkKE5ld3NGb3JtRnJhZ21lbnQpXHJcblxyXG4gIH0sXHJcbiAgaGFuZGxlQWRkTmV3TmV3cygpIHtcclxuICAgIGxldCBpbnB1dE5ld3NOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNOZXdzX19uYW1lXCIpLnZhbHVlXHJcbiAgICBsZXQgaW5wdXROZXdzRXhwaXJhdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjTmV3c19fZXhwaXJhdGlvblwiKS52YWx1ZVxyXG4gICAgbGV0IGlucHV0TmV3c1R5cGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI05ld3NfX3R5cGVcIikudmFsdWVcclxuICAgIGxldCB1c2VySWR0eXRwZSA9IHNlc3Npb25TdG9yYWdlXHJcblxyXG4gICAgbGV0IG5ld05ld3MgPSB7XHJcbiAgICAgIG5hbWU6IGlucHV0TmV3c05hbWUsXHJcbiAgICAgIGV4cGlyYXRpb246IGlucHV0TmV3c0V4cGlyYXRpb24sXHJcbiAgICAgIHR5cGU6IGlucHV0TmV3c1R5cGUsXHJcbiAgICAgIHVzZXJJZDogdXNlcklkdHl0cGVcclxuICAgIH1cclxuXHJcbiAgICBOZXdzQ29sbGVjdGlvbi5wb3N0TmV3TmV3cyhuZXdOZXdzKVxyXG4gICAgICAudGhlbihyZXNwb25zZSA9PiAge1xyXG4gICAgICAgIE5ld3NMaXN0LmZyaWRnaWZ5KClcclxuICAgICAgICByZXR1cm4gcmVzcG9uc2VcclxuXHJcbiAgICAgIH0pXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBOZXdzRm9ybVxyXG4iLCJpbXBvcnQgTmV3c0NvbGxlY3Rpb24gZnJvbSBcIi4vbmV3c0NvbGxlY3Rpb25cIlxyXG5pbXBvcnQgTmV3cyBmcm9tIFwiLi9uZXdzXCJcclxuXHJcbmNvbnN0IE5ld3NMaXN0ID0ge1xyXG4gICAgZnJpZGdpZnkoKSB7XHJcbiAgICAgICAgTmV3c0NvbGxlY3Rpb24uZ2V0QWxsTmV3c3MoKVxyXG4gICAgICAgICAgICAudGhlbihhbGxOZXdzcyA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IE5ld3NEb2NGcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxyXG5cclxuICAgICAgICAgICAgICAgIGFsbE5ld3NzLmZvckVhY2goTmV3c0l0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBOZXdzSHRtbCA9IE5ld3MuTmV3c0J1aWxkZXIoTmV3c0l0ZW0pXHJcbiAgICAgICAgICAgICAgICAgICAgTmV3c0RvY0ZyYWdtZW50LmFwcGVuZENoaWxkKE5ld3NIdG1sKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgb3V0cHV0QXJ0aWNsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub3V0cHV0X19uZXdzU2VjdGlvbjJcIilcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHdoaWxlIChvdXRwdXRBcnRpY2xlLmZpcnN0Q2hpbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICBvdXRwdXRBcnRpY2xlLnJlbW92ZUNoaWxkKG91dHB1dEFydGljbGUuZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBvdXRwdXRBcnRpY2xlLmFwcGVuZENoaWxkKE5ld3NEb2NGcmFnbWVudClcclxuXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE5ld3NMaXN0XHJcbiIsImltcG9ydCBBUEkgZnJvbSBcIi4vYXBpXCJcclxuaW1wb3J0IGxvZ2luIGZyb20gXCIuL2xvZ2luXCJcclxuLy8gRGVjbGFyZSB2YXJpYWJsZXMgdG8gaG9sZCB1c2VyIGlucHV0XHJcbmNvbnN0IHVzZXJOYW1lSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIilcclxuY29uc3QgdXNlclBhc3N3b3JkSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIilcclxuY29uc3QgdXNlckVtYWlsSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIilcclxuXHJcbmNvbnN0IGNyZWF0ZU5ld1VzZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpXHJcblxyXG4vLyBEZWNsYXJlIHZhcmlhYmxlIHRvIGJlIGV4cG9ydGVkXHJcbmNvbnN0IHJlZ2lzdHJhdGlvbkZvcm0gPSB7XHJcblxyXG4gICAgLy8gVGhpcyBtb2R1bGUgd2lsbCBidWlsZCBhIGZvcm0gYW5kIGFwcGVuZCBpdCB0byB0aGUgRE9NLiBUaGUgZm9ybSB3aWxsIGNvbnRhaW4gaW5wdXQgZmllbGRzIGZvciBhIHVzZXIgdG8gYWRkIHRoZW1zZWx2ZXMgdG8gdGhlIGRhdGFiYXNlIG9mIHJlZ2lzdGVyZWQgdXNlcnMgYW5kIGEgYnV0dG9uIHdpdGggYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCB3aWxsIGxpc3RlbiBmb3IgdGhlIGNsaWNrXHJcbiAgICBjcmVhdGVBbmRBcHBlbmRSZWdpc3RyYXRpb25Gb3JtICgpIHtcclxuXHJcbiAgICBjb25zdCByZWdpc3RlckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub3V0cHV0X19yZWdpc3RyYXRpb25cIilcclxuICAgIGNvbnN0IHJlZ2lzdGVySGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpXHJcbiAgICByZWdpc3RlckNvbnRhaW5lci5hcHBlbmRDaGlsZChyZWdpc3RlckhlYWRlcilcclxuICAgIHJlZ2lzdGVySGVhZGVyLnRleHRDb250ZW50PVwiUmVnaXN0ZXIgVXNlclwiXHJcblxyXG5cclxuLy8gc2V0dGluZyB0eXBlIGZvciB2YXJpYWJsZXNcclxuXHJcbiAgICB1c2VyTmFtZUlucHV0LnR5cGUgPSBcInRleHRcIlxyXG4gICAgdXNlclBhc3N3b3JkSW5wdXQudHlwZSA9IFwidGV4dFwiXHJcbiAgICB1c2VyRW1haWxJbnB1dC50eXBlID0gXCJ0ZXh0XCJcclxuXHJcbiAgICAvLyBDcmVhdGUgd2hhdCB0aGUgdXNlciBzZWVzIGluIGZpZWxkc1xyXG5cclxuICAgIHVzZXJOYW1lSW5wdXQucGxhY2Vob2xkZXIgPSBcIklucHV0IFVzZXJOYW1lXCJcclxuICAgIHVzZXJQYXNzd29yZElucHV0LnBsYWNlaG9sZGVyID0gXCJDcmVhdGUgUGFzc3dvcmRcIlxyXG4gICAgdXNlckVtYWlsSW5wdXQucGxhY2Vob2xkZXIgPSBcIklucHV0IEVtYWlsIEFkZHJlc3NcIlxyXG4gICAgY3JlYXRlTmV3VXNlci50ZXh0Q29udGVudCA9IFwiUmVnaXN0ZXIgVXNlclwiXHJcblxyXG4gICAgLy8gQWRkIGZpZWxkcyB0byBET01cclxuXHJcbiAgICByZWdpc3RlckNvbnRhaW5lci5hcHBlbmRDaGlsZCh1c2VyTmFtZUlucHV0KVxyXG4gICAgcmVnaXN0ZXJDb250YWluZXIuYXBwZW5kQ2hpbGQodXNlclBhc3N3b3JkSW5wdXQpXHJcbiAgICByZWdpc3RlckNvbnRhaW5lci5hcHBlbmRDaGlsZCh1c2VyRW1haWxJbnB1dClcclxuICAgIHJlZ2lzdGVyQ29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZU5ld1VzZXIpXHJcblxyXG4gICAgLy8gQWRkIGV2ZW50IGxpc3RlbmVyIHRvIGNyZWF0ZU5ld1VzZXIgYnV0dG9uXHJcblxyXG4gICAgY3JlYXRlTmV3VXNlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5yZWdpc3RlclVzZXIpICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICByZWdpc3RlclVzZXIgKCkge1xyXG4gICAgICAgIGNvbnN0IHVzZXJOYW1lVmFsdWUgPSB1c2VyTmFtZUlucHV0LnZhbHVlO1xyXG4gICAgICAgIGNvbnN0IHVzZXJQYXNzd29yZFZhbHVlID0gdXNlclBhc3N3b3JkSW5wdXQudmFsdWU7XHJcbiAgICAgICAgY29uc3QgdXNlckVtYWlsVmFsdWUgPSB1c2VyRW1haWxJbnB1dC52YWx1ZTtcclxuXHJcbiAgICAgICAgbGV0IG5ld1VzZXJUb1NhdmUgPSB7XHJcbiAgICAgICAgICAgIHVzZXJOYW1lOiB1c2VyTmFtZVZhbHVlLFxyXG4gICAgICAgICAgICBwYXNzd29yZDogdXNlclBhc3N3b3JkVmFsdWUsXHJcbiAgICAgICAgICAgIGVtYWlsOiB1c2VyRW1haWxWYWx1ZVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICBBUEkucG9zdE5ld0RhdGEoXCJ1c2Vyc1wiLG5ld1VzZXJUb1NhdmUpXHJcblxyXG4gICAgICAgIGxvZ2luLnJlcGxhY2VXaXRoTG9naW5Gb3JtKCk7XHJcbiAgICB9XHJcblxyXG4gICAgICAgIFxyXG59XHJcbiAgZXhwb3J0IGRlZmF1bHQgcmVnaXN0cmF0aW9uRm9ybVxyXG4iXX0=
