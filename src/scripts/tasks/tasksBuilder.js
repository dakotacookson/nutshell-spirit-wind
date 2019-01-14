import API from "../api"
import tasks from "./tasks/"
const tasksContainer = document.querySelector(".output__tasks")
const tasksArticle = document.createElement("article")
tasksContainer.appendChild(tasksArticle);
const addButton = document.createElement("button")
const taskAddButton = document.createElement("button");
const yup = {
    taskBuilder(taskObject) {
        // const tasksArticle = document.createElement("article");
        // tasksContainer.appendChild(tasksArticle);
        const taskTitle = document.createElement("h2");
        tasksArticle.appendChild(taskTitle);
        taskTitle.textContent = taskObject.title
        const taskDueDate = document.createElement("p");
        tasksArticle.appendChild(taskDueDate);
        taskDueDate.textContent = taskObject.dueDate;
        this.addTaskButton();
        

    },
    addTaskButton() {
        // const addButton = document.createElement("button")
        addButton.textContent = "Add Task";
        tasksArticle.appendChild(addButton);
        addButton.addEventListener("click", this.createAddTaskForm)
    },

    createAddTaskForm() {
        // const taskAddButton = document.createElement("button");
        tasksArticle.appendChild(taskAddButton);
        taskAddButton.textContent = "Add";
        const taskTitleInput = document.createElement("input");
        const taskDueDateInput = document.createElement("input");
        taskAddButton.setAttribute("id", "theRightButton")
        const theRightButton = document.getElementById("theRightButton");
        taskTitleInput.placeholder = "New Task";
        taskDueDateInput.placeholder = "Due By";
        tasksArticle.appendChild(taskTitleInput);
        tasksArticle.appendChild(taskDueDateInput);
        addButton.style.display = "none";
        theRightButton.addEventListener("click",() => {
            const taskTitleValue = taskTitleInput.value;
            const taskDueDateValue = taskDueDateInput.value;
            const currentUserId = sessionStorage.getItem("userId");
            const userId = JSON.parse(currentUserId);
            
            let newTaskToSave = {
                title: taskTitleValue,
                dueDate: taskDueDateValue,
                complete: false,
                userId: userId
            }

            API.postNewData("tasks",newTaskToSave)

            taskTitleInput.style.display = "none";
            taskDueDateInput.style.display = "none";
            theRightButton.style.display = "none";
            addButton.style.display = "block";

            tasks.getTasks();

            
        })
        

    },

    addTaskToList() {
        
        
    }
}

export default yup