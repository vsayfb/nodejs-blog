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

      setText("");
    }
  };

  return (
    <form className="comment-form" onSubmit={sendReply}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>

      <button className="yellow-button">Send</button>
    </form>
  );
}
