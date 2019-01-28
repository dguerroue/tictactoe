<template>
  <div class="ttt">
    <header>
      <h1>{{data.name}}</h1>
    </header>
    <section class="board">
      <header class="info-bar">
        <p v-show="!data.isFinish">Au joueur {{data.player == 'circle' ? 'ROND' : 'CROIX'}} de jouer !</p>
        <p v-show="data.isFinish && data.winner !== null">Le joueur {{data.player == 'circle' ? 'ROND' : 'CROIX'}} à gagné !</p>
        <p v-show="data.isFinish && data.winner == null">Jeu terminé par égalité !</p>
      </header>
      <div class="game" >
        <div class="overlay-finish" v-if="data.isFinish && data.winner !== null">{{data.player}} win !
            <button v-show="data.isFinish" v-on:click="init">&#8634;</button>
        </div>
        <div class="overlay-finish" v-if="data.isFinish && data.winner == null">égalité !
            <button v-show="data.isFinish" v-on:click="init">&#8634;</button>
        </div>
        <div class="case" 
          v-for="(value,index) in cases" 
          :key="index"
          @click="play(value, index)"
          v-bind:class="{circle: value == 'circle', cross: value == 'cross'}"
        ></div>
      </div>
      <!-- <button @click="init">Restart</button> -->
    </section>
  </div>
</template>

<script>
import db from '@/firebase/init'

//Create all references to the database
const refColl = db.collection('tictactoe-data');
const refData = db.collection('tictactoe-data').doc('data')
const refCases = db.collection('tictactoe-data').doc('cases')

export default {
  name: 'TicTacToe',
  data (){
    return {
      data: {
        name: 'TicTacToe',
        player: 'circle', //'cross' or 'circle'
        isFinish: false,
        winner: null,
        moves: 0,
      },
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
    }
  },
  created() {
    //Get collection in realtime
    refColl.onSnapshot(snapshot => {

      // Check for each doc changes, modify data and cases
      snapshot.docChanges().forEach(change => {

        let doc = change.doc

        //Modify data and cases
        if(doc.id == 'cases') {
          //DEBUG : console.log(doc.data())
          this.cases = doc.data()
        }
        if(doc.id == 'data') {
          this.data = doc.data()
        }
      })
    })
  },
  methods: {
    // Init all variables and updates them on database
    init(){

      this.data.player = 'circle';
      this.data.isFinish = false;
      this.data.winner = null;
      this.data.moves = 0;

      for(let index in this.cases){
        this.cases[index] = null;
      }

      //Update documents on databases
      refData.update(this.data)
      refCases.update(this.cases)
    },
    //For each case's click get it's value and index
    play(value, index){
      //DEBUG : console.log(`click ${index} value : ${value}`)

      if(value === null && this.data.isFinish == false){
        
        //If the case is empty and game not finished, assign player name to the case
        this.cases[index] = this.data.player;
        //increment moves
        this.data.moves++;

        //Update documents on databases
        refData.update(this.data)
        refCases.update(this.cases)

        //check if the game is win or equality after 3 moves minimum
        if(this.data.moves >= 3) {
          this.checkFinish();
        }
        if(this.data.isFinish == false){
          this.changePlayer();
        }
      }
    },
    changePlayer(){
      //change player avec each move
      this.data.player = this.data.player == 'circle' ? 'cross' : 'circle';

      //update player on realtime database
      refData.update(this.data)
    },
    checkFinish(){
      //check if player circle won
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
        this.data.isFinish = true;
        this.data.winner = 'circle';
      }

      //check if player cross won
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
        this.data.isFinish = true;
        this.data.winner = 'cross';
      }

      //check if equality
      if(this.data.moves == 9){this.data.isFinish = true}

      //update data on realtime database
      refData.update(this.data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" src="./TicTacToe.scss"></style>
