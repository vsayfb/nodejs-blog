function chooseTag(e) {
  const element = e.target.previousElementSibling;

  element.checked ? (element.checked = false) : (element.checked = true);
}
