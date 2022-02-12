function CommentCard({ origin, text, commentId, createdAt }) {
  const [repliesVisibility, setRepliesVisibility] = React.useState(false);

  return (
    <div
      className="comment"
      style={{ cursor: "pointer" }}
      onClick={() => setRepliesVisibility(true)}
    >
      <div className="comment-user">
        <h5>{origin.displayName}</h5>
      </div>

      <div className="comment-text">
        <p>{text}</p>
      </div>
      <div className="comment-date" style={{ cursor: "default" }}>
        {new Date().toDateString(createdAt)}
      </div>
      {repliesVisibility ? (
        <Replies
          setRepliesVisibility={setRepliesVisibility}
          origin={origin}
          text={text}
          commentId={commentId}
        />
      ) : null}

      <div className="comment-event-reply">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => setRepliesVisibility(true)}
          width="16"
          height="16"
          fill="#f33221"
          className="bi bi-chat"
          viewBox="0 0 16 16"
        >
          <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
        </svg>
      </div>
    </div>
  );
}
