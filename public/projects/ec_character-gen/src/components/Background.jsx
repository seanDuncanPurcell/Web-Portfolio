import React,{Component} from 'react';

class Background extends Component {
  constructor(props){
    super(props)
    const _options = Object.assign({}, this.props.form).options
    
    this.fixed = Object.assign({}, this.props.dataStatic) 
    this.form = Object.assign({}, this.props.form)
    this.state = {
      onDisplay: Object.keys(_options)[0],
      bckgrndOp: _options[Object.keys(_options)[0]]
    }

    this.handleBackgroundCycle = this.handleBackgroundCycle.bind(this)
    this.handleSubSkill = this.handleSubSkill.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleMultipleChoice = this.handleMultipleChoice.bind(this)
    this.TemplateSkill = this.TemplateSkill.bind(this)
    this.MultipleChoice = this.MultipleChoice.bind(this)
  }

  handleBackgroundCycle(int){
    const bgArray = Object.keys(this.props.form.options)
    let position = bgArray.indexOf(this.state.onDisplay)
    if((position + int) < 0) position = bgArray.length - 1
    else if((position + int) > (bgArray.length - 1)) position = 0
    else position += int
    this.setState({
      onDisplay: bgArray[position],
      bckgrndOp: this.props.form.options[bgArray[position]]
    });
  }

  handleSubSkill(event, index){
    const value = event.target.value 
    const data = this.state.bckgrndOp
    data.skillMod[index].selection = value
    this.setState({bckgrndOp: data})
  }

  handleMultipleChoice(event, index){
    const value = event.target.value
    if(value === 'SelectOne') return
    const newData = this.state.bckgrndOp
    const newType = (this.fixed.skills[value].options) ? 'templateSkill' : 'singleSkill'

    newData.skillMod[index].type = newType
    newData.skillMod[index].skillKey = value
    newData.skillMod[index].subSkillKey = this.fixed.skills[value].options
    if(this.fixed.skills[value].options)
      newData.skillMod[index].selection = this.fixed.skills[value].options[0]

    this.setState({bckgrndOp: newData})
  }

  handleSubmit(){
    const key = this.state.onDisplay
    const {skillMod, creditMod, moxieMod, rep, traits} = this.state.bckgrndOp
    const data = {
      key: key,
      skillMod: skillMod,
      creditMod: creditMod,
      moxie: moxieMod,
      rep: rep,
      traits: traits
    }
    this.props.onSelection(data)
  }

  TemplateSkill(props){
    const skillOption = props.skillOption
    const index = props.index
    const fixedSkill = props.fixedSkill
    const skillBonus = props.skillBonus
    const key = skillOption.skillKey
    
    if(skillOption.subSkillKey.length > 1){
      return (
        <span 
          className='char-bckgrnd__skill-line'
          key={['skill', key, skillOption.subSkillKey[0]].join('_')}
        >
          <strong>
            {fixedSkill.label}: 
            <select onChange={ event => this.handleSubSkill(event, index) }>
              {skillOption.subSkillKey.map( subKey => {
                return (
                  <option value={subKey} key={['subSkill', key, subKey].join('_')} >
                    {subKey}
                  </option>
                )
              })}
            </select>
          </strong>
          <p> + {skillBonus}</p>
        </span>
      )  
    }else{
      return (
        <span 
          className='char-bckgrnd__skill-line'
          key={[skillOption.type, key].join('_')}
        >
          <div>
            <strong>{fixedSkill.label}: </strong>
            <em> {skillOption.subSkillKey[0]}</em>
          </div>
          <p> + {skillBonus}</p>
        </span>
      )  

    }
  }

  MultipleChoice(props){
    const skillBonus = props.skillBouns
    const skillOptions = props.skillOptions
    const index = props.index
    return (
      <span 
        className='char-bckgrnd__skill-line'
        key={['MultipleChoice', skillOptions.join('_')].join('_')}
      >
        <strong>Select A Skill:</strong>
        <select onChange={event => this.handleMultipleChoice(event, index)}>
          <option value='SelectOne'>Select One</option>
          {skillOptions.map( 
            option => <option value={option} key={['option', option, index].join('_')} >{option}</option> 
          )}
        </select>
        <p> + {skillBonus}</p>
      </span>
    )
  }

  render(){
    const dsply = this.state.bckgrndOp
    const fixedSkills = this.fixed.skills
    return(
      <section className='char-bckgrnd'>
        <h2>{this.form.label}</h2>

        {/* Control to cycal between main catagoris */}
        <span className='char-bckgrnd__main-selector'>
          <button onClick={()=>this.handleBackgroundCycle(-1)}>&lt;</button>

          {/* Catagory Title */}
          <p>{dsply.label}</p>
          <button onClick={()=>this.handleBackgroundCycle(1)}>&gt;</button>
        </span>

        {/* Description */}
        <p>{dsply.description}</p>

        {/* Skill Section with options */}
        {dsply.skillMod.map( (skillOption, index) => {
          const skillBonus = skillOption.mod

          //if this option has multiple skills
          if(skillOption.type === 'multiple'){
            return (
              <this.MultipleChoice 
                skillBouns={skillBonus}
                skillOptions={skillOption.skillKey}
                index={index}
                key={['over-skill', 'multi-choice', index].join('_')}
              />
            )
          
          //if this option has one skill with sub skills
          }else if(skillOption.type === 'templateSkill'){
            return (
              <this.TemplateSkill
                skillOption={skillOption}
                index={index}
                fixedSkill={fixedSkills[skillOption.skillKey]}
                skillBonus={skillBonus}
                key={['over-skill', 'templateSkill', index].join('_')}
              />
            )

          //if this option has one skill
          }else{
            const fixedSkill = this.fixed.skills[skillOption.skillKey]
            return (
              <span 
                className='char-bckgrnd__skill-line'
                key={['skill', skillOption.skillKey].join('_')}
              >
                <strong>{fixedSkill.label}:</strong>
                <p> + {skillBonus}</p>
              </span>
            )
          }
        })} 
        
        {/* Starting Creds */}       
        <span 
          className='char-bckgrnd__skill-line'
        >
          <strong>Addtional Credits:</strong>
          <p>{dsply.creditMod}</p>
        </span>

        {/* Moxie */}  
        <span 
          className='char-bckgrnd__skill-line'
        >
          <strong>Addtional Moxie:</strong>
          <p>{dsply.moxieMod}</p>
        </span>

        {/* Trait Section with options */}
        {/* Rep Section with options */}
        {/* Apply Backgound */}
        <button onClick={this.handleSubmit}>Apply This Backgound</button>
      </section>
    )
  }
}

export default Background;