const Buttons = props => props.btns.map(btn => {
  /*#__PURE__*/
  React.createElement("a", {
    href: btn.href
  }, btn.name);
});

getUser = () => JSON.parse(sessionStorage.getItem('user'));

class UserMenu extends React.Component {
  constructor(props) {
    super(props);
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.state = {
      clicked: false,
      btns: []
    };
    this.user = {};
    this.handleClick = this.handleClick.bind(this);
    this.handleMenuOpen = this.handleMenuOpen.bind(this);
  }

  handleClick() {
    this.user = getUser();

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
    if (this.user.loggedin) {
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

  render() {
    return /*#__PURE__*/React.createElement("div", {
      id: "user-menu"
    }, /*#__PURE__*/React.createElement("button", {
      className: "btn-lvl-one",
      onClick: this.handleClick
    }, /*#__PURE__*/React.createElement("img", {
      src: `http://${location.host}/img/icon-svg/white/user-icon.svg`,
      alt: "User Menu Icon"
    })), this.state.btns);
  }

}

ReactDOM.render( /*#__PURE__*/React.createElement(UserMenu, null), document.getElementById('header-right'));