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
      cases: {
        case1: null,
        case2: null,
        case3: null,
        case4: null,
        case5: null,
        case6: null,
        case7: null,
        case8: null,
        case9: null,
      }
    }
  },
  methods: {
    play(value, index){
      console.log(`click ${index} value : ${value}`)
      if(value === null && this.iswin == false){
        this.cases[index] = this.player;

          this.changePlayer();
      }

      if(this.checkWin()){

      }

    },
    changePlayer(){
      this.player = this.player == 'circle' ? 'cross' : 'circle';
    },
    checkWin(){
      // let player = this.player;
      let iswin = null;

      if(this.cases.case1 == 'circle' && this.cases.case2 == 'circle' && this.cases.case3 == 'circle'){
        this.iswin = true;
        this.player="circle";
      } else{
        this.iswin = false;
      }

      // let checkCombinaisons = [
      //   [1,1,1,0,0,0,0,0,0],
      //   [0,0,0,1,1,1,0,0,0],
      //   [0,0,0,0,0,0,1,1,1],
      //   [1,0,0,1,0,0,1,0,0],
      //   [0,1,0,0,1,0,0,1,0],
      //   [0,0,1,0,0,1,0,0,1],
      //   [1,0,0,0,1,0,0,0,1],
      //   [0,0,1,0,1,0,1,0,0]
      // ];
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./TicTacToe.scss"></style>
