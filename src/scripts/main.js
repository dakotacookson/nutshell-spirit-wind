import messagesList from "./messages/messagesList"
import messagesForm from "./messages/messagesForm"
import taskForm from "./tasks/taskForm"
import taskList from "./tasks/taskList"
import login from "./login"
import registrationForm from "./register"
import logout from "./logout"
import friendsList from "./friends/friendsList"

if (sessionStorage.userId === undefined) {
  login.createAndAppendLoginInput();
  registrationForm.createAndAppendRegistrationForm();
  console.log(sessionStorage.userId)
} 
if (sessionStorage.userId >= 1) {
  logout.createAndAppendLogout();
  console.log(sessionStorage.userId)
  messagesList.postMessage();
  messagesForm.createAndAppendForm();
  friendsList.getFriendsList()
  taskForm.taskFormBuilder();
  taskList.listTasks();

}
