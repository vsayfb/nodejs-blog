const e = React.createElement;

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = { comments: [] };
  }

  render() {
    const { comments } = this.state;

    console.log(comments);

    return e(
      "div",
      {},
      comments.length
        ? e(
            "div",
            {},
            comments.map(function (c) {
              return e(
                "div",
                {
                  className: "p-2 border",
                  key: c._id,
                },
                e("div", null, c.author.displayName),
                e(
                  "p",
                  {
                    className: "m-0 mt-2",
                  },
                  c.text
                )
              );
            })
          )
        : e("h3", {}, "There is no comment yet"),
      e(AddComment, {
        comments: this.state.comments,
        pushComment: this.setState.bind(this),
      })
    );
  }
}

class AddComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  handleError = (err) => {
    this.setState({ ...this.state, error: err });

    setTimeout(() => {
      this.setState({ ...this.state, error: null });
    }, 3000);
  };

  addComment = async (e) => {
    const { pushComment } = this.props;

    e.preventDefault();

    const data = new FormData(e.target);

    const xhttp = new XMLHttpRequest();

    xhttp.open("post", "/comment");

    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4) {
        if (xhttp.status === 201) {
          pushComment((prevState) => {
            return {
              ...prevState,
              comments: [...prevState.comments, JSON.parse(xhttp.responseText)],
            };
          });
        } else {
          this.handleError(xhttp.responseText);
        }
      }
    };

    xhttp.send(data);
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
            name: "author",
            value: document.getElementById("userId").value,
          },
          null
        ),
        e(
          "input",
          {
            type: "hidden",
            name: "article",
            value: document.getElementById("articleId").value,
          },
          null
        ),
        this.state.error
          ? e("div", { className: "text-danger" }, this.state.error)
          : null,
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

const domContainer = document.getElementById("comments");

ReactDOM.render(e(Comments), domContainer);
