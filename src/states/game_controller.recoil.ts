import { GameController } from "models/game_controller/game_controller";
import { atom } from "recoil";

export const state_game_controller = atom<GameController | undefined>({
  "key": "GameController",
  "default":  undefined
})