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
    const registerButton = document.createElement("button");
    registerButton.textContent = "register";
    outEl.appendChild(loginButton);
    outEl.appendChild(registerButton); // Runs the getUserData() function when Login button is clicked.

    loginButton.addEventListener("click", this.getUserData);
    registerButton.addEventListener("click", this.replaceWithRegistrationForm);
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
  },

  replaceWithRegistrationForm() {
    console.log("testing");
    const loginPage = document.querySelector(".output__login");

    if (loginPage.style.display === "none") {
      loginPage.style.display = "block";
    } else {
      loginPage.style.display = "none";
    }
  }

};
var _default = login;
exports.default = _default;

},{"./api":1}],3:[function(require,module,exports){
"use strict";

var _login = _interopRequireDefault(require("./login"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_login.default.createAndAppendLoginInput();

},{"./login":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2FwaS5qcyIsIi4uL3NjcmlwdHMvbG9naW4uanMiLCIuLi9zY3JpcHRzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQSxNQUFNLEdBQUcsR0FBRztBQUVSLEVBQUEsT0FBTyxDQUFDLFFBQUQsRUFBVztBQUNkLFdBQU8sS0FBSyxDQUFFLHlCQUF3QixRQUFTLEVBQW5DLENBQUwsQ0FDTixJQURNLENBQ0QsUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFULEVBRFgsQ0FBUDtBQUVIOztBQUxPLENBQVosQyxDQVNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBOztlQUVlLEc7Ozs7Ozs7Ozs7O0FDbkZmOzs7O0FBQ0EsTUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBdEI7QUFDQSxNQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixPQUF2QixDQUF0QjtBQUVBLE1BQU0sS0FBSyxHQUFHO0FBQ2Q7QUFDSSxFQUFBLHlCQUF5QixHQUFHO0FBRXhCLFVBQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLGdCQUF2QixDQUFkO0FBQ0EsSUFBQSxhQUFhLENBQUMsSUFBZCxHQUFxQixNQUFyQjtBQUNBLElBQUEsYUFBYSxDQUFDLFdBQWQsR0FBNEIsVUFBNUI7QUFDQSxJQUFBLGFBQWEsQ0FBQyxJQUFkLEdBQXFCLFVBQXJCO0FBQ0EsSUFBQSxhQUFhLENBQUMsV0FBZCxHQUE0QixVQUE1QjtBQUNBLElBQUEsS0FBSyxDQUFDLFdBQU4sQ0FBa0IsYUFBbEI7QUFDQSxJQUFBLEtBQUssQ0FBQyxXQUFOLENBQWtCLGFBQWxCO0FBRUEsVUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBcEI7QUFDQSxJQUFBLFdBQVcsQ0FBQyxXQUFaLEdBQTJCLE9BQTNCO0FBQ0EsVUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBdkI7QUFDQSxJQUFBLGNBQWMsQ0FBQyxXQUFmLEdBQThCLFVBQTlCO0FBQ0EsSUFBQSxLQUFLLENBQUMsV0FBTixDQUFrQixXQUFsQjtBQUNBLElBQUEsS0FBSyxDQUFDLFdBQU4sQ0FBa0IsY0FBbEIsRUFmd0IsQ0FnQmhDOztBQUNRLElBQUEsV0FBVyxDQUFDLGdCQUFaLENBQTZCLE9BQTdCLEVBQXNDLEtBQUssV0FBM0M7QUFDQSxJQUFBLGNBQWMsQ0FBQyxnQkFBZixDQUFnQyxPQUFoQyxFQUF5QyxLQUFLLDJCQUE5QztBQUNILEdBckJTOztBQXNCZDtBQUNJLEVBQUEsV0FBVyxHQUFJO0FBQ1gsVUFBTSxRQUFRLEdBQUcsYUFBYSxDQUFDLEtBQS9CO0FBQ0EsVUFBTSxRQUFRLEdBQUcsYUFBYSxDQUFDLEtBQS9COztBQUNBLGlCQUFJLE9BQUosQ0FBWSxPQUFaLEVBQ0MsSUFERCxDQUNNLFFBQVEsSUFBSTtBQUNkLE1BQUEsUUFBUSxDQUFDLE9BQVQsQ0FBaUIsSUFBSSxJQUFJO0FBRXJCLFlBQUksUUFBUSxLQUFLLElBQUksQ0FBQyxRQUFsQixJQUE4QixRQUFRLEtBQUssSUFBSSxDQUFDLFFBQXBELEVBQThEO0FBQzFELFVBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBYSxhQUFZLElBQUksQ0FBQyxFQUFHLEVBQWpDO0FBQ0EsVUFBQSxjQUFjLENBQUMsT0FBZixDQUF1QixRQUF2QixFQUFpQyxJQUFJLENBQUMsRUFBdEM7QUFDQSxjQUFJLE1BQU0sR0FBRyxjQUFjLENBQUMsT0FBZixDQUF1QixRQUF2QixDQUFiO0FBQ0EsVUFBQSxvQkFBb0IsQ0FBQyxNQUFELENBQXBCO0FBQ0gsU0FMRCxNQUtPO0FBQ0gsVUFBQSxLQUFLLENBQUMsNkRBQUQsQ0FBTDtBQUNIOztBQUNELGlCQUFTLG9CQUFULENBQThCLE1BQTlCLEVBQXNDO0FBQ2xDLFVBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBYSwwQkFBeUIsTUFBTyxFQUE3QztBQUNIO0FBQ0osT0FiRDtBQWVILEtBakJEO0FBbUJGLEdBN0NROztBQStDTixFQUFBLDJCQUEyQixHQUFHO0FBQzFCLElBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxTQUFaO0FBQ0EsVUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsZ0JBQXZCLENBQWxCOztBQUNBLFFBQUksU0FBUyxDQUFDLEtBQVYsQ0FBZ0IsT0FBaEIsS0FBNEIsTUFBaEMsRUFBd0M7QUFDcEMsTUFBQSxTQUFTLENBQUMsS0FBVixDQUFnQixPQUFoQixHQUEwQixPQUExQjtBQUNILEtBRkQsTUFFTztBQUNILE1BQUEsU0FBUyxDQUFDLEtBQVYsQ0FBZ0IsT0FBaEIsR0FBMEIsTUFBMUI7QUFDYjtBQUNNOztBQXZESyxDQUFkO2VBMkRlLEs7Ozs7OztBQy9EZjs7OztBQUVBLGVBQU0seUJBQU4iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjb25zdCBBUEkgPSB7XG5cbiAgICBnZXREYXRhKHJlc291cmNlKSB7XG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4LyR7cmVzb3VyY2V9YClcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgIH0sXG5cbn1cblxuLy8gICAgIGdldEFsbFVzZXJzKCkge1xuLy8gICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvdXNlcnNcIilcbi8vICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuLy8gICAgICAgfSxcblxuLy8gICAgIGdldEFsbE1lc3NhZ2VzKCkge1xuLy8gICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvbWVzc2FnZXNcIilcbi8vICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbilcbi8vICAgICAgIH0sXG5cbi8vICAgICBnZXRBbGxOZXdzQXJ0aWNsZXMoKSB7XG4vLyAgICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9uZXdzQXJ0aWNsZXNcIilcbi8vICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuLy8gICAgICAgfSxcblxuLy8gICAgIGdldEFsbFRhc2tzKCkge1xuLy8gICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvdGFza3NcIilcbi8vICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuLy8gICAgICAgfSxcblxuLy8gICAgIGdldEFsbEV2ZW50cygpIHtcbi8vICAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2V2ZW50c1wiKVxuLy8gICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4vLyAgICAgICB9LFxuXG4vLyAgICAgZ2V0QWxsRnJpZW5kcygpIHtcbi8vICAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2ZyaWVuZHNcIilcbi8vICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuLy8gICAgICAgfSxcblxuXG4vLyAgICAgcG9zdE5ld1VzZXIobmV3VXNlclRvQWRkKSB7XG4vLyAgICAgZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvdXNlcnNcIiwge1xuLy8gICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuLy8gICAgICAgICBoZWFkZXJzOiB7XG4vLyAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuLy8gICAgICAgICB9LFxuLy8gICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShuZXdVc2VyVG9BZGQpXG4vLyAgICAgfSlcbi8vICAgICB9LFxuXG4vLyAgICAgcG9zdE5ld01lc3NhZ2UobmV3TWVzc2FnZVRvQWRkKSB7XG4vLyAgICAgICAgIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L21lc3NhZ2VzXCIsIHtcbi8vICAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4vLyAgICAgICAgICAgICBoZWFkZXJzOiB7XG4vLyAgICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbi8vICAgICAgICAgICAgIH0sXG4vLyAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShuZXdNZXNzYWdlVG9BZGQpXG4vLyAgICAgfSlcbi8vICAgICB9LFxuXG4vLyAgICAgcG9zdE5ld05ld3NBcnRpY2xlKG5ld05ld3NBcnRpY2xlVG9BZGQpIHtcbi8vICAgICBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9uZXdzQXJ0aWNsZXNcIiwge1xuLy8gICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuLy8gICAgICAgICBoZWFkZXJzOiB7XG4vLyAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuLy8gICAgICAgICB9LFxuLy8gICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShuZXdOZXdzQXJ0aWNsZVRvQWRkKVxuLy8gICAgIH0pXG4vLyAgICAgfSxcblxuLy8gICAgIHBvc3ROZXdUYXNrKG5ld1Rhc2tUb0FkZCkge1xuLy8gICAgICAgICBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC90YXNrc1wiLCB7XG4vLyAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuLy8gICAgICAgICAgICAgaGVhZGVyczoge1xuLy8gICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4vLyAgICAgICAgICAgICB9LFxuLy8gICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobmV3VGFza1RvQWRkKVxuLy8gICAgIH0pXG4vLyAgICAgfSxcblxuXG4vLyB9XG5cbmV4cG9ydCBkZWZhdWx0IEFQSSIsImltcG9ydCBBUEkgZnJvbSBcIi4vYXBpXCJcbmNvbnN0IHVzZXJOYW1lSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG5jb25zdCBwYXNzd29yZElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuXG5jb25zdCBsb2dpbiA9IHtcbi8vIEZ1bmN0aW9uIHRvIGNyZWF0ZSBhbmQgYXBwZW5kIGxvZ2luIGlucHV0IGZpZWxkcyBhbmQgbG9naW4gYnV0dG9uLlxuICAgIGNyZWF0ZUFuZEFwcGVuZExvZ2luSW5wdXQoKSB7XG5cbiAgICAgICAgY29uc3Qgb3V0RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm91dHB1dF9fbG9naW5cIik7XG4gICAgICAgIHVzZXJOYW1lSW5wdXQudHlwZSA9IFwidGV4dFwiO1xuICAgICAgICB1c2VyTmFtZUlucHV0LnBsYWNlaG9sZGVyID0gXCJ1c2VybmFtZVwiO1xuICAgICAgICBwYXNzd29yZElucHV0LnR5cGUgPSBcInBhc3N3b3JkXCI7XG4gICAgICAgIHBhc3N3b3JkSW5wdXQucGxhY2Vob2xkZXIgPSBcInBhc3N3b3JkXCI7XG4gICAgICAgIG91dEVsLmFwcGVuZENoaWxkKHVzZXJOYW1lSW5wdXQpO1xuICAgICAgICBvdXRFbC5hcHBlbmRDaGlsZChwYXNzd29yZElucHV0KTtcblxuICAgICAgICBjb25zdCBsb2dpbkJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgIGxvZ2luQnV0dG9uLnRleHRDb250ZW50ID0gKFwibG9naW5cIik7XG4gICAgICAgIGNvbnN0IHJlZ2lzdGVyQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgcmVnaXN0ZXJCdXR0b24udGV4dENvbnRlbnQgPSAoXCJyZWdpc3RlclwiKTtcbiAgICAgICAgb3V0RWwuYXBwZW5kQ2hpbGQobG9naW5CdXR0b24pO1xuICAgICAgICBvdXRFbC5hcHBlbmRDaGlsZChyZWdpc3RlckJ1dHRvbik7XG4vLyBSdW5zIHRoZSBnZXRVc2VyRGF0YSgpIGZ1bmN0aW9uIHdoZW4gTG9naW4gYnV0dG9uIGlzIGNsaWNrZWQuXG4gICAgICAgIGxvZ2luQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmdldFVzZXJEYXRhKTtcbiAgICAgICAgcmVnaXN0ZXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMucmVwbGFjZVdpdGhSZWdpc3RyYXRpb25Gb3JtKTtcbiAgICB9LFxuLy8gR2F0aGVycyBkYXRhIGVudGVyZWQgaW50byBMb2dpbiBpbnB1dCBmaWVsZHMuIEZldGNoZXMgdXNlcmRhdGEgZnJvbSBBUEkgYW5kIGNvbXBhcmVzIGlucHV0IGRhdGEgd2l0aCBleGlzdGluZyB1c2VyIGRhdGEgaW4gQVBJLiBJZiBpbnB1dCBkYXRhIG1hdGNoZXMgdXNlciBkYXRhIGluIEFQSSwgcnVucyBsb2FkVXNlclNwZWNpZmljUGFnZSgpLiBJZiBpbnB1dCBkYXRhIGRvZXMgbm90IG1hdGNoIGFueSB1c2VyIGRhdGEgaW4gQVBJLCBhbGVydCBpcyBzZW50LlxuICAgIGdldFVzZXJEYXRhICgpIHtcbiAgICAgICAgY29uc3QgdXNlcm5hbWUgPSB1c2VyTmFtZUlucHV0LnZhbHVlO1xuICAgICAgICBjb25zdCBwYXNzd29yZCA9IHBhc3N3b3JkSW5wdXQudmFsdWU7XG4gICAgICAgIEFQSS5nZXREYXRhKFwidXNlcnNcIilcbiAgICAgICAgLnRoZW4oYWxsVXNlcnMgPT4ge1xuICAgICAgICAgICAgYWxsVXNlcnMuZm9yRWFjaCh1c2VyID0+IHtcblxuICAgICAgICAgICAgICAgIGlmICh1c2VybmFtZSA9PT0gdXNlci51c2VyTmFtZSAmJiBwYXNzd29yZCA9PT0gdXNlci5wYXNzd29yZCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgVGhpcyBvbmU6ICR7dXNlci5pZH1gKVxuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCd1c2VySWQnLCB1c2VyLmlkKVxuICAgICAgICAgICAgICAgICAgICBsZXQgdXNlcklkID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgndXNlcklkJyk7XG4gICAgICAgICAgICAgICAgICAgIGxvYWRVc2VyU3BlY2lmaWNQYWdlKHVzZXJJZCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJVc2VybmFtZS9wYXNzd29yZCBpbnZhbGlkLiBJZiBuZXcgdXNlciwgcGxlYXNlIHJlZ2lzdGVyLiA6KVwiKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBsb2FkVXNlclNwZWNpZmljUGFnZSh1c2VySWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFRoaXMgaXMgdGhlIHVzZXIgcGFnZSEgJHt1c2VySWR9YCk7XG4gICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIH0pXG4gICAgICAgIFxuICAgICAgICB9KVxuICAgICAgICBcbiAgICAgfSwgXG4gICAgIFxuICAgICAgICByZXBsYWNlV2l0aFJlZ2lzdHJhdGlvbkZvcm0oKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInRlc3RpbmdcIik7XG4gICAgICAgICAgICBjb25zdCBsb2dpblBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm91dHB1dF9fbG9naW5cIik7XG4gICAgICAgICAgICBpZiAobG9naW5QYWdlLnN0eWxlLmRpc3BsYXkgPT09IFwibm9uZVwiKSB7XG4gICAgICAgICAgICAgICAgbG9naW5QYWdlLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxvZ2luUGFnZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIH1cbiAgICAgICAgfVxuICAgIFxufVxuXG5leHBvcnQgZGVmYXVsdCBsb2dpbiIsImltcG9ydCBsb2dpbiBmcm9tIFwiLi9sb2dpblwiXG5cbmxvZ2luLmNyZWF0ZUFuZEFwcGVuZExvZ2luSW5wdXQoKTtcbiJdfQ==
