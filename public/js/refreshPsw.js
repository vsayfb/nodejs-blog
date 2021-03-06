async function sendRequest(e) {
  e.preventDefault();

  const result = await fetch("/user/refreshPassword", {
    method: "PUT",
    body: new FormData(e.target),
  });

  if (result.status == 200) window.location = await result.text();
  else alert(await result.text());
}

async function handleSubmit(e) {
  e.preventDefault();

  const params = new URL(document.location).searchParams;

  const code = params.get("code");

  const user = params.get("user");

  const result = await fetch(`/user/checkCode`, {
    headers: { code, user },
    method: "POST",
    body: new FormData(e.target),
  });
  if (result.status == 200) window.location = await result.text();
  else alert(await result.text());
}

async function newPassword(e) {
  e.preventDefault();

  const params = new URL(document.location).searchParams;

  const code = params.get("code");

  const user = params.get("user");

  const result = await fetch(`/user/newPassword`, {
    headers: { code, user },
    method: "PATCH",
    body: new FormData(e.target),
  });
  if (result.status == 200) window.location = "/logout";
  else alert(await result.text());
}
async function forgotPassword(e) {
  e.preventDefault();
  const email = e.target.querySelector("input[name=email]").value;

  if (!email) alert("Please enter an email.");
  else {
    const response = await fetch(`/user/forgotPassword?email=${email}`, {
      method: "GET",
    });

    const result = await response.text();
    if (response.status == 200) window.location = `${result}`;
    else alert(result);
  }
}
