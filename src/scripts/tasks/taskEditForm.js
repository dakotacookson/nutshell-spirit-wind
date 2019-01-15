import API from "../api"
import taskList from "./taskList"

const taskEditForm = {
  // This module will build an edit form and append it to the DOM. The form will contain input fields with existing values from the API and an Update button. The user can edit the the values in the input fields. An event listener on the Update button will handle taking the new values entered by the user and calling the API to update the data.
  createAndAppendForm (articleId, taskObjToEdit) {

    // Building the edit form with fields for the name, expiration and type of the food item. Each of the input fields contains the existing values from the database.
    let taskNameField = document.createElement("p")

    let taskNameLabel = document.createElement("label")
    taskNameLabel.textContent = "Task"
    let taskNameInput = document.createElement("input")
    taskNameInput.value = taskObjToEdit.title

    taskNameField.appendChild(taskNameLabel)
    taskNameField.appendChild(taskNameInput)

    let taskDueDateField = document.createElement("p")

    let taskDueDateLabel = document.createElement("label")
    taskDueDateLabel.textContent = "Due Date"
    let taskDueDateInput = document.createElement("input")
    taskDueDateInput.value = taskObjToEdit.dueDate

    taskDueDateField.appendChild(taskDueDateLabel)
    taskDueDateField.appendChild(taskDueDateInput)

    

    let updateButton = document.createElement("button")
    updateButton.textContent = "Update"

    // There is an event listener on the Update button which will take the new values in the input fields and build an object for the food item to be edited. Then we make a HTTP PUT request where we target the food item we want to edit by specifying the id in the URL. We also pass the object representing the food item with the new values as data in our HTTP request. Once again, because our data has been modified, we make an HTTP GET request to get all the food items and display them.
    updateButton.addEventListener("click", () => {
    const userId = sessionStorage.getItem("userId");
    const currentUserId = JSON.parse(userId);
      let editedTask = {
        title: taskNameInput.value,
        dueDate: taskDueDateInput.value,
        userId: currentUserId,
        complete: false
      }
      
      API.putExistingTask(taskObjToEdit.id, editedTask)
      .then(response => {
        taskList.listTasks();
      })

      while (taskItemArticle.firstChild) {
        taskItemArticle.removeChild(taskItemArticle.firstChild);
      }
      
    })

    // We passed in the id of the article so we know exactly where to append the edit form.
    let taskItemArticle = document.querySelector(`#${articleId}`)

    // Because we want to replace what is currently in the article element with the edit form, we clear out all children HTML elements in our targeted element before appending our edit form to it.
    while (taskItemArticle.firstChild) {
      taskItemArticle.removeChild(taskItemArticle.firstChild);
    }
    taskItemArticle.appendChild(taskNameField)
    taskItemArticle.appendChild(taskDueDateField)
    taskItemArticle.appendChild(updateButton)
  }
}
export default taskEditForm
