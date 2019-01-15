import API from "../api"
import tasks from "./tasks"

const taskList = {
    listTasks() {
        API.getData("tasks")
        .then(allTasks => {
            allTasks.forEach(task => {
                const userId = sessionStorage.getItem("userId");
                const currentUserId = JSON.parse(userId);
                if (task.userId === currentUserId) {
                    tasks.taskBuilder(task);
                }
            });
        }) 
    }

}

export default taskList