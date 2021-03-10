class Sleeve extends React.Component {
  constructor(props) {
    super(props);
    const _firstKey = Object.keys(this.props.dataStatic.sleeve.options)[0];
    const {
      label,
      description,
      aptitudesMods,
      aptitudesMax,
      cost,
      durability,
      woundThreshold
    } = this.props.dataStatic.sleeve.options[_firstKey];
    this.fixed = this.props.dataStatic;
    this.dynam = this.props.dataDynamic;
    this.state = {
      optionApplied: false,
      onDisplay: _firstKey,
      sleeveOp: {
        label: label,
        description: description,
        aptitudesMods: aptitudesMods,
        aptitudesMax: aptitudesMax,
        cost: cost,
        durability: durability,
        woundThreshold: woundThreshold
      }
    };
    this.handleBackgroundCycle = this.handleBackgroundCycle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBonusSelect = this.handleBonusSelect.bind(this);
    this.ApptModDspySimple = this.ApptModDspySimple.bind(this);
    this.ApptChoiceChoice = this.ApptChoiceChoice.bind(this);
  }

  async handleBackgroundCycle(int) {
    const sleeveArray = Object.keys(this.fixed.sleeve.options);
    let position = sleeveArray.indexOf(this.state.onDisplay);
    if (position + int < 0) position = sleeveArray.length - 1;else if (position + int > sleeveArray.length - 1) position = 0;else position += int;
    this.setState({
      optionApplied: false,
      onDisplay: sleeveArray[position],
      sleeveOp: this.fixed.sleeve.options[sleeveArray[position]]
    }); //refresh static data

    const responce = await fetch(`/api/get_character_configs?id=6046e4b81fd43c02f0bd15ff`);
    this.fixed = await responce.json();
  }

  handleBonusSelect(event, index) {
    const value = event.target.value;
    const sleeveOpChange = this.state.sleeveOp;
    const mod = sleeveOpChange.aptitudesMods[index];
    const newObj = {
      apt: value,
      mod: mod
    };
    sleeveOpChange.aptitudesMods[index] = newObj;
    this.setState({
      sleeveOp: sleeveOpChange
    });
  }

  handleSubmit() {
    let pass = true;
    this.state.sleeveOp.aptitudesMods.forEach(option => {
      if ('number' === typeof option) {
        window.alert(`You have to select an aptitude for each aptitude-bonus before buying a sleeve. -"YOU'RE KILLING ME SMALLS!!!" `);
        pass = false;
        return;
      }
    });
    if (!pass) return;
    const key = this.state.onDisplay;
    const {
      aptitudesMods,
      aptitudesMax,
      cost,
      durability,
      woundThreshold
    } = this.state.sleeveOp;
    const data = {
      key: key,
      aptitudesMods: aptitudesMods,
      aptitudesMax: aptitudesMax,
      durability: durability,
      woundThreshold: woundThreshold
    };
    this.setState({
      optionApplied: true
    });
    this.props.onSubmit(data);
    this.props.spendCP(cost);
  }

  ApptModDspySimple(props) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex'
      }
    }, /*#__PURE__*/React.createElement("strong", null, ' +' + props.value + ' to: '), /*#__PURE__*/React.createElement("p", null, props.aptType.toUpperCase()));
  }

  ApptChoiceChoice(props) {
    const apts = Object.keys(this.dynam.aptitudes);
    this.state.sleeveOp.aptitudesMods.forEach(option => {
      if (option.apt) {
        apts.splice(apts.indexOf(option.apt), 1);
      }
    });
    const srcKey = props.srcKey;
    return /*#__PURE__*/React.createElement("div", {
      key: ['apptChoice', srcKey].join('_')
    }, /*#__PURE__*/React.createElement("strong", null, `+${props.value} to:`), /*#__PURE__*/React.createElement("select", {
      onChange: props.onChange
    }, /*#__PURE__*/React.createElement("option", {
      key: ['sleeve_aptbonusopts', 'Select_One', srcKey].join('_')
    }, "Select One"), apts.map((key, i) => {
      return /*#__PURE__*/React.createElement("option", {
        key: ['sleeve_aptbonusopts', key, i].join('_'),
        value: key
      }, this.dynam.aptitudes[key].name);
    })));
  }

  render() {
    const dsply = this.state.sleeveOp;
    let classNameList = 'char-bckgrnd';
    if (this.state.optionApplied) classNameList += ' char-bckgrnd_highlight';
    return /*#__PURE__*/React.createElement("section", {
      className: classNameList
    }, /*#__PURE__*/React.createElement("h2", null, "Select Your Starting Sleeve."), /*#__PURE__*/React.createElement("span", {
      className: "char-bckgrnd__main-selector"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => this.handleBackgroundCycle(-1)
    }, "<"), /*#__PURE__*/React.createElement("p", null, dsply.label), /*#__PURE__*/React.createElement("button", {
      onClick: () => this.handleBackgroundCycle(1)
    }, ">")), /*#__PURE__*/React.createElement("p", null, dsply.description), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex'
      }
    }, /*#__PURE__*/React.createElement("strong", null, "Cost: "), /*#__PURE__*/React.createElement("p", null, dsply.cost, " Bonus Points")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex'
      }
    }, /*#__PURE__*/React.createElement("strong", null, "Durability: "), /*#__PURE__*/React.createElement("p", null, dsply.durability), /*#__PURE__*/React.createElement("strong", null, "Wound Threshold: "), /*#__PURE__*/React.createElement("p", null, dsply.woundThreshold)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex'
      }
    }, /*#__PURE__*/React.createElement("strong", null, "Note: "), /*#__PURE__*/React.createElement("em", null, "The height useful aptitude value for this sleeve is", /*#__PURE__*/React.createElement("strong", null, dsply.aptitudesMax), ". While in this sleeve you will not be able to make use of a higher value. =(")), dsply.aptitudesMods.map((option, index) => {
      if ('number' !== typeof option) {
        return /*#__PURE__*/React.createElement(this.ApptModDspySimple, {
          aptType: option.apt,
          value: option.mod
        });
      } else {
        return /*#__PURE__*/React.createElement(this.ApptChoiceChoice, {
          srcKey: ['ApptChoice', index].join('_'),
          value: option,
          onChange: event => this.handleBonusSelect(event, index)
        });
      }
    }), /*#__PURE__*/React.createElement("button", {
      onClick: this.handleSubmit
    }, "Buy This Sleeve"));
  }

}

export default Sleeve;