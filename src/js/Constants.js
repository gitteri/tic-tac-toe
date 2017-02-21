
import values from 'lodash.values'

function genValidator(obj) {
  return (thisVal) => {
    const vals = values(obj);
    for (let i = 0; i < vals.length; i++) {
      if (thisVal === vals[i]) {
        return true;
      }
    }
    return false;
  };
};

const GameStates = {
  START: 'start',
  MID: 'middle',
  END: 'end',
};

const Players = {
  X: 'x',
  O: 'o',
}

export default {
  GameStates,
  validateGameStates: genValidator(GameStates),
  Players,
  validatePlayers: genValidator(Players),
}

