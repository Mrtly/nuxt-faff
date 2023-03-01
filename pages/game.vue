<template>
  <div class="w-screen h-[calc(100vh-80px)]">
    <div class="flex flex-col items-center justify-center h-20 w-80 mx-auto border-b border-purple-700 mb-10">
      
      <button v-if="!gameOn" @click="startGame" 
        class="py-1.5 px-4 my-4 shadow rounded bg-purple-700 hover:bg-purple-800 active:bg-purple-600 hover:shadow-lg text-white tracking-wide">
        start
      </button>
      <div v-else>matched: {{arrayOfSolved.length}}/{{gameSize}}</div>

      <div v-if="showMatch" class="animate-bounce text-purple-700 text-lg font-semibold">match!</div>
    </div>

    <client-only>
      <div class="mx-auto px-2 grid grid-cols-3 lg:grid-cols-6 gap-2 lg:gap-6 max-w-xl lg:max-w-6xl">
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

      <div class="text-zinc-400 text-center my-10">using the Rick & Morty GraphQL API</div>
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
