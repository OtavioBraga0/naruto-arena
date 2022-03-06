import {
  createReducer,
  createAction,
  PayloadAction,
  Reducer,
} from "@reduxjs/toolkit";
import { EngageState } from "../DomainLayer";
import { PayloadActionCreator } from "@reduxjs/toolkit/src/createAction";
import { InBattleCharacter } from "../entities/Character";

export type BattleActionType = PayloadAction<boolean> | PayloadAction<void>;

export interface BattleState {
  battle: { [team: string]: Array<InBattleCharacter> };
  turn: Array<{ damage: number; target: number }>;
  isLoading: boolean;
}

export const BATTLE_INITIAL_STATE: BattleState = {
  battle: { myTeam: [], enemy: [] },
  turn: [],
  isLoading: false,
};

export const battleSelector = (state: EngageState): BattleState => state.battle;

export const setLoading: PayloadActionCreator<boolean> = createAction(
  "duck/battle/setLoading"
);

export const addTeamOnBattle: PayloadActionCreator<{
  [team: string]: Array<InBattleCharacter>;
}> = createAction("duck/battle/addTeamOnBattle");

export const selectTarget: PayloadActionCreator<{
  damage: number;
  target: number;
}> = createAction("duck/battle/addTeam");

export const endTurn: PayloadActionCreator<void> = createAction(
  "duck/battle/endTurn"
);

function handleSetLoading(state: BattleState, action: boolean): BattleState {
  return {
    ...state,
    isLoading: action,
  };
}

function handleAddTeamOnBattle(
  state: BattleState,
  action: PayloadAction<{ [team: string]: Array<InBattleCharacter> }>
): BattleState {
  return {
    ...state,
    battle: action.payload,
  };
}

function handleSelectTarget(
  state: BattleState,
  action: PayloadAction<{ damage: number; target: number }>
): BattleState {
  return {
    ...state,
    turn: [...state.turn, action.payload],
  };
}

function handleEndTurn(state: BattleState): BattleState {
  const newBattleStatus = {
    enemy: state.battle["enemy"].map((enemy) => {
      let calculateHealth = enemy.health;
      state.turn
        .filter((skill) => skill.target === enemy.id)
        .forEach((skill) => {
          calculateHealth = calculateHealth - skill.damage;
        });

      const newHealth = calculateHealth > 0 ? calculateHealth : 0;
      return {
        ...enemy,
        health: newHealth,
        condition: newHealth !== 0 ? [...enemy.condition] : ["dead"],
      };
    }),
  };

  return {
    ...state,
    turn: [],
    battle: { ...state.battle, ...newBattleStatus },
  };
}

export const battleReducer: Reducer<BattleState, BattleActionType> =
  createReducer(BATTLE_INITIAL_STATE, {
    [setLoading.type]: handleSetLoading,
    [addTeamOnBattle.type]: handleAddTeamOnBattle,
    [selectTarget.type]: handleSelectTarget,
    [endTurn.type]: handleEndTurn,
  });
