function AtributeDisplay(props) {
  const aptitudes = props.characterData.aptitudes;
  const sleeveMax = props.characterData.sleeve.aptitudesMax;
  return /*#__PURE__*/React.createElement("section", {
    className: "Char-dsply__Apt-dsply"
  }, /*#__PURE__*/React.createElement("div", {
    className: "Char-dsply__Apt-column"
  }, /*#__PURE__*/React.createElement("strong", null, "Aptitude"), /*#__PURE__*/React.createElement("p", null, "Total Aptitude"), /*#__PURE__*/React.createElement("p", null, "3 x Aptitude")), Object.keys(aptitudes).map(aptKey => {
    const aptitude = aptitudes[aptKey];
    const total = aptitude.total < sleeveMax ? aptitude.total : sleeveMax;
    return /*#__PURE__*/React.createElement("div", {
      className: "Char-dsply__Apt-column"
    }, /*#__PURE__*/React.createElement("strong", null, aptitude.abbreviation), /*#__PURE__*/React.createElement("p", null, total), /*#__PURE__*/React.createElement("p", null, total * 3));
  }));
}

function SimpleSkill(props) {
  const characterData = props.characterData;
  const fixedSkill = props.fixedSkill;
  const skillKey = props.skillKey;
  const specialMod = props.specialMod;
  const rank = props.rank;

  const aptMod = (() => {
    const aptitude = characterData.aptitudes[fixedSkill.aptitudeKey].total;
    const morphMax = characterData.sleeve.aptitudesMax;
    return aptitude > morphMax ? morphMax : aptitude;
  })();

  const total = rank + aptMod + specialMod;

  const lmtCheck = mod => {
    if (total + mod >= 99) return 99;
    if (total + mod <= 0) return 0;
    return total + mod;
  };

  return /*#__PURE__*/React.createElement("label", {
    className: "skill_row",
    key: ['skill', skillKey].join('_')
  }, /*#__PURE__*/React.createElement("p", {
    className: "skill_text"
  }, fixedSkill.label), /*#__PURE__*/React.createElement("p", {
    className: "skill_cell"
  }, lmtCheck(10)), /*#__PURE__*/React.createElement("p", {
    className: "skill_cell skill_Main"
  }, total), /*#__PURE__*/React.createElement("p", {
    className: "skill_cell"
  }, lmtCheck(-10)), /*#__PURE__*/React.createElement("p", {
    className: "skill_cell"
  }, lmtCheck(-20)), /*#__PURE__*/React.createElement("p", {
    className: "skill_cell"
  }, lmtCheck(-30)));
}

