function login(e) {
  e.preventDefault();

  const xhttp = new XMLHttpRequest();

  xhttp.open("POST", "/user/login");

  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) window.location = "/";
      else alert(this.responseText);
    }
  };

  xhttp.send(new FormData(e.target));
}
