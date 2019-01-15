import NewsCollection from "./newsCollection"
import NewsList from "./newsList"
import login from "../login"
const NewsEditForm = {
  createAndAppendForm(articleId, NewsObjToEdit) {

    let NewsNameField = document.createElement("p")

    let NewsNameLabel = document.createElement("label")
    NewsNameLabel.textContent = "Title"
    let NewsNameInput = document.createElement("input")
    NewsNameInput.value = NewsObjToEdit.name

    NewsNameField.appendChild(NewsNameLabel)
    NewsNameField.appendChild(NewsNameInput)

    let NewsExpirationField = document.createElement("p")

    let NewsExpirationLabel = document.createElement("label")
    NewsExpirationLabel.textContent = "Summary"
    let NewsExpirationInput = document.createElement("input")
    NewsExpirationInput.value = NewsObjToEdit.expiration

    NewsExpirationField.appendChild(NewsExpirationLabel)
    NewsExpirationField.appendChild(NewsExpirationInput)

    let NewsTypeField = document.createElement("p")

    let NewsTypeLabel = document.createElement("label")
    NewsTypeLabel.textContent = "URL"
    let NewsTypeInput = document.createElement("input")
    NewsTypeInput.value = NewsObjToEdit.type
    NewsTypeField.appendChild(NewsTypeLabel)
    NewsTypeField.appendChild(NewsTypeInput)

    let updateButton = document.createElement("button")
    updateButton.textContent = "Update"
    let userIdtytpe = sessionStorage.getItem('userId');
    updateButton.addEventListener("click", () => {
      let editedNews = {
        name: NewsNameInput.value,
        expiration: NewsExpirationInput.value,
        type: NewsTypeInput.value,
        userId: userIdtytpe
      }

      NewsCollection.putExistingNews(NewsObjToEdit.id, editedNews)
        .then(response => {
          NewsList.fridgify()
          return response
        })
    })

    let NewsItemArticle = document.querySelector(`#${articleId}`)

    while (NewsItemArticle.firstChild) {
      NewsItemArticle.removeChild(NewsItemArticle.firstChild);
    }
    NewsItemArticle.appendChild(NewsNameField)
    NewsItemArticle.appendChild(NewsExpirationField)
    NewsItemArticle.appendChild(NewsTypeField)
    NewsItemArticle.appendChild(updateButton)
  }
}
export default NewsEditForm