function TemplateSkill(props) {
  const characterData = props.characterData;
  const fixedSkill = props.fixedSkill;
  const skillKey = props.skillKey;
  const subSkills = fixedSkill.options.filter(_key => {
    let charSubSkills = characterData.skills[skillKey];

    if (charSubSkills) {
      charSubSkills = charSubSkills[_key];
      if (charSubSkills >= 0) return true;
    }

    return false;
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("label", {
    className: "skill_row",
    key: ['template-skill', skillKey, 'label'].join('_')
  }, /*#__PURE__*/React.createElement("div", {
    className: "skill_template-label"
  }, /*#__PURE__*/React.createElement("p", {
    className: "skill_text"
  }, fixedSkill.label, ":")), /*#__PURE__*/React.createElement("p", {
    className: "skill_cell"
  }, fixedSkill.aptitudeKey.toUpperCase()), /*#__PURE__*/React.createElement("p", {
    className: "skill_cell"
  }), /*#__PURE__*/React.createElement("p", {
    className: "skill_cell"
  }), /*#__PURE__*/React.createElement("p", {
    className: "skill_cell"
  }), /*#__PURE__*/React.createElement("p", {
    className: "skill_cell"
  })), subSkills.map(subSkillKey => {
    const fixedSubSkill = {
      label: `${fixedSkill.label}: ${subSkillKey}`,
      aptitudeKey: fixedSkill.aptitudeKey
    };
    const rank = characterData.skills[skillKey][subSkillKey];

    const specialMod = (() => {
      const backgroundSkillData = (() => {
        const bgOptions = characterData.background.skillMod;

        for (let i = 0; i < bgOptions.length; i++) {
          if (bgOptions[i].selection === subSkillKey) {
            return bgOptions[i].mod;
          }
        }

        return 0;
      })();

      const factionSkillData = (() => {
        const factionOptions = characterData.faction.skillMod;

        for (let i = 0; i < factionOptions.length; i++) {
          if (factionOptions[i].selection === subSkillKey) {
            return factionOptions[i].mod;
          }
        }

        return 0;
      })();

      return backgroundSkillData + factionSkillData;
    })();

    return /*#__PURE__*/React.createElement(SimpleSkill, {
      fixedSkill: fixedSubSkill,
      skillKey: skillKey,
      characterData: characterData,
      specialMod: specialMod,
      rank: rank,
      key: ['overComp', 'simple-skill', skillKey].join('_')
    });
  }));
}

function SkillDisplay(props) {
  const fixedSkills = props.fixedSkills;
  const characterData = props.characterData;
  const charSkills = characterData.skills;
  console.log(charSkills);
  return /*#__PURE__*/React.createElement("section", {
    className: "Char-dsply__Skill-dsply skill_block"
  }, /*#__PURE__*/React.createElement("label", {
    className: "skill_row skill_header",
    key: ['over-skill', 'header'].join('_')
  }, /*#__PURE__*/React.createElement("p", {
    className: "skill_text"
  }, "Skill Name"), /*#__PURE__*/React.createElement("p", {
    className: "skill_cell"
  }, "+10"), /*#__PURE__*/React.createElement("p", {
    className: "skill_cell"
  }, "Normal"), /*#__PURE__*/React.createElement("p", {
    className: "skill_cell"
  }, "-10"), /*#__PURE__*/React.createElement("p", {
    className: "skill_cell"
  }, "-20"), /*#__PURE__*/React.createElement("p", {
    className: "skill_cell"
  }, "-30")), /*#__PURE__*/React.createElement("div", {
    className: "skill_scroll-block"
  }, Object.keys(fixedSkills).map(skillKey => {
    const fixedSkill = fixedSkills[skillKey];

    const specialMod = (() => {
      let total = 0;
      const bgOptions = characterData.background.skillMod;

      for (let i = 0; i < bgOptions.length; i++) {
        if (bgOptions[i].skillKey === skillKey) {
          total += bgOptions[i].mod;
        }
      }

      const facOptions = characterData.faction.skillMod;

      for (let i = 0; i < facOptions.length; i++) {
        if (facOptions[i].skillKey === skillKey) {
          total += facOptions[i].mod;
        }
      }

      return total;
    })();

    if (fixedSkill.options) {
      return /*#__PURE__*/React.createElement(TemplateSkill, {
        fixedSkill: fixedSkill,
        skillKey: skillKey,
        characterData: characterData,
        key: ['overComp', 'templet-skill', skillKey].join('_')
      });
    } else {
      let rank = characterData.skills[skillKey] ? characterData.skills[skillKey] : 0;
      Object.keys(charSkills).forEach(option => {
        if (option === skillKey) rank = charSkills[option];
      });
      return /*#__PURE__*/React.createElement(SimpleSkill, {
        fixedSkill: fixedSkill,
        skillKey: skillKey,
        characterData: characterData,
        specialMod: specialMod,
        rank: rank,
        key: ['overComp', 'simple-skill', skillKey].join('_')
      });
    }
  })));
}

function ProfileDisplay(props) {
  const plyName = props.characterData.playerName;
  const charName = props.characterData.characterName;
  const subAge = props.characterData.subjectiveAge;
  const ObAge = props.characterData.objectiveAge;
  return /*#__PURE__*/React.createElement("div", {
    className: "Char-dsply__Profile"
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "Player Name: "), plyName), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "Character Name: "), charName), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "Subjective Age: "), subAge), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "Objective Age: "), ObAge));
}

