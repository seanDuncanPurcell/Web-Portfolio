import React,{Component} from 'react';
import Background from './Background';
//this data block will be dirved from the rule book and can not be altered by players
const staticData = {
  playerName: {        
    label: 'Player Name',
    id: 'plynam01',
    type: 'text',
    value: ''
  },
  characterName: {        
    label: 'Character Name',
    id: 'charnam02',
    type: 'text',
    value: ''
  },
  subjectiveAge: {        
    label: 'Subjective Age',
    id: 'fisihghari65644f34s6',
    type: 'text',
    value: ''
  },
  objectiveAge: {        
    label: 'Objective Age',
    id: '45g45g3sadfg5f15s3',
    type: 'text',
    value: ''
  },
  sleeve: {        
    label: 'Sleeve',
    type: 'dropDown',
    options: {
      default: {
        label: 'Select One',
        aptitudesMods: {
          cog: 0,
          coo: 0,
          int: 0,
          ref: 0,
          sav: 0,
          som: 0,
          wil: 0,
        },
        aptitudesMax: 25,
        skillMods: {
          animalHandling: 0,
        },
        cost: 0
      }, 
      normal: {
        label: 'Normal',
        aptitudesMods: {
          cog: 0,
          coo: 0,
          int: 0,
          ref: 0,
          sav: 0,
          som: 0,
          wil: 0,
        },
        aptitudesMax: 25,
        skillMods: {
          climbing: 0
        },
        cost: 0
      }, 
      gradeTwo: {
        label: 'Grade 2',
        aptitudesMods: {
          cog: 3,
          coo: 0,
          int: 0,
          ref: 0,
          sav: 0,
          som: 3,
          wil: 0,
        },
        aptitudesMax: 30,
        skillMods: {
          animalHandling: 0
        },
        cost: 10
      }, 
      gradeThree: {
        label: 'Grade 3',
        aptitudesMods: {
          cog: 5,
          coo: 0,
          int: 0,
          ref: 0,
          sav: 0,
          som: 5,
          wil: 0,
        },
        aptitudesMax: 40,
        skillMods: {
          blades: +10,
        },
        cost: 20
      }, 
    }
  },
  background: {        
    label: 'What is your history?',
    type: 'background',
    options: {
      drifter: {
        label: 'DRIFTER',
        description: `You were raised with a social grouping that remained
        on the move throughout the Sol system. This could
        have been free traders, pirates, asteroid farmers,
        scavengers, or just migrant workers. You are used to
        roaming space travel between habitats and stations.`,
        skillMod: [
          { type: 'singleSkill'
          , skillKey: 'navigation'
          , subSkillKey: undefined
          , mod: 10 },

          { type: 'templateSkill'
          , skillKey: 'pilot'
          , subSkillKey: ['Spacecraft']
          , selection: 'Spacecraft'
          , mod: 20 },

          { type: 'templateSkill'
          , skillKey: 'networking'
          , subSkillKey:
            [ 'Autonomists', 'Criminals', 'Ecologists', 'Firewall'
            , 'Hypercorps', 'Media', 'Scientists']
          , selection: 'Autonomists'
          , mod: 10 }
        ],
        rep: {
          at: 50, c: 50,
          e: 50, f: 50,
          g: 50, i: 50,
          r: 50
        },
        traits: 0,
        moxieMod: 1,
        creditMod: 5000
      },
      fallEvacuee: {
        label: 'FALL EVACUEE',
        description: `You were born and raised on Earth and evacuated
        during the horrors of the Fall, leaving your old life
        (and possibly your friends, family, and loved ones)
        behind you. You were lucky enough to survive with
        your body intact and continue to make a life for yourself
        out in the system.`,
        skillMod: [
          { type: 'templateSkill'
          , skillKey: 'pilot'
          , subSkillKey: ['Groundcraft']
          , selection: 'Groundcraft'
          , mod: 20 },

          { type: 'templateSkill'
          , skillKey: 'networking'
          , subSkillKey:
            [ 'Autonomists', 'Criminals', 'Ecologists', 'Firewall'
            , 'Hypercorps', 'Media', 'Scientists']
          , selection: 'Autonomists'
          , mod: 20 }
        ],
        rep: {
          at: 50, c: 50,
          e: 50, f: 50,
          g: 50, i: 50,
          r: 50
        },
        traits: 0,
        moxieMod: 2,
        creditMod: 2500
      },
      hyperelite: {
        label: 'HYPERELITE',
        description: `You are privileged to have been raised as part of the
        immortal upper class that rules many inner system
        habitats and hypercorps. You were pampered with wealth and 
        influence that most people can only dream of.`,
        skillMod: [
          { type: 'singleSkill'
          , skillKey: 'protocol'
          , subSkillKey: undefined
          , mod: 10 },

          { type: 'templateSkill'
          , skillKey: 'networking'
          , subSkillKey: ['Hypercorp']
          , selection: 'Hypercorp'
          , mod: 20 },
        ],
        rep: {
          at: 50, c: 50,
          e: 50, f: 50,
          g: 50, i: 50,
          r: 50
        },
        traits: 0,
        moxieMod: 1,
        creditMod: 10000
      },
      isolate: {
        label: 'ISOLATE',
        description: `You were raised as part of a self-exiled grouping on
        the fringes of the system. Whether raised as part of
        a religious group, cult, social experiment, anti-tech
        cell, or a group that just wanted to be isolated, you
        spent most if not all of your upbringing isolated
        from other factions.`,
        skillMod: [
          { type: 'multiple'
          , skillKey: [
            'animalHandling', 'beamWeapons', 'blades',
            'climbing','clubs', 'constrol', 'deception',
            'demolitions', 'disguise', 'exoticMelee',
            'exoticRanged', 'flight', 'fray',
            'freeFall', 'freeRunning', 'gunnery',
            'hardware', 'impersonatoin', 'infiltration',
            'infoSec', 'interfacing', 'intimidation',
            'investigation', 'kinesice', 'kineticWeapons',
            'medicine', 'networking', 'palming',
            'perception', 'persuasion', 'pilot',
            'programming', 'protocol', 'psiAssault',
            'psychosurgery', 'research', 'scrounging',
            'seekerWeapons', 'sence', 'sprayWeapons',
            'swimming', 'thrownWeapons', 'unarmedConbat'
          ]
          , mod: 20 },
          { type: 'multiple'
          , skillKey: [
            'animalHandling', 'beamWeapons', 'blades',
            'climbing','clubs', 'constrol', 'deception',
            'demolitions', 'disguise', 'exoticMelee',
            'exoticRanged', 'flight', 'fray',
            'freeFall', 'freeRunning', 'gunnery',
            'hardware', 'impersonatoin', 'infiltration',
            'infoSec', 'interfacing', 'intimidation',
            'investigation', 'kinesice', 'kineticWeapons',
            'medicine', 'networking', 'palming',
            'perception', 'persuasion', 'pilot',
            'programming', 'protocol', 'psiAssault',
            'psychosurgery', 'research', 'scrounging',
            'seekerWeapons', 'sence', 'sprayWeapons',
            'swimming', 'thrownWeapons', 'unarmedConbat'
          ]
          , mod: 20 }
        ],
        rep: {
          at: 40, c: 40,
          e: 40, f: 40,
          g: 40, i: 40,
          r: 40
        },
        traits: 0,
        moxieMod: 1,
        creditMod: 2500
      },
      lunarColonist: {
        label: 'LUNAR COLONIST',
        description: `You experienced your childhood in one of the cramped
        dome cities or underground stations on Luna, Earth’s
        moon. You had a ringside seat to the Fall of Earth.`,
        skillMod: [

          { type: 'templateSkill'
          , skillKey: 'pilot'
          , subSkillKey: ['Groundcraft']
          , selection: 'Groundcraft'
          , mod: 10 },

          { type: 'multiple'
          , skillKey: 
            [ 'academic', 'demolitions', 'hardware', 'infosec'
            , 'interfacing', 'medicine', 'profession', 'programming'
            , 'psychosurgery', 'research']
          , mod: 10 },

          { type: 'templateSkill'
          , skillKey: 'networking'
          , subSkillKey: ['Hypercorps']
          , selection: 'Hypercorps'
          , mod: 20 }
        ],
        rep: {
          at: 50, c: 50,
          e: 50, f: 50,
          g: 50, i: 50,
          r: 50
        },
        traits: 0,
        moxieMod: 1,
        creditMod: 5000
      },
      marsborn: {
        label: 'MARSBORN',
        description: `You were raised in a station on or above Mars, now
        the most populated planet in the system. Your home
        town may or may not have survived the Fall.`,
        skillMod: [
          { type: 'templateSkill'
          , skillKey: 'pilot'
          , subSkillKey: ['Groundcraft']
          , selection: 'Groundcraft'
          , mod: 15 },

          { type: 'multiple'
          , skillKey: 
            [ 'academic', 'demolitions', 'hardware', 'infosec'
            , 'interfacing', 'medicine', 'profession', 'programming'
            , 'psychosurgery', 'research']
          , mod: 10 },

          { type: 'templateSkill'
          , skillKey: 'networking'
          , subSkillKey: ['Hypercorps']
          , selection: 'Hypercorps'
          , mod: 20 }
        ],
        rep: {
          at: 50, c: 50,
          e: 50, f: 50,
          g: 50, i: 50,
          r: 50
        },
        traits: 0,
        moxieMod: 1,
        creditMod: 5000
      },
      oGSpaceColonist: {
        label: 'ORIGINAL SPACE COLONIST',
        description: `You or your parents were part of the first “generations”
        of colonists/workers sent out from Earth to stake a
        claim in space, so you are familiar with the cramped
        confines of spaceflight and life aboard older stations
        and habitats. As a “zero-one g” (zero-gravity, firstgen),
        you were never part of the elite. People from
        your background typically have some sort of specialized
        tech training as vacworkers or habtechs.`,
        skillMod: [
          { type: 'multiple'
          , skillKey: ['pilot', 'freefall']
          , mod: 10 },

          { type: 'multiple'
          , skillKey: 
            [ 'academic', 'demolitions', 'hardware', 'infosec'
            , 'interfacing', 'medicine', 'profession', 'programming'
            , 'psychosurgery', 'research']
          , mod: 10 },

          { type: 'templateSkill'
          , skillKey: 'networking'
          , subSkillKey:
            [ 'Autonomists', 'Criminals', 'Ecologists', 'Firewall'
            , 'Hypercorps', 'Media', 'Scientists']
          , selection: 'Autonomists'
          , mod: 20 }
        ],
        rep: {
          at: 50, c: 50,
          e: 50, f: 50,
          g: 50, i: 50,
          r: 50
        },
        traits: 0,
        moxieMod: 1,
        creditMod: 5000
      },
      reInstantiate: {
        label: 'RE-INSTANTIATED',
        description: `You were born and raised on Earth, but you did not
        survive the Fall. All that you know is that your body
        died there, but your backup was transmitted offworld,
        and you were one of the lucky few to be re-instantiated
        with a new morph. You may have spent years in dead
        storage, simulspace, or as an infomorph slave.`,
        skillMod: [

          { type: 'templateSkill'
          , skillKey: 'pilot'
          , subSkillKey: ['Groundcraft']
          , selection: 'Groundcraft'
          , mod: 15 },

          { type: 'templateSkill'
          , skillKey: 'networking'
          , subSkillKey:
            [ 'Autonomists', 'Criminals', 'Ecologists', 'Firewall'
            , 'Hypercorps', 'Media', 'Scientists']
          , selection: 'Autonomists'
          , mod: 10 },
        ],
        rep: {
          at: 50, c: 50,
          e: 50, f: 50,
          g: 50, i: 50,
          r: 50
        },
        traits: ['editedMemories'],
        moxieMod: 3,
        creditMod: 0
      },
      scumborn: {
        label: 'SCUMBORN',
        description: `You were raised in the nomadic and chaotic lifestyle
        common to scum barges. "There is some lovely filth down here" -Your Mom`,
        skillMod: [
          { type: 'multiple'
          , skillKey: ['persuasion', 'deception']
          , mod: 10 },

          { type: 'singleSkill'
          , skillKey: 'scrounging'
          , subSkillKey: undefined
          , mod: 10 },

          { type: 'templateSkill'
          , skillKey: 'networking'
          , subSkillKey: [ 'Autonomists']
          , selection: 'Autonomists'
          , mod: 20 }

        ],
        rep: {
          at: 50, c: 50,
          e: 50, f: 50,
          g: 50, i: 50,
          r: 50
        },
        traits: 0,
        moxieMod: 1,
        creditMod: 5000
      },
      uplift: {
        label: 'UPLIFT',
        description: `You are not even human. You were born as an uplifted
        animal: chimpanzee, gorilla, orangutan, parrot, raven,
        crow, or octopus.`,
        skillMod: [
          { type: 'singleSkill'
          , skillKey: 'fray'
          , subSkillKey: undefined
          , mod: 10 },

          { type: 'singleSkill'
          , skillKey: 'perception'
          , subSkillKey: undefined
          , mod: 10 },

          { type: 'multiple'
          , skillKey: ['academics', 'art', 'interest', 'language', 'profession']
          , mod: 20 }
        ],
        rep: {
          at: 50, c: 50,
          e: 50, f: 50,
          g: 50, i: 50,
          r: 50
        },
        traits: 0,
        moxieMod: 1,
        creditMod: 5000
      }
    }
  },
  faction: {        
    label: 'What Social Movement Do you Support?',
    type: 'faction',
    options: {
      anarchist: {
        label: 'ANARCHIST',

        description: `You are opposed to hierarchy, favoring flat forms of
        social organization and directly democratic decisionmaking.
        You believe power is always corrupting and
        everyone should have a say in the decisions that affect
        their lives. According to the primitive and restrictive
        policies of the inner system and Jovian Junta, this
        makes you an irresponsible hoodlum at best and a terrorist
        at worst. In your opinion, that’s comedy coming
        from governments that keep their populations in line
        with economic oppression and threats of violence.`,

        skillMod: [
          { type: 'multiple'
          , skillKey: [
            'animalHandling', 'beamWeapons', 'blades',
            'climbing','clubs', 'constrol', 'deception',
            'demolitions', 'disguise', 'exoticMelee',
            'exoticRanged', 'flight', 'fray',
            'freeFall', 'freeRunning', 'gunnery',
            'hardware', 'impersonatoin', 'infiltration',
            'infoSec', 'interfacing', 'intimidation',
            'investigation', 'kinesice', 'kineticWeapons',
            'medicine', 'networking', 'palming',
            'perception', 'persuasion', 'pilot',
            'programming', 'protocol', 'psiAssault',
            'psychosurgery', 'research', 'scrounging',
            'seekerWeapons', 'sence', 'sprayWeapons',
            'swimming', 'thrownWeapons', 'unarmedConbat'
          ]
          , mod: 10 },

          { type: 'templateSkill'
          , skillKey: 'networking'
          , subSkillKey: ['Autonomists']
          , selection: 'Autonomists'
          , mod: 30 }

        ],
        rep: {
          at: 0, c: 0,
          e: 0, f: 0,
          g: 0, i: 0,
          r: 0
        },
        traits: 0,
        moxieMod: 0,
        creditMod: 0
      },
      argonaut: {
        label: 'ARGONAUT',

        description: `You are part of a scientific technoprogressive movement
        that seeks to solve transhumanity’s injustices and
        inequalities with technology. You support universal
        access to technology and healthcare, open-source
        models of production, morphological freedom, and
        democratization. You try to avoid factionalism and
        divisive politics, seeing transhumanity’s splintering as
        a hindrance to its perpetuation.`,

        skillMod: [

          { type: 'multiple'
          , skillKey: 
            [ 'academic', 'demolitions', 'hardware', 'infosec'
            , 'interfacing', 'medicine', 'profession', 'programming'
            , 'psychosurgery', 'research']
          , mod: 10 },

          { type: 'multiple'
          , skillKey: 
            [ 'academic', 'demolitions', 'hardware', 'infosec'
            , 'interfacing', 'medicine', 'profession', 'programming'
            , 'psychosurgery', 'research']
          , mod: 10 },

          { type: 'templateSkill'
          , skillKey: 'networking'
          , subSkillKey: ['Scientists']
          , selection: 'Scientists'
          , mod: 20 }

        ],
        rep: {
          at: 0, c: 0,
          e: 0, f: 0,
          g: 0, i: 0,
          r: 0
        },
        traits: 0,
        moxieMod: 0,
        creditMod: 0
      },
      barsoomian: {
        label: 'BARSOOMIAN',

        description: `You call the Martian outback and wilds your home. You are a
        “redneck,” a lower-class Martian from the rural areas that often
        find themselves in conflict with the policies and goals of the hypercorp
        domes and Tharsis League.`,

        skillMod: [
          { type: 'singleSkill'
          , skillKey: 'freeRunning'
          , subSkillKey: undefined
          , mod: 10 },

          { type: 'multiple'
          , skillKey: [
            'animalHandling', 'beamWeapons', 'blades',
            'climbing','clubs', 'constrol', 'deception',
            'demolitions', 'disguise', 'exoticMelee',
            'exoticRanged', 'flight', 'fray',
            'freeFall', 'freeRunning', 'gunnery',
            'hardware', 'impersonatoin', 'infiltration',
            'infoSec', 'interfacing', 'intimidation',
            'investigation', 'kinesice', 'kineticWeapons',
            'medicine', 'networking', 'palming',
            'perception', 'persuasion', 'pilot',
            'programming', 'protocol', 'psiAssault',
            'psychosurgery', 'research', 'scrounging',
            'seekerWeapons', 'sence', 'sprayWeapons',
            'swimming', 'thrownWeapons', 'unarmedConbat'
          ]
          , mod: 10 },

          { type: 'templateSkill'
          , skillKey: 'networking'
          , subSkillKey: ['Autonomists']
          , selection: 'Autonomists'
          , mod: 20 }

        ],
        rep: {
          at: 0, c: 0,
          e: 0, f: 0,
          g: 0, i: 0,
          r: 0
        },
        traits: 0,
        moxieMod: 0,
        creditMod: 0
      },
      brinnker: {
        label: 'BRINKER',

        description: `You or your faction is reluctant to deal with the rest of the transhumanity
        and the various goings-on in the rest of the system. Your
        particular grouping may have sought out self-imposed isolation to
        pursue their own interests, or they may have been exiled for their
        unpopular beliefs. Or you may simply be a loner who prefers the
        vast emptiness of space to socializing with others. You might be a
        religious cultist, a primitivist, a utopian, or something altogether
        uninterested in transhumanity.`,

        skillMod: [
          { type: 'templateSkill'
          , skillKey: 'pilot'
          , subSkillKey: [ 'Spacecraft']
          , selection: 'Spacecraft'
          , mod: 10 },

          { type: 'multiple'
          , skillKey: [
            'animalHandling', 'beamWeapons', 'blades',
            'climbing','clubs', 'constrol', 'deception',
            'demolitions', 'disguise', 'exoticMelee',
            'exoticRanged', 'flight', 'fray',
            'freeFall', 'freeRunning', 'gunnery',
            'hardware', 'impersonatoin', 'infiltration',
            'infoSec', 'interfacing', 'intimidation',
            'investigation', 'kinesice', 'kineticWeapons',
            'medicine', 'networking', 'palming',
            'perception', 'persuasion', 'pilot',
            'programming', 'protocol', 'psiAssault',
            'psychosurgery', 'research', 'scrounging',
            'seekerWeapons', 'sence', 'sprayWeapons',
            'swimming', 'thrownWeapons', 'unarmedConbat'
          ]
          , mod: 10 },

          { type: 'templateSkill'
          , skillKey: 'networking'
          , subSkillKey:
            [ 'Autonomists', 'Criminals', 'Ecologists', 'Firewall'
            , 'Hypercorps', 'Media', 'Scientists']
          , selection: 'Autonomists'
          , mod: 20 }
        ],

        rep: {
          at: 0, c: 0,
          e: 0, f: 0,
          g: 0, i: 0,
          r: 0
        },

        traits: 0,
        moxieMod: 0,
        creditMod: 0
      },
      criminal: {
        label: 'CRIMINAL',

        description: `You are involved with the crime-oriented underworld. You may
        work with one of the Sol system’s major criminal factions—triads,
        the Night Cartel, the ID Crew, Nine Lives, Pax Familae—or one
        of the smaller, local operators with a big stake in a specific habitat.
        You might be a vetted member-for-life, a reluctant recruit, or just a
        freelancer looking for the next gig.`,

        skillMod: [
          { type: 'singleSkill'
          , skillKey: 'intimidation'
          , subSkillKey: undefined
          , mod: 10 },

          { type: 'templateSkill'
          , skillKey: 'networking'
          , subSkillKey: ['Criminal']
          , selection: 'Criminal'
          , mod: 30 }
        ],

        rep: {
          at: 0, c: 0,
          e: 0, f: 0,
          g: 0, i: 0,
          r: 0
        },

        traits: 0,
        moxieMod: 0,
        creditMod: 0
      },
      extropian: {
        label: 'EXTROPIAN',

        description: `You are an anarchistic supporter of the free market and private
        property. You oppose government and favor a system where security
        and legal matters are handled by private competitors. Whether
        you consider yourself an anarcho-capitalist or a mutualist (a difference
        only other Extropians can figure out), you occupy a middle
        ground between the hypercorps and autonomists, dealing with
        both and yet trusted by neither.`,

        skillMod: [
          { type: 'singleSkill'
          , skillKey: 'persuasion'
          , subSkillKey: undefined
          , mod: 10 },

          { type: 'templateSkill'
          , skillKey: 'networking'
          , subSkillKey: ['Hypercorps']
          , selection: 'Hypercorps'
          , mod: 20 }
        ],

        rep: {
          at: 0, c: 0,
          e: 0, f: 0,
          g: 0, i: 0,
          r: 0
        },
        traits: 0,
        moxieMod: 0,
        creditMod: 0
      },
      hypercorp: {
        label: 'HYPERCORP',

        description: `You hail from a habitat controlled by the hypercorps. You might
        be a hypercapitalist entrepeneur, a hedonistic socialite, or a lowly
        vacworker, but you accept that certain liberties must be sacrificed
        for security and freedom.`,

        skillMod: [
          { type: 'singleSkill'
          , skillKey: 'protocol'
          , subSkillKey: undefined
          , mod: 10 },

          { type: 'templateSkill'
          , skillKey: 'networking'
          , subSkillKey: ['Hypercorps']
          , selection: 'Hypercorps'
          , mod: 20 },

          { type: 'templateSkill'
          , skillKey: 'networking'
          , subSkillKey:
            [ 'Autonomists', 'Criminals', 'Ecologists', 'Firewall'
            , 'Hypercorps', 'Media', 'Scientists']
          , selection: 'Autonomists'
          , mod: 10 }
        ],
        
        rep: {
          at: 0, c: 0,
          e: 0, f: 0,
          g: 0, i: 0,
          r: 0
        },
        traits: 0,
        moxieMod: 0,
        creditMod: 0
      }   
    }
  },
  skills: {
    academics: {
      label: 'Academics',
      tags: ['Knowledge'],
      aptitudeKey: 'cog',
      options: [
        'Archeology', 'Astrobiology', 'Astronomy',
        'Astrophysics', 'Astrosociology', 'Biochemistry', 
        'Biology', 'Botany', 'Computer Science',
        'Cryptography', 'Economics', 'Engineering',
        'Genetics', 'Geology', 'Linguistics',
        'Mathematics', 'Memetics', 'Nanotechnology',
        'Old-Earth-History', 'Physics', 'Political-Science',
        'Psychology', 'Sociology', 'Xeno-archeology',
        'Xenolinguistics', 'Zoology'
      ]
    },
    animalHandling: {
      label: 'Animal Handling',
      tags: ['Active', 'Social'],
      aptitudeKey: 'sav'
    },
    art: {
      label: 'Art',
      aptitudeKey: 'int',
      tags: ['Knowledge'],
      options: [
        'Architecture', 'Criticism', 'Dance',
        'Drama', 'Drawing', 'Painting',
        'Performance', 'Sculpture', 'Simulspace-Design',
        'Singing', 'Speech', 'Writing'
      ]
    },
    beamWeapons: {
      label: 'Beam Weapons',
      tags: ['Active', 'Combat'],
      aptitudeKey: 'coo'
    },
    blades: {
      label: 'Blades',
      tags: ['Active', 'Combat'],
      aptitudeKey: 'som'
    },
    climbing: {
      label: 'Climbing',
      tags: ['Active', 'Physical'],
      aptitudeKey: 'som'
    },
    clubs: {
      label: 'Clubs',
      tags: ['Active', 'Combat'],
      aptitudeKey: 'som'
    },
    control: {
      label: 'Control',
      tags: ['Active', 'Mental', 'Psi'],
      aptitudeKey: 'wil'
    },
    deception: {
      label: 'Deception',
      tags: ['Active', 'Social'],
      aptitudeKey: 'sav'
    },
    demolitions: {
      label: 'Demolitions',
      tags: ['Active', 'Technical'],
      aptitudeKey: 'cog'
    },
    disguise: {
      label: 'Disguise',
      tags: ['Active', 'Pysical'],
      aptitudeKey: 'int'
    },
    exoticMelee: {
      label: 'Exotic Melee',
      tags: ['Active', 'Combat'],
      aptitudeKey: 'som',
      options: ['Morning-Star', 'Spear', 'Whip']
    },
    exoticRanged: {
      label: 'Exotic Ranged',
      tags: ['Active', 'Combat'],
      aptitudeKey: 'coo',
      options: ['Blowgun', 'Crossbow', 'Slingshot']
    },
    flight: {
      label: 'Flight',
      tags: ['Active', 'Physical'],
      aptitudeKey: 'som'
    },
    fray: {
      label: 'Fray',
      tags: ['Active', 'Combat'],
      aptitudeKey: 'ref'
    },
    freeFall: {
      label: 'Free Fall',
      tags: ['Active', 'Physical'],
      aptitudeKey: 'ref'
    },
    freeRunning: {
      label: 'Freerunning',
      tags: ['Active', 'Physical'],
      aptitudeKey: 'som'
    },
    gunnery: {
      label: 'Gunnery',
      tags: ['Active', 'Combat'],
      aptitudeKey: 'int'
    },
    hardware: {
      label: 'Hardware',
      tags: ['Active', 'Technical'],
      aptitudeKey: 'cog',
      options: [
        'Aerospace', 'Armorer', 'Electronics', 'Groundcraft', 
        'Implants', 'Industrial', 'Nautical', 'Robotics'
      ]
    },
    impersonatoin: {
      label: 'Impersonation',
      tags: ['Active', 'Social'],
      aptitudeKey: 'sav'
    },
    infiltration: {
      label: 'Infiltration',
      tags: ['Active', 'Physical'],
      aptitudeKey: 'coo'
    },
    infoSec: {
      label: 'Infosec',
      tags: ['Active', 'Technical'],
      aptitudeKey: 'cog'
    },
    interest: {
      label: 'Interest',
      tags: ['Knowledge'],
      aptitudeKey: 'cog',
      options: [
        'Ancient_Sports', 'Celebrity_Gossip', 'Conspiracies',
        'Factor_Trivia', 'Gambling', 'Hypercorp_Politics',
        'Lunar_Habitats,', 'Martian_Beers', 'Old_Earth_Nation-States',
        'Reclaimer_Blogs', 'Science_Fiction', 'Scum_Drug_Dealers',
        'Spaceship_Models', 'Triad_Economics', 'Underground_XP'
      ]
    },
    interfacing: {
      label: 'Interfacing',
      tags: ['Active', 'Technical'],
      aptitudeKey: 'cog'
    },
    intimidation: {
      label: 'Intimidation',
      tags: ['Active', 'Social'],
      aptitudeKey: 'sav'
    },
    investigation: {
      label: 'Investigation',
      tags: ['Active', 'Mental'],
      aptitudeKey: 'int'
    },
    kinesice: {
      label: 'Kinesics',
      tags: ['Active', 'Social'],
      aptitudeKey: 'sav'
    },
    kineticWeapons: {
      label: 'Kinetic Weapons',
      tags: ['Active', 'Combat'],
      aptitudeKey: 'coo'
    },
    language: {
      label: 'Language',
      tags: ['Knowledge'],
      aptitudeKey: 'int',
      options: [
        'Arabic', 'Bangali', 'Cantonese', 'English',
        'French', 'Hindi', 'Japanese',
        'Mandarin', 'Portuguese', 'Russian',
        'Spanish',
      ]
    },
    medicine: {
      label: 'Medicine',
      aptitudeKey: 'cog',
      tags: ['Active', 'Technical'],
      options: [
        'Biosculpting', 'Exotic-Biomorphs', 'Gene-Therapy,', 'General-Practice', 
        'Implant-Surgery', 'Nanomedicine', 'Paramedic', 'Pods', 'Psychiatry', 'Remote-Surgery', 
        'Trauma-Surgery', 'Uplifts', 'Veterinary'
      ]
    },
    navigation: {
      label: 'Navigation',
      tags: ['Active', 'Mental'],
      aptitudeKey: 'int'
    },
    networking: {
      label: 'Networking',
      tags: ['Active', 'Social'],
      aptitudeKey: 'sav',
      options: [
        'Autonomists', 'Criminals', 'Ecologists', 'Firewall', 
        'Hypercorps', 'Media', 'Scientists'
      ]
    },
    palming: {
      label: 'Palming',
      tags: ['Active', 'Physical'],
      aptitudeKey: 'coo'
    },
    perception: {
      label: 'Perception',
      tags: ['Active', 'Mental'],
      aptitudeKey: 'int'
    },
    persuasion: {
      label: 'Persuasion',
      tags: ['Active', 'Social'],
      aptitudeKey: 'sav'
    },
    pilot: {
      label: 'Pilot',
      tags: ['Active', 'Vehicle'],
      aptitudeKey: 'ref',
      options: [
        'Aircraft', 'Anthroform', 'Exotic-Vehicle', 
        'Groundcraft', 'Spacecraft', 'Watercraft'
      ]
    },
    profession: {
      label: 'Profession',
      tags: ['Knowledge'],
      aptitudeKey: 'cog',
      options: [
        'Accounting', 'Appraisal', 'Asteroid_Prospecting', 'Banking',
        'Cool_Hunting', 'Con_Schemes', 'Distribution', 'Forensics', 
        'Lab_Technician', 'Mining', 'Police_Procedures', 'Psychotherapy', 
        'Security_Ops', 'Smuggling_Tricks', 'Social_Engineering', 'Squad_Tactics', 
        'Viral_Marketing', 'XP_Production'
      ]
    },
    programming: {
      label: 'Programming',
      tags: ['Active', 'Technical'],
      aptitudeKey: 'cog'
    },
    protocol: {
      label: 'Protocol',
      tags: ['Active', 'Social'],
      aptitudeKey: 'sav'
    },
    psiAssault: {
      label: 'Psi Assault',
      tags: ['Active', 'Mental', 'Psi'],
      aptitudeKey: 'wil'
    },
    psychosurgery: {
      label: 'Psychosurgery',
      tags: ['Active', 'Technical'],
      aptitudeKey: 'int'
    },
    research: {
      label: 'Research',
      tags: ['Active', 'Technical'],
      aptitudeKey: 'cog'
    },
    scrounging: {
      label: 'Scrounging',
      tags: ['Active', 'Mental'],
      aptitudeKey: 'int'
    },
    seekerWeapons: {
      label: 'Seeker Weapons',
      tags: ['Active', 'Combat'],
      aptitudeKey: 'coo'
    },
    sence: {
      label: 'Sence',
      tags: ['Active', 'Mental', 'Psi'],
      aptitudeKey: 'int'
    },
    sprayWeapons: {
      label: 'Spray Weapons',
      tags: ['Active', 'Combat'],
      aptitudeKey: 'coo'
    },
    swimming: {
      label: 'Swimming',
      tags: ['Active', 'Physical'],
      aptitudeKey: 'som'
    },
    thrownWeapons: {
      label: 'Thrown Weapons',
      tags: ['Active', 'Combat'],
      aptitudeKey: 'coo'
    },
    unarmedConbat: {
      label: 'Unarmed Combat',
      tags: ['Active', 'Combat'],
      aptitudeKey: 'som'
    },
  }
}

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
  sleeve: 'default',
  background: {
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
    skillsKnowledge: 0
  }
}

