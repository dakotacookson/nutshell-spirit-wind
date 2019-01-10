(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _newsList = _interopRequireDefault(require("./news/newsList"));

var _newsForm = _interopRequireDefault(require("./news/newsForm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_newsList.default.fridgify();

_newsForm.default.createAndAppendForm();

},{"./news/newsForm":5,"./news/newsList":6}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _newsCollection = _interopRequireDefault(require("./newsCollection"));

var _newsList = _interopRequireDefault(require("./newsList"));

var _newsEditForm = _interopRequireDefault(require("./newsEditForm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Given a single food object, this component builds out the HTML and returns it
const food = {
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
    let foodArticle = document.createElement("article"); // In order to have the id of the food item available when the user clicks on the delete and edit button, we set the id of the HTML article element for each food item to contain the id of the item in the API. We are intentionally planning ahead and formating the id this way so that when the buttons are clicked, we can use the split method for strings to get just the id number of the food item to be edited/deleted. Also, because we are using the ids from the API, it also ensures that each delete button has a unique id. By moving the id to the article element, it also gives us a a way to target the whole article element so that we can replace the contents of the article element with a pre-filled form when the user clicks the edit button.

    foodArticle.setAttribute("id", `food--${foodObject.id}`);
    let foodName = document.createElement("h3");
    foodName.textContent = foodObject.name;
    let foodExp = document.createElement("p");
    foodExp.textContent = foodObject.expiration;
    let foodType = document.createElement("a");
    let foodType2 = foodObject.type;
    foodType.textContent = foodType2;
    foodType.setAttribute("href", `${foodType2}`); // In order to change the data for an existing food item in our API, we need to provide the user with a way to edit the existing values. This means we will show the user a form with the existing values already populated. Once again, we want our data to be our point of truth. So we make a HTTP GET request targeting the specific food item the user wants to edit to get the data that will be populated in the form. Once we have that data, we can build the form, populate the input fields with our data form the GET request and then append that form to the appropriate place on the DOM.

    let editFoodButton = document.createElement("button");
    editFoodButton.textContent = "Edit";
    editFoodButton.addEventListener("click", () => {
      let articleId = event.target.parentNode.id;
      let foodId = articleId.split("--")[1];

      _newsCollection.default.getFood(foodId).then(response => {
        _newsEditForm.default.createAndAppendForm(articleId, response);
      });
    }); // Since we can get the id of the food item to be deleted from the parent element(the article element), we can use that to make an HTTP DELETE request to our API. Once again after this we want to get the list of food items from the API using a HTTP GET request and display it to the user so that the user does not have to refresh the page in order to see that the item they deleted has actually been deleted.

    let deleteFoodButton = document.createElement("button");
    deleteFoodButton.textContent = "Delete";
    deleteFoodButton.addEventListener("click", () => {
      let foodId = event.target.parentNode.id.split("--")[1];

      _newsCollection.default.deleteFood(foodId).then(response => {
        _newsList.default.fridgify();

        return response;
      });
    });
    foodArticle.appendChild(foodName);
    foodArticle.appendChild(foodExp);
    foodArticle.appendChild(foodType);
    foodArticle.appendChild(editFoodButton);
    foodArticle.appendChild(deleteFoodButton);
    return foodArticle;
  }

};
var _default = food;
exports.default = _default;

},{"./newsCollection":3,"./newsEditForm":4,"./newsList":6}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// Component responsible for interacting with the API. All fetch calls for this application will be defined here
const foodCollection = {
  // This method returns a fetch, which means it is returning a promise. Which means to access the response from the asynchronous HTTP GET request that is being made by this fetch, we can chain a .then at the point where this method(getAllFoods) is called. The .then then is chained to the fetch inside the method is parsing the data from JSON to data structures Javascript will understand. In this case, because we have a collection of items, it will be an array of objects.
  getAllFoods() {
    return fetch("http://localhost:8088/News").then(response => response.json());
  },

  // This method will make a HTTP POST request to the API. Because a POST has a body with the data for the new item you want created, this method will take one argument which will be the object for the new food item we want to add to our collection in the API.
  postNewFood(newFoodToSave) {
    // We want to return this fetch request so that at the point it is called, we can take advantage of the asynchronous nature of promises to wait for this to be done before getting the latest data and rerendering the DOM.
    return fetch("http://localhost:8088/News", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newFoodToSave)
    });
  },

  // In order to delete a item from the JSON Server API, all we need is the id of the item in order to target it, which is the only argument this method has.
  deleteFood(foodId) {
    return fetch(`http://localhost:8088/News/${foodId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
  },

  // Again, you need the id of the food item in order to get data for that item back from the API.
  getFood(foodId) {
    return fetch(`http://localhost:8088/News/${foodId}`).then(response => response.json());
  },

  // In order to edit an existing food item, we need the id to identify which food item we want to edit and the new data we want to replace the existing data with. So this time, we have two arguments for the method.
  putExistingFood(foodId, foodToEdit) {
    return fetch(`http://localhost:8088/News/${foodId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(foodToEdit)
    });
  }

};
console.table(foodCollection.getAllFoods());
var _default = foodCollection;
exports.default = _default;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _newsCollection = _interopRequireDefault(require("./newsCollection"));

var _newsList = _interopRequireDefault(require("./newsList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const foodEditForm = {
  // This module will build an edit form and append it to the DOM. The form will contain input fields with existing values from the API and an Update button. The user can edit the the values in the input fields. An event listener on the Update button will handle taking the new values entered by the user and calling the API to update the data.
  createAndAppendForm(articleId, foodObjToEdit) {
    // Building the edit form with fields for the name, expiration and type of the food item. Each of the input fields contains the existing values from the database.
    let foodNameField = document.createElement("p");
    let foodNameLabel = document.createElement("label");
    foodNameLabel.textContent = "Title";
    let foodNameInput = document.createElement("input");
    foodNameInput.value = foodObjToEdit.name;
    foodNameField.appendChild(foodNameLabel);
    foodNameField.appendChild(foodNameInput);
    let foodExpirationField = document.createElement("p");
    let foodExpirationLabel = document.createElement("label");
    foodExpirationLabel.textContent = "Summary";
    let foodExpirationInput = document.createElement("input");
    foodExpirationInput.value = foodObjToEdit.expiration;
    foodExpirationField.appendChild(foodExpirationLabel);
    foodExpirationField.appendChild(foodExpirationInput);
    let foodTypeField = document.createElement("p");
    let foodTypeLabel = document.createElement("label");
    foodTypeLabel.textContent = "URL";
    let foodTypeInput = document.createElement("input");
    foodTypeInput.value = foodObjToEdit.type; // foodTypeInput.innerHTML=`<a href="${foodTypeInput.value}"> </a>`

    foodTypeField.appendChild(foodTypeLabel);
    foodTypeField.appendChild(foodTypeInput);
    let updateButton = document.createElement("button");
    updateButton.textContent = "Update"; // There is an event listener on the Update button which will take the new values in the input fields and build an object for the food item to be edited. Then we make a HTTP PUT request where we target the food item we want to edit by specifying the id in the URL. We also pass the object representing the food item with the new values as data in our HTTP request. Once again, because our data has been modified, we make an HTTP GET request to get all the food items and display them.

    updateButton.addEventListener("click", () => {
      let editedFood = {
        name: foodNameInput.value,
        expiration: foodExpirationInput.value,
        type: foodTypeInput.value
      };

      _newsCollection.default.putExistingFood(foodObjToEdit.id, editedFood).then(response => {
        _newsList.default.fridgify();

        return response;
      });
    }); // We passed in the id of the article so we know exactly where to append the edit form.

    let foodItemArticle = document.querySelector(`#${articleId}`); // Because we want to replace what is currently in the article element with the edit form, we clear out all children HTML elements in our targeted element before appending our edit form to it.

    while (foodItemArticle.firstChild) {
      foodItemArticle.removeChild(foodItemArticle.firstChild);
    }

    foodItemArticle.appendChild(foodNameField);
    foodItemArticle.appendChild(foodExpirationField);
    foodItemArticle.appendChild(foodTypeField);
    foodItemArticle.appendChild(updateButton);
  }

};
var _default = foodEditForm;
exports.default = _default;

},{"./newsCollection":3,"./newsList":6}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _newsCollection = _interopRequireDefault(require("./newsCollection"));

var _newsList = _interopRequireDefault(require("./newsList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const foodForm = {
  // This module will build a form and append it to the DOM. The form will contain input fields for a user to add a new food to their refrigerator and a button with an event listener that will listen for the click
  createAndAppendForm() {
    // 1. Build HTML form
    let formHeader = document.createElement("h3");
    formHeader.textContent = "Your Spooky News ";
    let foodNameField = document.createElement("fieldset");
    let foodNameLabel = document.createElement("label");
    foodNameLabel.textContent = "Title";
    foodNameLabel.setAttribute("for", "food__name");
    let foodNameInput = document.createElement("input");
    foodNameInput.setAttribute("id", "food__name");
    foodNameInput.setAttribute("name", "food__name");
    foodNameField.appendChild(foodNameLabel);
    foodNameField.appendChild(foodNameInput);
    let foodExpirationField = document.createElement("fieldset");
    let foodExpirationLabel = document.createElement("label");
    foodExpirationLabel.textContent = "Summary";
    foodExpirationLabel.setAttribute("for", "food__expiration");
    let foodExpirationInput = document.createElement("input");
    foodExpirationInput.setAttribute("id", "food__expiration");
    foodExpirationInput.setAttribute("name", "food__expiration");
    foodExpirationField.appendChild(foodExpirationLabel);
    foodExpirationField.appendChild(foodExpirationInput);
    let foodTypeField = document.createElement("fieldset");
    let foodTypeLabel = document.createElement("label");
    foodTypeLabel.textContent = "URL";
    foodTypeLabel.setAttribute("for", "food__type");
    let foodTypeInput = document.createElement("input");
    foodTypeInput.setAttribute("id", "food__type");
    foodTypeInput.setAttribute("name", "food__type");
    foodTypeField.appendChild(foodTypeLabel);
    foodTypeField.appendChild(foodTypeInput);
    let submitButton = document.createElement("button");
    submitButton.textContent = "Add Article";
    submitButton.setAttribute("class", "food__save"); // 2. Attach event listener to button in form

    submitButton.addEventListener("click", this.handleAddNewFood); // 3. Append the HTML form to the DOM
    //Notice that I have added an article element to my index.html with the class "form".

    let foodFormFragment = document.createDocumentFragment();
    foodFormFragment.appendChild(formHeader);
    foodFormFragment.appendChild(foodNameField);
    foodFormFragment.appendChild(foodExpirationField);
    foodFormFragment.appendChild(foodTypeField);
    foodFormFragment.appendChild(submitButton);
    let formArticle = document.querySelector(".output__news");
    formArticle.appendChild(foodFormFragment);
  },

  // This module will also contain the function that executes when the button in the form is clicked. When the button in the form is clicked, the following will happen:
  handleAddNewFood() {
    // 1. Get user input that user entered
    let inputFoodName = document.querySelector("#food__name").value;
    let inputFoodExpiration = document.querySelector("#food__expiration").value;
    let inputFoodType = document.querySelector("#food__type").value; // 2. Create a new object with the same structure we have been using throughout the application to represent a food item:
    // {
    //   name: "user input name",
    //   expiration: "user input expiration",
    //   type: "user input type"
    // }

    let newFood = {
      name: inputFoodName,
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

    _newsCollection.default.postNewFood(newFood).then(response => {
      _newsList.default.fridgify();

      return response;
    });
  }

};
var _default = foodForm;
exports.default = _default;

},{"./newsCollection":3,"./newsList":6}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _newsCollection = _interopRequireDefault(require("./newsCollection"));

var _news = _interopRequireDefault(require("./news"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This component will get the data, build the HTML from the data and append it to the DOM.
// To get the data, we will use the foodCollection component.
// To build the HTML for each object in the array of food(which is what the data coming from the API becomes once we parse it), we will use the food component.
const foodList = {
  fridgify() {
    // 1. Get data
    // The getAllFoods method will do a fetch and return a promise. This call will return the data from the API in the response.
    _newsCollection.default.getAllFoods().then(allFoods => {
      // An empty document fragment
      let foodDocFragment = document.createDocumentFragment(); // 2. Iterate over data and build HTML for each item
      // We loop over the array of objects returned from our API and for each obect, we make a call to the foodBuilder method in the food module. This method takes a food object as an argument and returns an HTML component. Once we have that HTML, we append it to our document fragment so that it is slowly built up. By the end of the forEach loop, our document fragment contains all the HTML for all our data.

      allFoods.forEach(foodItem => {
        let foodHtml = _news.default.foodBuilder(foodItem);

        foodDocFragment.appendChild(foodHtml);
      }); // 3. Append the HTML to the DOM
      // We get a reference to a HTML element with the class "output" and append our document fragment to that element. Because the HTML element with class "output" is already on the DOM, the HTML in the document fragment is appended to the DOM.

      let outputArticle = document.querySelector(".output__newsSection2"); //This while loop essentially removes all child nodes of an element until the element has no child nodes left. It is equivalent to the following:
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

},{"./news":2,"./newsCollection":3}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL25ld3MvbmV3cy5qcyIsIi4uL3NjcmlwdHMvbmV3cy9uZXdzQ29sbGVjdGlvbi5qcyIsIi4uL3NjcmlwdHMvbmV3cy9uZXdzRWRpdEZvcm0uanMiLCIuLi9zY3JpcHRzL25ld3MvbmV3c0Zvcm0uanMiLCIuLi9zY3JpcHRzL25ld3MvbmV3c0xpc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOztBQUNBOzs7O0FBQ0Esa0JBQVMsUUFBVDs7QUFDQSxrQkFBUyxtQkFBVDs7Ozs7Ozs7OztBQ0hBOztBQUNBOztBQUNBOzs7O0FBRUE7QUFDQSxNQUFNLElBQUksR0FBRztBQUVYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0EsRUFBQSxXQUFXLENBQUMsVUFBRCxFQUFhO0FBQ3RCLFFBQUksV0FBVyxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLFNBQXZCLENBQWxCLENBRHNCLENBRXRCOztBQUNBLElBQUEsV0FBVyxDQUFDLFlBQVosQ0FBeUIsSUFBekIsRUFBZ0MsU0FBUSxVQUFVLENBQUMsRUFBRyxFQUF0RDtBQUVBLFFBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLElBQXZCLENBQWY7QUFDQSxJQUFBLFFBQVEsQ0FBQyxXQUFULEdBQXVCLFVBQVUsQ0FBQyxJQUFsQztBQUVBLFFBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLEdBQXZCLENBQWQ7QUFDQSxJQUFBLE9BQU8sQ0FBQyxXQUFSLEdBQXNCLFVBQVUsQ0FBQyxVQUFqQztBQUVBLFFBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLEdBQXZCLENBQWY7QUFDQSxRQUFJLFNBQVMsR0FBRyxVQUFVLENBQUMsSUFBM0I7QUFDQSxJQUFB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QUhNLENBTWQ7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBOztBQXJCYyxLQUFkOztBQXNCQSw0QkFBZSxXQUFmLENBQTJCLE9BQTNCLEVBQ0csSUFESCxDQUNRLFFBQVEsSUFBSztBQUNqQix3QkFBUyxRQUFUOztBQUNBLGFBQU8sUUFBUDtBQUVELEtBTEg7QUFNRDs7QUE1R2MsQ0FBakI7ZUErR2UsUTs7Ozs7Ozs7Ozs7QUMvR2Y7O0FBRUE7Ozs7QUFMQTtBQUVBO0FBRUE7QUFHQSxNQUFNLFFBQVEsR0FBRztBQUNiLEVBQUEsUUFBUSxHQUFHO0FBQ1A7QUFDQTtBQUNBLDRCQUFlLFdBQWYsR0FDSyxJQURMLENBQ1UsUUFBUSxJQUFJO0FBRWQ7QUFDQSxVQUFJLGVBQWUsR0FBRyxRQUFRLENBQUMsc0JBQVQsRUFBdEIsQ0FIYyxDQUtkO0FBQ0E7O0FBQ0EsTUFBQSxRQUFRLENBQUMsT0FBVCxDQUFpQixRQUFRLElBQUk7QUFDekIsWUFBSSxRQUFRLEdBQUcsY0FBSyxXQUFMLENBQWlCLFFBQWpCLENBQWY7O0FBQ0EsUUFBQSxlQUFlLENBQUMsV0FBaEIsQ0FBNEIsUUFBNUI7QUFDSCxPQUhELEVBUGMsQ0FZZDtBQUNBOztBQUNBLFVBQUksYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLHVCQUF2QixDQUFwQixDQWRjLENBZ0JkO0FBQ0E7QUFFQTs7QUFDQSxhQUFPLGFBQWEsQ0FBQyxVQUFyQixFQUFpQztBQUM3QixRQUFBLGFBQWEsQ0FBQyxXQUFkLENBQTBCLGFBQWEsQ0FBQyxVQUF4QztBQUNIOztBQUNELE1BQUEsYUFBYSxDQUFDLFdBQWQsQ0FBMEIsZUFBMUI7QUFFSCxLQTFCTDtBQTJCSDs7QUEvQlksQ0FBakI7ZUFrQ2UsUSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBmb29kTGlzdCBmcm9tIFwiLi9uZXdzL25ld3NMaXN0XCJcclxuaW1wb3J0IGZvb2RGb3JtIGZyb20gXCIuL25ld3MvbmV3c0Zvcm1cIlxyXG5mb29kTGlzdC5mcmlkZ2lmeSgpXHJcbmZvb2RGb3JtLmNyZWF0ZUFuZEFwcGVuZEZvcm0oKVxyXG4iLCJpbXBvcnQgZm9vZENvbGxlY3Rpb24gZnJvbSBcIi4vbmV3c0NvbGxlY3Rpb25cIlxyXG5pbXBvcnQgZm9vZExpc3QgZnJvbSBcIi4vbmV3c0xpc3RcIlxyXG5pbXBvcnQgZm9vZEVkaXRGb3JtIGZyb20gXCIuL25ld3NFZGl0Rm9ybVwiXHJcblxyXG4vL0dpdmVuIGEgc2luZ2xlIGZvb2Qgb2JqZWN0LCB0aGlzIGNvbXBvbmVudCBidWlsZHMgb3V0IHRoZSBIVE1MIGFuZCByZXR1cm5zIGl0XHJcbmNvbnN0IGZvb2QgPSB7XHJcblxyXG4gIC8vIFRoaXMgbWV0aG9kIHRha2VzIG9uZSBhcmd1bWVudCwgd2hpY2ggd2UgZXhwZWN0IHRvIGJlIGFuIG9iamVjdCB0aGF0IHJlcHJlc2VudHMgYSBmb29kIGFuZCB3aWxsIGhhdmUgdGhlIGZvbGxvd2luZyBzdHJ1Y3R1cmU6XHJcbiAgLy8ge1xyXG4gIC8vICAgbmFtZTogXCJuYW1lIHZhbHVlXCIsXHJcbiAgLy8gICBleHBpcmF0aW9uOiBcImV4cGlyYXRpb24gdmFsdWVcIixcclxuICAvLyAgIHR5cGU6IFwidHlwZSB2YWx1ZVwiXHJcbiAgLy8gfVxyXG5cclxuICAvLyBHaXZlbiB0aGlzIG9iamVjdCwgdGhlIG1ldGhvZCB3aWxsIGJ1aWxkIEhUTUwgZWxlbWVudHMgYW5kIGFwcGVuZCB0aGVtIGFwcHJvcHJpYXRlbHkgc28gdGhhdCBpdCB3aWxsIGxvb2sgbGlrZSB0aGlzOlxyXG4gIC8vIDxhcnRpY2xlPlxyXG4gIC8vICAgPGgzPm5hbWUgdmFsdWU8L2gzPlxyXG4gIC8vICAgPHA+ZXhwaXJhdGlvbiB2YWx1ZTwvcD5cclxuICAvLyAgIDxwPnR5cGUgdmFsdWU8L3A+XHJcbiAgLy8gPC9hcnRpY2xlPlxyXG5cclxuICAvLyBUaGlzIEhUTUwgaXMgdGhlbiByZXR1cm5lZCB0byB0aGUgcG9pbnQgZnJvbSB3aGVyZSB0aGlzIG1ldGhvZCB3YXMgY2FsbGVkXHJcbiAgZm9vZEJ1aWxkZXIoZm9vZE9iamVjdCkge1xyXG4gICAgbGV0IGZvb2RBcnRpY2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFydGljbGVcIilcclxuICAgIC8vIEluIG9yZGVyIHRvIGhhdmUgdGhlIGlkIG9mIHRoZSBmb29kIGl0ZW0gYXZhaWxhYmxlIHdoZW4gdGhlIHVzZXIgY2xpY2tzIG9uIHRoZSBkZWxldGUgYW5kIGVkaXQgYnV0dG9uLCB3ZSBzZXQgdGhlIGlkIG9mIHRoZSBIVE1MIGFydGljbGUgZWxlbWVudCBmb3IgZWFjaCBmb29kIGl0ZW0gdG8gY29udGFpbiB0aGUgaWQgb2YgdGhlIGl0ZW0gaW4gdGhlIEFQSS4gV2UgYXJlIGludGVudGlvbmFsbHkgcGxhbm5pbmcgYWhlYWQgYW5kIGZvcm1hdGluZyB0aGUgaWQgdGhpcyB3YXkgc28gdGhhdCB3aGVuIHRoZSBidXR0b25zIGFyZSBjbGlja2VkLCB3ZSBjYW4gdXNlIHRoZSBzcGxpdCBtZXRob2QgZm9yIHN0cmluZ3MgdG8gZ2V0IGp1c3QgdGhlIGlkIG51bWJlciBvZiB0aGUgZm9vZCBpdGVtIHRvIGJlIGVkaXRlZC9kZWxldGVkLiBBbHNvLCBiZWNhdXNlIHdlIGFyZSB1c2luZyB0aGUgaWRzIGZyb20gdGhlIEFQSSwgaXQgYWxzbyBlbnN1cmVzIHRoYXQgZWFjaCBkZWxldGUgYnV0dG9uIGhhcyBhIHVuaXF1ZSBpZC4gQnkgbW92aW5nIHRoZSBpZCB0byB0aGUgYXJ0aWNsZSBlbGVtZW50LCBpdCBhbHNvIGdpdmVzIHVzIGEgYSB3YXkgdG8gdGFyZ2V0IHRoZSB3aG9sZSBhcnRpY2xlIGVsZW1lbnQgc28gdGhhdCB3ZSBjYW4gcmVwbGFjZSB0aGUgY29udGVudHMgb2YgdGhlIGFydGljbGUgZWxlbWVudCB3aXRoIGEgcHJlLWZpbGxlZCBmb3JtIHdoZW4gdGhlIHVzZXIgY2xpY2tzIHRoZSBlZGl0IGJ1dHRvbi5cclxuICAgIGZvb2RBcnRpY2xlLnNldEF0dHJpYnV0ZShcImlkXCIsIGBmb29kLS0ke2Zvb2RPYmplY3QuaWR9YClcclxuXHJcbiAgICBsZXQgZm9vZE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIilcclxuICAgIGZvb2ROYW1lLnRleHRDb250ZW50ID0gZm9vZE9iamVjdC5uYW1lXHJcblxyXG4gICAgbGV0IGZvb2RFeHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKVxyXG4gICAgZm9vZEV4cC50ZXh0Q29udGVudCA9IGZvb2RPYmplY3QuZXhwaXJhdGlvblxyXG5cclxuICAgIGxldCBmb29kVHlwZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpXHJcbiAgICBsZXQgZm9vZFR5cGUyID0gZm9vZE9iamVjdC50eXBlXHJcbiAgICBmb29kVHlwZS50ZXh0Q29udGVudCA9IGZvb2RUeXBlMlxyXG4gICAgZm9vZFR5cGUuc2V0QXR0cmlidXRlKFwiaHJlZlwiLCBgJHtmb29kVHlwZTJ9YClcclxuICAgIC8vIEluIG9yZGVyIHRvIGNoYW5nZSB0aGUgZGF0YSBmb3IgYW4gZXhpc3RpbmcgZm9vZCBpdGVtIGluIG91ciBBUEksIHdlIG5lZWQgdG8gcHJvdmlkZSB0aGUgdXNlciB3aXRoIGEgd2F5IHRvIGVkaXQgdGhlIGV4aXN0aW5nIHZhbHVlcy4gVGhpcyBtZWFucyB3ZSB3aWxsIHNob3cgdGhlIHVzZXIgYSBmb3JtIHdpdGggdGhlIGV4aXN0aW5nIHZhbHVlcyBhbHJlYWR5IHBvcHVsYXRlZC4gT25jZSBhZ2Fpbiwgd2Ugd2FudCBvdXIgZGF0YSB0byBiZSBvdXIgcG9pbnQgb2YgdHJ1dGguIFNvIHdlIG1ha2UgYSBIVFRQIEdFVCByZXF1ZXN0IHRhcmdldGluZyB0aGUgc3BlY2lmaWMgZm9vZCBpdGVtIHRoZSB1c2VyIHdhbnRzIHRvIGVkaXQgdG8gZ2V0IHRoZSBkYXRhIHRoYXQgd2lsbCBiZSBwb3B1bGF0ZWQgaW4gdGhlIGZvcm0uIE9uY2Ugd2UgaGF2ZSB0aGF0IGRhdGEsIHdlIGNhbiBidWlsZCB0aGUgZm9ybSwgcG9wdWxhdGUgdGhlIGlucHV0IGZpZWxkcyB3aXRoIG91ciBkYXRhIGZvcm0gdGhlIEdFVCByZXF1ZXN0IGFuZCB0aGVuIGFwcGVuZCB0aGF0IGZvcm0gdG8gdGhlIGFwcHJvcHJpYXRlIHBsYWNlIG9uIHRoZSBET00uXHJcbiAgICBsZXQgZWRpdEZvb2RCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpXHJcbiAgICBlZGl0Rm9vZEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiRWRpdFwiXHJcbiAgICBlZGl0Rm9vZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICBsZXQgYXJ0aWNsZUlkID0gZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUuaWRcclxuICAgICAgbGV0IGZvb2RJZCA9IGFydGljbGVJZC5zcGxpdChcIi0tXCIpWzFdXHJcbiAgICAgIGZvb2RDb2xsZWN0aW9uLmdldEZvb2QoZm9vZElkKVxyXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgIGZvb2RFZGl0Rm9ybS5jcmVhdGVBbmRBcHBlbmRGb3JtKGFydGljbGVJZCwgcmVzcG9uc2UpXHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcblxyXG4gICAgLy8gU2luY2Ugd2UgY2FuIGdldCB0aGUgaWQgb2YgdGhlIGZvb2QgaXRlbSB0byBiZSBkZWxldGVkIGZyb20gdGhlIHBhcmVudCBlbGVtZW50KHRoZSBhcnRpY2xlIGVsZW1lbnQpLCB3ZSBjYW4gdXNlIHRoYXQgdG8gbWFrZSBhbiBIVFRQIERFTEVURSByZXF1ZXN0IHRvIG91ciBBUEkuIE9uY2UgYWdhaW4gYWZ0ZXIgdGhpcyB3ZSB3YW50IHRvIGdldCB0aGUgbGlzdCBvZiBmb29kIGl0ZW1zIGZyb20gdGhlIEFQSSB1c2luZyBhIEhUVFAgR0VUIHJlcXVlc3QgYW5kIGRpc3BsYXkgaXQgdG8gdGhlIHVzZXIgc28gdGhhdCB0aGUgdXNlciBkb2VzIG5vdCBoYXZlIHRvIHJlZnJlc2ggdGhlIHBhZ2UgaW4gb3JkZXIgdG8gc2VlIHRoYXQgdGhlIGl0ZW0gdGhleSBkZWxldGVkIGhhcyBhY3R1YWxseSBiZWVuIGRlbGV0ZWQuXHJcbiAgICBsZXQgZGVsZXRlRm9vZEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIilcclxuICAgIGRlbGV0ZUZvb2RCdXR0b24udGV4dENvbnRlbnQgPSBcIkRlbGV0ZVwiXHJcbiAgICBkZWxldGVGb29kQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgIGxldCBmb29kSWQgPSBldmVudC50YXJnZXQucGFyZW50Tm9kZS5pZC5zcGxpdChcIi0tXCIpWzFdXHJcbiAgICAgIGZvb2RDb2xsZWN0aW9uLmRlbGV0ZUZvb2QoZm9vZElkKVxyXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgIGZvb2RMaXN0LmZyaWRnaWZ5KClcclxuICAgICAgICAgIHJldHVybiByZXNwb25zZVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG5cclxuICAgIGZvb2RBcnRpY2xlLmFwcGVuZENoaWxkKGZvb2ROYW1lKVxyXG4gICAgZm9vZEFydGljbGUuYXBwZW5kQ2hpbGQoZm9vZEV4cClcclxuICAgIGZvb2RBcnRpY2xlLmFwcGVuZENoaWxkKGZvb2RUeXBlKVxyXG4gICAgZm9vZEFydGljbGUuYXBwZW5kQ2hpbGQoZWRpdEZvb2RCdXR0b24pXHJcbiAgICBmb29kQXJ0aWNsZS5hcHBlbmRDaGlsZChkZWxldGVGb29kQnV0dG9uKVxyXG5cclxuICAgIHJldHVybiBmb29kQXJ0aWNsZVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZm9vZFxyXG4iLCIvLyBDb21wb25lbnQgcmVzcG9uc2libGUgZm9yIGludGVyYWN0aW5nIHdpdGggdGhlIEFQSS4gQWxsIGZldGNoIGNhbGxzIGZvciB0aGlzIGFwcGxpY2F0aW9uIHdpbGwgYmUgZGVmaW5lZCBoZXJlXHJcblxyXG5jb25zdCBmb29kQ29sbGVjdGlvbiA9IHtcclxuICAgIC8vIFRoaXMgbWV0aG9kIHJldHVybnMgYSBmZXRjaCwgd2hpY2ggbWVhbnMgaXQgaXMgcmV0dXJuaW5nIGEgcHJvbWlzZS4gV2hpY2ggbWVhbnMgdG8gYWNjZXNzIHRoZSByZXNwb25zZSBmcm9tIHRoZSBhc3luY2hyb25vdXMgSFRUUCBHRVQgcmVxdWVzdCB0aGF0IGlzIGJlaW5nIG1hZGUgYnkgdGhpcyBmZXRjaCwgd2UgY2FuIGNoYWluIGEgLnRoZW4gYXQgdGhlIHBvaW50IHdoZXJlIHRoaXMgbWV0aG9kKGdldEFsbEZvb2RzKSBpcyBjYWxsZWQuIFRoZSAudGhlbiB0aGVuIGlzIGNoYWluZWQgdG8gdGhlIGZldGNoIGluc2lkZSB0aGUgbWV0aG9kIGlzIHBhcnNpbmcgdGhlIGRhdGEgZnJvbSBKU09OIHRvIGRhdGEgc3RydWN0dXJlcyBKYXZhc2NyaXB0IHdpbGwgdW5kZXJzdGFuZC4gSW4gdGhpcyBjYXNlLCBiZWNhdXNlIHdlIGhhdmUgYSBjb2xsZWN0aW9uIG9mIGl0ZW1zLCBpdCB3aWxsIGJlIGFuIGFycmF5IG9mIG9iamVjdHMuXHJcbiAgICBnZXRBbGxGb29kcygpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvTmV3c1wiKVxyXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvLyBUaGlzIG1ldGhvZCB3aWxsIG1ha2UgYSBIVFRQIFBPU1QgcmVxdWVzdCB0byB0aGUgQVBJLiBCZWNhdXNlIGEgUE9TVCBoYXMgYSBib2R5IHdpdGggdGhlIGRhdGEgZm9yIHRoZSBuZXcgaXRlbSB5b3Ugd2FudCBjcmVhdGVkLCB0aGlzIG1ldGhvZCB3aWxsIHRha2Ugb25lIGFyZ3VtZW50IHdoaWNoIHdpbGwgYmUgdGhlIG9iamVjdCBmb3IgdGhlIG5ldyBmb29kIGl0ZW0gd2Ugd2FudCB0byBhZGQgdG8gb3VyIGNvbGxlY3Rpb24gaW4gdGhlIEFQSS5cclxuICAgIHBvc3ROZXdGb29kKG5ld0Zvb2RUb1NhdmUpIHtcclxuICAgICAgICAvLyBXZSB3YW50IHRvIHJldHVybiB0aGlzIGZldGNoIHJlcXVlc3Qgc28gdGhhdCBhdCB0aGUgcG9pbnQgaXQgaXMgY2FsbGVkLCB3ZSBjYW4gdGFrZSBhZHZhbnRhZ2Ugb2YgdGhlIGFzeW5jaHJvbm91cyBuYXR1cmUgb2YgcHJvbWlzZXMgdG8gd2FpdCBmb3IgdGhpcyB0byBiZSBkb25lIGJlZm9yZSBnZXR0aW5nIHRoZSBsYXRlc3QgZGF0YSBhbmQgcmVyZW5kZXJpbmcgdGhlIERPTS5cclxuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvTmV3c1wiLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5ld0Zvb2RUb1NhdmUpXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICAvLyBJbiBvcmRlciB0byBkZWxldGUgYSBpdGVtIGZyb20gdGhlIEpTT04gU2VydmVyIEFQSSwgYWxsIHdlIG5lZWQgaXMgdGhlIGlkIG9mIHRoZSBpdGVtIGluIG9yZGVyIHRvIHRhcmdldCBpdCwgd2hpY2ggaXMgdGhlIG9ubHkgYXJndW1lbnQgdGhpcyBtZXRob2QgaGFzLlxyXG4gICAgZGVsZXRlRm9vZChmb29kSWQpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9OZXdzLyR7Zm9vZElkfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICAvLyBBZ2FpbiwgeW91IG5lZWQgdGhlIGlkIG9mIHRoZSBmb29kIGl0ZW0gaW4gb3JkZXIgdG8gZ2V0IGRhdGEgZm9yIHRoYXQgaXRlbSBiYWNrIGZyb20gdGhlIEFQSS5cclxuICAgIGdldEZvb2QoZm9vZElkKSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvTmV3cy8ke2Zvb2RJZH1gKVxyXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICB9LFxyXG4gICAgLy8gSW4gb3JkZXIgdG8gZWRpdCBhbiBleGlzdGluZyBmb29kIGl0ZW0sIHdlIG5lZWQgdGhlIGlkIHRvIGlkZW50aWZ5IHdoaWNoIGZvb2QgaXRlbSB3ZSB3YW50IHRvIGVkaXQgYW5kIHRoZSBuZXcgZGF0YSB3ZSB3YW50IHRvIHJlcGxhY2UgdGhlIGV4aXN0aW5nIGRhdGEgd2l0aC4gU28gdGhpcyB0aW1lLCB3ZSBoYXZlIHR3byBhcmd1bWVudHMgZm9yIHRoZSBtZXRob2QuXHJcbiAgICBwdXRFeGlzdGluZ0Zvb2QoZm9vZElkLCBmb29kVG9FZGl0KSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvTmV3cy8ke2Zvb2RJZH1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQVVRcIixcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZm9vZFRvRWRpdClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcbmNvbnNvbGUudGFibGUoZm9vZENvbGxlY3Rpb24uZ2V0QWxsRm9vZHMoKSlcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZvb2RDb2xsZWN0aW9uXHJcbiIsImltcG9ydCBmb29kQ29sbGVjdGlvbiBmcm9tIFwiLi9uZXdzQ29sbGVjdGlvblwiXHJcbmltcG9ydCBmb29kTGlzdCBmcm9tIFwiLi9uZXdzTGlzdFwiXHJcblxyXG5jb25zdCBmb29kRWRpdEZvcm0gPSB7XHJcbiAgLy8gVGhpcyBtb2R1bGUgd2lsbCBidWlsZCBhbiBlZGl0IGZvcm0gYW5kIGFwcGVuZCBpdCB0byB0aGUgRE9NLiBUaGUgZm9ybSB3aWxsIGNvbnRhaW4gaW5wdXQgZmllbGRzIHdpdGggZXhpc3RpbmcgdmFsdWVzIGZyb20gdGhlIEFQSSBhbmQgYW4gVXBkYXRlIGJ1dHRvbi4gVGhlIHVzZXIgY2FuIGVkaXQgdGhlIHRoZSB2YWx1ZXMgaW4gdGhlIGlucHV0IGZpZWxkcy4gQW4gZXZlbnQgbGlzdGVuZXIgb24gdGhlIFVwZGF0ZSBidXR0b24gd2lsbCBoYW5kbGUgdGFraW5nIHRoZSBuZXcgdmFsdWVzIGVudGVyZWQgYnkgdGhlIHVzZXIgYW5kIGNhbGxpbmcgdGhlIEFQSSB0byB1cGRhdGUgdGhlIGRhdGEuXHJcbiAgY3JlYXRlQW5kQXBwZW5kRm9ybShhcnRpY2xlSWQsIGZvb2RPYmpUb0VkaXQpIHtcclxuXHJcbiAgICAvLyBCdWlsZGluZyB0aGUgZWRpdCBmb3JtIHdpdGggZmllbGRzIGZvciB0aGUgbmFtZSwgZXhwaXJhdGlvbiBhbmQgdHlwZSBvZiB0aGUgZm9vZCBpdGVtLiBFYWNoIG9mIHRoZSBpbnB1dCBmaWVsZHMgY29udGFpbnMgdGhlIGV4aXN0aW5nIHZhbHVlcyBmcm9tIHRoZSBkYXRhYmFzZS5cclxuICAgIGxldCBmb29kTmFtZUZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIilcclxuXHJcbiAgICBsZXQgZm9vZE5hbWVMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKVxyXG4gICAgZm9vZE5hbWVMYWJlbC50ZXh0Q29udGVudCA9IFwiVGl0bGVcIlxyXG4gICAgbGV0IGZvb2ROYW1lSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIilcclxuICAgIGZvb2ROYW1lSW5wdXQudmFsdWUgPSBmb29kT2JqVG9FZGl0Lm5hbWVcclxuXHJcbiAgICBmb29kTmFtZUZpZWxkLmFwcGVuZENoaWxkKGZvb2ROYW1lTGFiZWwpXHJcbiAgICBmb29kTmFtZUZpZWxkLmFwcGVuZENoaWxkKGZvb2ROYW1lSW5wdXQpXHJcblxyXG4gICAgbGV0IGZvb2RFeHBpcmF0aW9uRmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKVxyXG5cclxuICAgIGxldCBmb29kRXhwaXJhdGlvbkxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpXHJcbiAgICBmb29kRXhwaXJhdGlvbkxhYmVsLnRleHRDb250ZW50ID0gXCJTdW1tYXJ5XCJcclxuICAgIGxldCBmb29kRXhwaXJhdGlvbklucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpXHJcbiAgICBmb29kRXhwaXJhdGlvbklucHV0LnZhbHVlID0gZm9vZE9ialRvRWRpdC5leHBpcmF0aW9uXHJcblxyXG4gICAgZm9vZEV4cGlyYXRpb25GaWVsZC5hcHBlbmRDaGlsZChmb29kRXhwaXJhdGlvbkxhYmVsKVxyXG4gICAgZm9vZEV4cGlyYXRpb25GaWVsZC5hcHBlbmRDaGlsZChmb29kRXhwaXJhdGlvbklucHV0KVxyXG5cclxuICAgIGxldCBmb29kVHlwZUZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIilcclxuXHJcbiAgICBsZXQgZm9vZFR5cGVMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKVxyXG4gICAgZm9vZFR5cGVMYWJlbC50ZXh0Q29udGVudCA9IFwiVVJMXCJcclxuICAgIGxldCBmb29kVHlwZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpXHJcbiAgICBmb29kVHlwZUlucHV0LnZhbHVlID0gZm9vZE9ialRvRWRpdC50eXBlXHJcbiAgICAvLyBmb29kVHlwZUlucHV0LmlubmVySFRNTD1gPGEgaHJlZj1cIiR7Zm9vZFR5cGVJbnB1dC52YWx1ZX1cIj4gPC9hPmBcclxuICAgIGZvb2RUeXBlRmllbGQuYXBwZW5kQ2hpbGQoZm9vZFR5cGVMYWJlbClcclxuICAgIGZvb2RUeXBlRmllbGQuYXBwZW5kQ2hpbGQoZm9vZFR5cGVJbnB1dClcclxuXHJcbiAgICBsZXQgdXBkYXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKVxyXG4gICAgdXBkYXRlQnV0dG9uLnRleHRDb250ZW50ID0gXCJVcGRhdGVcIlxyXG5cclxuICAgIC8vIFRoZXJlIGlzIGFuIGV2ZW50IGxpc3RlbmVyIG9uIHRoZSBVcGRhdGUgYnV0dG9uIHdoaWNoIHdpbGwgdGFrZSB0aGUgbmV3IHZhbHVlcyBpbiB0aGUgaW5wdXQgZmllbGRzIGFuZCBidWlsZCBhbiBvYmplY3QgZm9yIHRoZSBmb29kIGl0ZW0gdG8gYmUgZWRpdGVkLiBUaGVuIHdlIG1ha2UgYSBIVFRQIFBVVCByZXF1ZXN0IHdoZXJlIHdlIHRhcmdldCB0aGUgZm9vZCBpdGVtIHdlIHdhbnQgdG8gZWRpdCBieSBzcGVjaWZ5aW5nIHRoZSBpZCBpbiB0aGUgVVJMLiBXZSBhbHNvIHBhc3MgdGhlIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIGZvb2QgaXRlbSB3aXRoIHRoZSBuZXcgdmFsdWVzIGFzIGRhdGEgaW4gb3VyIEhUVFAgcmVxdWVzdC4gT25jZSBhZ2FpbiwgYmVjYXVzZSBvdXIgZGF0YSBoYXMgYmVlbiBtb2RpZmllZCwgd2UgbWFrZSBhbiBIVFRQIEdFVCByZXF1ZXN0IHRvIGdldCBhbGwgdGhlIGZvb2QgaXRlbXMgYW5kIGRpc3BsYXkgdGhlbS5cclxuICAgIHVwZGF0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICBsZXQgZWRpdGVkRm9vZCA9IHtcclxuICAgICAgICBuYW1lOiBmb29kTmFtZUlucHV0LnZhbHVlLFxyXG4gICAgICAgIGV4cGlyYXRpb246IGZvb2RFeHBpcmF0aW9uSW5wdXQudmFsdWUsXHJcbiAgICAgICAgdHlwZTogZm9vZFR5cGVJbnB1dC52YWx1ZVxyXG4gICAgICB9XHJcblxyXG4gICAgICBmb29kQ29sbGVjdGlvbi5wdXRFeGlzdGluZ0Zvb2QoZm9vZE9ialRvRWRpdC5pZCwgZWRpdGVkRm9vZClcclxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICBmb29kTGlzdC5mcmlkZ2lmeSgpXHJcbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2VcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxuXHJcbiAgICAvLyBXZSBwYXNzZWQgaW4gdGhlIGlkIG9mIHRoZSBhcnRpY2xlIHNvIHdlIGtub3cgZXhhY3RseSB3aGVyZSB0byBhcHBlbmQgdGhlIGVkaXQgZm9ybS5cclxuICAgIGxldCBmb29kSXRlbUFydGljbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHthcnRpY2xlSWR9YClcclxuXHJcbiAgICAvLyBCZWNhdXNlIHdlIHdhbnQgdG8gcmVwbGFjZSB3aGF0IGlzIGN1cnJlbnRseSBpbiB0aGUgYXJ0aWNsZSBlbGVtZW50IHdpdGggdGhlIGVkaXQgZm9ybSwgd2UgY2xlYXIgb3V0IGFsbCBjaGlsZHJlbiBIVE1MIGVsZW1lbnRzIGluIG91ciB0YXJnZXRlZCBlbGVtZW50IGJlZm9yZSBhcHBlbmRpbmcgb3VyIGVkaXQgZm9ybSB0byBpdC5cclxuICAgIHdoaWxlIChmb29kSXRlbUFydGljbGUuZmlyc3RDaGlsZCkge1xyXG4gICAgICBmb29kSXRlbUFydGljbGUucmVtb3ZlQ2hpbGQoZm9vZEl0ZW1BcnRpY2xlLmZpcnN0Q2hpbGQpO1xyXG4gICAgfVxyXG4gICAgZm9vZEl0ZW1BcnRpY2xlLmFwcGVuZENoaWxkKGZvb2ROYW1lRmllbGQpXHJcbiAgICBmb29kSXRlbUFydGljbGUuYXBwZW5kQ2hpbGQoZm9vZEV4cGlyYXRpb25GaWVsZClcclxuICAgIGZvb2RJdGVtQXJ0aWNsZS5hcHBlbmRDaGlsZChmb29kVHlwZUZpZWxkKVxyXG4gICAgZm9vZEl0ZW1BcnRpY2xlLmFwcGVuZENoaWxkKHVwZGF0ZUJ1dHRvbilcclxuICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgZm9vZEVkaXRGb3JtXHJcbiIsImltcG9ydCBmb29kQ29sbGVjdGlvbiBmcm9tIFwiLi9uZXdzQ29sbGVjdGlvblwiXHJcbmltcG9ydCBmb29kTGlzdCBmcm9tIFwiLi9uZXdzTGlzdFwiXHJcblxyXG5jb25zdCBmb29kRm9ybSA9IHtcclxuXHJcbiAgLy8gVGhpcyBtb2R1bGUgd2lsbCBidWlsZCBhIGZvcm0gYW5kIGFwcGVuZCBpdCB0byB0aGUgRE9NLiBUaGUgZm9ybSB3aWxsIGNvbnRhaW4gaW5wdXQgZmllbGRzIGZvciBhIHVzZXIgdG8gYWRkIGEgbmV3IGZvb2QgdG8gdGhlaXIgcmVmcmlnZXJhdG9yIGFuZCBhIGJ1dHRvbiB3aXRoIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQgd2lsbCBsaXN0ZW4gZm9yIHRoZSBjbGlja1xyXG4gIGNyZWF0ZUFuZEFwcGVuZEZvcm0oKSB7XHJcbiAgICAvLyAxLiBCdWlsZCBIVE1MIGZvcm1cclxuICAgIGxldCBmb3JtSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpXHJcbiAgICBmb3JtSGVhZGVyLnRleHRDb250ZW50ID0gXCJZb3VyIFNwb29reSBOZXdzIFwiXHJcblxyXG4gICAgbGV0IGZvb2ROYW1lRmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZmllbGRzZXRcIilcclxuXHJcbiAgICBsZXQgZm9vZE5hbWVMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKVxyXG4gICAgZm9vZE5hbWVMYWJlbC50ZXh0Q29udGVudCA9IFwiVGl0bGVcIlxyXG4gICAgZm9vZE5hbWVMYWJlbC5zZXRBdHRyaWJ1dGUoXCJmb3JcIiwgXCJmb29kX19uYW1lXCIpXHJcbiAgICBsZXQgZm9vZE5hbWVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKVxyXG4gICAgZm9vZE5hbWVJbnB1dC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImZvb2RfX25hbWVcIilcclxuICAgIGZvb2ROYW1lSW5wdXQuc2V0QXR0cmlidXRlKFwibmFtZVwiLCBcImZvb2RfX25hbWVcIilcclxuXHJcbiAgICBmb29kTmFtZUZpZWxkLmFwcGVuZENoaWxkKGZvb2ROYW1lTGFiZWwpXHJcbiAgICBmb29kTmFtZUZpZWxkLmFwcGVuZENoaWxkKGZvb2ROYW1lSW5wdXQpXHJcblxyXG4gICAgbGV0IGZvb2RFeHBpcmF0aW9uRmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZmllbGRzZXRcIilcclxuXHJcbiAgICBsZXQgZm9vZEV4cGlyYXRpb25MYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKVxyXG4gICAgZm9vZEV4cGlyYXRpb25MYWJlbC50ZXh0Q29udGVudCA9IFwiU3VtbWFyeVwiXHJcbiAgICBmb29kRXhwaXJhdGlvbkxhYmVsLnNldEF0dHJpYnV0ZShcImZvclwiLCBcImZvb2RfX2V4cGlyYXRpb25cIilcclxuICAgIGxldCBmb29kRXhwaXJhdGlvbklucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpXHJcbiAgICBmb29kRXhwaXJhdGlvbklucHV0LnNldEF0dHJpYnV0ZShcImlkXCIsIFwiZm9vZF9fZXhwaXJhdGlvblwiKVxyXG4gICAgZm9vZEV4cGlyYXRpb25JbnB1dC5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIsIFwiZm9vZF9fZXhwaXJhdGlvblwiKVxyXG5cclxuICAgIGZvb2RFeHBpcmF0aW9uRmllbGQuYXBwZW5kQ2hpbGQoZm9vZEV4cGlyYXRpb25MYWJlbClcclxuICAgIGZvb2RFeHBpcmF0aW9uRmllbGQuYXBwZW5kQ2hpbGQoZm9vZEV4cGlyYXRpb25JbnB1dClcclxuXHJcbiAgICBsZXQgZm9vZFR5cGVGaWVsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmaWVsZHNldFwiKVxyXG5cclxuICAgIGxldCBmb29kVHlwZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpXHJcbiAgICBmb29kVHlwZUxhYmVsLnRleHRDb250ZW50ID0gXCJVUkxcIlxyXG4gICAgZm9vZFR5cGVMYWJlbC5zZXRBdHRyaWJ1dGUoXCJmb3JcIiwgXCJmb29kX190eXBlXCIpXHJcbiAgICBsZXQgZm9vZFR5cGVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKVxyXG4gICAgZm9vZFR5cGVJbnB1dC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImZvb2RfX3R5cGVcIilcclxuICAgIGZvb2RUeXBlSW5wdXQuc2V0QXR0cmlidXRlKFwibmFtZVwiLCBcImZvb2RfX3R5cGVcIilcclxuXHJcblxyXG4gICAgZm9vZFR5cGVGaWVsZC5hcHBlbmRDaGlsZChmb29kVHlwZUxhYmVsKVxyXG4gICAgZm9vZFR5cGVGaWVsZC5hcHBlbmRDaGlsZChmb29kVHlwZUlucHV0KVxyXG5cclxuICAgIGxldCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpXHJcbiAgICBzdWJtaXRCdXR0b24udGV4dENvbnRlbnQgPSBcIkFkZCBBcnRpY2xlXCJcclxuICAgIHN1Ym1pdEJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImZvb2RfX3NhdmVcIilcclxuXHJcbiAgICAvLyAyLiBBdHRhY2ggZXZlbnQgbGlzdGVuZXIgdG8gYnV0dG9uIGluIGZvcm1cclxuICAgIHN1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5oYW5kbGVBZGROZXdGb29kKVxyXG5cclxuICAgIC8vIDMuIEFwcGVuZCB0aGUgSFRNTCBmb3JtIHRvIHRoZSBET01cclxuICAgIC8vTm90aWNlIHRoYXQgSSBoYXZlIGFkZGVkIGFuIGFydGljbGUgZWxlbWVudCB0byBteSBpbmRleC5odG1sIHdpdGggdGhlIGNsYXNzIFwiZm9ybVwiLlxyXG4gICAgbGV0IGZvb2RGb3JtRnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcclxuICAgIGZvb2RGb3JtRnJhZ21lbnQuYXBwZW5kQ2hpbGQoZm9ybUhlYWRlcilcclxuICAgIGZvb2RGb3JtRnJhZ21lbnQuYXBwZW5kQ2hpbGQoZm9vZE5hbWVGaWVsZClcclxuICAgIGZvb2RGb3JtRnJhZ21lbnQuYXBwZW5kQ2hpbGQoZm9vZEV4cGlyYXRpb25GaWVsZClcclxuICAgIGZvb2RGb3JtRnJhZ21lbnQuYXBwZW5kQ2hpbGQoZm9vZFR5cGVGaWVsZClcclxuICAgIGZvb2RGb3JtRnJhZ21lbnQuYXBwZW5kQ2hpbGQoc3VibWl0QnV0dG9uKVxyXG5cclxuICAgIGxldCBmb3JtQXJ0aWNsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub3V0cHV0X19uZXdzXCIpXHJcbiAgICBmb3JtQXJ0aWNsZS5hcHBlbmRDaGlsZChmb29kRm9ybUZyYWdtZW50KVxyXG5cclxuICB9LFxyXG4gIC8vIFRoaXMgbW9kdWxlIHdpbGwgYWxzbyBjb250YWluIHRoZSBmdW5jdGlvbiB0aGF0IGV4ZWN1dGVzIHdoZW4gdGhlIGJ1dHRvbiBpbiB0aGUgZm9ybSBpcyBjbGlja2VkLiBXaGVuIHRoZSBidXR0b24gaW4gdGhlIGZvcm0gaXMgY2xpY2tlZCwgdGhlIGZvbGxvd2luZyB3aWxsIGhhcHBlbjpcclxuICBoYW5kbGVBZGROZXdGb29kKCkge1xyXG4gICAgLy8gMS4gR2V0IHVzZXIgaW5wdXQgdGhhdCB1c2VyIGVudGVyZWRcclxuICAgIGxldCBpbnB1dEZvb2ROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb29kX19uYW1lXCIpLnZhbHVlXHJcbiAgICBsZXQgaW5wdXRGb29kRXhwaXJhdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9vZF9fZXhwaXJhdGlvblwiKS52YWx1ZVxyXG4gICAgbGV0IGlucHV0Rm9vZFR5cGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Zvb2RfX3R5cGVcIikudmFsdWVcclxuXHJcblxyXG4gICAgLy8gMi4gQ3JlYXRlIGEgbmV3IG9iamVjdCB3aXRoIHRoZSBzYW1lIHN0cnVjdHVyZSB3ZSBoYXZlIGJlZW4gdXNpbmcgdGhyb3VnaG91dCB0aGUgYXBwbGljYXRpb24gdG8gcmVwcmVzZW50IGEgZm9vZCBpdGVtOlxyXG4gICAgLy8ge1xyXG4gICAgLy8gICBuYW1lOiBcInVzZXIgaW5wdXQgbmFtZVwiLFxyXG4gICAgLy8gICBleHBpcmF0aW9uOiBcInVzZXIgaW5wdXQgZXhwaXJhdGlvblwiLFxyXG4gICAgLy8gICB0eXBlOiBcInVzZXIgaW5wdXQgdHlwZVwiXHJcbiAgICAvLyB9XHJcblxyXG4gICAgbGV0IG5ld0Zvb2QgPSB7XHJcbiAgICAgIG5hbWU6IGlucHV0Rm9vZE5hbWUsXHJcbiAgICAgIGV4cGlyYXRpb246IGlucHV0Rm9vZEV4cGlyYXRpb24sXHJcbiAgICAgIHR5cGU6IGlucHV0Rm9vZFR5cGVcclxuICAgIH1cclxuXHJcbiAgICAvLyAzLiBDYWxsIHRoZSBtZXRob2QocG9zdE5ld0Zvb2QpIHdpdGggdGhlIGZldGNoIHJlcXVlc3QgdG8gUE9TVCB0byB0aGUgQVBJIGFuZCBwYXNzIGl0IHRoZSBvYmplY3Qgd2UgY3JlYXRlZCBpbiB0aGUgcHJldmlvdXMgc3RlcFxyXG5cclxuICAgIC8vIE5vdGljZSB0aGUgaW1wb3J0IHN0YXRlbWVudCBhdCB0aGUgdG9wIG9mIHRoZSBtb2R1bGUgc28gSSBjYW4gY2FsbCBhIG1ldGhvZCBpbiB0aGUgZm9vZENvbGxlY3Rpb24gbW9kdWxlLlxyXG5cclxuICAgIC8vICoqKioqSU1QT1JUQU5UKioqKipcclxuICAgIC8vIFlvdSB3aWxsIG5vdGljZSBhdCB0aGlzIHBvaW50IHRoYXQgd2hpbGUgYSBuZXcgZm9vZCBpdGVtIGlzIGJlaW5nIGFkZGVkIHRvIG91ciBBUEksIHVubGVzcyB5b3UgcmVmcmVzaCB0aGUgYXBwbGljYXRpb24sIHRoZSBuZXdseSBhZGRlZCBpdGVtIHdpbGwgbm90IHNob3cgdXAgb24gdGhlIERPTS4gV2UgZGVmaW5pdGVseSBkbyBub3Qgd2FudCBvdXIgdXNlciB0byBoYXZlIHRvIGhpdCByZWZyZXNoIGV2ZXJ5IHRpbWUgdGhleSBhZGQgbmV3IGZvb2QgdG8gdGhlaXIgcmVmcmlnZXJhdG9yLlxyXG5cclxuICAgIC8vIFdlIGFsc28gZG8gTk9UIHdhbnQgdG8gbWFudWFsbHkgYWRkIG91ciBuZXcgZm9vZCBpdGVtIHRvIHRoZSBsaXN0IG9mIGZvb2Qgb24gdGhlIERPTS4gSW5zdGVhZCwgd2Ugd2FudCBvdXIgZGF0YSB0byBiZSBvdXIgcG9pbnQgb2YgdHJ1dGguIE91ciBET00gc2hvdWxkIGFsd2F5cyB1c2UgdGhlIGRhdGEgZnJvbSBvdXIgQVBJIHRvIHJlbmRlciB0aGUgRE9NLiBMb2dpY2FsbHksIGhlcmUgYXJlIHRoZSBzdGVwcyB3ZSB3YW50IHRvIHRha2UgcGxhY2UuXHJcbiAgICAvLyAxLiBBZGQgbmV3IGZvb2QgaXRlbSB0byB0aGUgQVBJIHVzaW5nIGEgUE9TVCBIVFRQIHJlcXVlc3QuXHJcbiAgICAvLyAgICAgV2UgYXJlIGFscmVhZHkgZG9pbmcgdGhpcy4gV2UgYXJlIHVzaW5nIHRoZSBmZXRjaCBkZWZpbmVkIGluIHRoZSBmb29kQ29sbGVjdGlvbiBtb2R1bGUgdG8gYWRkIGEgbmV3IGZvb2QgaXRlbSB0byB0aGUgQVBJLlxyXG4gICAgLy8gMi4gQWZ0ZXIgdGhlIG5ldyBpdGVtIGhhcyBiZWVuIGFkZGVkLCB3ZSB3YW50IHRvIGdldCBhIGxpc3Qgb2YgYWxsIHRoZSBmb29kIGl0ZW1zICh1c2luZyBhIEdFVCBIVFRQIHJlcXVlc3QpIGFuZCByZW5kZXIgdGhlbSB0byB0aGUgRE9NLlxyXG4gICAgLy8gQmVjYXVzZSB3ZSB3YW50IHRvIG1ha2Ugc3VyZSB3ZSBvbmx5IGRvIHRoaXMgYWZ0ZXIgdGhlIGZpcnN0IHN0ZXAgaXMgZG9uZSwgd2Ugd2lsbCByZXR1cm4gdGhlIGZldGNoIGNhbGwgdGhhdCBpcyBkb2luZyB0aGUgUE9TVCBhbmQgY2hhaW4gYSAudGhlbiB0byB0aGUgY2FsbCAoanVzdCBsaWtlIHdlIGRvIHdpdGggdGhlIEdFVCkuIFRoaXMgbWVhbnMgd2UgYXJlIGRvaW5nIHRoZSBQT1NUIGFuZCB0aGVuIHdhaXRpbmcgdW50aWwgYSByZXNwb25zZSBjb21lcyBiYWNrIGJlZm9yZSBkb2luZyB0aGlzIHN0ZXAuIFRoZSByZWFzb24gd2Ugd2FudCB0byB3YWl0IGlzIGJlY2F1c2Ugd2Ugd2FudCB0byBiZSBzdXJlIHRoYXQgd2hlbiB3ZSBhc2sgb3VyIEFQSSBmb3IgdGhlIGxpc3Qgb2YgZm9vZCBpdGVtcywgdGhlIG5ld2x5IGFkZGVkIGl0ZW0gaXMgb24gdGhhdCBsaXN0LiBTbyB3ZSB3YWl0IHVudGlsIGl0IGhhcyBiZWVuIGFkZGVkIGJlZm9yZSB1c2luZyBhIEdFVCByZXF1ZXN0IHRvIGdldCBhIGxpc3Qgb2YgYWxsIGZvb2QgaXRlbXMgYW5kIHJlbmRlcmluZyB0aGVtIHRvIHRoZSBET00uXHJcblxyXG4gICAgLy8gQnV0IHRoYXQgc291bmRzIGF3ZnVsbHkgZmFtaWxpYXI6IG1ha2UgYSBHRVQgSFRUUCByZXF1ZXN0IHRvIHRoZSBBUEkgZm9yIGEgbGlzdCBvZiBhbGwgZm9vZCBpdGVtcywgaXRlcmF0ZSBvdmVyIHRoYXQgbGlzdCBhbmQgYnVpbGQgdGhlIEhUTUwgZm9yIGVhY2ggaXRlbSwgYXBwZW5kIHRoZSBIVE1MIHRvIHRoZSBET00uIFRoaXMgaXMgZXhhY3RseSB3aGF0IG91ciBmcmlkZ2lmeSBtZXRob2QgaW4gb3VyIGZvb2RMaXN0IG1vZHVsZSBpcyBhbHJlYWR5IGRvaW5nLiBXaGljaCBtZWFucyBJIGNhbiBzaW1wbHkgY2FsbCB0aGF0IG1ldGhvZCBmcm9tIGhlcmUuIE9uY2UgYWdhaW4sIG5vdGUgdGhhdCBJIGFtIGltcG9ydGluZyB0aGUgYXBwcm9wcmlhdGUgbW9kdWxlIGF0IHRoZSB0b3Agb2YgdGhpcyBmaWxlLlxyXG4gICAgLy8gVG8gc3VtbWFyaXplLCB3ZSBhcmUgYWRkaW5nIGEgbmV3IGl0ZW0gdG8gdGhlIEFQSSwgdGhlbiBnZXR0aW5nIGFuIHVwZGF0ZWQgbGlzdCBvZiBpdGVtcyBmcm9tIHRoZSBBUEkgYW5kIHJlcmVuZGVyaW5nIHRoZSBET00uXHJcbiAgICAvLyAqKioqKioqKioqKioqKioqKioqXHJcbiAgICBmb29kQ29sbGVjdGlvbi5wb3N0TmV3Rm9vZChuZXdGb29kKVxyXG4gICAgICAudGhlbihyZXNwb25zZSA9PiAge1xyXG4gICAgICAgIGZvb2RMaXN0LmZyaWRnaWZ5KClcclxuICAgICAgICByZXR1cm4gcmVzcG9uc2VcclxuXHJcbiAgICAgIH0pXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmb29kRm9ybVxyXG4iLCIvLyBUaGlzIGNvbXBvbmVudCB3aWxsIGdldCB0aGUgZGF0YSwgYnVpbGQgdGhlIEhUTUwgZnJvbSB0aGUgZGF0YSBhbmQgYXBwZW5kIGl0IHRvIHRoZSBET00uXHJcblxyXG4vLyBUbyBnZXQgdGhlIGRhdGEsIHdlIHdpbGwgdXNlIHRoZSBmb29kQ29sbGVjdGlvbiBjb21wb25lbnQuXHJcbmltcG9ydCBmb29kQ29sbGVjdGlvbiBmcm9tIFwiLi9uZXdzQ29sbGVjdGlvblwiXHJcbi8vIFRvIGJ1aWxkIHRoZSBIVE1MIGZvciBlYWNoIG9iamVjdCBpbiB0aGUgYXJyYXkgb2YgZm9vZCh3aGljaCBpcyB3aGF0IHRoZSBkYXRhIGNvbWluZyBmcm9tIHRoZSBBUEkgYmVjb21lcyBvbmNlIHdlIHBhcnNlIGl0KSwgd2Ugd2lsbCB1c2UgdGhlIGZvb2QgY29tcG9uZW50LlxyXG5pbXBvcnQgZm9vZCBmcm9tIFwiLi9uZXdzXCJcclxuXHJcbmNvbnN0IGZvb2RMaXN0ID0ge1xyXG4gICAgZnJpZGdpZnkoKSB7XHJcbiAgICAgICAgLy8gMS4gR2V0IGRhdGFcclxuICAgICAgICAvLyBUaGUgZ2V0QWxsRm9vZHMgbWV0aG9kIHdpbGwgZG8gYSBmZXRjaCBhbmQgcmV0dXJuIGEgcHJvbWlzZS4gVGhpcyBjYWxsIHdpbGwgcmV0dXJuIHRoZSBkYXRhIGZyb20gdGhlIEFQSSBpbiB0aGUgcmVzcG9uc2UuXHJcbiAgICAgICAgZm9vZENvbGxlY3Rpb24uZ2V0QWxsRm9vZHMoKVxyXG4gICAgICAgICAgICAudGhlbihhbGxGb29kcyA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQW4gZW1wdHkgZG9jdW1lbnQgZnJhZ21lbnRcclxuICAgICAgICAgICAgICAgIGxldCBmb29kRG9jRnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAvLyAyLiBJdGVyYXRlIG92ZXIgZGF0YSBhbmQgYnVpbGQgSFRNTCBmb3IgZWFjaCBpdGVtXHJcbiAgICAgICAgICAgICAgICAvLyBXZSBsb29wIG92ZXIgdGhlIGFycmF5IG9mIG9iamVjdHMgcmV0dXJuZWQgZnJvbSBvdXIgQVBJIGFuZCBmb3IgZWFjaCBvYmVjdCwgd2UgbWFrZSBhIGNhbGwgdG8gdGhlIGZvb2RCdWlsZGVyIG1ldGhvZCBpbiB0aGUgZm9vZCBtb2R1bGUuIFRoaXMgbWV0aG9kIHRha2VzIGEgZm9vZCBvYmplY3QgYXMgYW4gYXJndW1lbnQgYW5kIHJldHVybnMgYW4gSFRNTCBjb21wb25lbnQuIE9uY2Ugd2UgaGF2ZSB0aGF0IEhUTUwsIHdlIGFwcGVuZCBpdCB0byBvdXIgZG9jdW1lbnQgZnJhZ21lbnQgc28gdGhhdCBpdCBpcyBzbG93bHkgYnVpbHQgdXAuIEJ5IHRoZSBlbmQgb2YgdGhlIGZvckVhY2ggbG9vcCwgb3VyIGRvY3VtZW50IGZyYWdtZW50IGNvbnRhaW5zIGFsbCB0aGUgSFRNTCBmb3IgYWxsIG91ciBkYXRhLlxyXG4gICAgICAgICAgICAgICAgYWxsRm9vZHMuZm9yRWFjaChmb29kSXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZvb2RIdG1sID0gZm9vZC5mb29kQnVpbGRlcihmb29kSXRlbSlcclxuICAgICAgICAgICAgICAgICAgICBmb29kRG9jRnJhZ21lbnQuYXBwZW5kQ2hpbGQoZm9vZEh0bWwpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIDMuIEFwcGVuZCB0aGUgSFRNTCB0byB0aGUgRE9NXHJcbiAgICAgICAgICAgICAgICAvLyBXZSBnZXQgYSByZWZlcmVuY2UgdG8gYSBIVE1MIGVsZW1lbnQgd2l0aCB0aGUgY2xhc3MgXCJvdXRwdXRcIiBhbmQgYXBwZW5kIG91ciBkb2N1bWVudCBmcmFnbWVudCB0byB0aGF0IGVsZW1lbnQuIEJlY2F1c2UgdGhlIEhUTUwgZWxlbWVudCB3aXRoIGNsYXNzIFwib3V0cHV0XCIgaXMgYWxyZWFkeSBvbiB0aGUgRE9NLCB0aGUgSFRNTCBpbiB0aGUgZG9jdW1lbnQgZnJhZ21lbnQgaXMgYXBwZW5kZWQgdG8gdGhlIERPTS5cclxuICAgICAgICAgICAgICAgIGxldCBvdXRwdXRBcnRpY2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vdXRwdXRfX25ld3NTZWN0aW9uMlwiKVxyXG5cclxuICAgICAgICAgICAgICAgIC8vVGhpcyB3aGlsZSBsb29wIGVzc2VudGlhbGx5IHJlbW92ZXMgYWxsIGNoaWxkIG5vZGVzIG9mIGFuIGVsZW1lbnQgdW50aWwgdGhlIGVsZW1lbnQgaGFzIG5vIGNoaWxkIG5vZGVzIGxlZnQuIEl0IGlzIGVxdWl2YWxlbnQgdG8gdGhlIGZvbGxvd2luZzpcclxuICAgICAgICAgICAgICAgIC8vIG91dHB1dEFydGljbGUuaW5uZXJIVE1MID0gXCJcIlxyXG5cclxuICAgICAgICAgICAgICAgIC8vIElmIHdlIGRvIG5vdCBkbyB0aGlzLCBlYWNoIHRpbWUgd2UgYWRkIGEgbmV3IGZvb2QgaXRlbSB1c2luZyBvdXIgZm9ybSwgYWxsIHRoZSBmb29kIGl0ZW1zIHdpbGwgYmUgYXBwZW5kZWQgdG8gdGhlIGJvdHRvbSBvZiBvdXIgbGlzdCBzbyB0aGF0IHdlIHdpbGwgaGF2ZSBkdXBsaWNhdGVzLiBUbyB1bmRlcnN0YW5kIHdoeSB0aGlzIHdoaWxlIGxvb3AgaXMgbmVlZGVkLCB0cnkgY29tbWVudGluZyBpdCBvdXQgYW5kIG9ic2VydmUgdGhlIGJlaGF2aW9yIG9mIHRoZSBhcHBsaWNhdGlvbi4gRXNzZW50aWFsbHksIHdlIGFyZSBjbGVhcmluZyBvdXQgb3VyIG91dHB1dCBjb250YWluZXIgKG91ciBhcnRpY2xlIHRhZyB3aXRoIGNsYXNzIFwib3V0cHV0XCIpIHNvIHRoYXQgd2UgcmVwb3B1bGF0ZSBpdC5cclxuICAgICAgICAgICAgICAgIHdoaWxlIChvdXRwdXRBcnRpY2xlLmZpcnN0Q2hpbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICBvdXRwdXRBcnRpY2xlLnJlbW92ZUNoaWxkKG91dHB1dEFydGljbGUuZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBvdXRwdXRBcnRpY2xlLmFwcGVuZENoaWxkKGZvb2REb2NGcmFnbWVudClcclxuXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZvb2RMaXN0XHJcbiJdfQ==
