import CharacterSheet from './components/CharacterSheet.js';

class App extends React.Component {
  constructor(params) {
    super(params);
    this.pages = ['characterSheet', 'characerOverView', 'DMView'];
    this.state = {
      page: this.pages[0]
    };
  }

  render() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(CharacterSheet, null));
  }

}

export default App;