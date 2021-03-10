import CharacterSheet from './components/CharacterSheet.js'
import CharacterDisplay from './components/CharacterDisplay.js'

const dynamicData = {
  playerName: '',
  characterName: '',
  subjectiveAge: '',
  objectiveAge: '',
  aptitudes: {
    cog: {name: 'Cognition', abbreviation: 'COG', value: 5, morphBonus: 0, total: 5},
    coo: {name: 'Coordination', abbreviation: 'COO', value: 5, morphBonus: 0, total: 5},
    int: {name: 'Intuition', abbreviation: 'INT', value: 5, morphBonus: 0, total: 5},
    ref: {name: 'Reflexes', abbreviation: 'REF', value: 5, morphBonus: 0, total: 5},
    sav: {name: 'Savvy', abbreviation: 'SAV', value: 5, morphBonus: 0, total: 5},
    som: {name: 'Somatics', abbreviation: 'SOM', value: 5, morphBonus: 0, total: 5},
    wil: {name: 'Willpower', abbreviation: 'WIL', value: 5, morphBonus: 0, total: 5}    
  },
  moxie: 0,
  credit: 0,
  rep: 0,
  sleeve: {
    key: 'falts',
    aptitudesMods: [],
    aptitudesMax: 20,
    durability: 30,
    woundThreshold: 6
  },
  background: {
    key: '',
    skillMod: '',
    creditMod: 0,
    moxie: 0,
    rep: 0,
    traits: 0
  },
  faction: {
    key: '',
    skillMod: '',
    creditMod: 0,
    moxieMod: 0,
    rep: {
      at: 0, c: 0,
      e: 0, f: 0,
      g: 0, i: 0,
      r: 0
    },
    traits: 0
  },
  skills: {
  },
  cp: {
    aptitudes: 35,
    skillsActive: 0,
    skillsKnowledge: 0,
    overFlow: 0,
    traits: 0,
    moxie: 0,
    credit: 0,
    rep: 0,
    sleeve: 0
  }
}


class App extends React.Component {
  constructor(params){
    super(params)
    this.pages = [
      'characterSheet',
      'characerDisplay',
      'DMView'
    ];
    this.state = { page: this.pages[1] }
    this.characterData = dynamicData

    this.handleUpLift = this.handleUpLift.bind(this)
    this.handleCharacterUpdate = this.handleCharacterUpdate.bind(this)
  }

  handleUpLift(data, key){
    const newState = this.state
    newState[key] = data
    this.setState(newState)
  }

  handleCharacterUpdate(data){
    this.characterData = data
  }

  render(){
    if(this.state.page === 'characerDisplay'){
      return(
        <>
          <CharacterDisplay
            characterData={this.characterData}
            dataStatic={this.props.dataStatic}
            handleUpLift={this.handleUpLift}
          />
        </>
      )
    }else if(this.state.page === 'characterSheet'){
      return(
        <>
          <CharacterSheet
            handleCharacterUpdate={this.handleCharacterUpdate}
            characterTemplate={this.characterData}
            dataStatic={this.props.dataStatic}
            handleUpLift={this.handleUpLift}
          />
        </>
      )
    }
  }
}

export default App;
