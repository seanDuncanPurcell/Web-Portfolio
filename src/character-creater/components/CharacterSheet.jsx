import Background from './Background.js';
import Sleeve from './Sleeve.js';

//this data black will be defined by the static date but the values will be set by user, saved to the DB, and then loard back.
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

const traits = {
  positve: [
    {
      id: 'MwAj26VBGe59Kdu5',
      label: 'ADAPTABILITY',
      description: `Resleeving is a breeze for this character. They adjust
      to new morphs much more quickly than most other
      people. Apply a +10 modifier per level for Integration
      Tests (PHB p. 271) and Alienation Tests (PHB p. 272).`,
      morph: {},
      ego: [
        {lable: 'Level 1', cost: 10, mod: 10},
        {lable: 'Level 2', cost: 20, mod: 20}
      ]
    },
    {
      id: 'IoHW93n7f023dNX8',
      label: 'ALLIES',
      description: `The character is part of or has a relationship
      with some influential group that they can occasionally
      call on for support. For example, this could
      be their old gatecrashing crew, former research lab
      co-workers, a criminal cartel they are part of, or
      an elite social clique. The gamemaster and player
      should work out what the character’s relationship
      is with this group, and why the character can call
      on them for aid. Gamemaster’s should take care
      that these allies are not abused, such as calling 
      on them more than once per game session. The
      character’s ties to this group are also a two-way
      street—they will be expected to perform duties for
      the group on occasion as well (a potential plot seed
      for scenarios).`,
      morph: {},
      ego: [
        {lable: 0, cost: 30, mod: 0}
      ]
    },
    {
      id: 'ZcnfXBPZGB9Hs24k',
      label: 'AMBIDEXTROUS',
      description: `The character can use and manipulate objects
      equally well with both hands (they do not suffer the
      off-hand modifier, as noted under Wielding Two or
      More Weapons, PHB p. 206). If the character has other
      prehensile limbs (feet, tail, tentacles, etc.), this trait
      may be applied to a limb other than the hand. This
      trait may be taken multiple times for multiple limbs.`,
      morph: {},
      ego: [
        {lable: 0, cost: 10, mod: 0}
      ]
    },
    {
      id: 'Bx0tqvOAx7o0NfKy',
      label: 'ANIMAL EMPATHY',
      description: `The character has an instinctive feel for handling
      and working with non-sapient animals of all kinds.
      Apply a +10 modifier to Animal Handling skill tests
      or whenever the character makes a test to influence or
      interact with an animal.`,
      morph: {},
      ego: [
        {
          lable: 0, cost: 5, mod: 10,
          affectes: ['skills', 'animalHandling']
        }
      ]
    },
    {
      id: '5NBRyuU9ILAN0CQY',
      label: 'BRAVE',
      description: `This character does not scare easily and will
      face threats, intimidation, and certain bodily harm
      without flinching. As a side effect, the character is
      not always the best at gauging risks, especially when
      it comes to factoring in danger to others. The character
      receives a +10 modifier on all tests to resist
      fear or intimidation.`,
      morph: {},
      ego: [
        {lable: 0, cost: 5, mod: 10}
      ]
    },
    {
      id: 'd0IZfzxzgFTGf96j',
      label: 'COMMON SENSE',
      description: `The character has an innate sense of judgment that
      cuts through other distractions and factors that might
      cloud a decision. Once per game session, the player
      may ask the gamemaster what choice they should
      make or what course of action they should take, and
      the gamemaster should give them solid advice based
      on what the character knows. Alternatively, if the
      character is about to make a disastrous decision, the
      gamemaster can use the character’s free hint and warn
      the player they are making a mistake.`,
      morph: {},
      ego: [
        {lable: 0, cost: 10, mod: 0}
      ]
    },
    {
      id: '8FkF3QUd8ENzPp5E',
      label: 'DANGER SENSE',
      description: `The character has an intuitive sixth sense that
      warns them of imminent threats. They receive a +10
      modifier on Surprise Tests (PHB p. 204).`,
      morph: {},
      ego: [
        {lable: 0, cost: 10, mod: 0}
      ]
    },
    {
      id: 'rPg5230aHgYc2iba',
      label: 'DIRECTION SENSE',
      description: `Somehow the character always knows which way
      is up, north, etc., even when blinded. The character
      receives a +10 modifier for figuring out complex
      directions, reading maps, and remembering or retracing
      a path they have taken.`,
      morph: {},
      ego: [
        {lable: 0, cost: 5, mod: 0}
      ]
    },
    {
      id: 'BdXH4Lw1MXQJCWCu',
      label: 'EIDETIC MEMORY',
      description: `Much like a computer, the character has perfect
      memory recall. They can remember anything they have
      sensed, often even from a single glance. This works the
      same as the eidetic memory implant (PHB p. 301).`,
      morph: [
        {lable: 0, cost: 10, mod: 0}
      ],
      ego: [
        {lable: 0, cost: 15, mod: 0}
      ]
    },
    {
      id: '5IeH19PpQl7WcsX9',
      label: 'EXCEPTIONAL APTITUDE',
      description: `As an ego trait, the character may raise the
      maximum for a particular chosen aptitude to 40 rather
      than 30 (PHB p. 122). As a morph trait, it raises the morph
      aptitude maximum (PHB p. 124) for a particular chosen
      aptitude by 10 (30 for flats, 35 for splicers, 40 for all
      others). Note that this trait just raises the maximum,
      it does not give the character 10 more aptitude points.
      This trait may only be taken by a morph or ego once.`,
      morph: [
        {
          lable: 0, cost: 20, mod: 0
        }
      ],
      ego: [
        {
          lable: 0, cost: 20, mod: 10,
          affectes: ['sleeve', 'aptitudesMax']
        }
      ]
    },
    {
      id: 'ZBgLrFrQwPb5L8l9',
      label: 'EXPERT',
      description: `The character is a legend in the use of one particular
      skill. The character may raise one learned skill over 80,
      to a maximum of 90, during character creation. This
      trait does not actually increase the skill, it just raises
      the maximum. This trait may only be taken once.`,
      morph: [],
      ego: [
        { lable: 0, cost: 10, mod: 0 }
      ]
    }
  ],
  negative: []
}

