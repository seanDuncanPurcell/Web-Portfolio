class Sleeve extends React.Component {
  constructor(props){
    super(props)
    const _firstKey = Object.keys(this.props.dataStatic.sleeve.options)[0]
    const {
      label, description, aptitudesMods, aptitudesMax,
      cost, durability, woundThreshold
    } = this.props.dataStatic.sleeve.options[_firstKey]
    this.fixed = this.props.dataStatic
    this.dynam = this.props.dataDynamic
    this.state = {
      onDisplay: _firstKey,
      sleeveOp: {
        label: label, description: description, aptitudesMods: aptitudesMods,
        aptitudesMax: aptitudesMax, cost: cost, durability: durability,
        woundThreshold: woundThreshold
      }
    }

    this.handleBackgroundCycle = this.handleBackgroundCycle.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleBonusSelect = this.handleBonusSelect.bind(this)
    this.ApptModDspySimple = this.ApptModDspySimple.bind(this)
    this.ApptChoiceChoice = this.ApptChoiceChoice.bind(this)
  }

  handleBackgroundCycle(int){
    const sleeveArray = Object.keys(this.fixed.sleeve.options)
    let position = sleeveArray.indexOf(this.state.onDisplay)
    if((position + int) < 0) position = sleeveArray.length - 1
    else if((position + int) > (sleeveArray.length - 1)) position = 0
    else position += int
    const {
      label, description, aptitudesMods, aptitudesMax,
      cost, durability, woundThreshold
    } = this.props.dataStatic.sleeve.options[sleeveArray[position]]
    this.setState({
      onDisplay: sleeveArray[position],
      sleeveOp: {
        label: label, description: description, aptitudesMods: aptitudesMods,
        aptitudesMax: aptitudesMax, cost: cost, durability: durability,
        woundThreshold: woundThreshold
      }
    });
  }

  handleBonusSelect(event, index){
    const value = event.target.value
    const sleeveOpChange = this.state.sleeveOp
    const mod = sleeveOpChange.aptitudesMods[index]
    const newObj = {apt: value, mod: mod}
    sleeveOpChange.aptitudesMods[index] = newObj
    this.setState({sleeveOp: sleeveOpChange})
  }

  handleSubmit(){
    let pass = true
    this.state.sleeveOp.aptitudesMods.forEach( option => {
      if( 'number' === (typeof option)) {
        window.alert(`You have to select an aptitude for each aptitude-bonus before buying a sleeve. -"YOU'RE KILLING ME SMALLS!!!" `)
        pass = false
        return
      }
    })
    if(!pass) return
    const key = this.state.onDisplay
    const {aptitudesMods, aptitudesMax, cost, durability, woundThreshold} = this.state.sleeveOp
    const data = {
      key: key,
      aptitudesMods: aptitudesMods,
      aptitudesMax: aptitudesMax,
      durability: durability,
      woundThreshold: woundThreshold
    }
    this.props.onSubmit(data)
    this.props.spendCP(cost)
  }

  ApptModDspySimple(props){
    return(
      <div style={{display: 'flex'}}>
        <strong>{' +' + props.value + ' to: '}</strong>
        <p>{props.aptType.toUpperCase()}</p>
      </div>
    )
  }

  ApptChoiceChoice(props){
    const apts = Object.keys(this.dynam.aptitudes)
    this.state.sleeveOp.aptitudesMods.forEach( option => {
      if(option.apt){
        apts.splice(apts.indexOf(option.apt), 1)
      }      
    })
    const srcKey = props.srcKey
    return(
      <div
        key={['apptChoice', srcKey].join('_')}
      >
        <strong>{`+${props.value} to:`}</strong>
        <select
          onChange={props.onChange}
        >          
          <option 
            key={['sleeve_aptbonusopts', 'Select_One', srcKey].join('_')}
          >
            Select One
          </option>
          {apts.map( (key, i) => {
            return(
              <option 
                key={['sleeve_aptbonusopts', key, i].join('_')}
                value={key}
              >
                {this.dynam.aptitudes[key].name}
              </option>
            )
          })}
        </select>
      </div>
    )
  }

  render(){
    const dsply = this.state.sleeveOp
    return(
      <section className='char-bckgrnd'>
        <h2>Select Your Starting Sleeve.</h2>

        {/* Control to cycal between main catagoris */}
        <span className='char-bckgrnd__main-selector'>
          <button onClick={()=>this.handleBackgroundCycle(-1)}>&lt;</button>

          {/* Catagory Title */}
          <p>{dsply.label}</p>
          <button onClick={()=>this.handleBackgroundCycle(1)}>&gt;</button>
        </span>

        {/* Description */}
        <p>{dsply.description}</p>

        {/* the cost of this sleeve */}
        <div style={{display: 'flex'}}>  
          <strong>Cost: </strong><p>{dsply.cost} Bonus Points</p>
        </div>

        {/* the cost of this sleeve */}
        <div style={{display: 'flex'}}>
          <strong>Durability: </strong><p>{dsply.durability}</p>
          <strong>Wound Threshold: </strong><p>{dsply.woundThreshold}</p>
        </div>

        {/* aptitude option selection */}
        <div style={{display: 'flex'}}>
          <strong>Note: </strong>
          <em>
            The height useful aptitude value for this sleeve is
            <strong>{dsply.aptitudesMax}</strong>            
            . While in this sleeve you will not be able to make use of a higher value. =(
          </em>
        </div>
        {dsply.aptitudesMods.map( (option, index) => {
          if('number' !== (typeof option)){
            return(
            <this.ApptModDspySimple
              aptType={option.apt}
              value={option.mod}
            />
            )
          }else {
            return(
              <this.ApptChoiceChoice
                srcKey={['ApptChoice', index].join('_')}
                value={option}
                onChange={event => this.handleBonusSelect(event, index)}
              />
            )
          }
        })}
        <button onClick={this.handleSubmit}>Buy This Sleeve</button>
      </section>
    )
  }
}

export default Sleeve;