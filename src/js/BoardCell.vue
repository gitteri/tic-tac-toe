<template>

  <div>
    <!-- Otherwise, show the appropriate icon -->
    <div class="cell__played" v-if="player">
      <img v-if="player === Players.X" src="../assets/x.svg">
      <img v-else src="../assets/o.svg">
    </div>
    <!-- create a button if player is null -->
    <button class="cell__button" v-else-if="!gameOver" v-on:click="$emit('click')">play here</button>
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


<style lang="scss">
  @import "~styles/_variables.scss";
  @import "~styles/_grid.scss";

  .cell__button {
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .cell__played {
    text-align: center;

    @media (min-width: $breakpoint-large) {
      margin-top: 30px;
    }
  }
</style>
