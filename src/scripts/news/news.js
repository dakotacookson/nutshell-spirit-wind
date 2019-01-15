import NewsCollection from "./newsCollection"
import NewsList from "./newsList"
import NewsEditForm from "./newsEditForm"
import login from "../login"


const News = {

  NewsBuilder(NewsObject) {
    let NewsArticle = document.createElement("article")
    NewsArticle.setAttribute("id", `News--${NewsObject.id}`)

    let NewsName = document.createElement("h3")
    NewsName.textContent = NewsObject.name

    let NewsExp = document.createElement("p")
    NewsExp.textContent = NewsObject.expiration

    let NewsType = document.createElement("a")
    let NewsType2 = NewsObject.type
    NewsType.textContent = NewsType2
    NewsType.setAttribute("href", `${NewsType2}`)
    let editNewsButton = document.createElement("button")
    editNewsButton.textContent = "Edit"
    editNewsButton.addEventListener("click", () => {
      let articleId = event.target.parentNode.id
      let NewsId = articleId.split("--")[1]
      NewsCollection.getNews(NewsId)
        .then(response => {
          NewsEditForm.createAndAppendForm(articleId, response)
        })
    })
    let deleteNewsButton = document.createElement("button")
    deleteNewsButton.textContent = "Delete"
    deleteNewsButton.addEventListener("click", () => {
      let NewsId = event.target.parentNode.id.split("--")[1]
      NewsCollection.deleteNews(NewsId)
        .then(response => {
          NewsList.fridgify()
          return response
        })
    })



    NewsArticle.appendChild(NewsName)
    NewsArticle.appendChild(NewsExp)
    NewsArticle.appendChild(NewsType)
    NewsArticle.appendChild(editNewsButton)
    NewsArticle.appendChild(deleteNewsButton)

    return NewsArticle
}
}  


export default News
