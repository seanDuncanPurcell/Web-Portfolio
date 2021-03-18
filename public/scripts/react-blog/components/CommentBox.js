const useState = React.useState;

function userSessionData() {
  return JSON.parse(sessionStorage.getItem('user'));
}

function CmtOrReply(props) {
  const [txtCont, setTxtCont] = useState();
  const [relpy, setReply] = useState(false);

  function handleReply() {
    if (relpy) setReply(false);else setReply(true);
  }

  const user = userSessionData();

  function handleTxt(evt) {
    const val = evt.target.value;
    setTxtCont(val);
  }

  function handleSubmit(props, id) {
    const cmtObj = {
      text: txtCont,
      pointer: props.pointer
    };
    let url = '/api/blog-comments';
    if (id) url += `?id=${id}`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cmtObj)
    });
    setTxtCont('');
    setReply(false);
    props.onSubmit();
  }

  if (relpy) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      className: "Comment-box__Sub-controls"
    }, /*#__PURE__*/React.createElement("button", null, "Like"), /*#__PURE__*/React.createElement("p", null, "\u2022"), /*#__PURE__*/React.createElement("button", {
      onClick: handleReply
    }, "Reply")), /*#__PURE__*/React.createElement("h3", null, user.username), /*#__PURE__*/React.createElement("span", {
      className: "comment_text-area"
    }, /*#__PURE__*/React.createElement("textarea", {
      placeholder: "Write a comment...",
      value: txtCont,
      onChange: handleTxt
    }), /*#__PURE__*/React.createElement("button", {
      onClick: evt => {
        handleSubmit(props);
      }
    }, "Send")));
  } else {
    return /*#__PURE__*/React.createElement("span", {
      className: "Comment-box__Sub-controls"
    }, /*#__PURE__*/React.createElement("button", null, "Like"), /*#__PURE__*/React.createElement("p", null, "\u2022"), /*#__PURE__*/React.createElement("button", {
      onClick: handleReply
    }, "Reply"));
  }
}

function CommentMainComp(props) {
  const level = props.level;
  const comments = props.array;
  const onSubmit = props.onSubmit;

  if (comments.length > 0) {
    return /*#__PURE__*/React.createElement("div", null, comments.map((item, i) => {
      const myKey = props.srcKey + '_level-' + level + '_item-' + i;
      return /*#__PURE__*/React.createElement("div", {
        className: "Comment-box__Main",
        key: myKey
      }, /*#__PURE__*/React.createElement("div", {
        className: "img-frame"
      }, /*#__PURE__*/React.createElement("img", {
        src: "/img/icon-svg/Black/user-icon.svg",
        alt: "User Image"
      })), /*#__PURE__*/React.createElement("div", {
        className: "Comment-box__post-img"
      }, /*#__PURE__*/React.createElement("div", {
        className: "Comment-box__Sub-content"
      }, /*#__PURE__*/React.createElement("h3", null, item.authorID), /*#__PURE__*/React.createElement("p", null, item.text)), /*#__PURE__*/React.createElement(CmtOrReply, {
        pointer: item._id,
        onSubmit: onSubmit
      }), /*#__PURE__*/React.createElement(CommentMainComp, {
        level: level + 1,
        array: item.comments,
        srcKey: myKey
      })));
    }));
  } else {
    return /*#__PURE__*/React.createElement(React.Fragment, null);
  }
}

class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reply: false,
      comments: []
    };
    this.handleComment = this.handleComment.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    try {
      const query = location.search;
      const urlQuery = new URLSearchParams(query);
      const id = urlQuery.get('id');
      const url = `/api/blog-comments?id=${id}`;
      const responce = await fetch(url);
      const commentsObj = await responce.json();
      this.setState({
        comments: commentsObj
      });
    } catch (error) {
      console.warn(error);
    }
  }

  handleComment() {
    if (this.state.reply) this.setState({
      reply: false
    });else this.setState({
      reply: true
    });
  }

  async handleSubmit() {
    const query = location.search;
    const urlQuery = new URLSearchParams(query);
    const id = urlQuery.get('id');
    const url = `/api/blog-comments?id=${id}`;
    const responce = await fetch(url);
    const commentsObj = await responce.json();
    this.setState({
      comments: commentsObj,
      reply: false
    });
  }

  render() {
    const array = this.state.comments;
    const query = location.search;
    const urlQuery = new URLSearchParams(query);
    const pointer = urlQuery.get('id');
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      className: "Comment-box__Controls"
    }, /*#__PURE__*/React.createElement("button", null, "Like"), /*#__PURE__*/React.createElement("button", {
      onClick: this.handleComment
    }, "Leave A Commment")), /*#__PURE__*/React.createElement(CmtOrReply, {
      show: this.state.reply,
      pointer: pointer,
      onSubmit: this.handleSubmit
    }), /*#__PURE__*/React.createElement(CommentMainComp, {
      level: 1,
      array: array,
      srcKey: 'cmnt-blck',
      onSubmit: this.handleSubmit
    }));
  }

}

export default CommentBox;