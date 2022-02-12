function ReplyToComment({ target, origin, comment, replies, setReplies }) {
  const [text, setText] = React.useState();

  const sendReply = async (e) => {
    e.preventDefault();

    if (!text) alert("Empty reply");
    else {
      const result = await fetch("/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, target, origin, comment }),
      });

      const reply = await result.json();

      setReplies([reply, ...replies]);
    }
  };

  return (
    <div>
      <label htmlFor="form-label">Send to reply</label>
      <form onSubmit={sendReply}>
        <textarea
          onChange={(e) => setText(e.target.value)}
          className="form-control"
        ></textarea>

        <button className="btn btn-success mt-3">Send</button>
      </form>
    </div>
  );
}
