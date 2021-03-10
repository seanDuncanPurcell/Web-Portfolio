function AtributeDisplay (props) {
  const aptitudes = props.characterData.aptitudes
  const sleeveMax = props.characterData.sleeve.aptitudesMax
  return(
    <section className='Char-dsply__Apt-dsply'>
      <div className='Char-dsply__Apt-column'>
        <strong>Aptitude</strong>
        <p>Total Aptitude</p>
        <p>3 x Aptitude</p>
      </div>
        { Object.keys(aptitudes).map( aptKey => {
          const aptitude = aptitudes[aptKey]
          const total = (aptitude.total < sleeveMax) ? aptitude.total : sleeveMax
          return (
            <div className='Char-dsply__Apt-column'>
              <strong>{aptitude.abbreviation}</strong>
              <p>{total}</p>
              <p>{total * 3}</p>
            </div>
          )
        })}
    </section>
  )
}

function SimpleSkill(props){
  const characterData = props.characterData
  const fixedSkill = props.fixedSkill
  const skillKey = props.skillKey
  const specialMod = props.specialMod
  const rank = props.rank

  const aptMod = (()=>{
    const aptitude = characterData.aptitudes[fixedSkill.aptitudeKey].total
    const morphMax = characterData.sleeve.aptitudesMax
    return (aptitude > morphMax) ? morphMax : aptitude
  })()

  const total = rank + aptMod + specialMod
  const lmtCheck = mod => {
    if((total + mod) >= 99) return 99
    if((total + mod) <= 0) return 0
    return total + mod
  }
  return (
    <label 
      className='skill_row'
      key={['skill', skillKey].join('_')}
    >
      <p className='skill_text'>{fixedSkill.label}</p>
      <p className='skill_cell' >{lmtCheck(10)}</p>
      <p className='skill_cell skill_Main' >{total}</p>
      <p className='skill_cell' >{lmtCheck(-10)}</p>
      <p className='skill_cell' >{lmtCheck(-20)}</p>
      <p className='skill_cell' >{lmtCheck(-30)}</p>
    </label>
  )      
}

function TemplateSkill(props){
  const characterData = props.characterData
  const fixedSkill = props.fixedSkill
  const skillKey = props.skillKey

  const subSkills = fixedSkill.options.filter( _key => {
    let charSubSkills = characterData.skills[skillKey]
    if(charSubSkills){
      charSubSkills = charSubSkills[_key]
      if(charSubSkills >= 0) return true
    }
    return false
  })
  
  return (
    <>
      <label 
        className='skill_row'
        key={['template-skill', skillKey, 'label'].join('_')}
      >
        <div className='skill_template-label' >
          <p className='skill_text'>{fixedSkill.label}:</p>
        </div>
        <p className='skill_cell' >{fixedSkill.aptitudeKey.toUpperCase()}</p>
        <p className='skill_cell' />
        <p className='skill_cell' />
        <p className='skill_cell' />
        <p className='skill_cell' />
      </label>
      {subSkills.map( subSkillKey => {
        const fixedSubSkill = {label: `${fixedSkill.label}: ${subSkillKey}`, aptitudeKey:fixedSkill.aptitudeKey}
        const rank = characterData.skills[skillKey][subSkillKey]

        const specialMod = (()=>{          
          const backgroundSkillData = (()=>{
            const bgOptions = characterData.background.skillMod
            for(let i = 0; i < bgOptions.length; i++ ){
              if(bgOptions[i].selection === subSkillKey){
                return bgOptions[i].mod
              }
            }
            return 0
          })()
          const factionSkillData = (()=>{
            const factionOptions = characterData.faction.skillMod
            for(let i = 0; i < factionOptions.length; i++ ){
              if(factionOptions[i].selection === subSkillKey){
                return factionOptions[i].mod
              }
            }
            return 0
          })()
          return backgroundSkillData + factionSkillData
        })()

        return(
          <SimpleSkill
            fixedSkill={fixedSubSkill}
            skillKey={skillKey}
            characterData={characterData}
            specialMod={specialMod}
            rank={rank}
            key={['overComp', 'simple-skill', skillKey].join('_')}
          />
        )          
      })}
    </>
  )

}

