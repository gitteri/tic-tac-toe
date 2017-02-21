<template>

  <div class="indicator">
    <!-- player icon -->
    <div class="col-6-sm indicator__next text--right">
      <img class="indicator__img" v-if="player === Players.X" src="../assets/x.svg">
      <img class="indicator__img" v-else src="../assets/o.svg">
    </div>
    <!-- game state -->
    <div class="col-6-sm indicator__next">
      <h3 v-if="gameState === GameStates.START">Plays First</h3>
      <h3 v-else-if="gameState === GameStates.MID">Plays Next</h3>
      <h3 v-else-if="gameState === GameStates.END">Wins!</h3>
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


<style lang="scss">
  @import "~styles/_variables.scss";
  @import "~styles/_grid.scss";

  .indicator {
    background-color: $grey--lightest;
    height: 7rem;
    padding: 1rem;
    border: 1px solid $grey;
    border-radius: 3px;
    border-bottom: 8px solid $grey;
  }

  .indicator__next {
    height: 6rem;
    line-height: 6rem;

    h3 {
      margin: 0;

      @media (max-width: $breakpoint-large) {
        font-size: 1em;
      }
    }
  }

  .indicator__img {
    max-width: 70px;
    max-height: 70px;
    vertical-align: middle;

    @media (min-width: $breakpoint-large) {
      max-width: 90px;
      max-height: 90px;
    }
  }

</style>
