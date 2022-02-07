function addArticle(e) {
  e.preventDefault();
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/article/new");
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 201) {
        window.location = `/article/${this.responseText.replace(/"/g, "")}`;
      } else alert(this.responseText);
    }
  };
  xhttp.send(new FormData(e.target));
}
