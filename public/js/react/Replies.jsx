function Replies({ setRepliesVisibility, origin, text, commentId }) {
  const [mainComment, setMainComment] = React.useState({
    origin,
    text,
    commentId,
  });

  const [commentReplies, setCommentsReplies] = React.useState([]);

  const fetchReplies = async (commentId) => {
    const result = await fetch("/reply/repliesComment", {
      headers: { comment: commentId },
    });

    const json = await result.json();

    setCommentsReplies(json);
  };

  React.useEffect(() => {
    fetchReplies(mainComment.commentId);
  }, [mainComment]);

  return (
    <div>
      <RepliesComment
        setRepliesVisibility={setRepliesVisibility}
        origin={mainComment.origin}
        text={mainComment.text}
        commentId={mainComment.commentId}
        setMainComment={setMainComment}
        replies={commentReplies}
        setReplies={setCommentsReplies}
      >
        {commentReplies.length ? (
          commentReplies.map((r) => (
            <div>
              {r.origin ? (
                <ReplyCard
                  key={r._id}
                  setMainComment={setMainComment}
                  origin={r.origin}
                  text={r.text}
                  commentId={r._id}
                />
              ) : null}
              {r.origin._id === currentUserId && (
                <RemoveReplyFromComment
                  replies={commentReplies}
                  setReplies={setCommentsReplies}
                  replyId={r._id}
                />
              )}
            </div>
          ))
        ) : (
          <h1>No reply.</h1>
        )}
      </RepliesComment>
    </div>
  );
}
