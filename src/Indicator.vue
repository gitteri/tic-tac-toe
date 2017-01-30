<template>

  <div>
    <!-- player icon -->
    <div>
      <img v-if="player === Players.X" src="./assets/x.svg">
      <img v-else src="./assets/o.svg">
    </div>
    <!-- game state -->
    <div>
      <span v-if="gameState === GameStates.START">plays first</span>
      <span v-else-if="gameState === GameStates.MID">plays next</span>
      <span v-else-if="gameState === GameStates.END">wins!</span>
    </div>
  </div>

</template>


<script>

  import Constants from './Constants'

  export default {
    name: 'Indicator',
    props: {
      gameState: {
        type: String,
        required: true,
        validator: Constants.validateGameStates,
      },
      player: {
        type: String,
        required: true,
        validator: Constants.validatePlayers,
      }
    },
    computed: {
      Players() { return Constants.Players },
      GameStates() { return Constants.GameStates },
    },
  }

</script>


<style></style>
