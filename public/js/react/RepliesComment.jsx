function RepliesComment({
  setRepliesVisibility,
  mainComment,
  setMainComment,
  replies,
  setReplies,
  children,
}) {
  const requests = JSON.parse(localStorage.getItem("requests"));

  const escape = (e) => {
    if (e.key === "Escape") {
      setRepliesVisibility(false);
      localStorage.removeItem("requests");
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", escape, false);
  }, []);

  const setPreviousComments = () => {
    // Any previous comments?
    if (requests && requests[0]) {
      setMainComment(requests[requests.length - 1]);

      const condition = requests[requests.length - 1].commentId;

      const filtered = requests.filter((r) => r.commentId !== condition);

      localStorage.setItem("requests", JSON.stringify(filtered));
    } else {
      localStorage.removeItem("requests");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        left: "0",
        top: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backdropFilter: "blur(5px)",
        height: "100vh",
        width: "100vw",
        overflowY: "auto",
      }}
    >
      {requests && requests[0] ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          className="bi bi-arrow-left"
          onClick={setPreviousComments}
          style={{ position: "absolute", left: "20%" }}
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
          />
        </svg>
      ) : null}
      <div style={{ width: "50%", position: "absolute", top: "120px" }}>
        <div className="comment">
          <div className="comment-user">
            <h5>{mainComment.origin.displayName}</h5>
          </div>

          <div className="comment-text">
            <p>{mainComment.text}</p>
          </div>
          <div className="comment-date" style={{ cursor: "default" }}>
            {new Date().toDateString(mainComment.createdAt)}
          </div>
        </div>
        <ReplyToComment
          target={origin._id}
          // global variable
          origin={currentUserId}
          replies={replies}
          setReplies={setReplies}
          comment={mainComment.commentId}
        />
        {children}
      </div>
    </div>
  );
}
