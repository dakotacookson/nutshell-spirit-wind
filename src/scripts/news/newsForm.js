import NewsCollection from "./newsCollection"
import NewsList from "./newsList"

const NewsForm = {

  // This module will build a form and append it to the DOM. The form will contain input fields for a user to add a new News to their refrigerator and a button with an event listener that will listen for the click
  createAndAppendForm() {
    // 1. Build HTML form
    let formHeader = document.createElement("h3")
    formHeader.textContent = "Your Spooky News "

    let NewsNameField = document.createElement("fieldset")

    let NewsNameLabel = document.createElement("label")
    NewsNameLabel.textContent = "Title"
    NewsNameLabel.setAttribute("for", "News__name")
    let NewsNameInput = document.createElement("input")
    NewsNameInput.setAttribute("id", "News__name")
    NewsNameInput.setAttribute("name", "News__name")

    NewsNameField.appendChild(NewsNameLabel)
    NewsNameField.appendChild(NewsNameInput)

    let NewsExpirationField = document.createElement("fieldset")

    let NewsExpirationLabel = document.createElement("label")
    NewsExpirationLabel.textContent = "Summary"
    NewsExpirationLabel.setAttribute("for", "News__expiration")
    let NewsExpirationInput = document.createElement("input")
    NewsExpirationInput.setAttribute("id", "News__expiration")
    NewsExpirationInput.setAttribute("name", "News__expiration")

    NewsExpirationField.appendChild(NewsExpirationLabel)
    NewsExpirationField.appendChild(NewsExpirationInput)

    let NewsTypeField = document.createElement("fieldset")

    let NewsTypeLabel = document.createElement("label")
    NewsTypeLabel.textContent = "URL"
    NewsTypeLabel.setAttribute("for", "News__type")
    let NewsTypeInput = document.createElement("input")
    NewsTypeInput.setAttribute("id", "News__type")
    NewsTypeInput.setAttribute("name", "News__type")


    NewsTypeField.appendChild(NewsTypeLabel)
    NewsTypeField.appendChild(NewsTypeInput)

    let submitButton = document.createElement("button")
    submitButton.textContent = "Add Article"
    submitButton.setAttribute("class", "News__save")

    // 2. Attach event listener to button in form
    submitButton.addEventListener("click", this.handleAddNewNews)

    // 3. Append the HTML form to the DOM
    //Notice that I have added an article element to my index.html with the class "form".
    let NewsFormFragment = document.createDocumentFragment()
    NewsFormFragment.appendChild(formHeader)
    NewsFormFragment.appendChild(NewsNameField)
    NewsFormFragment.appendChild(NewsExpirationField)
    NewsFormFragment.appendChild(NewsTypeField)
    NewsFormFragment.appendChild(submitButton)

    let formArticle = document.querySelector(".output__news")
    formArticle.appendChild(NewsFormFragment)

  },
  handleAddNewNews() {
    let inputNewsName = document.querySelector("#News__name").value
    let inputNewsExpiration = document.querySelector("#News__expiration").value
    let inputNewsType = document.querySelector("#News__type").value

    let newNews = {
      name: inputNewsName,
      expiration: inputNewsExpiration,
      type: inputNewsType
    }

    NewsCollection.postNewNews(newNews)
      .then(response =>  {
        NewsList.fridgify()
        return response

      })
  }
}

export default NewsForm
