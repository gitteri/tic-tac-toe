<template>

  <div class="app">
    <h1>Tic-Tac-Toe</h1>
    <!-- Game Board -->
    <div class="box game-board">
      <div class="row" v-for="(row, i) in boardState">
        <BoardCell
          v-for="(player, j) in row"
          class="cell"
          v-on:click="cellClicked(i, j)"
          v-bind:player="player"
          v-bind:gameOver="currentGameState === GameStates.END"
        />
      </div>
    </div>
    <!-- Extras -->
    <div class="box">
      <Indicator
        v-bind:player="currentPlayer"
        v-bind:gameState="currentGameState"
      />
      <div>
        <button v-bind:disabled="currentGameState === GameStates.START" v-on:click="startOverClicked">
          Start Over
        </button>
      </div>
    </div>
  </div>

</template>


<script>

  import Constants from './Constants'
  import BoardCell from './BoardCell.vue'
  import Indicator from './Indicator.vue'

  export default {
    name: 'App',
    components: { BoardCell, Indicator },
    computed: {
      Players() { return Constants.Players },
      GameStates() { return Constants.GameStates },
    },
    data() {
      return {
        boardState: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
        currentPlayer: Constants.Players.X,
        currentGameState: Constants.GameStates.START
      };
    },
    methods: {
      cellClicked(x, y) {
        console.log('CHOOSE CELL', x, y);
        // cannot simply set this.boardState[x][y] due to Vue.js limitations
        // https://vuejs.org/2016/02/06/common-gotchas/
        this.$set(this.boardState[x], y, this.currentPlayer);
        this.currentGameState = Constants.GameStates.MID;
        if (this.computeWinner(this.boardState)) {
          this.currentGameState = Constants.GameStates.END; 
        } else {
          this.currentPlayer = this.currentPlayer === Constants.Players.X ? Constants.Players.O : Constants.Players.X;
        }
      },

      computeWinner(currentBoard) {
        let winByRow = this.winByRow(currentBoard);
        let winByCol = this.winByCol(currentBoard);
        let winByDiag = this.winByDiag(currentBoard);
        return winByRow || winByCol || winByDiag;
      },

      startOverClicked() {
        this.boardState = [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ];
        this.currentPlayer = Constants.Players.X;
        this.currentGameState = Constants.GameStates.START;
      },

      colsAsRows(currentBoard) {
        return currentBoard.map((_, i) =>
          currentBoard.map(cols =>
            cols[i]))
      },

      winByDiag(currentBoard) {
        let diagBoard = [
          [currentBoard[0][0], currentBoard[1][1], currentBoard[2][2]],
          [currentBoard[2][0], currentBoard[1][1], currentBoard[0][2]],
        ];
        return this.winByRow(diagBoard);
      },

      winByCol(currentBoard) {
        let colsAsRows = this.colsAsRows(currentBoard);
        return this.winByRow(colsAsRows);
      },

      winByRow(currentBoard) {
        return currentBoard.some(row =>
          row.reduce((acc, cell) =>
            (acc === cell) ? acc : NaN));
      }
    },
    created() {
      console.log('Creating a global variable `tictactoe` for debugging:\n', this);
      window.tictactoe = this;
    },
  }

</script>


<style lang="scss">

  .app {
    margin: 100px;
  }

  .box {
    margin: 10px;
    border: 1px solid gray;
    display: inline-block;
  }

  .game-board {
    position: relative;
    width: 300px;
    height: 300px;
  }

  .row {
    position: relative;
    width: 100%;
    height: 100px;
  }

  .cell {
    display: inline-block;
    width: 100px;
    height: 100px;
    box-sizing: border-box;
  }

</style>
