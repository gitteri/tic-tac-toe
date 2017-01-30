<template>

  <div>
    <!-- Otherwise, show the appropriate icon -->
    <div v-if="player">
      <img v-if="player === Players.X" src="./assets/x.svg">
      <img v-else src="./assets/o.svg">
    </div>
    <!-- create a button if player is null -->
    <button v-else-if="!gameOver" v-on:click="$emit('click')">play here</button>
  </div>

</template>


<script>

  import Constants from './Constants'

  export default {
    name: 'BoardCell',
    props: {
      player: {
        type: String,
        required: false,
        validator: Constants.validatePlayers,
      },
      gameOver: {
        type: Boolean,
        required: false,
      },
    },
    computed: {
      Players() { return Constants.Players },
    },
  }

</script>


<style></style>
