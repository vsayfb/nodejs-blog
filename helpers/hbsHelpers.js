export default {
  toDate: (date) => new Date(date).toDateString(),
  isDefined: (value) => value != undefined,
  isNotDefined: (value) => value == undefined,
  generateHexCode: () =>
    "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0"),
  checkedIf: (tags, articleTags) => {
    let tagsHTML = "";

    function checkInput(articleTag) {
      tags.forEach((t) => {
        if (t._id.toString() === articleTag._id.toString()) {
          t.checked = true;
        }
      });
    }

    function checkArticleTags() {
      articleTags.forEach((tag) => checkInput(tag));
      return tags;
    }

    const renderTags = checkArticleTags();

    renderTags.forEach(
      (tag) =>
        (tagsHTML += `<input name="tags" value=${tag._id} type="checkbox" ${
          tag.checked ? "checked" : ""
        } /> <span onclick="chooseTag(event)">${tag.text}</span> `)
    );

    return tagsHTML;
  },
};
