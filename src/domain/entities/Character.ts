export interface ICharacter {
  name: string;
  description: string;
  id: number;
  avatar: string;
  skills: Array<Skill>;
  alternateSkills: Array<string>;
  charFilter: Array<string>;
  skillFilter: Array<string>;
  chakraUsed: Array<string>;
  mission: Array<string>;
}

export type Skill = {
  skillName: string;
  skillPics: string;
  skillDescription: string;
  skillClasses: string;
  skillCost: Array<string>;
  skillCooldown: string;
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
  chakraUsed: [],
  mission: [],
};
