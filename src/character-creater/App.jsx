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
  constructor(props){
    super(props)
    this.pages = [
      'characterSheet',
      'characerDisplay',
      'DMView'
    ];
    this.state = { page: this.pages[0] }
    const _char = this.props.myCharacter
    this.myCharacter = {}
    this.myCharacter.characterData = (_char) ? _char.characterData : dynamicData
    this.myCharacter.playData = (_char) ? _char.playData : undefined
    console.log(this.myCharacter)

    this.handleUpLift = this.handleUpLift.bind(this)
    this.handleDataClear = this.handleDataClear.bind(this)
    this.handleDataUpdate = this.handleDataUpdate.bind(this)
    this.handlePgNav  = this.handlePgNav.bind(this)
    this.PageViewer = this.PageViewer.bind(this)
    this.ControlPannel = this.ControlPannel.bind(this)
  }

  handleUpLift(data, key){
    const newState = this.state
    newState[key] = data
    this.setState(newState)
  }

  handleDataUpdate(data, key){
    this.myCharacter[key] = data
    const jsonData = JSON.stringify(this.myCharacter)
    localStorage.setItem('myCharacter', jsonData)
  }

  handleDataClear(){
    localStorage.removeItem('myCharacter')
    location.reload()
  }

  handlePgNav(i){
    this.setState({page: this.pages[i]})
  }

  ControlPannel(){
    return(
      <nav className='Top-level__Ctrl-panl'>
        <div>            
          <button 
            className='Top-level__Nav-btn'
            onClick={()=>this.handlePgNav(1)}
          >Character Viewer</button>
          <button 
            className='Top-level__Nav-btn'
            onClick={()=>this.handlePgNav(0)}
          >Character Editor</button>
        </div>
        <button className='Top-level__Danger-btn' onClick={this.handleDataClear}>CLEAR ALL DATA</button>
      </nav>
    )
  }

  PageViewer(){
    if(this.state.page === 'characerDisplay'){
      return(
        <>
          <CharacterDisplay
            handleDataUpdate={(data)=>this.handleDataUpdate(data, 'playData')}
            playTemplate={this.myCharacter.playData}
            characterData={this.myCharacter.characterData}
            dataStatic={this.props.dataStatic}
            handleUpLift={this.handleUpLift}
          />
        </>
      )
    }else if(this.state.page === 'characterSheet'){
      return(
        <>
          <CharacterSheet
            handleDataUpdate={(data)=>this.handleDataUpdate(data, 'characterData')}
            characterTemplate={this.myCharacter.characterData}
            dataStatic={this.props.dataStatic}
            handleUpLift={this.handleUpLift}
          />
        </>
      )
    }
  }

  render(){
    return(
      <>
        <this.ControlPannel />
        <this.PageViewer />
      </>
    )
  }
}

export default App;
