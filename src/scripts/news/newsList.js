import NewsCollection from "./newsCollection"
import News from "./news"

const NewsList = {
    fridgify() {
        NewsCollection.getAllNewss()
            .then(allNewss => {

                let NewsDocFragment = document.createDocumentFragment()

                allNewss.forEach(NewsItem => {
                    let NewsHtml = News.NewsBuilder(NewsItem)
                    NewsDocFragment.appendChild(NewsHtml)
                })

                let outputArticle = document.querySelector(".output__newsSection2")



                while (outputArticle.firstChild) {
                    outputArticle.removeChild(outputArticle.firstChild);
                }
                outputArticle.appendChild(NewsDocFragment)

            })
    }
}

export default NewsList
