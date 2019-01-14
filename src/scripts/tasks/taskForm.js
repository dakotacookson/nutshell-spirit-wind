import API from "../api"


const taskFormTaskInput = document.createElement("input");
const taskFormDueDateInput = document.createElement("input");


const taskForm = {
    taskFormBuilder() {
        const taskArticle = document.querySelector(".output__tasks");
        const taskFormSection = document.createElement("section");
        taskArticle.appendChild(taskFormSection);
        // Task Form Header
        const taskFormHeader = document.createElement("h3");
        taskFormSection.appendChild(taskFormHeader);
        taskFormHeader.textContent = "Tasks";
        // Task Form Input Fields
        // const taskFormTaskInput = document.createElement("input");
        taskFormSection.appendChild(taskFormTaskInput);
        taskFormTaskInput.placeholder = "Task";

        // const taskFormDueDateInput = document.createElement("input");
        taskFormSection.appendChild(taskFormDueDateInput);
        taskFormDueDateInput.placeholder = "Due Date";
        // Task Form Add Task Button
        const addTaskButton = document.createElement("button");
        taskFormSection.appendChild(addTaskButton);
        addTaskButton.textContent = "Add Task";
        // EventListener for Button Click
        addTaskButton.addEventListener("click", this.addTaskToJSON);
    },

    addTaskToJSON() {
        console.log("Button Works");
        const taskTitle = taskFormTaskInput.value;
        const taskDueDate = taskFormDueDateInput.value;
        console.log(`${taskTitle} ${taskDueDate}`);

        const currentUserId = sessionStorage.getItem("userId");
        const userId = JSON.parse(currentUserId);

        let newTask = {
            name: taskTitle,
            dueDate: taskDueDate,
            complete: false,
            userId: userId
        }

        console.log(newTask);

        API.postNewData("tasks",newTask);

    }
    
}

export default taskForm