function HealthTracking(props) {
  const sleeve = props.characterData.sleeve;
  const will = props.characterData.aptitudes.wil.total;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h3", {
    className: "Char-dsply__Health__Head"
  }, "Health Tracking"), /*#__PURE__*/React.createElement("section", {
    className: "Char-dsply__Health"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "Armor (Energy/Kenetic)"), /*#__PURE__*/React.createElement("input", {
    type: "text"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "Durability"), /*#__PURE__*/React.createElement("p", null, sleeve.durability)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "Damage: "), /*#__PURE__*/React.createElement("input", {
    type: "text"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "Wound Threshold"), /*#__PURE__*/React.createElement("p", null, sleeve.durability / 5)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "Wounds: "), /*#__PURE__*/React.createElement("input", {
    type: "number",
    step: "1"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "Lucidity"), /*#__PURE__*/React.createElement("p", null, will * 2)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "Stress"), /*#__PURE__*/React.createElement("input", {
    type: "text"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "Trauma Threshold"), /*#__PURE__*/React.createElement("p", null, Math.ceil(will / 2))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "Mental Trauma: "), /*#__PURE__*/React.createElement("input", {
    type: "number",
    step: "1"
  }))));
}

function WeaponsDisplay(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "Char-dsply__Wpt-Dsply"
  }, /*#__PURE__*/React.createElement("span", {
    className: "Char-dsply__Wpt-Head"
  }, /*#__PURE__*/React.createElement("p", null, "Weapon"), /*#__PURE__*/React.createElement("p", null, "Skill"), /*#__PURE__*/React.createElement("p", null, "AP"), /*#__PURE__*/React.createElement("p", null, "DV"), /*#__PURE__*/React.createElement("p", null, "Modes"), /*#__PURE__*/React.createElement("p", null, "Ammo"), /*#__PURE__*/React.createElement("p", null, "Range"), /*#__PURE__*/React.createElement("p", null, "Notes:")), /*#__PURE__*/React.createElement("span", {
    className: "Char-dsply__Wpt-Melee"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text"
  }), /*#__PURE__*/React.createElement("textarea", {
    rows: "3"
  })), /*#__PURE__*/React.createElement("span", {
    className: "Char-dsply__Wpt-Melee"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text"
  }), /*#__PURE__*/React.createElement("textarea", {
    rows: "3"
  })), /*#__PURE__*/React.createElement("span", {
    className: "Char-dsply__Wpt-Ranged"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text"
  }), /*#__PURE__*/React.createElement("textarea", {
    rows: "3"
  })));
}

class CharacterDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modifires: 0
    };
    this.handleUplife = this.handleUplife.bind(this);
  }

  handleUplife(data, key) {
    const newState = this.state;
    newState[key] = data;
    this.setState(newState);
  }

  render() {
    console.log(this.props);
    const fixedSkills = this.props.dataStatic.skills;
    const characterData = this.props.characterData;
    return /*#__PURE__*/React.createElement("div", {
      className: "Char-dsply__Main-Cont"
    }, /*#__PURE__*/React.createElement("div", {
      className: "Char-dsply__Section-One"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(AtributeDisplay, {
      characterData: characterData
    }), /*#__PURE__*/React.createElement(SkillDisplay, {
      characterData: characterData,
      fixedSkills: fixedSkills,
      modifires: this.state.modifires
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ProfileDisplay, {
      characterData: characterData
    }), /*#__PURE__*/React.createElement(HealthTracking, {
      characterData: characterData,
      handleUplife: this.handleUplife
    }))), /*#__PURE__*/React.createElement(WeaponsDisplay, {
      characterData: characterData,
      modifires: this.state.modifires
    }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        this.props.handleUpLift('characterSheet', 'page');
      }
    }, "Character Display"));
  }

}

export default CharacterDisplay;