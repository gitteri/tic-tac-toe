import App from '../src/App.vue';
import Constants from '../src/Constants';

describe('app', function() {

  describe('computeWinner', function() {
    it('should return true if one row is all equal', function() {
      let currentBoard = [
        [Constants.Players.X, Constants.Players.X, Constants.Players.X],
        [null, null, null],
        [null, null, null]
      ];
      let computedWinner = App.methods.winByRow(currentBoard);
      expect(computedWinner).toBe(true);
    });

    it('should return flip board rows and columns', function() {
      let currentBoard = [
        [Constants.Players.X, null, null],
        [Constants.Players.X, null, null],
        [Constants.Players.X, null, null]
      ];
      let expectedBoard = [
        [Constants.Players.X, Constants.Players.X, Constants.Players.X],
        [null, null, null],
        [null, null, null]
      ];
      let colsAsRows = App.methods.colsAsRows(currentBoard);
      expect(colsAsRows).toEqual(expectedBoard);
    });

    it('should return true if one column is all equal', function() {
      let currentBoard = [
        [Constants.Players.X, null, null],
        [Constants.Players.X, null, null],
        [Constants.Players.X, null, null],
      ];
      let computedWinner = App.methods.winByCol(currentBoard);
      expect(computedWinner).toBe(true);
    });

    it('should return true if one diag is all equal', function() {
      let currentBoard = [
        [Constants.Players.X, null, null],
        [null, Constants.Players.X, null],
        [null, null, Constants.Players.X],
      ];
      let computedWinner = App.methods.winByDiag(currentBoard);
      expect(computedWinner).toBe(true);
    });

    it('should return false if not all equal', function() {
      let currentBoard = [
        [null, Constants.Players.X, null],
        [Constants.Players.X, Constants.Players.O, null],
        [Constants.Players.O, null, null],
      ];
      let computedWinner = App.methods.winByDiag(currentBoard);
      expect(computedWinner).toBe(false);
    });
  })
});