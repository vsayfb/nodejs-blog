function ReplyCard({ origin, text, commentId, setMainComment }) {
  function addToLS(obj) {
    localStorage.setItem("requests", JSON.stringify(obj));
  }

  const set = () => {
    const request = JSON.parse(localStorage.getItem("requests"));

    setMainComment((prev) => {
      request ? addToLS([...request, prev]) : addToLS([prev]);

      return {
        origin,
        text,
        commentId,
      };
    });
  };

  return (
    <div style={{ cursor: "pointer" }} onClick={set}>
      <div className="comment">
        <h3 className="text-success">{origin.displayName}</h3>

        <p className="m-0 mt-2">{text}</p>
      </div>
      <button className="btn btn-success">Reply</button>
    </div>
  );
}
