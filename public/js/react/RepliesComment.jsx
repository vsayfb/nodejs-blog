function RepliesComment({
  setRepliesVisibility,
  setMainComment,
  origin,
  text,
  replies,
  setReplies,
  commentId,
  children,
}) {
  const requests = JSON.parse(localStorage.getItem("requests"));

  const escape = (e) => {
    e.key === "Escape" ? setRepliesVisibility(false) : null;
    localStorage.removeItem("requests");
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
        position: "absolute",
        left: "0",
        top: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backdropFilter: "blur(5px)",
        height: "100vh",
        width: "100vw",
      }}
    >
      {requests && requests[0] ? (
        <button className="btn btn-primary" onClick={setPreviousComments}>
          Back
        </button>
      ) : null}
      <div style={{ width: "50%" }}>
        <div className="p-3" style={{ border: "1px solid orangered" }}>
          <h3 className="text-success">{origin.displayName}</h3>
          <p className="m-0 mt-2">{text}</p>
        </div>
        <ReplyToComment
          target={origin._id}
          // global variable
          origin={currentUserId}
          replies={replies}
          setReplies={setReplies}
          comment={commentId}
        />
        {children}
      </div>
    </div>
  );
}
