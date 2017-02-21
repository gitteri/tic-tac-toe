<template>
  <div class="app container">
    <h1 class="heading col-12">Tic-Tac-Toe</h1>
    <!-- Game Board -->
    <div class="row">
      <div class="box col-7">
        <div class="game-board">
          <div class="game-board__row row" v-for="(row, i) in boardState">
            <BoardCell
              v-for="(player, j) in row"
              class="cell"
              v-on:click="cellClicked(i, j)"
              v-bind:player="player"
              v-bind:gameOver="currentGameState === GameStates.END"
            />
          </div>
        </div>
      </div>
      <!-- Extras -->
      <div class="box sidebar row col-5">
        <Indicator
          v-bind:player="currentPlayer"
          v-bind:gameState="currentGameState"
        />
        <div class="start-over">
          <button class="button--blue" v-bind:disabled="currentGameState === GameStates.START" v-on:click="startOverClicked">
            Start Over
          </button>
        </div>
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
  @import "~styles/_variables.scss";
  @import "~styles/_grid.scss";

  .app {
    border-color: $black;
    color: $black;
  }

  .heading {
    background-color: $grey--light;
    border-bottom: 8px solid $grey--dark;
    text-align: center;
    margin-top: 0;
    margin-bottom: 2rem;
    padding: 2rem 0;
    font-size: 2rem;
  }

  .box {
    display: inline-block;
  }

  .game-board {
    position: relative;
    width: 300px;
    height: 300px;

    @media (min-width: $breakpoint-large) {
      width: 450px;
      height: 450px;
    }

    @media (max-width: $breakpoint-med) {
      margin: 0 auto;
    }
  }

  .game-board__row {
    height: 100px;

    @media (min-width: $breakpoint-large) {
      height: 150px;
    }
  }

  .cell {
    display: inline-block;
    width: 100px;
    height: 100px;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    border-width: 2px;
    border-style: solid;

    @media (min-width: $breakpoint-large) {
      width: 150px;
      height: 150px;
    }

    &:nth-of-type(2n) {
      left: 100px;

      @media (min-width: $breakpoint-large) {
        left: 150px;
      }
    }

    &:nth-of-type(3n) {
      left: 200px;

      @media (min-width: $breakpoint-large) {
        left: 300px;
      }
    }
  }

  .sidebar {
    height: auto;

    @media (min-width: $breakpoint-med) {
      height: 450px;
    }
  }

  .start-over {
    width: 100%;
    margin: 2rem 0;

    @media (min-width: $breakpoint-med) {
      bottom: 0;
      position: absolute;
    }
  }

  .button--blue {
    margin: 0 auto;
    display: block;
    width: 60%;
    padding: 1rem;
    background-color: $blue;
    border: 0;
    color: $white;
    border-bottom: 8px solid $blue--dark;

    &:disabled {
      opacity: .6;
      cursor: not-allowed;
    }

    @media (min-width: $breakpoint-med) {
      border-radius: 10px 10px 0 0;
    }
  }
</style>
