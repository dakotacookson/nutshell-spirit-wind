import login from "./login"
import registrationForm from "./register";
// import tasks from "./tasks/tasks"
import taskForm from "./tasks/taskForm";
import taskList from "./tasks/taskList";




login.createAndAppendLoginInput();

registrationForm.createAndAppendRegistrationForm();

taskForm.taskFormBuilder();
taskList.listTasks();

// tasks.getTasks();
