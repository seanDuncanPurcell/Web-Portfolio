class UserMenu extends React.Component {
  constructor(props) {
    super(props);
    const {
      username,
      loggedin
    } = JSON.parse(sessionStorage.getItem('user'));
    this.state = {
      clicked: false,
      btns: [],
      userName: username,
      loggedin: loggedin
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleMenuOpen = this.handleMenuOpen.bind(this);
    this.UserLable = this.UserLable.bind(this);
  }

  handleClick() {
    if (this.state.clicked) {
      this.setState({
        btns: [],
        clicked: false
      });
    } else {
      this.handleMenuOpen();
      this.setState({
        clicked: true
      });
    }
  }

  handleMenuOpen() {
    if (this.state.loggedin) {
      this.setState({
        btns: [/*#__PURE__*/React.createElement("a", {
          key: "mlob",
          href: "/?out=true",
          className: "btn-lvl-one"
        }, "Log Out")]
      });
    } else {
      this.setState({
        btns: [/*#__PURE__*/React.createElement("a", {
          key: "mlib",
          href: "/login",
          className: "btn-lvl-one"
        }, "Log In"), /*#__PURE__*/React.createElement("a", {
          key: "mnub",
          href: "/register",
          className: "btn-lvl-one"
        }, "New Account")]
      });
    }
  }

  UserLable(props) {
    if (props.loggedin) return /*#__PURE__*/React.createElement("div", {
      id: "userName"
    }, this.state.userName);else return /*#__PURE__*/React.createElement(React.Fragment, null);
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      id: "user-menu"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: this.handleClick,
      className: "btn-case"
    }, /*#__PURE__*/React.createElement(this.UserLable, {
      loggedin: this.state.loggedin
    }), /*#__PURE__*/React.createElement("div", {
      className: "btn-lvl-one"
    }, /*#__PURE__*/React.createElement("svg", {
      width: "40",
      height: "40",
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/React.createElement("title", null, "user-icon"), /*#__PURE__*/React.createElement("path", {
      d: "M13 5c0-2.76-2.24-5-5-5S3 2.24 3 5c0 1.52.678 2.882 1.75 3.8C2.52 9.97 1 12.306 1 15c0 .552.448 1 1 1s1-.448 1-1c0-2.76 2.24-5 5-5s5 2.24 5 5c0 .552.448 1 1 1s1-.448 1-1c0-2.693-1.52-5.03-3.75-6.2C12.323 7.88 13 6.52 13 5zM8 8C6.343 8 5 6.657 5 5s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z",
      fill: "#FFF",
      fillRule: "evenodd"
    })))), this.state.btns);
  }

}

export default UserMenu;