function AddCommentToArticle({ setComments, comments }) {
  const [text, setText] = React.useState("");

  const addComment = async (e) => {
    e.preventDefault();

    try {
      if (text) {
        const data = { text, origin: currentUserId, article: currentArticleId };

        const result = await fetch("/comment/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const comment = await result.json();

        if (result.status === 201) setComments([comment, ...comments]);
        else alert(result.statusText);
      } else alert("Empty comment.");

      setText("");
    } catch (error) {
      alert("Unauthorized!");
    }
  };

  return (
    <form className="mt-3" onSubmit={addComment}>
      <textarea
        onChange={(e) => setText(e.target.value)}
        value={text}
        className="form-control"
      ></textarea>
      <button type="submit" className="btn btn-warning mt-3">
        Send
      </button>
    </form>
  );
}
