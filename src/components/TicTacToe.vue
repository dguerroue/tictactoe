<template>
  <div class="ttt">
    <header>
      <h1>{{name}}</h1>
    </header>
    <section class="board">
      <header class="info-bar">
        <p v-show="!iswin">Au joueur {{player}} de jouer !</p>
        <p v-show="iswin">Le joueur {{player}} à gagné !</p>
      </header>
      <div class="game" >
        <div class="overlay-win" v-if="iswin">{{player}} win !</div>
        <div class="case" 
          v-for="(value,index) in cases" 
          :key="index"
          @click="play(value, index)"
          v-bind:class="{circle: value == 'circle', cross: value == 'cross'}"
        ></div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'TicTacToe',
  data: function(){
    return {
      name: 'TicTacToe',
      player: 'circle', //'cross' or 'circle'
      iswin: false,
      winner: null,
      cases: {
        case0: null,
        case1: null,
        case2: null,
        case3: null,
        case4: null,
        case5: null,
        case6: null,
        case7: null,
        case8: null,
      }
    }
  },
  methods: {
    play(value, index){
      console.log(`click ${index} value : ${value}`)
      if(value === null && this.iswin == false){
        this.cases[index] = this.player;

          this.checkWin();
          if(this.iswin == false){

            this.changePlayer();
          }
      }
    },
    changePlayer(){
      this.player = this.player == 'circle' ? 'cross' : 'circle';
    },
    checkWin(){
      // let player = this.player;
      let iswin = null;

      //check player circle
      if(
        (this.cases.case0 == 'circle' && this.cases.case1 == 'circle' && this.cases.case2 == 'circle') ||
        (this.cases.case3 == 'circle' && this.cases.case4 == 'circle' && this.cases.case5 == 'circle') ||
        (this.cases.case6 == 'circle' && this.cases.case7 == 'circle' && this.cases.case8 == 'circle') ||
        (this.cases.case0 == 'circle' && this.cases.case3 == 'circle' && this.cases.case6 == 'circle') ||
        (this.cases.case1 == 'circle' && this.cases.case4 == 'circle' && this.cases.case7 == 'circle') ||
        (this.cases.case2 == 'circle' && this.cases.case5 == 'circle' && this.cases.case8 == 'circle') ||
        (this.cases.case0 == 'circle' && this.cases.case4 == 'circle' && this.cases.case8 == 'circle') ||
        (this.cases.case2 == 'circle' && this.cases.case4 == 'circle' && this.cases.case6 == 'circle')
      ){
        this.iswin = true;
        this.winner = 'circle';
      }

      //check player cross
      if(
        (this.cases.case0 == 'cross' && this.cases.case1 == 'cross' && this.cases.case2 == 'cross') ||
        (this.cases.case3 == 'cross' && this.cases.case4 == 'cross' && this.cases.case5 == 'cross') ||
        (this.cases.case6 == 'cross' && this.cases.case7 == 'cross' && this.cases.case8 == 'cross') ||
        (this.cases.case0 == 'cross' && this.cases.case3 == 'cross' && this.cases.case6 == 'cross') ||
        (this.cases.case1 == 'cross' && this.cases.case4 == 'cross' && this.cases.case7 == 'cross') ||
        (this.cases.case2 == 'cross' && this.cases.case5 == 'cross' && this.cases.case8 == 'cross') ||
        (this.cases.case0 == 'cross' && this.cases.case4 == 'cross' && this.cases.case8 == 'cross') ||
        (this.cases.case2 == 'cross' && this.cases.case4 == 'cross' && this.cases.case6 == 'cross')
      ){
        this.iswin = true;
        this.winner = 'cross';
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./TicTacToe.scss"></style>