function skillArrayByTag (tag) {
  const fixed = this.staticData
  const skillKeys = Object.keys(fixed.skills)
  const skillAry = []
  skillKeys.forEach(skillKey => {
    const skill = fixed.skills[skillKey]
    if(skill.tags.indexOf(tag) !== -1) skillAry.push(skillKey)
  });
  if(skillAry.length <= 0) {
    console.warn("skillArrayByTag() was unable to find and skills with tag " + tag)
  }else{
    return skillAry
  }
}

function keyGen() {
  const num = Math.floor((Math.random() * 10000) + (Math.random() * 1000));
  return num.toString();
}

//RPData Sub-Components
function SimpleField (props) {
  const autoFocus = (props.autoFocus) ? true : false;
  const autoComplete = (props.autoComplete) ? 'on' : 'off';
  return(
    <label>
      <p>{props.label}</p>
      <input 
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
      ></input>
    </label>
  )
}

function SimpleDropDown (props){
  return(
    <label>
      <p>{props.label}</p>
      <select onChange={props.onChange} value={props.value}>
        {Object.keys(props.options).map(key => {
          const item = props.options[key];
          return <option value={key} key={keyGen()}>{item.label}</option>
        })}
      </select>
    </label>
  )
}

function Aptitudes (props) {
  const dynamic = props.dataDynmic;
  function updateCP(event, key){
    const value = event.target.value
    const aptValArray = Object.keys(dynamic.aptitudes).map( aptKey => {
      if(aptKey === key) return parseInt(value, 10)
      else return parseInt(dynamic.aptitudes[aptKey].value, 10)
    })
    const total = aptValArray.reduce((a, b) => a + b)

    props.spendPoints(total, 'aptitudes')
    props.handleChange(event, key, 'value')
  }
  return(
    <section className='character-aptitudes'>
      {Object.keys(dynamic.aptitudes).map((key) => {
        const maxApt = dynamic.sleeve.aptitudesMax
        const myData = dynamic.aptitudes[key];
        let sleeveBonuse = 0 
        dynamic.sleeve.aptitudesMods.forEach( option => {
          if (option.apt === key) sleeveBonuse = option.mod
        })
        
        let alertStyle = {fontWeight: 'normal', color: 'black'};
        if(maxApt < myData.total){
          alertStyle = {fontWeight: 'bold', color: 'red'};
        }
          
        return (
          <label 
            className='single-aptitude' 
            key={['aptitudes', key].join('_')} 
          >
            <p className='tooltip'>
              {myData.abbreviation}
              <span className='tooltiptext'>{myData.name}</span>
            </p>
            <input
              className='aptitudes-input'
              type='number' 
              min='5' max='30' 
              value={myData.value}
              step='1'
              onChange={event => updateCP(event, key)}
            />
            <p>{sleeveBonuse}</p>
            <p style={alertStyle}>{maxApt}</p>
            <p>{myData.total}</p>
          </label>            
        )
      } ) }

      <label className='single-aptitude'>
        <p>Aptitudes</p>
        <p>Base Score</p>
        <p>Sleeve Mod</p>
        <p>Sleeve Max</p>
        <p>Total</p>
      </label>   
    </section>
  )
}

