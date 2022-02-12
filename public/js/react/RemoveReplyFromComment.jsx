function RemoveReplyFromComment({ replyId, replies, setReplies }) {
  const removeReply = async (commentId) => {
    await fetch("/reply/", {
      method: "DELETE",
      headers: {
        reply: commentId,
      },
    });

    const filter = replies.filter((r) => r._id !== replyId);

    setReplies(filter);
  };

  return (
    <button
      onClick={() => removeReply(replyId)}
      className="btn btn-danger mt-2"
    >
      Delete
    </button>
  );
}
