function signUp(e) {
  const inputs = e.target.querySelectorAll("input");

  e.preventDefault();
  const xhttp = new XMLHttpRequest();

  xhttp.open("POST", "/user/signUp", true);

  xhttp.onreadystatechange = function () {
    console.log(this.status);

    if (this.readyState === 4 && this.status === 400) {
      return inputs.forEach((inp) => {
        if (this.response.indexOf(inp.attributes[2].value) >= 0) {
          let inpType = inp.type;
          inp.type = "text";
          inp.style.border = "1px solid red";
          inp.placeholder = this.response;

          setTimeout(() => {
            if (inpType === "password") inp.type = "password";
            inp.style.border = "1px solid #ced4da";
            inp.placeholder = "";
          }, 3000);
        }
      });
    }
    if (this.status === 201) window.location = "/";
  };

  xhttp.send(new FormData(e.target));
}
