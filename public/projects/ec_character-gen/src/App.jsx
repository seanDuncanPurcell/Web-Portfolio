import './App.css';
import React,{Component} from 'react';
import CharacterSheet from './components/CharacterSheet.jsx';

class App extends Component {
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
