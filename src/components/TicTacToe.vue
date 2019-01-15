<template>
  <div class="ttt">
    <header>
      <h1>{{name}}</h1>
    </header>
    <section class="board">
      <header class="info-bar">
        <p v-show="!isFinish">Au joueur {{player}} de jouer !</p>
        <p v-show="isFinish && winner !== null">Le joueur {{player}} à gagné !</p>
        <p v-show="isFinish && winner == null">Jeu terminé</p>
      </header>
      <div class="game" >
        <div class="overlay-finish" v-if="isFinish && winner !== null">{{player}} win !</div>
        <div class="overlay-finish" v-if="isFinish && winner == null">Egalité !</div>
        <div class="case" 
          v-for="(value,index) in cases" 
          :key="index"
          @click="play(value, index)"
          v-bind:class="{circle: value == 'circle', cross: value == 'cross'}"
        ></div>
      </div>
      <div class="buttons">
        <button v-show="isFinish" v-on:click="init">Restart</button>
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
      isFinish: false,
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
      },
      moves: 0,
    }
  },
  methods: {
    init(){
      console.warn('init');
      this.player = 'circle';
      this.isFinish = false;
      this.winner = null;
      for(let index in this.cases){
        this.cases[index] = null;
      }
      this.moves = 0;
    },
    play(value, index){
      //DEBUG : console.log(`click ${index} value : ${value}`)


      if(value === null && this.isFinish == false){
        this.cases[index] = this.player;
        this.moves++;

          this.checkFinish();
          if(this.isFinish == false){
            
            this.changePlayer();
          }
      }
      console.log(`moves : ${this.moves}`);
    },
    changePlayer(){
      this.player = this.player == 'circle' ? 'cross' : 'circle';
    },
    checkFinish(){
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
        this.isFinish = true;
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
        this.isFinish = true;
        this.winner = 'cross';
      }

      //if equality
      if(this.moves == 9){this.isFinish = true}
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./TicTacToe.scss"></style>
