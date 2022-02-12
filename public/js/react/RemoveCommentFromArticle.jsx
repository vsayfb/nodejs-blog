function RemoveCommentFromArticle({ comment, comments, setComments }) {
  const removeComment = async (commentId) => {
    await fetch("/comment/", {
      method: "DELETE",
      headers: {
        comment: commentId,
      },
    });

    const filter = comments.filter((c) => c._id !== commentId);

    setComments(filter);
  };

  return (
    <button
      onClick={() => removeComment(comment)}
      className="btn btn-danger mt-2"
    >
      Delete
    </button>
  );
}
