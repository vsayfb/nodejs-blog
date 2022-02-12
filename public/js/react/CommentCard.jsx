function CommentCard({ origin, text, commentId }) {
  const [repliesVisibility, setRepliesVisibility] = React.useState(false);

  return (
    <div style={{ cursor: "pointer" }}>
      <div className="comment" onClick={() => setRepliesVisibility(true)}>
        <h3 className="text-success">{origin.displayName}</h3>

        <p className="m-0 mt-2">{text}</p>

        {repliesVisibility ? (
          <Replies
            setRepliesVisibility={setRepliesVisibility}
            origin={origin}
            text={text}
            commentId={commentId}
          />
        ) : null}
      </div>
      <button
        onClick={() => setRepliesVisibility(true)}
        className="btn btn-success"
      >
        Reply
      </button>
    </div>
  );
}
