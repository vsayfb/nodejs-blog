export default (tagsField) => {
  // if the article does not have a tag, it will return undefined
  let tags = tagsField ? tagsField : [];

  /* if there is one tag the tags field inside the form is a string type
  but in the db it is a array type.*/
  if (!Array.isArray(tags)) Array.of(tags);

  return tags;
};
