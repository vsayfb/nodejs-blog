const e = React.createElement;

class CommentArea extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return e("div", {}, "Hello World");
  }
}

const domContainer = document.getElementById("comments");

ReactDOM.render(e(CommentArea), domContainer);
