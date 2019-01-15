
const NewsCollection = {
    getAllNewss() {
        return fetch("http://localhost:8088/News")
            .then(response => response.json())
    },


    postNewNews(newNewsToSave) {
        return fetch("http://localhost:8088/News", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newNewsToSave)
        })
    },
    deleteNews(NewsId) {
        return fetch(`http://localhost:8088/News/${NewsId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
    },
    getNews(NewsId) {
        return fetch(`http://localhost:8088/News/${NewsId}`)
            .then(response => response.json())
    },
    putExistingNews(NewsId, NewsToEdit) {
        return fetch(`http://localhost:8088/News/${NewsId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(NewsToEdit)
        })
    }
}
console.table(NewsCollection.getAllNewss())

export default NewsCollection
