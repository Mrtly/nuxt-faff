<template>
  <div class="h-screen w-screen">
    <!-- TODO extract tooltip -->
    <!-- <div class="">
      <div class="underline text-sm mb-5 w-max cursor-default
      relative transition-all
      before:content-['it.is.a.game!.but.not.ready.yet'] before:p-1  before:h-6 
      before:absolute before:-top-1 before:left-28 before:opacity-0
      before:transition-all before:duration-300 before:text-amber-700
      hover:before:opacity-100 hover:before:w-44">what is this?</div>
    </div> -->

    <div :class="['flex items-center h-16 border-b border-amber-700 mb-3',
          gameOn? ' justify-center' : ' justify-start' ]">
      <button v-if="!gameOn" @click="startGame" 
        class="py-1.5 px-4 my-4 shadow rounded bg-amber-700 hover:bg-amber-800 hover:shadow-md text-white tracking-wide">
        start
      </button>

      <span v-if="showMatch" class="animate-bounce text-amber-700 text-lg font-semibold">match!</span>
    </div>

    <client-only>
      <div class="grid grid-cols-3 lg:grid-cols-6 gap-2 lg:gap-6 max-w-xl lg:max-w-6xl">
        <CharCard v-for="({ id, name, image, status, flipped, solved }, index) in gameCards"
          :key="index"
          :id="id"
          :name="name"
          :image="image"
          :status="status"
          :flipped="flipped"
          :solved="solved"
          @click="clickOnImg(id, index)"
          />
      </div>
    </client-only>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useCharactersStore } from '~~/store/characters'

// TODO proper TS here
// interface Chars {
//   name: string
//   image: string
//   status: string
// }

// interface CharsList {
//   characters: Chars[]
// }
const charactersStore = useCharactersStore()
await charactersStore.getChars();

const gameSize = 9;
const gameOn = ref(false);
const showMatch = ref(false);
let gameCards;

const prepareGame = () => {
  const shuffledList = charactersStore.list.sort(() => Math.random() - 0.5); //randomize full list to get diff chars each time
  const singleChararsList = shuffledList.slice(0, gameSize); //slice to game size
  const gameList = singleChararsList.reduce((arr,item)=>arr.concat(item,item),[]); //duplicate each card
  const shuffledArray = gameList.sort(() => Math.random() - 0.5); //randomize order of cards
  const listArray = JSON.parse(JSON.stringify(shuffledArray)) //array from Proxy
  gameCards = ref(listArray.map(card => Object.assign(card, { flipped: true, solved: false }) )); //ref to use on template
}

prepareGame();

const startGame = () => {
  gameOn.value = true;
  gameCards.value.map((c) => c.flipped = false)
}

let arrayOfFlipped: Number[] = [];
const arrayOfSolved: Number[] = [];

const clickOnImg = (id: Number, index) => {
  let match = false;

  if (!gameCards.value[index].flipped) {
    gameCards.value[index].flipped = true;
    
    if (arrayOfFlipped.length === 0) {
      arrayOfFlipped[0] = id; 
    
    } else {
      arrayOfFlipped[1] = id; 

      if (arrayOfFlipped[0] === arrayOfFlipped[1]) {
        match = true;
        // console.log('match!')
        arrayOfSolved.push(id)

        gameCards.value.forEach((c)=> {
          if (c.id===id) {
            c.solved = true;
          }
        })

        showMatch.value = true;
        setTimeout(() => {
          showMatch.value = false;
        }, 1500)

      } else {
        match = false;
      }
      arrayOfFlipped = []
    }
    if (!match) {
      setTimeout(() => {
          gameCards.value[index].flipped = false;
        }, 2000)
    }
  }
}
</script>
