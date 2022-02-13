let currentUserId = document.getElementById("userId").value;
let currentArticleId = document.getElementById("articleId").value;

function Comments() {
  const [comments, setComments] = React.useState([]);

  const fetchComments = async () => {
    const result = await fetch("/comment/articleComments", {
      method: "GET",
      headers: {
        article: window.location.pathname.split("/")[2],
      },
    });
    const comments = await result.json();

    setComments(comments);
  };

  React.useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="comment-area">
      <h3 className="comment-area-title">Comments</h3>

      {!comments.length ? (
        <React.Fragment>
          <h3 className="none">There is no comment yet.</h3>
          <AddCommentToArticle setComments={setComments} comments={comments} />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <AddCommentToArticle setComments={setComments} comments={comments} />

          {comments.map((c) => (
            <div key={c._id} className="comment-relative">
              <CommentCard
                origin={c.origin}
                text={c.text}
                commentId={c._id}
                createdAt={c.createdAt}
              />
              {currentUserId === c.origin._id ? (
                <RemoveCommentFromArticle
                  comment={c._id}
                  setComments={setComments}
                  comments={comments}
                />
              ) : null}
            </div>
          ))}
        </React.Fragment>
      )}
    </div>
  );
}

ReactDOM.render(<Comments />, document.getElementById("comments"));
