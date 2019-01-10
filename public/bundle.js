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
  createAndAppendLoginInput() {
    const outEl = document.querySelector(".output__login");
    userNameInput.type = "text";
    userNameInput.placeholder = "username";
    passwordInput.type = "text";
    passwordInput.placeholder = "password";
    outEl.appendChild(userNameInput);
    outEl.appendChild(passwordInput);
    const loginButton = document.createElement("button");
    loginButton.textContent = "login";
    outEl.appendChild(loginButton);
    loginButton.addEventListener("click", this.getUserData);
  },

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_login.default.createAndAppendLoginInput();

},{"./login":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2FwaS5qcyIsIi4uL3NjcmlwdHMvbG9naW4uanMiLCIuLi9zY3JpcHRzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQSxNQUFNLEdBQUcsR0FBRztBQUVSLEVBQUEsT0FBTyxDQUFDLFFBQUQsRUFBVztBQUNkLFdBQU8sS0FBSyxDQUFFLHlCQUF3QixRQUFTLEVBQW5DLENBQUwsQ0FDTixJQURNLENBQ0QsUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFULEVBRFgsQ0FBUDtBQUVIOztBQUxPLENBQVosQyxDQVNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBOztlQUVlLEc7Ozs7Ozs7Ozs7O0FDbkZmOzs7O0FBQ0EsTUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBdEI7QUFDQSxNQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixPQUF2QixDQUF0QjtBQUVBLE1BQU0sS0FBSyxHQUFHO0FBRVYsRUFBQSx5QkFBeUIsR0FBRztBQUV4QixVQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixnQkFBdkIsQ0FBZDtBQUNBLElBQUEsYUFBYSxDQUFDLElBQWQsR0FBcUIsTUFBckI7QUFDQSxJQUFBLGFBQWEsQ0FBQyxXQUFkLEdBQTRCLFVBQTVCO0FBQ0EsSUFBQSxhQUFhLENBQUMsSUFBZCxHQUFxQixNQUFyQjtBQUNBLElBQUEsYUFBYSxDQUFDLFdBQWQsR0FBNEIsVUFBNUI7QUFDQSxJQUFBLEtBQUssQ0FBQyxXQUFOLENBQWtCLGFBQWxCO0FBQ0EsSUFBQSxLQUFLLENBQUMsV0FBTixDQUFrQixhQUFsQjtBQUVBLFVBQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLFFBQXZCLENBQXBCO0FBQ0EsSUFBQSxXQUFXLENBQUMsV0FBWixHQUEyQixPQUEzQjtBQUNBLElBQUEsS0FBSyxDQUFDLFdBQU4sQ0FBa0IsV0FBbEI7QUFFQSxJQUFBLFdBQVcsQ0FBQyxnQkFBWixDQUE2QixPQUE3QixFQUFzQyxLQUFLLFdBQTNDO0FBQ0gsR0FqQlM7O0FBa0JWLEVBQUEsV0FBVyxHQUFJO0FBQ1gsVUFBTSxRQUFRLEdBQUcsYUFBYSxDQUFDLEtBQS9CO0FBQ0EsVUFBTSxRQUFRLEdBQUcsYUFBYSxDQUFDLEtBQS9COztBQUNBLGlCQUFJLE9BQUosQ0FBWSxPQUFaLEVBQ0MsSUFERCxDQUNNLFFBQVEsSUFBSTtBQUNkLE1BQUEsUUFBUSxDQUFDLE9BQVQsQ0FBaUIsSUFBSSxJQUFJO0FBRXJCLFlBQUksUUFBUSxLQUFLLElBQUksQ0FBQyxRQUFsQixJQUE4QixRQUFRLEtBQUssSUFBSSxDQUFDLFFBQXBELEVBQThEO0FBQzFELFVBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBYSxhQUFZLElBQUksQ0FBQyxFQUFHLEVBQWpDO0FBQ0EsVUFBQSxjQUFjLENBQUMsT0FBZixDQUF1QixRQUF2QixFQUFpQyxJQUFJLENBQUMsRUFBdEM7QUFDQSxjQUFJLE1BQU0sR0FBRyxjQUFjLENBQUMsT0FBZixDQUF1QixRQUF2QixDQUFiO0FBQ0EsVUFBQSxvQkFBb0IsQ0FBQyxNQUFELENBQXBCO0FBQ0gsU0FMRCxNQUtPO0FBQ0gsVUFBQSxLQUFLLENBQUMsNkRBQUQsQ0FBTDtBQUNIOztBQUNELGlCQUFTLG9CQUFULENBQThCLE1BQTlCLEVBQXNDO0FBQ2xDLFVBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBYSwwQkFBeUIsTUFBTyxFQUE3QztBQUNIO0FBQ0osT0FiRDtBQWVILEtBakJEO0FBbUJGOztBQXhDUSxDQUFkO2VBNENlLEs7Ozs7OztBQ2hEZjs7OztBQUVBLGVBQU0seUJBQU4iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjb25zdCBBUEkgPSB7XG5cbiAgICBnZXREYXRhKHJlc291cmNlKSB7XG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4LyR7cmVzb3VyY2V9YClcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgIH0sXG5cbn1cblxuLy8gICAgIGdldEFsbFVzZXJzKCkge1xuLy8gICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvdXNlcnNcIilcbi8vICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuLy8gICAgICAgfSxcblxuLy8gICAgIGdldEFsbE1lc3NhZ2VzKCkge1xuLy8gICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvbWVzc2FnZXNcIilcbi8vICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbilcbi8vICAgICAgIH0sXG5cbi8vICAgICBnZXRBbGxOZXdzQXJ0aWNsZXMoKSB7XG4vLyAgICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9uZXdzQXJ0aWNsZXNcIilcbi8vICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuLy8gICAgICAgfSxcblxuLy8gICAgIGdldEFsbFRhc2tzKCkge1xuLy8gICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvdGFza3NcIilcbi8vICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuLy8gICAgICAgfSxcblxuLy8gICAgIGdldEFsbEV2ZW50cygpIHtcbi8vICAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2V2ZW50c1wiKVxuLy8gICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4vLyAgICAgICB9LFxuXG4vLyAgICAgZ2V0QWxsRnJpZW5kcygpIHtcbi8vICAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2ZyaWVuZHNcIilcbi8vICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuLy8gICAgICAgfSxcblxuXG4vLyAgICAgcG9zdE5ld1VzZXIobmV3VXNlclRvQWRkKSB7XG4vLyAgICAgZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvdXNlcnNcIiwge1xuLy8gICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuLy8gICAgICAgICBoZWFkZXJzOiB7XG4vLyAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuLy8gICAgICAgICB9LFxuLy8gICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShuZXdVc2VyVG9BZGQpXG4vLyAgICAgfSlcbi8vICAgICB9LFxuXG4vLyAgICAgcG9zdE5ld01lc3NhZ2UobmV3TWVzc2FnZVRvQWRkKSB7XG4vLyAgICAgICAgIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L21lc3NhZ2VzXCIsIHtcbi8vICAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4vLyAgICAgICAgICAgICBoZWFkZXJzOiB7XG4vLyAgICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbi8vICAgICAgICAgICAgIH0sXG4vLyAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShuZXdNZXNzYWdlVG9BZGQpXG4vLyAgICAgfSlcbi8vICAgICB9LFxuXG4vLyAgICAgcG9zdE5ld05ld3NBcnRpY2xlKG5ld05ld3NBcnRpY2xlVG9BZGQpIHtcbi8vICAgICBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9uZXdzQXJ0aWNsZXNcIiwge1xuLy8gICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuLy8gICAgICAgICBoZWFkZXJzOiB7XG4vLyAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuLy8gICAgICAgICB9LFxuLy8gICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShuZXdOZXdzQXJ0aWNsZVRvQWRkKVxuLy8gICAgIH0pXG4vLyAgICAgfSxcblxuLy8gICAgIHBvc3ROZXdUYXNrKG5ld1Rhc2tUb0FkZCkge1xuLy8gICAgICAgICBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC90YXNrc1wiLCB7XG4vLyAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuLy8gICAgICAgICAgICAgaGVhZGVyczoge1xuLy8gICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4vLyAgICAgICAgICAgICB9LFxuLy8gICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobmV3VGFza1RvQWRkKVxuLy8gICAgIH0pXG4vLyAgICAgfSxcblxuXG4vLyB9XG5cbmV4cG9ydCBkZWZhdWx0IEFQSSIsImltcG9ydCBBUEkgZnJvbSBcIi4vYXBpXCJcbmNvbnN0IHVzZXJOYW1lSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG5jb25zdCBwYXNzd29yZElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuXG5jb25zdCBsb2dpbiA9IHtcblxuICAgIGNyZWF0ZUFuZEFwcGVuZExvZ2luSW5wdXQoKSB7XG5cbiAgICAgICAgY29uc3Qgb3V0RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm91dHB1dF9fbG9naW5cIik7XG4gICAgICAgIHVzZXJOYW1lSW5wdXQudHlwZSA9IFwidGV4dFwiO1xuICAgICAgICB1c2VyTmFtZUlucHV0LnBsYWNlaG9sZGVyID0gXCJ1c2VybmFtZVwiO1xuICAgICAgICBwYXNzd29yZElucHV0LnR5cGUgPSBcInRleHRcIjtcbiAgICAgICAgcGFzc3dvcmRJbnB1dC5wbGFjZWhvbGRlciA9IFwicGFzc3dvcmRcIjtcbiAgICAgICAgb3V0RWwuYXBwZW5kQ2hpbGQodXNlck5hbWVJbnB1dCk7XG4gICAgICAgIG91dEVsLmFwcGVuZENoaWxkKHBhc3N3b3JkSW5wdXQpO1xuXG4gICAgICAgIGNvbnN0IGxvZ2luQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgbG9naW5CdXR0b24udGV4dENvbnRlbnQgPSAoXCJsb2dpblwiKTtcbiAgICAgICAgb3V0RWwuYXBwZW5kQ2hpbGQobG9naW5CdXR0b24pO1xuXG4gICAgICAgIGxvZ2luQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmdldFVzZXJEYXRhKTtcbiAgICB9LFxuICAgIGdldFVzZXJEYXRhICgpIHtcbiAgICAgICAgY29uc3QgdXNlcm5hbWUgPSB1c2VyTmFtZUlucHV0LnZhbHVlO1xuICAgICAgICBjb25zdCBwYXNzd29yZCA9IHBhc3N3b3JkSW5wdXQudmFsdWU7XG4gICAgICAgIEFQSS5nZXREYXRhKFwidXNlcnNcIilcbiAgICAgICAgLnRoZW4oYWxsVXNlcnMgPT4ge1xuICAgICAgICAgICAgYWxsVXNlcnMuZm9yRWFjaCh1c2VyID0+IHtcblxuICAgICAgICAgICAgICAgIGlmICh1c2VybmFtZSA9PT0gdXNlci51c2VyTmFtZSAmJiBwYXNzd29yZCA9PT0gdXNlci5wYXNzd29yZCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgVGhpcyBvbmU6ICR7dXNlci5pZH1gKVxuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCd1c2VySWQnLCB1c2VyLmlkKVxuICAgICAgICAgICAgICAgICAgICBsZXQgdXNlcklkID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgndXNlcklkJyk7XG4gICAgICAgICAgICAgICAgICAgIGxvYWRVc2VyU3BlY2lmaWNQYWdlKHVzZXJJZCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJVc2VybmFtZS9wYXNzd29yZCBpbnZhbGlkLiBJZiBuZXcgdXNlciwgcGxlYXNlIHJlZ2lzdGVyLiA6KVwiKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBsb2FkVXNlclNwZWNpZmljUGFnZSh1c2VySWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFRoaXMgaXMgdGhlIHVzZXIgcGFnZSEgJHt1c2VySWR9YCk7XG4gICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIH0pXG4gICAgICAgIFxuICAgICAgICB9KVxuICAgICAgICBcbiAgICAgfSwgICAgIFxuICAgIFxufVxuXG5leHBvcnQgZGVmYXVsdCBsb2dpbiIsImltcG9ydCBsb2dpbiBmcm9tIFwiLi9sb2dpblwiXG5cbmxvZ2luLmNyZWF0ZUFuZEFwcGVuZExvZ2luSW5wdXQoKTtcbiJdfQ==