function SkillDisplay (props) {
  const fixedSkills = props.fixedSkills
  const characterData = props.characterData
  const charSkills = characterData.skills
  console.log(charSkills)
  return(
    <section className='Char-dsply__Skill-dsply skill_block'>
      <label 
        className='skill_row skill_header'          
        key={['over-skill', 'header'].join('_')}
      >
        <p className='skill_text' >Skill Name</p>
        <p className='skill_cell' >+10</p>
        <p className='skill_cell' >Normal</p>
        <p className='skill_cell' >-10</p>
        <p className='skill_cell' >-20</p>
        <p className='skill_cell' >-30</p>
      </label>
      <div className='skill_scroll-block'>
        { Object.keys(fixedSkills).map( skillKey => {
          const fixedSkill = fixedSkills[skillKey]
          const specialMod = (()=>{
            let total = 0
            const bgOptions = characterData.background.skillMod
            for(let i = 0; i < bgOptions.length; i++ ){
              if(bgOptions[i].skillKey === skillKey){
                total += bgOptions[i].mod
              }
            }
            const facOptions = characterData.faction.skillMod
            for(let i = 0; i < facOptions.length; i++ ){
              if(facOptions[i].skillKey === skillKey){
                total += facOptions[i].mod
              }
            }
            return total
          })()
          if(fixedSkill.options){
            return(
              <TemplateSkill
                fixedSkill={fixedSkill}
                skillKey={skillKey}
                characterData={characterData}
                key={['overComp', 'templet-skill', skillKey].join('_')}
              />
            )
          }else{
            let rank = (characterData.skills[skillKey]) ? characterData.skills[skillKey] : 0
            Object.keys(charSkills).forEach(option=>{
              if( option === skillKey) rank = charSkills[option]
            })
            return (
              <SimpleSkill
                fixedSkill={fixedSkill}
                skillKey={skillKey}
                characterData={characterData}
                specialMod={specialMod}
                rank={rank}
                key={['overComp', 'simple-skill', skillKey].join('_')}
              />
            )
          }
        })}
      </div>
    </section>
  )
}

function ProfileDisplay (props) {
  const plyName = props.characterData.playerName
  const charName = props.characterData.characterName
  const subAge = props.characterData.subjectiveAge
  const ObAge = props.characterData.objectiveAge
  return(
    <div className='Char-dsply__Profile'>
      <p><strong>Player Name: </strong>{plyName}</p>
      <p><strong>Character Name: </strong>{charName}</p>
      <p><strong>Subjective Age: </strong>{subAge}</p>
      <p><strong>Objective Age: </strong>{ObAge}</p>
    </div>
  )
}

function HealthTracking (props) {
  const sleeve = props.characterData.sleeve
  const will = props.characterData.aptitudes.wil.total
  return(
    <>
    <h3 className='Char-dsply__Health__Head'>Health Tracking</h3>
    <section className='Char-dsply__Health'>
      <div><strong>Armor (Energy/Kenetic)</strong><input type="text"/></div>
      <div><strong>Durability</strong><p>{sleeve.durability}</p></div>
      <div><strong>Damage: </strong><input type="text"/></div>
      <div><strong>Wound Threshold</strong><p>{sleeve.durability / 5 }</p></div>
      <div><strong>Wounds: </strong><input type="number" step='1'/></div>
      <div><strong>Lucidity</strong><p>{will * 2}</p></div>
      <div><strong>Stress</strong><input type="text"/></div>
      <div><strong>Trauma Threshold</strong><p>{Math.ceil(will / 2)}</p></div>
      <div><strong>Mental Trauma: </strong><input type="number" step='1'/></div>
    </section>
    </>
  )
}

function WeaponsDisplay (props) {
  return(
    <div className='Char-dsply__Wpt-Dsply'>
      <span className='Char-dsply__Wpt-Head'>
        <p>Weapon</p>
        <p>Skill</p>
        <p>AP</p>
        <p>DV</p>
        <p>Modes</p>
        <p>Ammo</p>
        <p>Range</p>
        <p>Notes:</p>
      </span>
      <span className='Char-dsply__Wpt-Melee'>
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <textarea rows="3"></textarea>
      </span>
      <span className='Char-dsply__Wpt-Melee'>
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <textarea rows="3"></textarea>
      </span>
      <span className='Char-dsply__Wpt-Ranged'>
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <textarea rows="3"></textarea>
      </span>
    </div>
  )
}

class CharacterDisplay extends React.Component{
  constructor(props){
    super(props)
    this.state = {modifires: 0}
    this.handleUplife = this.handleUplife.bind(this)
  }

  handleUplife(data, key){
    const newState = this.state
    newState[key] = data
    this.setState(newState)
  }

  render(){
    console.log(this.props)
    const fixedSkills = this.props.dataStatic.skills
    const characterData = this.props.characterData
    return(
      <div className='Char-dsply__Main-Cont'>
        <div className='Char-dsply__Section-One'>
          <div>
            <AtributeDisplay 
              characterData={characterData}
            />
            <SkillDisplay
              characterData={characterData}
              fixedSkills={fixedSkills}
              modifires={this.state.modifires}
            />
          </div>
          <div>
            <ProfileDisplay
              characterData={characterData}
            />
            <HealthTracking
              characterData={characterData}
              handleUplife={this.handleUplife}
            />
          </div>
        </div>
        <WeaponsDisplay
          characterData={characterData}
          modifires={this.state.modifires}
        />
        <br/>
        <br/>
        <button onClick={()=>{
          this.props.handleUpLift('characterSheet', 'page')          
        }}>Character Display</button>  
      </div>
    )
  }
}

export default CharacterDisplay