function Counter (props) {
  const pontsTotal = props.pontsTotal
  const pontsSpent = props.pontsSpent
  const myClass = (props.className) ? props.className : 'Char-Builder_Point-Counter' 
  const myLabel = (props.label) ? props.label : 'Points Spent:'
  const style = { color: 'black'}
  if(pontsSpent > pontsTotal) Object.assign( style, {color: 'red', fontWeight: 'bold'})
  return (
    <div className={myClass}>
      <strong>{myLabel}</strong>
      <p style={style}>{pontsSpent}</p>
      <p> / </p>
      <p>{pontsTotal}</p>
    </div>
  )
}

function BonusExpendature (props) {
  const staticData = props.dataStatic
  const Label = props.label
  const key = props.srcKey
  const baseStat = props.baseStat
  const bonusStat = props.bonusStat
  const cost = (()=>{
    const baseCost = staticData.customPoints[key].cost
    return (baseCost >= 1) ? baseCost : 1
  })()
  const roi = (()=>{
    const baseCost = staticData.customPoints[key].cost
    return (baseCost >= 1) ? 1 : ((1 / baseCost))
  })()
  return (
    <>
      <label className='bounsExp_input' key={key + '_a'}>
        <strong>{Label} :</strong>
        <input
          className='skill_input'
          type='number'
          min={baseStat}
          value={baseStat + bonusStat}
          step={roi}
          onChange={(event) => {
            const value = event.target.value - baseStat
            props.handleChange(value)
          }}
        />
      </label>
      <div className='bounsExp_costs' key={key + '_b'}>
        <strong>Cost: </strong> <p>{roi} for {cost}</p>
      </div>
    </>
  )
}

