import API from "../api"
import taskEditForm from "./taskEditForm"
import taskList from "./taskList";

const tasks = {
  taskBuilder(taskObj) {
    const taskArticle = document.querySelector(".output__tasks")
    const taskName = document.createElement("h4");
    const taskDueDate = document.createElement("p");
    const taskCheckBox = document.createElement("input");
    taskCheckBox.type = "checkbox";
    const taskOutputSection = document.createElement("article");
    taskOutputSection.setAttribute("id", `task--${taskObj.id}`)
    taskArticle.appendChild(taskOutputSection);
    
    taskOutputSection.appendChild(taskName);
    taskOutputSection.appendChild(taskDueDate);
    taskOutputSection.appendChild(taskCheckBox);
    
    taskDueDate.textContent = taskObj.dueDate;
    taskName.textContent = taskObj.title;
    
    const taskEditButton = document.createElement("button");
    taskOutputSection.appendChild(taskEditButton);
    taskEditButton.textContent = "Edit";
    taskEditButton.addEventListener("click", () => {
      let articleId = event.target.parentNode.id;
      let taskId = articleId.split("--")[1];
      API.getTask(taskId)
      .then(response => {
        taskEditForm.createAndAppendForm(articleId, response)
      })
    })


    const taskDeleteButton = document.createElement("button");
    taskOutputSection.appendChild(taskDeleteButton);
    taskDeleteButton.textContent = "Delete";
    taskDeleteButton.addEventListener("click", () => {
      let articleId = event.target.parentNode.id;
      let taskId = event.target.parentNode.id.split("--")[1]
      API.deleteTask(taskId)
      .then(response => {
        taskList.listTasks();
      })
      let taskItemArticle = document.querySelector(`#${articleId}`);

      while (taskItemArticle.firstChild) {
        taskItemArticle.removeChild(taskItemArticle.firstChild);
      }

      
    })
  }
}

export default tasks