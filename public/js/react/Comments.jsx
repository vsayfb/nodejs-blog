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
    <div>
      {!comments.length ? (
        <h3>There is no comment yet.</h3>
      ) : (
        <div>
          {comments.map((c) => (
            <div className="mt-2 border p-3" key={c._id}>
              <CommentCard origin={c.origin} text={c.text} commentId={c._id} />
              {currentUserId === c.origin._id ? (
                <RemoveCommentFromArticle
                  comment={c._id}
                  setComments={setComments}
                  comments={comments}
                />
              ) : null}
            </div>
          ))}
        </div>
      )}
      <AddCommentToArticle setComments={setComments} comments={comments} />
    </div>
  );
}

ReactDOM.render(<Comments />, document.getElementById("comments"));