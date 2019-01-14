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
    let newNews = {
      name: inputNewsName,
      expiration: inputNewsExpiration,
      type: inputNewsType
    };

    _newsCollection.default.postNewNews(newNews).then(response => {
      _newsList.default.fridgify();

      return response;
    });
  }

};
var _default = NewsForm;
exports.default = _default;

},{"./newsCollection":5,"./newsList":8}],8:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2FwaS5qcyIsIi4uL3NjcmlwdHMvbG9naW4uanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL25ld3MvbmV3cy5qcyIsIi4uL3NjcmlwdHMvbmV3cy9uZXdzQ29sbGVjdGlvbi5qcyIsIi4uL3NjcmlwdHMvbmV3cy9uZXdzRWRpdEZvcm0uanMiLCIuLi9zY3JpcHRzL25ld3MvbmV3c0Zvcm0uanMiLCIuLi9zY3JpcHRzL25ld3MvbmV3c0xpc3QuanMiLCIuLi9zY3JpcHRzL3JlZ2lzdGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDQUEsTUFBTSxHQUFHLEdBQUc7QUFFUixFQUFBLE9BQU8sQ0FBQyxRQUFELEVBQVc7QUFDZCxXQUFPLEtBQUssQ0FBRSx5QkFBd0IsUUFBUyxFQUFuQyxDQUFMLENBQ04sSUFETSxDQUNELFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBVCxFQURYLENBQVA7QUFFSCxHQUxPOztBQU1SLEVBQUEsV0FBVyxDQUFDLFFBQUQsRUFBVSxPQUFWLEVBQW1CO0FBQzFCLFdBQU8sS0FBSyxDQUFFLHlCQUF3QixRQUFTLEVBQW5DLEVBQXNDO0FBQ2hELE1BQUEsTUFBTSxFQUFFLE1BRHdDO0FBRWhELE1BQUEsT0FBTyxFQUFFO0FBQ0wsd0JBQWdCO0FBRFgsT0FGdUM7QUFLaEQsTUFBQSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQUwsQ0FBZSxPQUFmO0FBTDBDLEtBQXRDLENBQVo7QUFPRDs7QUFkSyxDQUFaLEMsQ0FvQkE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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Q0FBQyxXQUFsQixDQUE4QixhQUE5QjtBQUNBLElBQUEsaUJBQWlCLENBQUMsV0FBbEIsQ0FBOEIsaUJBQTlCO0FBQ0EsSUFBQSxpQkFBaUIsQ0FBQyxXQUFsQixDQUE4QixjQUE5QjtBQUNBLElBQUEsaUJBQWlCLENBQUMsV0FBbEIsQ0FBOEIsYUFBOUIsRUExQm1DLENBNEJuQzs7QUFFQSxJQUFBLGFBQWEsQ0FBQyxnQkFBZCxDQUErQixPQUEvQixFQUF3QyxLQUFLLFlBQTdDO0FBQ0MsR0FsQ29COztBQW9DckIsRUFBQSxZQUFZLEdBQUk7QUFDWixVQUFNLGFBQWEsR0FBRyxhQUFhLENBQUMsS0FBcEM7QUFDQSxVQUFNLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDLEtBQTVDO0FBQ0EsVUFBTSxjQUFjLEdBQUcsY0FBYyxDQUFDLEtBQXRDO0FBRUEsUUFBSSxhQUFhLEdBQUc7QUFDaEIsTUFBQSxRQUFRLEVBQUUsYUFETTtBQUVoQixNQUFBLFFBQVEsRUFBRSxpQkFGTTtBQUdoQixNQUFBLEtBQUssRUFBRTtBQUhTLEtBQXBCOztBQU1BLGlCQUFJLFdBQUosQ0FBZ0IsT0FBaEIsRUFBd0IsYUFBeEI7O0FBRUEsbUJBQU0sb0JBQU47QUFDSDs7QUFsRG9CLENBQXpCO2VBc0RpQixnQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IEFQSSA9IHtcclxuXHJcbiAgICBnZXREYXRhKHJlc291cmNlKSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvJHtyZXNvdXJjZX1gKVxyXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgIH0sXHJcbiAgICBwb3N0TmV3RGF0YShyZXNvdXJjZSxwYXlsb2FkKSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvJHtyZXNvdXJjZX1gLCB7XHJcbiAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZClcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcblxyXG59XHJcblxyXG5cclxuXHJcbi8vICAgICBnZXRBbGxVc2VycygpIHtcclxuLy8gICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvdXNlcnNcIilcclxuLy8gICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbi8vICAgICAgIH0sXHJcblxyXG4vLyAgICAgZ2V0QWxsTWVzc2FnZXMoKSB7XHJcbi8vICAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L21lc3NhZ2VzXCIpXHJcbi8vICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbilcclxuLy8gICAgICAgfSxcclxuXHJcbi8vICAgICBnZXRBbGxOZXdzQXJ0aWNsZXMoKSB7XHJcbi8vICAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L25ld3NBcnRpY2xlc1wiKVxyXG4vLyAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuLy8gICAgICAgfSxcclxuXHJcbi8vICAgICBnZXRBbGxUYXNrcygpIHtcclxuLy8gICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvdGFza3NcIilcclxuLy8gICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbi8vICAgICAgIH0sXHJcblxyXG4vLyAgICAgZ2V0QWxsRXZlbnRzKCkge1xyXG4vLyAgICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9ldmVudHNcIilcclxuLy8gICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbi8vICAgICAgIH0sXHJcblxyXG4vLyAgICAgZ2V0QWxsRnJpZW5kcygpIHtcclxuLy8gICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvZnJpZW5kc1wiKVxyXG4vLyAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuLy8gICAgICAgfSxcclxuXHJcblxyXG4vLyAgICAgcG9zdE5ld1VzZXIobmV3VXNlclRvQWRkKSB7XHJcbi8vICAgICBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC91c2Vyc1wiLCB7XHJcbi8vICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuLy8gICAgICAgICBoZWFkZXJzOiB7XHJcbi8vICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbi8vICAgICAgICAgfSxcclxuLy8gICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShuZXdVc2VyVG9BZGQpXHJcbi8vICAgICB9KVxyXG4vLyAgICAgfSxcclxuXHJcbi8vICAgICBwb3N0TmV3TWVzc2FnZShuZXdNZXNzYWdlVG9BZGQpIHtcclxuLy8gICAgICAgICBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9tZXNzYWdlc1wiLCB7XHJcbi8vICAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbi8vICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuLy8gICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbi8vICAgICAgICAgICAgIH0sXHJcbi8vICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5ld01lc3NhZ2VUb0FkZClcclxuLy8gICAgIH0pXHJcbi8vICAgICB9LFxyXG5cclxuLy8gICAgIHBvc3ROZXdOZXdzQXJ0aWNsZShuZXdOZXdzQXJ0aWNsZVRvQWRkKSB7XHJcbi8vICAgICBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9uZXdzQXJ0aWNsZXNcIiwge1xyXG4vLyAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbi8vICAgICAgICAgaGVhZGVyczoge1xyXG4vLyAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4vLyAgICAgICAgIH0sXHJcbi8vICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobmV3TmV3c0FydGljbGVUb0FkZClcclxuLy8gICAgIH0pXHJcbi8vICAgICB9LFxyXG5cclxuLy8gICAgIHBvc3ROZXdUYXNrKG5ld1Rhc2tUb0FkZCkge1xyXG4vLyAgICAgICAgIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L3Rhc2tzXCIsIHtcclxuLy8gICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuLy8gICAgICAgICAgICAgaGVhZGVyczoge1xyXG4vLyAgICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuLy8gICAgICAgICAgICAgfSxcclxuLy8gICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobmV3VGFza1RvQWRkKVxyXG4vLyAgICAgfSlcclxuLy8gICAgIH0sXHJcblxyXG5cclxuLy8gfVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQVBJIiwiaW1wb3J0IEFQSSBmcm9tIFwiLi9hcGlcIlxyXG5pbXBvcnQgcmVnaXN0cmF0aW9uRm9ybSBmcm9tIFwiLi9yZWdpc3RlclwiXHJcbmNvbnN0IHVzZXJOYW1lSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbmNvbnN0IHBhc3N3b3JkSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbmNvbnN0IHJlZ2lzdHJhdGlvblBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm91dHB1dF9fcmVnaXN0cmF0aW9uXCIpXHJcbmNvbnN0IGxvZ2luUGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub3V0cHV0X19sb2dpblwiKTtcclxucmVnaXN0cmF0aW9uUGFnZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcblxyXG5jb25zdCBsb2dpbiA9IHtcclxuLy8gRnVuY3Rpb24gdG8gY3JlYXRlIGFuZCBhcHBlbmQgbG9naW4gaW5wdXQgZmllbGRzIGFuZCBsb2dpbiBidXR0b24uXHJcbiAgICBjcmVhdGVBbmRBcHBlbmRMb2dpbklucHV0KCkge1xyXG5cclxuICAgICAgICBjb25zdCBvdXRFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub3V0cHV0X19sb2dpblwiKTtcclxuICAgICAgICB1c2VyTmFtZUlucHV0LnR5cGUgPSBcInRleHRcIjtcclxuICAgICAgICB1c2VyTmFtZUlucHV0LnBsYWNlaG9sZGVyID0gXCJ1c2VybmFtZVwiO1xyXG4gICAgICAgIHBhc3N3b3JkSW5wdXQudHlwZSA9IFwicGFzc3dvcmRcIjtcclxuICAgICAgICBwYXNzd29yZElucHV0LnBsYWNlaG9sZGVyID0gXCJwYXNzd29yZFwiO1xyXG4gICAgICAgIG91dEVsLmFwcGVuZENoaWxkKHVzZXJOYW1lSW5wdXQpO1xyXG4gICAgICAgIG91dEVsLmFwcGVuZENoaWxkKHBhc3N3b3JkSW5wdXQpO1xyXG5cclxuICAgICAgICBjb25zdCBsb2dpbkJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICAgICAgbG9naW5CdXR0b24udGV4dENvbnRlbnQgPSAoXCJsb2dpblwiKTtcclxuICAgICAgICBjb25zdCByZWdpc3RlckJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICAgICAgcmVnaXN0ZXJCdXR0b24udGV4dENvbnRlbnQgPSAoXCJyZWdpc3RlclwiKTtcclxuICAgICAgICBvdXRFbC5hcHBlbmRDaGlsZChsb2dpbkJ1dHRvbik7XHJcbiAgICAgICAgb3V0RWwuYXBwZW5kQ2hpbGQocmVnaXN0ZXJCdXR0b24pO1xyXG4vLyBSdW5zIHRoZSBnZXRVc2VyRGF0YSgpIGZ1bmN0aW9uIHdoZW4gTG9naW4gYnV0dG9uIGlzIGNsaWNrZWQuXHJcbiAgICAgICAgbG9naW5CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuZ2V0VXNlckRhdGEpO1xyXG4vLyBSdW5zIHRoZSByZXBsYWNlV2l0aFJlZ2lzdHJhdGlvbkZvcm0oKSBmdW5jdGlvbiB3aGVuIFJlZ2lzdGVyIGJ1dHRvbiBpcyBjbGlja2VkLlxyXG4gICAgICAgIHJlZ2lzdGVyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnJlcGxhY2VXaXRoUmVnaXN0cmF0aW9uRm9ybSk7XHJcbiAgICB9LFxyXG4vLyBHYXRoZXJzIGRhdGEgZW50ZXJlZCBpbnRvIExvZ2luIGlucHV0IGZpZWxkcy4gRmV0Y2hlcyB1c2VyZGF0YSBmcm9tIEFQSSBhbmQgY29tcGFyZXMgaW5wdXQgZGF0YSB3aXRoIGV4aXN0aW5nIHVzZXIgZGF0YSBpbiBBUEkuIElmIGlucHV0IGRhdGEgbWF0Y2hlcyB1c2VyIGRhdGEgaW4gQVBJLCBydW5zIGxvYWRVc2VyU3BlY2lmaWNQYWdlKCkuIElmIGlucHV0IGRhdGEgZG9lcyBub3QgbWF0Y2ggYW55IHVzZXIgZGF0YSBpbiBBUEksIGFsZXJ0IGlzIHNlbnQuXHJcbiAgICBnZXRVc2VyRGF0YSAoKSB7XHJcbiAgICAgICAgY29uc3QgdXNlcm5hbWUgPSB1c2VyTmFtZUlucHV0LnZhbHVlO1xyXG4gICAgICAgIGNvbnN0IHBhc3N3b3JkID0gcGFzc3dvcmRJbnB1dC52YWx1ZTtcclxuICAgICAgICBBUEkuZ2V0RGF0YShcInVzZXJzXCIpXHJcbiAgICAgICAgLnRoZW4oYWxsVXNlcnMgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdXNlcnNQcm9jZXNzZWQgPSAxO1xyXG4gICAgICAgICAgICBhbGxVc2Vycy5mb3JFYWNoKHVzZXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHVzZXJuYW1lID09PSB1c2VyLnVzZXJOYW1lICYmIHBhc3N3b3JkID09PSB1c2VyLnBhc3N3b3JkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFRoaXMgb25lOiAke3VzZXIuaWR9YClcclxuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCd1c2VySWQnLCB1c2VyLmlkKVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB1c2VySWQgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd1c2VySWQnKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBsb2FkVXNlclNwZWNpZmljUGFnZSh1c2VySWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh1c2Vyc1Byb2Nlc3NlZCA9PT0gYWxsVXNlcnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJVc2VybmFtZS9wYXNzd29yZCBpbnZhbGlkLiBJZiBuZXcgdXNlciwgcGxlYXNlIHJlZ2lzdGVyLiA6KVwiKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1c2Vyc1Byb2Nlc3NlZCArK1xyXG4gICAgICAgICAgICAgICAgfTtcclxuLy8gVGhpcyBmdW5jdGlvbiB3aWxsIGxvYWQgdGhlIGRhc2hib2FyZCBmb3IgdGhlIHVzZXIgdGhhdCBzaWduZWQgaW4uIChXb3JrIGluIFByb2dyZXNzKVxyXG4gICAgICAgICAgICBmdW5jdGlvbiBsb2FkVXNlclNwZWNpZmljUGFnZSh1c2VySWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBsb2dpblBhZ2Uuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBUaGlzIGlzIHRoZSB1c2VyIHBhZ2UhICR7dXNlcklkfWApO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhc2hib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXNrQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vdXRwdXRfX3Rhc2tzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRhc2hib2FyZC50ZXh0Q29udGVudCA9IFwiRGFzaGJvYXJkXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZChkYXNoYm9hcmQpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgfSlcclxuICAgICAgICBcclxuICAgICB9LCBcclxuIC8vIEZ1bmN0aW9uIHRvIGhpZGUgdGhlIGxvZ2luIGZvcm0gYW5kIGRpc3BsYXkgdGhlIHJlZ2lzdGVyIGZvcm0uICBcclxuICAgICAgICByZXBsYWNlV2l0aFJlZ2lzdHJhdGlvbkZvcm0oKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidGVzdGluZ1wiKTtcclxuICAgICAgICAgICAgY29uc3QgcmVnaXN0cmF0aW9uUGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub3V0cHV0X19yZWdpc3RyYXRpb25cIilcclxuICAgICAgICAgICAgY29uc3QgbG9naW5QYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vdXRwdXRfX2xvZ2luXCIpO1xyXG4gICAgICAgICAgICBsb2dpblBhZ2Uuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICByZWdpc3RyYXRpb25QYWdlLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICAgfSxcclxuLy8gRnVuY3Rpb24gdG8gaGlkZSB0aGUgcmVnaXN0ZXIgZm9ybSBhbmQgZGlzcGxheSB0aGUgbG9naW4gZm9ybS5cclxuICAgICAgICByZXBsYWNlV2l0aExvZ2luRm9ybSgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJMb2dpbkZvcm1cIik7XHJcbiAgICAgICAgICAgIGxvZ2luUGFnZS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgICAgICByZWdpc3RyYXRpb25QYWdlLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbG9naW4iLCJpbXBvcnQgbG9naW4gZnJvbSBcIi4vbG9naW5cIlxyXG5pbXBvcnQgcmVnaXN0cmF0aW9uRm9ybSBmcm9tIFwiLi9yZWdpc3RlclwiO1xyXG5sb2dpbi5jcmVhdGVBbmRBcHBlbmRMb2dpbklucHV0KCk7XHJcbnJlZ2lzdHJhdGlvbkZvcm0uY3JlYXRlQW5kQXBwZW5kUmVnaXN0cmF0aW9uRm9ybSgpO1xyXG5pbXBvcnQgTmV3c0xpc3QgZnJvbSBcIi4vbmV3cy9uZXdzTGlzdFwiXHJcbmltcG9ydCBOZXdzRm9ybSBmcm9tIFwiLi9uZXdzL25ld3NGb3JtXCJcclxuTmV3c0xpc3QuZnJpZGdpZnkoKVxyXG5OZXdzRm9ybS5jcmVhdGVBbmRBcHBlbmRGb3JtKCkiLCJpbXBvcnQgTmV3c0NvbGxlY3Rpb24gZnJvbSBcIi4vbmV3c0NvbGxlY3Rpb25cIlxyXG5pbXBvcnQgTmV3c0xpc3QgZnJvbSBcIi4vbmV3c0xpc3RcIlxyXG5pbXBvcnQgTmV3c0VkaXRGb3JtIGZyb20gXCIuL25ld3NFZGl0Rm9ybVwiXHJcblxyXG5jb25zdCBOZXdzID0ge1xyXG5cclxuICBOZXdzQnVpbGRlcihOZXdzT2JqZWN0KSB7XHJcbiAgICBsZXQgTmV3c0FydGljbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYXJ0aWNsZVwiKVxyXG4gICAgTmV3c0FydGljbGUuc2V0QXR0cmlidXRlKFwiaWRcIiwgYE5ld3MtLSR7TmV3c09iamVjdC5pZH1gKVxyXG5cclxuICAgIGxldCBOZXdzTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKVxyXG4gICAgTmV3c05hbWUudGV4dENvbnRlbnQgPSBOZXdzT2JqZWN0Lm5hbWVcclxuXHJcbiAgICBsZXQgTmV3c0V4cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpXHJcbiAgICBOZXdzRXhwLnRleHRDb250ZW50ID0gTmV3c09iamVjdC5leHBpcmF0aW9uXHJcblxyXG4gICAgbGV0IE5ld3NUeXBlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIilcclxuICAgIGxldCBOZXdzVHlwZTIgPSBOZXdzT2JqZWN0LnR5cGVcclxuICAgIE5ld3NUeXBlLnRleHRDb250ZW50ID0gTmV3c1R5cGUyXHJcbiAgICBOZXdzVHlwZS5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIGAke05ld3NUeXBlMn1gKVxyXG4gICAgbGV0IGVkaXROZXdzQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKVxyXG4gICAgZWRpdE5ld3NCdXR0b24udGV4dENvbnRlbnQgPSBcIkVkaXRcIlxyXG4gICAgZWRpdE5ld3NCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgbGV0IGFydGljbGVJZCA9IGV2ZW50LnRhcmdldC5wYXJlbnROb2RlLmlkXHJcbiAgICAgIGxldCBOZXdzSWQgPSBhcnRpY2xlSWQuc3BsaXQoXCItLVwiKVsxXVxyXG4gICAgICBOZXdzQ29sbGVjdGlvbi5nZXROZXdzKE5ld3NJZClcclxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICBOZXdzRWRpdEZvcm0uY3JlYXRlQW5kQXBwZW5kRm9ybShhcnRpY2xlSWQsIHJlc3BvbnNlKVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG5cclxuICAgIGxldCBkZWxldGVOZXdzQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKVxyXG4gICAgZGVsZXRlTmV3c0J1dHRvbi50ZXh0Q29udGVudCA9IFwiRGVsZXRlXCJcclxuICAgIGRlbGV0ZU5ld3NCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgbGV0IE5ld3NJZCA9IGV2ZW50LnRhcmdldC5wYXJlbnROb2RlLmlkLnNwbGl0KFwiLS1cIilbMV1cclxuICAgICAgTmV3c0NvbGxlY3Rpb24uZGVsZXRlTmV3cyhOZXdzSWQpXHJcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgTmV3c0xpc3QuZnJpZGdpZnkoKVxyXG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlXHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcblxyXG4gICAgTmV3c0FydGljbGUuYXBwZW5kQ2hpbGQoTmV3c05hbWUpXHJcbiAgICBOZXdzQXJ0aWNsZS5hcHBlbmRDaGlsZChOZXdzRXhwKVxyXG4gICAgTmV3c0FydGljbGUuYXBwZW5kQ2hpbGQoTmV3c1R5cGUpXHJcbiAgICBOZXdzQXJ0aWNsZS5hcHBlbmRDaGlsZChlZGl0TmV3c0J1dHRvbilcclxuICAgIE5ld3NBcnRpY2xlLmFwcGVuZENoaWxkKGRlbGV0ZU5ld3NCdXR0b24pXHJcblxyXG4gICAgcmV0dXJuIE5ld3NBcnRpY2xlXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBOZXdzXHJcbiIsIlxyXG5jb25zdCBOZXdzQ29sbGVjdGlvbiA9IHtcclxuICAgIGdldEFsbE5ld3NzKCkge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9OZXdzXCIpXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgIH0sXHJcblxyXG5cclxuICAgIHBvc3ROZXdOZXdzKG5ld05ld3NUb1NhdmUpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvTmV3c1wiLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5ld05ld3NUb1NhdmUpXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBkZWxldGVOZXdzKE5ld3NJZCkge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L05ld3MvJHtOZXdzSWR9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGdldE5ld3MoTmV3c0lkKSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvTmV3cy8ke05ld3NJZH1gKVxyXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICB9LFxyXG4gICAgcHV0RXhpc3RpbmdOZXdzKE5ld3NJZCwgTmV3c1RvRWRpdCkge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L05ld3MvJHtOZXdzSWR9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUFVUXCIsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KE5ld3NUb0VkaXQpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG5jb25zb2xlLnRhYmxlKE5ld3NDb2xsZWN0aW9uLmdldEFsbE5ld3NzKCkpXHJcblxyXG5leHBvcnQgZGVmYXVsdCBOZXdzQ29sbGVjdGlvblxyXG4iLCJpbXBvcnQgTmV3c0NvbGxlY3Rpb24gZnJvbSBcIi4vbmV3c0NvbGxlY3Rpb25cIlxyXG5pbXBvcnQgTmV3c0xpc3QgZnJvbSBcIi4vbmV3c0xpc3RcIlxyXG5cclxuY29uc3QgTmV3c0VkaXRGb3JtID0ge1xyXG4gIGNyZWF0ZUFuZEFwcGVuZEZvcm0oYXJ0aWNsZUlkLCBOZXdzT2JqVG9FZGl0KSB7XHJcblxyXG4gICAgbGV0IE5ld3NOYW1lRmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKVxyXG5cclxuICAgIGxldCBOZXdzTmFtZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpXHJcbiAgICBOZXdzTmFtZUxhYmVsLnRleHRDb250ZW50ID0gXCJUaXRsZVwiXHJcbiAgICBsZXQgTmV3c05hbWVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKVxyXG4gICAgTmV3c05hbWVJbnB1dC52YWx1ZSA9IE5ld3NPYmpUb0VkaXQubmFtZVxyXG5cclxuICAgIE5ld3NOYW1lRmllbGQuYXBwZW5kQ2hpbGQoTmV3c05hbWVMYWJlbClcclxuICAgIE5ld3NOYW1lRmllbGQuYXBwZW5kQ2hpbGQoTmV3c05hbWVJbnB1dClcclxuXHJcbiAgICBsZXQgTmV3c0V4cGlyYXRpb25GaWVsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpXHJcblxyXG4gICAgbGV0IE5ld3NFeHBpcmF0aW9uTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIilcclxuICAgIE5ld3NFeHBpcmF0aW9uTGFiZWwudGV4dENvbnRlbnQgPSBcIlN1bW1hcnlcIlxyXG4gICAgbGV0IE5ld3NFeHBpcmF0aW9uSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIilcclxuICAgIE5ld3NFeHBpcmF0aW9uSW5wdXQudmFsdWUgPSBOZXdzT2JqVG9FZGl0LmV4cGlyYXRpb25cclxuXHJcbiAgICBOZXdzRXhwaXJhdGlvbkZpZWxkLmFwcGVuZENoaWxkKE5ld3NFeHBpcmF0aW9uTGFiZWwpXHJcbiAgICBOZXdzRXhwaXJhdGlvbkZpZWxkLmFwcGVuZENoaWxkKE5ld3NFeHBpcmF0aW9uSW5wdXQpXHJcblxyXG4gICAgbGV0IE5ld3NUeXBlRmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKVxyXG5cclxuICAgIGxldCBOZXdzVHlwZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpXHJcbiAgICBOZXdzVHlwZUxhYmVsLnRleHRDb250ZW50ID0gXCJVUkxcIlxyXG4gICAgbGV0IE5ld3NUeXBlSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIilcclxuICAgIE5ld3NUeXBlSW5wdXQudmFsdWUgPSBOZXdzT2JqVG9FZGl0LnR5cGVcclxuICAgIE5ld3NUeXBlRmllbGQuYXBwZW5kQ2hpbGQoTmV3c1R5cGVMYWJlbClcclxuICAgIE5ld3NUeXBlRmllbGQuYXBwZW5kQ2hpbGQoTmV3c1R5cGVJbnB1dClcclxuXHJcbiAgICBsZXQgdXBkYXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKVxyXG4gICAgdXBkYXRlQnV0dG9uLnRleHRDb250ZW50ID0gXCJVcGRhdGVcIlxyXG5cclxuICAgIHVwZGF0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICBsZXQgZWRpdGVkTmV3cyA9IHtcclxuICAgICAgICBuYW1lOiBOZXdzTmFtZUlucHV0LnZhbHVlLFxyXG4gICAgICAgIGV4cGlyYXRpb246IE5ld3NFeHBpcmF0aW9uSW5wdXQudmFsdWUsXHJcbiAgICAgICAgdHlwZTogTmV3c1R5cGVJbnB1dC52YWx1ZVxyXG4gICAgICB9XHJcblxyXG4gICAgICBOZXdzQ29sbGVjdGlvbi5wdXRFeGlzdGluZ05ld3MoTmV3c09ialRvRWRpdC5pZCwgZWRpdGVkTmV3cylcclxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICBOZXdzTGlzdC5mcmlkZ2lmeSgpXHJcbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2VcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxuXHJcbiAgICBsZXQgTmV3c0l0ZW1BcnRpY2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7YXJ0aWNsZUlkfWApXHJcblxyXG4gICAgd2hpbGUgKE5ld3NJdGVtQXJ0aWNsZS5maXJzdENoaWxkKSB7XHJcbiAgICAgIE5ld3NJdGVtQXJ0aWNsZS5yZW1vdmVDaGlsZChOZXdzSXRlbUFydGljbGUuZmlyc3RDaGlsZCk7XHJcbiAgICB9XHJcbiAgICBOZXdzSXRlbUFydGljbGUuYXBwZW5kQ2hpbGQoTmV3c05hbWVGaWVsZClcclxuICAgIE5ld3NJdGVtQXJ0aWNsZS5hcHBlbmRDaGlsZChOZXdzRXhwaXJhdGlvbkZpZWxkKVxyXG4gICAgTmV3c0l0ZW1BcnRpY2xlLmFwcGVuZENoaWxkKE5ld3NUeXBlRmllbGQpXHJcbiAgICBOZXdzSXRlbUFydGljbGUuYXBwZW5kQ2hpbGQodXBkYXRlQnV0dG9uKVxyXG4gIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBOZXdzRWRpdEZvcm1cclxuIiwiaW1wb3J0IE5ld3NDb2xsZWN0aW9uIGZyb20gXCIuL25ld3NDb2xsZWN0aW9uXCJcclxuaW1wb3J0IE5ld3NMaXN0IGZyb20gXCIuL25ld3NMaXN0XCJcclxuXHJcbmNvbnN0IE5ld3NGb3JtID0ge1xyXG5cclxuICAvLyBUaGlzIG1vZHVsZSB3aWxsIGJ1aWxkIGEgZm9ybSBhbmQgYXBwZW5kIGl0IHRvIHRoZSBET00uIFRoZSBmb3JtIHdpbGwgY29udGFpbiBpbnB1dCBmaWVsZHMgZm9yIGEgdXNlciB0byBhZGQgYSBuZXcgTmV3cyB0byB0aGVpciByZWZyaWdlcmF0b3IgYW5kIGEgYnV0dG9uIHdpdGggYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCB3aWxsIGxpc3RlbiBmb3IgdGhlIGNsaWNrXHJcbiAgY3JlYXRlQW5kQXBwZW5kRm9ybSgpIHtcclxuICAgIC8vIDEuIEJ1aWxkIEhUTUwgZm9ybVxyXG4gICAgbGV0IGZvcm1IZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIilcclxuICAgIGZvcm1IZWFkZXIudGV4dENvbnRlbnQgPSBcIllvdXIgU3Bvb2t5IE5ld3MgXCJcclxuXHJcbiAgICBsZXQgTmV3c05hbWVGaWVsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmaWVsZHNldFwiKVxyXG5cclxuICAgIGxldCBOZXdzTmFtZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpXHJcbiAgICBOZXdzTmFtZUxhYmVsLnRleHRDb250ZW50ID0gXCJUaXRsZVwiXHJcbiAgICBOZXdzTmFtZUxhYmVsLnNldEF0dHJpYnV0ZShcImZvclwiLCBcIk5ld3NfX25hbWVcIilcclxuICAgIGxldCBOZXdzTmFtZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpXHJcbiAgICBOZXdzTmFtZUlucHV0LnNldEF0dHJpYnV0ZShcImlkXCIsIFwiTmV3c19fbmFtZVwiKVxyXG4gICAgTmV3c05hbWVJbnB1dC5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIsIFwiTmV3c19fbmFtZVwiKVxyXG5cclxuICAgIE5ld3NOYW1lRmllbGQuYXBwZW5kQ2hpbGQoTmV3c05hbWVMYWJlbClcclxuICAgIE5ld3NOYW1lRmllbGQuYXBwZW5kQ2hpbGQoTmV3c05hbWVJbnB1dClcclxuXHJcbiAgICBsZXQgTmV3c0V4cGlyYXRpb25GaWVsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmaWVsZHNldFwiKVxyXG5cclxuICAgIGxldCBOZXdzRXhwaXJhdGlvbkxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpXHJcbiAgICBOZXdzRXhwaXJhdGlvbkxhYmVsLnRleHRDb250ZW50ID0gXCJTdW1tYXJ5XCJcclxuICAgIE5ld3NFeHBpcmF0aW9uTGFiZWwuc2V0QXR0cmlidXRlKFwiZm9yXCIsIFwiTmV3c19fZXhwaXJhdGlvblwiKVxyXG4gICAgbGV0IE5ld3NFeHBpcmF0aW9uSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIilcclxuICAgIE5ld3NFeHBpcmF0aW9uSW5wdXQuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJOZXdzX19leHBpcmF0aW9uXCIpXHJcbiAgICBOZXdzRXhwaXJhdGlvbklucHV0LnNldEF0dHJpYnV0ZShcIm5hbWVcIiwgXCJOZXdzX19leHBpcmF0aW9uXCIpXHJcblxyXG4gICAgTmV3c0V4cGlyYXRpb25GaWVsZC5hcHBlbmRDaGlsZChOZXdzRXhwaXJhdGlvbkxhYmVsKVxyXG4gICAgTmV3c0V4cGlyYXRpb25GaWVsZC5hcHBlbmRDaGlsZChOZXdzRXhwaXJhdGlvbklucHV0KVxyXG5cclxuICAgIGxldCBOZXdzVHlwZUZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZpZWxkc2V0XCIpXHJcblxyXG4gICAgbGV0IE5ld3NUeXBlTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIilcclxuICAgIE5ld3NUeXBlTGFiZWwudGV4dENvbnRlbnQgPSBcIlVSTFwiXHJcbiAgICBOZXdzVHlwZUxhYmVsLnNldEF0dHJpYnV0ZShcImZvclwiLCBcIk5ld3NfX3R5cGVcIilcclxuICAgIGxldCBOZXdzVHlwZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpXHJcbiAgICBOZXdzVHlwZUlucHV0LnNldEF0dHJpYnV0ZShcImlkXCIsIFwiTmV3c19fdHlwZVwiKVxyXG4gICAgTmV3c1R5cGVJbnB1dC5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIsIFwiTmV3c19fdHlwZVwiKVxyXG5cclxuXHJcbiAgICBOZXdzVHlwZUZpZWxkLmFwcGVuZENoaWxkKE5ld3NUeXBlTGFiZWwpXHJcbiAgICBOZXdzVHlwZUZpZWxkLmFwcGVuZENoaWxkKE5ld3NUeXBlSW5wdXQpXHJcblxyXG4gICAgbGV0IHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIilcclxuICAgIHN1Ym1pdEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiQWRkIEFydGljbGVcIlxyXG4gICAgc3VibWl0QnV0dG9uLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiTmV3c19fc2F2ZVwiKVxyXG5cclxuICAgIC8vIDIuIEF0dGFjaCBldmVudCBsaXN0ZW5lciB0byBidXR0b24gaW4gZm9ybVxyXG4gICAgc3VibWl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmhhbmRsZUFkZE5ld05ld3MpXHJcblxyXG4gICAgLy8gMy4gQXBwZW5kIHRoZSBIVE1MIGZvcm0gdG8gdGhlIERPTVxyXG4gICAgLy9Ob3RpY2UgdGhhdCBJIGhhdmUgYWRkZWQgYW4gYXJ0aWNsZSBlbGVtZW50IHRvIG15IGluZGV4Lmh0bWwgd2l0aCB0aGUgY2xhc3MgXCJmb3JtXCIuXHJcbiAgICBsZXQgTmV3c0Zvcm1GcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxyXG4gICAgTmV3c0Zvcm1GcmFnbWVudC5hcHBlbmRDaGlsZChmb3JtSGVhZGVyKVxyXG4gICAgTmV3c0Zvcm1GcmFnbWVudC5hcHBlbmRDaGlsZChOZXdzTmFtZUZpZWxkKVxyXG4gICAgTmV3c0Zvcm1GcmFnbWVudC5hcHBlbmRDaGlsZChOZXdzRXhwaXJhdGlvbkZpZWxkKVxyXG4gICAgTmV3c0Zvcm1GcmFnbWVudC5hcHBlbmRDaGlsZChOZXdzVHlwZUZpZWxkKVxyXG4gICAgTmV3c0Zvcm1GcmFnbWVudC5hcHBlbmRDaGlsZChzdWJtaXRCdXR0b24pXHJcblxyXG4gICAgbGV0IGZvcm1BcnRpY2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vdXRwdXRfX25ld3NcIilcclxuICAgIGZvcm1BcnRpY2xlLmFwcGVuZENoaWxkKE5ld3NGb3JtRnJhZ21lbnQpXHJcblxyXG4gIH0sXHJcbiAgaGFuZGxlQWRkTmV3TmV3cygpIHtcclxuICAgIGxldCBpbnB1dE5ld3NOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNOZXdzX19uYW1lXCIpLnZhbHVlXHJcbiAgICBsZXQgaW5wdXROZXdzRXhwaXJhdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjTmV3c19fZXhwaXJhdGlvblwiKS52YWx1ZVxyXG4gICAgbGV0IGlucHV0TmV3c1R5cGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI05ld3NfX3R5cGVcIikudmFsdWVcclxuXHJcbiAgICBsZXQgbmV3TmV3cyA9IHtcclxuICAgICAgbmFtZTogaW5wdXROZXdzTmFtZSxcclxuICAgICAgZXhwaXJhdGlvbjogaW5wdXROZXdzRXhwaXJhdGlvbixcclxuICAgICAgdHlwZTogaW5wdXROZXdzVHlwZVxyXG4gICAgfVxyXG5cclxuICAgIE5ld3NDb2xsZWN0aW9uLnBvc3ROZXdOZXdzKG5ld05ld3MpXHJcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+ICB7XHJcbiAgICAgICAgTmV3c0xpc3QuZnJpZGdpZnkoKVxyXG4gICAgICAgIHJldHVybiByZXNwb25zZVxyXG5cclxuICAgICAgfSlcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE5ld3NGb3JtXHJcbiIsImltcG9ydCBOZXdzQ29sbGVjdGlvbiBmcm9tIFwiLi9uZXdzQ29sbGVjdGlvblwiXHJcbmltcG9ydCBOZXdzIGZyb20gXCIuL25ld3NcIlxyXG5cclxuY29uc3QgTmV3c0xpc3QgPSB7XHJcbiAgICBmcmlkZ2lmeSgpIHtcclxuICAgICAgICBOZXdzQ29sbGVjdGlvbi5nZXRBbGxOZXdzcygpXHJcbiAgICAgICAgICAgIC50aGVuKGFsbE5ld3NzID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgTmV3c0RvY0ZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpXHJcblxyXG4gICAgICAgICAgICAgICAgYWxsTmV3c3MuZm9yRWFjaChOZXdzSXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IE5ld3NIdG1sID0gTmV3cy5OZXdzQnVpbGRlcihOZXdzSXRlbSlcclxuICAgICAgICAgICAgICAgICAgICBOZXdzRG9jRnJhZ21lbnQuYXBwZW5kQ2hpbGQoTmV3c0h0bWwpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBvdXRwdXRBcnRpY2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vdXRwdXRfX25ld3NTZWN0aW9uMlwiKVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgd2hpbGUgKG91dHB1dEFydGljbGUuZmlyc3RDaGlsZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dEFydGljbGUucmVtb3ZlQ2hpbGQob3V0cHV0QXJ0aWNsZS5maXJzdENoaWxkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG91dHB1dEFydGljbGUuYXBwZW5kQ2hpbGQoTmV3c0RvY0ZyYWdtZW50KVxyXG5cclxuICAgICAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTmV3c0xpc3RcclxuIiwiaW1wb3J0IEFQSSBmcm9tIFwiLi9hcGlcIlxyXG5pbXBvcnQgbG9naW4gZnJvbSBcIi4vbG9naW5cIlxyXG4vLyBEZWNsYXJlIHZhcmlhYmxlcyB0byBob2xkIHVzZXIgaW5wdXRcclxuY29uc3QgdXNlck5hbWVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKVxyXG5jb25zdCB1c2VyUGFzc3dvcmRJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKVxyXG5jb25zdCB1c2VyRW1haWxJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKVxyXG5cclxuY29uc3QgY3JlYXRlTmV3VXNlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIilcclxuXHJcbi8vIERlY2xhcmUgdmFyaWFibGUgdG8gYmUgZXhwb3J0ZWRcclxuY29uc3QgcmVnaXN0cmF0aW9uRm9ybSA9IHtcclxuXHJcbiAgICAvLyBUaGlzIG1vZHVsZSB3aWxsIGJ1aWxkIGEgZm9ybSBhbmQgYXBwZW5kIGl0IHRvIHRoZSBET00uIFRoZSBmb3JtIHdpbGwgY29udGFpbiBpbnB1dCBmaWVsZHMgZm9yIGEgdXNlciB0byBhZGQgdGhlbXNlbHZlcyB0byB0aGUgZGF0YWJhc2Ugb2YgcmVnaXN0ZXJlZCB1c2VycyBhbmQgYSBidXR0b24gd2l0aCBhbiBldmVudCBsaXN0ZW5lciB0aGF0IHdpbGwgbGlzdGVuIGZvciB0aGUgY2xpY2tcclxuICAgIGNyZWF0ZUFuZEFwcGVuZFJlZ2lzdHJhdGlvbkZvcm0gKCkge1xyXG5cclxuICAgIGNvbnN0IHJlZ2lzdGVyQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vdXRwdXRfX3JlZ2lzdHJhdGlvblwiKVxyXG4gICAgY29uc3QgcmVnaXN0ZXJIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIilcclxuICAgIHJlZ2lzdGVyQ29udGFpbmVyLmFwcGVuZENoaWxkKHJlZ2lzdGVySGVhZGVyKVxyXG4gICAgcmVnaXN0ZXJIZWFkZXIudGV4dENvbnRlbnQ9XCJSZWdpc3RlciBVc2VyXCJcclxuXHJcblxyXG4vLyBzZXR0aW5nIHR5cGUgZm9yIHZhcmlhYmxlc1xyXG5cclxuICAgIHVzZXJOYW1lSW5wdXQudHlwZSA9IFwidGV4dFwiXHJcbiAgICB1c2VyUGFzc3dvcmRJbnB1dC50eXBlID0gXCJ0ZXh0XCJcclxuICAgIHVzZXJFbWFpbElucHV0LnR5cGUgPSBcInRleHRcIlxyXG5cclxuICAgIC8vIENyZWF0ZSB3aGF0IHRoZSB1c2VyIHNlZXMgaW4gZmllbGRzXHJcblxyXG4gICAgdXNlck5hbWVJbnB1dC5wbGFjZWhvbGRlciA9IFwiSW5wdXQgVXNlck5hbWVcIlxyXG4gICAgdXNlclBhc3N3b3JkSW5wdXQucGxhY2Vob2xkZXIgPSBcIkNyZWF0ZSBQYXNzd29yZFwiXHJcbiAgICB1c2VyRW1haWxJbnB1dC5wbGFjZWhvbGRlciA9IFwiSW5wdXQgRW1haWwgQWRkcmVzc1wiXHJcbiAgICBjcmVhdGVOZXdVc2VyLnRleHRDb250ZW50ID0gXCJSZWdpc3RlciBVc2VyXCJcclxuXHJcbiAgICAvLyBBZGQgZmllbGRzIHRvIERPTVxyXG5cclxuICAgIHJlZ2lzdGVyQ29udGFpbmVyLmFwcGVuZENoaWxkKHVzZXJOYW1lSW5wdXQpXHJcbiAgICByZWdpc3RlckNvbnRhaW5lci5hcHBlbmRDaGlsZCh1c2VyUGFzc3dvcmRJbnB1dClcclxuICAgIHJlZ2lzdGVyQ29udGFpbmVyLmFwcGVuZENoaWxkKHVzZXJFbWFpbElucHV0KVxyXG4gICAgcmVnaXN0ZXJDb250YWluZXIuYXBwZW5kQ2hpbGQoY3JlYXRlTmV3VXNlcilcclxuXHJcbiAgICAvLyBBZGQgZXZlbnQgbGlzdGVuZXIgdG8gY3JlYXRlTmV3VXNlciBidXR0b25cclxuXHJcbiAgICBjcmVhdGVOZXdVc2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnJlZ2lzdGVyVXNlcikgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIHJlZ2lzdGVyVXNlciAoKSB7XHJcbiAgICAgICAgY29uc3QgdXNlck5hbWVWYWx1ZSA9IHVzZXJOYW1lSW5wdXQudmFsdWU7XHJcbiAgICAgICAgY29uc3QgdXNlclBhc3N3b3JkVmFsdWUgPSB1c2VyUGFzc3dvcmRJbnB1dC52YWx1ZTtcclxuICAgICAgICBjb25zdCB1c2VyRW1haWxWYWx1ZSA9IHVzZXJFbWFpbElucHV0LnZhbHVlO1xyXG5cclxuICAgICAgICBsZXQgbmV3VXNlclRvU2F2ZSA9IHtcclxuICAgICAgICAgICAgdXNlck5hbWU6IHVzZXJOYW1lVmFsdWUsXHJcbiAgICAgICAgICAgIHBhc3N3b3JkOiB1c2VyUGFzc3dvcmRWYWx1ZSxcclxuICAgICAgICAgICAgZW1haWw6IHVzZXJFbWFpbFZhbHVlXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIEFQSS5wb3N0TmV3RGF0YShcInVzZXJzXCIsbmV3VXNlclRvU2F2ZSlcclxuXHJcbiAgICAgICAgbG9naW4ucmVwbGFjZVdpdGhMb2dpbkZvcm0oKTtcclxuICAgIH1cclxuXHJcbiAgICAgICAgXHJcbn1cclxuICBleHBvcnQgZGVmYXVsdCByZWdpc3RyYXRpb25Gb3JtXHJcbiJdfQ==
