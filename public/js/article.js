const setCookie = (name, value, days = 7, path = "/") => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie =
    name + "=" + value + "; expires=" + expires + "; path=" + path;
};

const getCookie = (name) => {
  return document.cookie.split("; ").reduce((r, v) => {
    const parts = v.split("=");
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, "");
};

let cookieName = "userHistory";

let url = window.location.pathname.split("/")[2];

let day = 3600;

function checkPageVisited(history, page) {
  if (history.indexOf(page) >= 0) return true;
  return false;
}

if (!getCookie(cookieName)) {
  setCookie(cookieName, JSON.stringify([url]), day);
} else {
  const history = JSON.parse(getCookie("userHistory"));

  const visited = checkPageVisited(history, url);

  if (!visited) setCookie(cookieName, JSON.stringify([...history, url]), day);
}
