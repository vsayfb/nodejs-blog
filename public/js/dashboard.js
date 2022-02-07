function deleteArticle(_id) {
  const articlesTable = document.getElementById("articles");

  const articles = articlesTable.querySelectorAll("tr");

  const xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", `/article/${_id}`);
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      articles.forEach((article) => {
        const articleId = this.responseText.replace(/"/g, "");

        if (article.getAttribute("data-id") === articleId) {
          article.remove();
        }
      });
    }
  };
  xhttp.send();
}
