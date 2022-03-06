export interface ICharacter {
  name: string;
  description: string;
  id: number;
  avatar: string;
  skills: Array<Skill>;
  alternateSkills: Array<string>;
  charFilter: Array<string>;
  skillFilter: Array<string>;
}

export type Skill = {
  name: string;
  pic: string;
  description: string;
  ability: {
    value: number;
    target: Array<string>;
    classes: Array<string>;
    require: Array<string>;
    effect: Array<Effect>;
    aditionalDamage: Array<AditionalDamage>;
    cost: Array<Cost>;
    cooldown: number;
  };
};

export const DEFAULT_CHARACTER = {
  name: "",
  description: "",
  id: 0,
  avatar: "",
  skills: [],
  alternateSkills: [],
  charFilter: [],
  skillFilter: [],
};

type Effect = {
  turn: number;
  value: number;
  name: string;
};

type AditionalDamage = {
  name: string;
  value: number;
};

type Cost = {
  type: string;
  quantity: number;
};

export interface IInBattleCharacter extends ICharacter {
  health: number;
  condition: Array<string>;
}
