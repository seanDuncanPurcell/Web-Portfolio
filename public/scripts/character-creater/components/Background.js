class Background extends React.Component {
  constructor(props) {
    super(props);
    const _options = Object.assign({}, this.props.form).options;
    this.fixed = Object.assign({}, this.props.dataStatic);
    this.form = Object.assign({}, this.props.form);
    this.state = {
      onDisplay: Object.keys(_options)[0],
      bckgrndOp: _options[Object.keys(_options)[0]]
    };
    this.handleBackgroundCycle = this.handleBackgroundCycle.bind(this);
    this.handleSubSkill = this.handleSubSkill.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMultipleChoice = this.handleMultipleChoice.bind(this);
    this.TemplateSkill = this.TemplateSkill.bind(this);
    this.MultipleChoice = this.MultipleChoice.bind(this);
  }

  handleBackgroundCycle(int) {
    const bgArray = Object.keys(this.props.form.options);
    let position = bgArray.indexOf(this.state.onDisplay);
    if (position + int < 0) position = bgArray.length - 1;else if (position + int > bgArray.length - 1) position = 0;else position += int;
    this.setState({
      onDisplay: bgArray[position],
      bckgrndOp: this.props.form.options[bgArray[position]]
    });
  }

  handleSubSkill(event, index) {
    const value = event.target.value;
    const data = this.state.bckgrndOp;
    data.skillMod[index].selection = value;
    this.setState({
      bckgrndOp: data
    });
  }

  handleMultipleChoice(event, index) {
    const value = event.target.value;
    if (value === 'SelectOne') return;
    const newData = this.state.bckgrndOp;
    const newType = this.fixed.skills[value].options ? 'templateSkill' : 'singleSkill';
    newData.skillMod[index].type = newType;
    newData.skillMod[index].skillKey = value;
    newData.skillMod[index].subSkillKey = this.fixed.skills[value].options;
    if (this.fixed.skills[value].options) newData.skillMod[index].selection = this.fixed.skills[value].options[0];
    this.setState({
      bckgrndOp: newData
    });
  }

  handleSubmit() {
    const key = this.state.onDisplay;
    const {
      skillMod,
      creditMod,
      moxieMod,
      rep,
      traits
    } = this.state.bckgrndOp;
    const data = {
      key: key,
      skillMod: skillMod,
      creditMod: creditMod,
      moxie: moxieMod,
      rep: rep,
      traits: traits
    };
    this.props.onSelection(data);
  }

  TemplateSkill(props) {
    const skillOption = props.skillOption;
    const index = props.index;
    const fixedSkill = props.fixedSkill;
    const skillBonus = props.skillBonus;
    const key = skillOption.skillKey;

    if (skillOption.subSkillKey.length > 1) {
      return /*#__PURE__*/React.createElement("span", {
        className: "char-bckgrnd__skill-line",
        key: ['skill', key, skillOption.subSkillKey[0]].join('_')
      }, /*#__PURE__*/React.createElement("strong", null, fixedSkill.label, ":", /*#__PURE__*/React.createElement("select", {
        onChange: event => this.handleSubSkill(event, index)
      }, skillOption.subSkillKey.map(subKey => {
        return /*#__PURE__*/React.createElement("option", {
          value: subKey,
          key: ['subSkill', key, subKey].join('_')
        }, subKey);
      }))), /*#__PURE__*/React.createElement("p", null, " + ", skillBonus));
    } else {
      return /*#__PURE__*/React.createElement("span", {
        className: "char-bckgrnd__skill-line",
        key: [skillOption.type, key].join('_')
      }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, fixedSkill.label, ": "), /*#__PURE__*/React.createElement("em", null, " ", skillOption.subSkillKey[0])), /*#__PURE__*/React.createElement("p", null, " + ", skillBonus));
    }
  }

  MultipleChoice(props) {
    const skillBonus = props.skillBouns;
    const skillOptions = props.skillOptions;
    const index = props.index;
    return /*#__PURE__*/React.createElement("span", {
      className: "char-bckgrnd__skill-line",
      key: ['MultipleChoice', skillOptions.join('_')].join('_')
    }, /*#__PURE__*/React.createElement("strong", null, "Select A Skill:"), /*#__PURE__*/React.createElement("select", {
      onChange: event => this.handleMultipleChoice(event, index)
    }, /*#__PURE__*/React.createElement("option", {
      value: "SelectOne"
    }, "Select One"), skillOptions.map(option => /*#__PURE__*/React.createElement("option", {
      value: option,
      key: ['option', option, index].join('_')
    }, option))), /*#__PURE__*/React.createElement("p", null, " + ", skillBonus));
  }

  render() {
    const dsply = this.state.bckgrndOp;
    const fixedSkills = this.fixed.skills;
    return /*#__PURE__*/React.createElement("section", {
      className: "char-bckgrnd"
    }, /*#__PURE__*/React.createElement("h2", null, this.form.label), /*#__PURE__*/React.createElement("span", {
      className: "char-bckgrnd__main-selector"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => this.handleBackgroundCycle(-1)
    }, "<"), /*#__PURE__*/React.createElement("p", null, dsply.label), /*#__PURE__*/React.createElement("button", {
      onClick: () => this.handleBackgroundCycle(1)
    }, ">")), /*#__PURE__*/React.createElement("p", null, dsply.description), dsply.skillMod.map((skillOption, index) => {
      const skillBonus = skillOption.mod; //if this option has multiple skills

      if (skillOption.type === 'multiple') {
        return /*#__PURE__*/React.createElement(this.MultipleChoice, {
          skillBouns: skillBonus,
          skillOptions: skillOption.skillKey,
          index: index,
          key: ['over-skill', 'multi-choice', index].join('_')
        }); //if this option has one skill with sub skills
      } else if (skillOption.type === 'templateSkill') {
        return /*#__PURE__*/React.createElement(this.TemplateSkill, {
          skillOption: skillOption,
          index: index,
          fixedSkill: fixedSkills[skillOption.skillKey],
          skillBonus: skillBonus,
          key: ['over-skill', 'templateSkill', index].join('_')
        }); //if this option has one skill
      } else {
        const fixedSkill = this.fixed.skills[skillOption.skillKey];
        return /*#__PURE__*/React.createElement("span", {
          className: "char-bckgrnd__skill-line",
          key: ['skill', skillOption.skillKey].join('_')
        }, /*#__PURE__*/React.createElement("strong", null, fixedSkill.label, ":"), /*#__PURE__*/React.createElement("p", null, " + ", skillBonus));
      }
    }), /*#__PURE__*/React.createElement("span", {
      className: "char-bckgrnd__skill-line"
    }, /*#__PURE__*/React.createElement("strong", null, "Addtional Credits:"), /*#__PURE__*/React.createElement("p", null, dsply.creditMod)), /*#__PURE__*/React.createElement("span", {
      className: "char-bckgrnd__skill-line"
    }, /*#__PURE__*/React.createElement("strong", null, "Addtional Moxie:"), /*#__PURE__*/React.createElement("p", null, dsply.moxieMod)), /*#__PURE__*/React.createElement("button", {
      onClick: this.handleSubmit
    }, "Apply This Backgound"));
  }

}

export default Background;