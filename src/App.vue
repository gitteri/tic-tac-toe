<template>

  <div class="app">
    <h1>Tic-Tac-Toe</h1>
    <!-- Game Board -->
    <div class="box">
      <div v-for="(row, i) in boardState">
        <BoardCell
          v-for="(player, j) in row"
          class="cell"
          v-on:click="cellClicked(i, j)"
          v-bind:player="player"
          v-bind:gameOver="false"
        />
      </div>
    </div>
    <!-- Extras -->
    <div class="box">
      <Indicator
        v-bind:player="Players.X"
        v-bind:gameState="GameStates.MID"
      />
      <div>
        <button v-on:click="toggleRules">
          {{ showRules ? 'Hide Rules' : 'Show Rules' }}
        </button>
        <button v-bind:disabled="false" v-on:click="startOverClicked">
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
          [null, null, Constants.Players.X],
          [null, null, Constants.Players.O],
          [null, null, null],
        ],
        showRules: false,
      };
    },
    methods: {
      cellClicked(x, y) {
        console.log('CHOOSE CELL', x, y);
        // cannot simply set this.boardState[x][y] due to Vue.js limitations
        // https://vuejs.org/2016/02/06/common-gotchas/
        this.$set(this.boardState[x], y, Constants.Players.X);
      },
      toggleRules() {
        console.log('SHOW RULES');
        this.showRules = !this.showRules;
      },
      startOverClicked() {
        console.log('START OVER');
      },
    },
    created() {
      console.log('Creating a global variable `tictactoe` for debugging:\n', this);
      window.tictactoe = this;
    },
  }

</script>


<style>

  .app {
    margin: 100px;
  }

  .box {
    margin: 10px;
    border: 1px solid gray;
    display: inline-block;
  }

  .cell {
    display: inline-block;
    width: 100px;
    height: 100px;
  }

</style>
