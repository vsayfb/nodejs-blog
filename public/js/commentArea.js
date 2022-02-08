const e = React.createElement;

class AddComment extends React.Component {
  constructor(props) {
    super(props);
  }

  addComment = (e) => {
    e.preventDefault();
    console.log(e.target);
  };

  render() {
    return e(
      "div",
      { className: "mt-4" },
      e(
        "form",
        {
          onSubmit: this.addComment,
        },
        e(
          "label",
          { className: "form-label", htmlFor: "text" },
          "Your comment."
        ),
        e(
          "input",
          {
            type: "hidden",
            name: "user",
            value: document.getElementById("userId").value,
          },
          null
        ),
        e("textarea", {
          className: "form-control",
          name: "text",
        }),
        e(
          "button",
          { type: "submit", className: "btn btn-warning mt-3" },
          "Comment"
        )
      )
    );
  }
}

class Comments extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return e(
      "div",
      {
        className: "comment p-3 border",
      },
      e("div", null, " vsay "),
      e("p", { className: "m-0 mt-1" }, "Example comment. ")
    );
  }
}

class CommentArea extends React.Component {
  constructor(props) {
    super(props);
  }

  addComment = () => {
    alert("hi");
  };

  render() {
    return e("div", {}, e(Comments), e(AddComment));
  }
}

const domContainer = document.getElementById("comments");

ReactDOM.render(e(CommentArea), domContainer);
