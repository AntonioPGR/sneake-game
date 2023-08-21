import { GameController } from "models/game_controller/game_controller";
import { atom, useRecoilValue } from "recoil";

export const state_game_controller = atom<GameController | undefined>({
  "key": "GameController",
  "default":  undefined
})

export const useChangeSnakeDirection = () => {
  const game_controller = useRecoilValue(state_game_controller)
  return (dir:TDirections) => {
    game_controller?.changeSnakeDirection(dir)
  }
}

export const useStartGame = () => {
  const game_controller = useRecoilValue(state_game_controller)
  return () => {
    game_controller?.startGame()
  }
}