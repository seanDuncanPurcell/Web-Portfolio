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
    }, /*#__PURE__*/React.createElement("svg", {
      width: "40",
      height: "40",
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/React.createElement("title", null, "menu-icon"), /*#__PURE__*/React.createElement("path", {
      d: "M1 14h14c.552 0 1-.448 1-1s-.448-1-1-1H1c-.552 0-1 .448-1 1s.448 1 1 1zm0-5h14c.552 0 1-.448 1-1s-.448-1-1-1H1c-.552 0-1 .448-1 1s.448 1 1 1zm0-5h14c.552 0 1-.448 1-1s-.448-1-1-1H1c-.552 0-1 .448-1 1s.448 1 1 1z",
      fill: "#FFF",
      "fill-rule": "evenodd"
    }))), this.state.btns);
  }

}

ReactDOM.render( /*#__PURE__*/React.createElement(NavMenu, null), document.getElementById('header-left'));