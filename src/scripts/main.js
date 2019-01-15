import login from "./login"
import registrationForm from "./register";
login.createAndAppendLoginInput();
registrationForm.createAndAppendRegistrationForm();
import NewsList from "./news/newsList"
import NewsForm from "./news/newsForm"
NewsList.fridgify()
NewsForm.createAndAppendForm()
let formArticle2 = document.querySelector(".output__news")
let userIdtytpe = sessionStorage.getItem('userId');
if (userIdtytpe >= 1) {
  formArticle2.className = "output__news3"
}