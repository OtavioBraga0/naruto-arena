export interface ICharacter {
  name: string;
  description: string;
  place: number;
  avatar: string;
  skills: Array<Skill>;
  alternateSkills: [];
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
