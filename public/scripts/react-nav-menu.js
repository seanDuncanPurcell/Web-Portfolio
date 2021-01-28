class NavMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      btns: []
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.user = getUser();

    if (this.state.clicked) {
      this.setState({
        btns: [],
        clicked: false
      });
    } else {
      this.setState({
        btns: [/*#__PURE__*/React.createElement("a", {
          key: "nmhb",
          href: "/",
          className: "btn-lvl-one"
        }, "HOME"), /*#__PURE__*/React.createElement("a", {
          key: "nmbib",
          href: "/bio",
          className: "btn-lvl-one"
        }, "About Dev"), /*#__PURE__*/React.createElement("a", {
          key: "nmblb",
          href: "/blog",
          className: "btn-lvl-one"
        }, "Alcodeimy Blog"), /*#__PURE__*/React.createElement("a", {
          key: "nmpb",
          href: "/projects",
          className: "btn-lvl-one"
        }, "Projects")],
        clicked: true
      });
    }
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      id: "nav-menu"
    }, /*#__PURE__*/React.createElement("button", {
      className: "btn-lvl-one",
      onClick: this.handleClick
    }, /*#__PURE__*/React.createElement("img", {
      src: `${location.origin}/img/icon-svg/white/menu-icon.svg`,
      alt: "Navigation Menu Icon"
    })), this.state.btns);
  }

}

ReactDOM.render( /*#__PURE__*/React.createElement(NavMenu, null), document.getElementById('header-left'));