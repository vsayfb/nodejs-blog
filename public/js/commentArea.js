const e = React.createElement;

var authorId = document.getElementById("userId").value;

var articleId = document.getElementById("articleId").value;

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = { comments: [] };
  }

  fetchComments() {
    return new Promise((resolve, reject) => {
      const xhttp = new XMLHttpRequest();

      xhttp.open("GET", "/comment/articleComments");

      xhttp.setRequestHeader("article", articleId);

      xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
          if (this.status === 200) {
            return resolve(JSON.parse(this.response));
          }
        }
      };

      xhttp.send();
    });
  }
  componentDidMount() {
    (async () => {
      const comments = await this.fetchComments();

      console.log(comments);

      this.setState((prev) => ({ ...prev, comments }));
    })();
  }

  render() {
    const { comments } = this.state;

    let setState = this.setState.bind(this);

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
                  className: "p-2 border mt-3",
                  key: c._id,
                },
                e("div", null, c.author.displayName),
                e(
                  "p",
                  {
                    className: "m-0 mt-2",
                  },
                  c.text
                ),
                authorId === c.author._id
                  ? e(RemoveComment, {
                      removeComment: setState,
                      comment: c._id,
                    })
                  : null
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
            value: authorId,
          },
          null
        ),
        e(
          "input",
          {
            type: "hidden",
            name: "article",
            value: articleId,
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

class RemoveComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  remove() {
    const { removeComment, comment } = this.props;

    const xhttp = new XMLHttpRequest();

    xhttp.open("DELETE", "/comment");

    xhttp.setRequestHeader("comment", comment);

    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4) {
        if (xhttp.status === 200) {
          removeComment((prev) => {
            return {
              ...prev,
              comments: prev.comments.filter((c) => c._id !== comment),
            };
          });
        } else {
          this.setState((prev) => {
            return { ...prev, error: xhttp.responseText };
          });

          setTimeout(() => {
            this.setState((prev) => {
              return { ...prev, error: null };
            });
          }, 3000);
        }
      }
    };

    xhttp.send();
  }

  render() {
    return e(
      "div",
      {},
      this.state.error
        ? e("div", { className: "text-danger mb-2" }, this.state.error)
        : null,
      e(
        "button",
        { className: "btn btn-danger", onClick: () => this.remove() },
        "Delete"
      )
    );
  }
}

const domContainer = document.getElementById("comments");

ReactDOM.render(e(Comments), domContainer);