class Skills extends React.Component{
  constructor(props){
    super(props)
    this.totalePoinstSpent = 0
    this.SimpleSkill = this.SimpleSkill.bind(this)
    this.TemplateSkill = this.TemplateSkill.bind(this)
  }
  SimpleSkill(props){
    const dataDynmic = props.dataDynmic
    const fixedSkill = props.fixedSkill
    const rank = props.rank
    const srcKey = props.srcKey
    const skillKey = props.skillKey
    const specialMod = props.specialMod

    const aptMod = (()=>{
      const aptitude = dataDynmic.aptitudes[fixedSkill.aptitudeKey].total
      const morphMax = dataDynmic.sleeve.aptitudesMax
      return (aptitude > morphMax) ? morphMax : aptitude
    })()
    const total = rank + aptMod + specialMod
  
    return (
      <label 
        className='skill_row'
        key={['skill', srcKey, skillKey].join('_')}
      >
        <p className='skill_text' >
          {fixedSkill.label}
        </p>
        <p className='skill_cell' >{fixedSkill.aptitudeKey.toUpperCase()}</p>
        <p className='skill_cell' >{total}</p>
        <input
          className='skill_input'
          type='number'
          min='0' max={80 - aptMod - specialMod}
          value={rank}
          step='5'
          onChange={event => props.handleChange(event, skillKey)}
          key={['skill', skillKey, 'input'].join('_')}
        />
        <p className='skill_cell' >{aptMod}</p>
        <p className='skill_cell' >{specialMod}</p>
      </label>
    )      
  }
  TemplateSkill(props){
    const dataDynmic = props.dataDynmic
    const dataStatic = props.dataStatic
    const fixedSkill = props.fixedSkill
    const skillKey = props.skillKey
    const subSkills = fixedSkill.options.filter( _key => {
      let charSubSkills = dataDynmic.skills[skillKey]
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
          key={['skill', skillKey].join('_')}
        >
          <div className='skill_template-label' >
            <p className='skill_text' >
              {fixedSkill.label}: 
            </p>
            <select value='default' onChange={(event) => props.handleNewSubSkill( event, skillKey )}>
                <option value='default'>Select One</option>
              {fixedSkill.options.map( option => {
                return( 
                  <option value={option} key={['option', skillKey, option ].join('_')}>
                    {option}
                  </option>
                )
              })}
            </select>
          </div>
          <p className='skill_cell' >{fixedSkill.aptitudeKey.toUpperCase()}</p>
          <p className='skill_cell' />
          <p className='skill_cell' />
          <p className='skill_cell' />
          <p className='skill_cell' />
        </label>
        {subSkills.map( subSkillKey => {
          const thisSkill = {label: `${fixedSkill.label}: ${subSkillKey}`, aptitudeKey:fixedSkill.aptitudeKey}
          const rank = dataDynmic.skills[skillKey][subSkillKey]

          const specialMod = (()=>{          
            const backgroundSkillData = (()=>{
              const bgOptions = props.dataDynmic.background.skillMod
              for(let i = 0; i < bgOptions.length; i++ ){
                if(bgOptions[i].selection === subSkillKey){
                  return bgOptions[i].mod
                }
              }
              return 0
            })()
            const factionSkillData = (()=>{
              const factionOptions = props.dataDynmic.faction.skillMod
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
            <this.SimpleSkill
              fixedSkill={thisSkill}
              rank={rank}
              srcKey={'sub-skill'}
              skillKey={subSkillKey}
              specialMod={specialMod}
              dataStatic={dataStatic}
              dataDynmic={dataDynmic}
              handleChange={(event, subKey) => props.handleChange(event, skillKey, subKey)}
              key={['over-skill', skillKey, subSkillKey].join('_')}
            />
          )          
        })}
      </>
    )
  }
  componentDidUpdate(){
    const characterSkills = this.props.dataDynmic.skills
    const totalValues = skillKey => {
      if(characterSkills[skillKey]){
        const mySkill = characterSkills[skillKey]
        if('number' === (typeof mySkill)){
          //return simpleSkill value
          if(mySkill > 60) return ((mySkill - 60) * 2) + 60
          return mySkill
        }else{
          //return all subSkill values as a single value
          return Object.keys(mySkill)
          .map( subSkillKey => {
            if(mySkill[subSkillKey] > 60) return ((mySkill[subSkillKey] - 60) * 2) + 60
            return mySkill[subSkillKey]
          }).reduce((a,b)=> a + b )
        }
      }else{
        return 0
      }
    }
    const simplSkillArray = this.props.skillList.map(totalValues)
    const total = simplSkillArray.reduce((a, b) => a + b)
    if(total !== this.totalePoinstSpent){
      this.totalePoinstSpent = total
      this.props.spendPoints(total)
    }
  }
  render(){
    const skillList = this.props.skillList
    const dataDynmic = this.props.dataDynmic
    return(
      <section className='skill_block'>
        <label 
          className='skill_row skill_header'          
          key={['over-skill', 'header'].join('_')}
        >
          <p className='skill_text' >Skill Name</p>
          <p className='skill_cell' >Aptitude</p>
          <p className='skill_cell' >Total</p>
          <p className='skill_cell' >Ranks</p>
          <p className='skill_cell' >Apt. Mod</p>
          <p className='skill_cell' >Special Bonuses</p>
        </label>
        <div className='skill_scroll-block'>
          {skillList.map( (skillKey, i) => {
            const fixedSkill = this.props.dataStatic.skills[skillKey];

            //If Normal Skill then render a SimpleSkill
            if(!fixedSkill.options){
              const rank = (dataDynmic.skills[skillKey]) ? dataDynmic.skills[skillKey] : 0
              const specialMod = (()=>{
                let total = 0
                const bgOptions = dataDynmic.background.skillMod
                for(let i = 0; i < bgOptions.length; i++ ){
                  if(bgOptions[i].skillKey === skillKey){
                    total += bgOptions[i].mod
                  }
                }
                const facOptions = dataDynmic.faction.skillMod
                for(let i = 0; i < facOptions.length; i++ ){
                  if(facOptions[i].skillKey === skillKey){
                    total += facOptions[i].mod
                  }
                }
                return total
              })()
              return(
                <this.SimpleSkill
                  fixedSkill={fixedSkill}
                  rank={rank}
                  srcKey={i}
                  skillKey={skillKey}
                  specialMod={specialMod}
                  dataStatic={this.props.dataStatic}
                  dataDynmic={dataDynmic}
                  handleChange={this.props.handleChange}
                  key={['simple-skill', skillKey].join('_')}
                />
              )
            }//Otherwise its a TemplateSkill 
            else{
              return(
                <this.TemplateSkill 
                  fixedSkill={fixedSkill}
                  skillKey={skillKey}
                  dataStatic={this.props.dataStatic}
                  dataDynmic={dataDynmic}
                  handleChange={this.props.handleChange}
                  handleNewSubSkill={this.props.handleNewSubSkill}
                  key={['over-skill', skillKey].join('_')}
                />
              )
            }
          })}
        </div>
      </section>
    )
  }
}

class CharacterSheet extends React.Component {
  constructor(props){
    super(props)
    this.state = this.props.characterTemplate
    console.log(this.state)
    this.state.cp.bonusPoints = 0
    this.staticData = this.props.dataStatic

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleNewSubSkill = this.handleNewSubSkill.bind(this)
    this.handleBackground = this.handleBackground.bind(this)
    this.handleFaction = this.handleFaction.bind(this)
    this.handleSleeve = this.handleSleeve.bind(this)
    this.handleCP = this.handleCP.bind(this)
    this.handleBonus = this.handleBonus.bind(this)
    this.skillArrayByTag = skillArrayByTag.bind(this)
  }

  handleCP(change, attribute){
    //update individual attribute's total
    const newCP = this.state.cp
    newCP[attribute] = change
    
    //update overflow total
    const totaloverFlowPoint = Object.keys(this.staticData.customPoints)
    .map( key => {
      const maxpoints = this.staticData.customPoints[key].total
      if(maxpoints){
        const currnentPoints = newCP[key]
        const cost = this.staticData.customPoints[key].cost
        const overFlow = (currnentPoints - maxpoints) * cost
        return (overFlow <= 0) ? 0 : overFlow 
      }
      return 0
    })
    .reduce( (a ,b) => a + b)
    newCP.overFlow = totaloverFlowPoint
    newCP.bonusPoints = newCP.overFlow + newCP.traits + newCP.moxie + newCP.credit + newCP.rep + newCP.sleeve

    //set the state
    this.setState({cp: newCP})
  }

  handleBonus(value, key){
    const cost = this.staticData.customPoints[key].cost
    const newData = this.state
    newData[key] = value
    this.setState(newData)
    this.handleCP(Math.floor(value * cost), key)
  }

  handleBackground(data){
    const {key, skillMod, creditMod, moxie, rep, traits} = data

    //add new data to state
    const newState = this.state
    newState.background = {
      key: key,
      skillMod: skillMod,
      creditMod: creditMod,
      moxie: moxie,
      rep: rep,
      traits: traits
    }

    //Subskills will not be displayed if the are not set to a min of Zero in Dynamic Data
    //so in order for sub skills with background mods to be displayed they need to be set to zero
    skillMod.forEach( option => {
      const skillKey = option.skillKey
      const fixedSkill = this.staticData.skills[skillKey]
      //if the skill 
      if(fixedSkill.options){
        const subSkillKey = option.selection
        //if the character does not have the currnent option's skill
        if(!newState.skills[skillKey]){
          //...then create it
          const newSubSkill = new Object
          newSubSkill[subSkillKey] = 0
          newState.skills[skillKey] = newSubSkill
        }else{
          //if the character does have the currnent option's skill, then check for the subskill
          if(newState.skills[skillKey][subSkillKey] >= 0){
            //if the character has the subskill the return
            return
          }else{
            //...otherwise create it at 0
            newState.skills[skillKey][subSkillKey] = 0
          }
        }
      }
    })

    this.setState(newState)
  }

  handleFaction(data){
    const {key, skillMod, creditMod, moxie, rep, traits} = data

    //add new data to state
    const newState = this.state
    newState.faction = {
      key: key,
      skillMod: skillMod,
      creditMod: creditMod,
      moxie: moxie,
      rep: {
        at: rep.at, c: rep.c,
        e: rep.e, f: rep.f,
        g: rep.g, i: rep.i,
        r: rep.r
      },
      traits: traits
    }

    //Subskills will not be displayed if the are not set to a min of Zero in Dynamic Data
    //so in order for sub skills with background mods to be displayed they need to be set to zero
    skillMod.map( option => {
      const skillKey = option.skillKey
      const fixedSkill = this.staticData.skills[skillKey]
      //if the skill 
      if(fixedSkill.options){
        const subSkillKey = option.selection
        //if the character does not have the currnent option's skill
        if(!newState.skills[skillKey]){
          //...then create it
          const newSubSkill = {}
          newSubSkill[subSkillKey] = 0
          newState.skills[skillKey] = newSubSkill
        }else{
          //if the character does have the currnent option's skill, then check for the subskill
          if(newState.skills[skillKey][subSkillKey] >= 0){
            //if the character has the subskill the return
            return
          }else{
            //...otherwise create it at 0
            newState.skills[skillKey][subSkillKey] = 0
          }
        }
      }
    })

    this.setState(newState)
  }

  handleNewSubSkill(event, skill){
    const subSkill = event.target.value
    const data = this.state
    if(data.skills[skill]){
      if(data.skills[skill][subSkill] >= 0){
        return
      }else{
        data.skills[skill][subSkill] = 0
      }
    }else{
      data.skills[skill] = {}
      data.skills[skill][subSkill] = 0
    }
    this.setState(data)
  }

  handleInputChange(event, ...keys){
    const isNum = parseInt(event.target.value, 10);
    // const isObj = JSON.parse(event.target.value);
    let value = event.target.value;
    if (isNum || isNum === 0) value = isNum;
    // else if (isObj) value = isObj;
    let newState = this.state;
    for(let i = 0, state = newState; i < keys.length; i++){
      if(!keys[(i + 1)]) {
        state[keys[i]] = value;
        break
      }else{
        state = state[keys[i]];
      }
    }

    this.setState(newState);
  }

  handleSleeve(newSleeve) {
    this.setState({sleeve: newSleeve})
  }

  componentDidUpdate () {
    //Calc Total for Apts
    Object.keys(this.state.aptitudes).forEach( key => {
      const apt = this.state.aptitudes[key];
      let morphBonus = 0
      const sleeveBonus = this.state.sleeve.aptitudesMods
      for (let i = 0; i < sleeveBonus.length; i++){
        if(sleeveBonus[i].apt === key) 
          morphBonus = sleeveBonus[i].mod 
      }
      const state = this.state;
      let change = false;
      
      const baseApt = apt.value;
      const total = apt.total;
      const newTotal = baseApt + morphBonus;

      //check for new apts totals;
      if(total !== newTotal){
        state.aptitudes[key].total = newTotal;
        change = true;
      }

      if(change) this.setState(state);

    })
  }

   render(){
    const {
      playerName, characterName, subjectiveAge, 
      objectiveAge, sleeve, background, faction
    } = this.staticData;
    const cp = this.staticData.customPoints
    const formMap = {
      one: {label: 'Step One:', type: 'header'},
      playerName: playerName,
      characterName: characterName,
      subjectiveAge: subjectiveAge,
      objectiveAge: objectiveAge,
      two: {label: 'Step Two:', type: 'header'},
      background: background,
      three: {label: 'Step Three:', type: 'header'},
      faction: faction,
      four: {label: 'Step Four:', type: 'header'},
      aptitudes: {type: 'aptitudes', cp: cp.aptitudes.total},
      five: {label: 'Step Five:', type: 'header'},
      skillsActive: {type: 'skills', cp: cp.skillsActive.total, list: this.skillArrayByTag('Active')},
      six: {label: 'Step Six:', type: 'header'},
      skillsKnowledge: {type: 'skills', cp: cp.skillsKnowledge.total, list: this.skillArrayByTag('Knowledge')},
      seven: {label: 'Step Seven:', type: 'header'},
      sleeve: sleeve,
      eight: {label: 'Step Eight:', type: 'header'},
      bounses: {label: 'Misc.', type: 'bonuses'}
    }
    return(
      <>
        <Counter 
          key={['overComp', 'counter', 'main'].join('_')}
          pontsSpent={(this.state.cp.bonusPoints)} 
          pontsTotal={200}
          className='Char-Builder_Point-Counter Char-Builder_Bonus-Point-Counter'
          label='Bonus Points Spent:'
        />
        {Object.keys(formMap).map( (key, index) => {
          const item = formMap[key];
          if (item.type === 'text') {
            return (
              <SimpleField
                type={item.type}
                label={item.label}
                value={this.state[key]}
                onChange={event => this.handleInputChange(event, key)}
                key={[item.type, key].join('_')}
              />
            )
          } else if (item.type === 'dropDown') {
            return (
              <SimpleDropDown
                label={item.label}
                options={item.options}
                value={this.state[key]}
                onChange={event => this.handleInputChange(event, key)}
                key={[item.type, key, index].join('_')}
              />
            )
          } else if (item.type === 'background') {
            return (
              <Background
                type={item.type}
                onSelection={this.handleBackground}
                form={this.staticData.background}
                dataStatic={this.staticData}
                key={[item.type, key, index].join('_')}
              />
            )
          } else if (item.type === 'faction') {
            return (
              <Background
                type={item.type}
                onSelection={this.handleFaction}
                form={this.staticData.faction}
                dataStatic={this.staticData}
                key={['overComp', key, index].join('_')}
              />
            )
          } else if (item.type === 'header') {
            return <h1 className='Char-Builder_Header' key={`header_${index}`}>{item.label}</h1>
          } else if (item.type === 'aptitudes') {

            //if player over spend due not display here, it will be displayed in bouns CP
            const spent = (this.state.cp.aptitudes > item.cp) ? item.cp : this.state.cp.aptitudes
            return (
              <>
                <Counter 
                  pontsSpent={spent} 
                  pontsTotal={item.cp}
                  key={['overComp', 'counter', index].join('_')}
                />
                <Aptitudes
                  key={['overComp', key, index].join('_')}
                  spendPoints={this.handleCP}
                  dataDynmic={this.state}
                  dataStatic={this.staticData}
                  handleChange={(event, keyOne, keyTwo ) => this.handleInputChange(event, 'aptitudes', keyOne, keyTwo)}
                />
              </>
            )
          } else if (item.type === 'skills') {

            //if player over spend due not display here, it will be displayed in bouns CP
            const spent = (this.state.cp[key] > item.cp) ? item.cp : this.state.cp[key]
            return (
              <>
                <Counter 
                  key={['overComp', 'counter', index].join('_')}
                  pontsSpent={spent} 
                  pontsTotal={item.cp} 
                />
                <Skills
                  skillList={item.list}
                  spendPoints={ (points) => this.handleCP(points, key)}
                  dataDynmic={this.state}
                  dataStatic={this.staticData}
                  handleChange={(event, skill, subSkill) => {
                    this.handleInputChange(event, 'skills', skill, subSkill)
                  }}
                  handleNewSubSkill={this.handleNewSubSkill}
                  key={['overComp', key, index].join('_')}
                />
              </>
            )
          } else if (item.type === 'bonuses') {
            const background = this.state.background
            const baseMox = background.moxie
            const baseCredit = background.creditMod
            const baseRep = background.rep
            return (
              <section className='char-bckgrnd' key={['overComp', key, index].join('_')}>
                <h2>{item.label}</h2>
                {/* Buy extra moxie */}
                <BonusExpendature
                  dataStatic={this.staticData}
                  label={'Moxie'}
                  srcKey={'moxie'}
                  baseStat={baseMox}
                  bonusStat={this.state.moxie}
                  handleChange={value => this.handleBonus(value, 'moxie')}
                /> 
                {/* Buy extra credits */}
                <BonusExpendature
                  dataStatic={this.staticData}
                  label={'Credit'}
                  srcKey={'credit'}
                  baseStat={baseCredit}
                  bonusStat={this.state.credit}
                  handleChange={value => this.handleBonus(value, 'credit')}
                />
                {/* Buy extra rep */}
                <BonusExpendature
                  dataStatic={this.staticData}
                  label={'Reputation'}
                  srcKey={'rep'}
                  baseStat={baseRep}
                  bonusStat={this.state.rep}
                  handleChange={value => this.handleBonus(value, 'rep')}
                />
              </section>
            )
          } else if (item.type === 'sleeve') {
            return (
              <Sleeve
                dataStatic={this.staticData}
                dataDynamic={this.state}
                onSubmit={this.handleSleeve}
                spendCP={ cost => this.handleCP(cost, 'sleeve')}
                key={['overComp', key, index].join('_')}
              />
            )
          } else {
            return <p key={['overComp', key, index].join('_')} >Failed to render element</p>
          }
        })}
        <br/>        
        <br/>
        <button onClick={()=>{
          console.log(this.state)
        }}>Report</button>
        <br/>
        <br/>
        <button onClick={()=>{
          this.props.handleCharacterUpdate(this.state)
          this.props.handleUpLift('characerDisplay', 'page')          
        }}>Character Display</button>
      </>
    )
  }
}

export default CharacterSheet;