function skillArrayByTag (tag) {
  const skillKeys = Object.keys(staticData.skills)
  const skillAry = []
  skillKeys.forEach(skillKey => {
    const skill = staticData.skills[skillKey]
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
  const fixed = props.dataStatic;
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
        const maxApt = fixed.sleeve.options[dynamic.sleeve].aptitudesMax
        const myData = dynamic.aptitudes[key];
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
            <p>{myData.morphBonus}</p>
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
  const style = { color: 'black'}
  if(pontsSpent > pontsTotal) Object.assign( style, {color: 'red', fontWeight: 'bold'})
  return (
    <div className='Char-Builder_Point-Counter'>
      <strong>Points Spent:</strong>
      <p style={style}>{pontsSpent}</p>
      <p> / </p>
      <p>{pontsTotal}</p>
    </div>
  )
}

class Skills extends Component{
  constructor(props){
    super(props)
    this.totalePoinstSpent = 0
    this.SimpleSkill = this.SimpleSkill.bind(this)
    this.TemplateSkill = this.TemplateSkill.bind(this)
  }
  SimpleSkill(props){
    const dataDynmic = props.dataDynmic
    const dataStatic = props.dataStatic
    const fixedSkill = props.fixedSkill
    const rank = props.rank
    const skillKey = props.skillKey
    const specialMod = props.specialMod

    const aptMod = (()=>{
      const aptitude = dataDynmic.aptitudes[fixedSkill.aptitudeKey].total
      const morphMax = dataStatic.sleeve.options[dataDynmic.sleeve].aptitudesMax
      return (aptitude > morphMax) ? morphMax : aptitude
    })()
    const total = rank + aptMod + specialMod
  
    return (
      <label 
        className='skill_row'
        key={['skill', skillKey].join('_')}
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
      <section className='skill_block' >
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
        {skillList.map( skillKey => {
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
                skillKey={skillKey}
                specialMod={specialMod}
                dataStatic={this.props.dataStatic}
                dataDynmic={dataDynmic}
                handleChange={this.props.handleChange}
                key={['over-skill', skillKey].join('_')}
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
      </section>
    )
  }
}

class CharacterSheet extends Component {
  constructor(props){
    super(props)
    this.state = dynamicData
    this.staticData = staticData

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleNewSubSkill = this.handleNewSubSkill.bind(this)
    this.handleBackground = this.handleBackground.bind(this)
    this.handleFaction = this.handleFaction.bind(this)
    this.handleCP = this.handleCP.bind(this)
  }

  handleCP(change, attribute){
    const newCP = this.state.cp
    newCP[attribute] = change
    this.setState({cp: newCP})
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

  componentDidUpdate () {
    //Calc Total for Apts
    const apts = this.state.aptitudes
    Object.keys(apts).forEach( key => {
      const apt = apts[key];
      let morphBonus = apt.morphBonus;
      const sleeveBounse = this.staticData.sleeve.options[this.state.sleeve].aptitudesMods[key];
      const state = this.state;
      let change = false;
      
      //check for new sleeve bounses
      if(morphBonus !== sleeveBounse){
        state.aptitudes[key].morphBonus = sleeveBounse;        
        morphBonus = sleeveBounse;
        change = true;
      }
      
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
    const formMap = {
      one: {label: 'Step One', type: 'header'},
      playerName: playerName,
      characterName: characterName,
      subjectiveAge: subjectiveAge,
      objectiveAge: objectiveAge,
      two: {label: 'Step Two', type: 'header'},
      background: background,
      three: {label: 'Step Three', type: 'header'},
      faction: faction,
      four: {label: 'Step Four', type: 'header'},
      aptitudes: {type: 'aptitudes', cp: 105},
      five: {label: 'Step Five', type: 'header'},
      skillsActive: {type: 'skills', cp: 400, list: skillArrayByTag('Active')},
      six: {label: 'Step Six', type: 'header'},
      skillsKnowledge: {type: 'skills', cp: 300, list: skillArrayByTag('Knowledge')},
      seven: {label: 'Step Seven', type: 'header'},
      sleeve: sleeve
    }
    return(
      <>
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
                key={[item.type, key].join('_')}
              />
            )
          } else if (item.type === 'background') {
            return (
              <Background
                onSelection={this.handleBackground}
                form={this.staticData.background}
                dataStatic={this.staticData}
                key={['overComp', key, index].join('_')}
              />
            )
          } else if (item.type === 'faction') {
            return (
              <Background
                onSelection={this.handleFaction}
                form={this.staticData.faction}
                dataStatic={this.staticData}
              />
            )
          } else if (item.type === 'header') {
            return <h1 className='Char-Builder_Header' key={`header_${key}`}>{item.label}</h1>
          } else if (item.type === 'aptitudes') {
            return (
              <>
                <Counter pontsSpent={this.state.cp.aptitudes} pontsTotal={item.cp} />
                <Aptitudes
                  spendPoints={this.handleCP}
                  dataDynmic={this.state}
                  dataStatic={this.staticData}
                  handleChange={(event, keyOne, keyTwo ) => this.handleInputChange(event, 'aptitudes', keyOne, keyTwo)}
                />
              </>
            )
          } else if (item.type === 'skills') {
            return (
              <>
                <Counter pontsSpent={this.state.cp[key]} pontsTotal={item.cp} />
                <Skills
                  skillList={item.list}
                  spendPoints={ (points) => this.handleCP(points, key)}
                  dataDynmic={this.state}
                  dataStatic={this.staticData}
                  handleChange={(event, skill, subSkill) => {
                    this.handleInputChange(event, 'skills', skill, subSkill)
                  }}
                  handleNewSubSkill={this.handleNewSubSkill}
                />
              </>
            )
          } else {
            return <p>Failed to render element</p>
          }
        })}
        <br/>        
        <br/>
        <button onClick={()=>{
          console.log(this.state);
        }}>Report</button>
        <br/>
      </>
    )
  }
}

export default CharacterSheet;