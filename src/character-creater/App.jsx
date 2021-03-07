import CharacterSheet from './components/CharacterSheet.js';

class App extends React.Component {
  constructor(params){
    super(params)
    this.pages = [
      'characterSheet',
      'characerOverView',
      'DMView'
    ];
    this.state = {page: this.pages[0]};
  }

  render(){
    return(
      <>
        <CharacterSheet/>
      </>
    )
  }
}

export default App;
