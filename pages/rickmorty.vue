<template>
  <div class="h-screen w-screen">
    <!-- TODO extract tooltip -->
    <div class="">
      <div class="underline text-sm mb-5 w-max cursor-default
      relative transition-all
      before:content-['it.is.a.game!.but.not.ready.yet'] before:p-1  before:h-6 
      before:absolute before:-top-1 before:left-28 before:opacity-0
      before:transition-all before:duration-300 before:text-amber-700
      hover:before:opacity-100 hover:before:w-44">what is this?</div>
    </div>

    <div class="grid grid-cols-3 lg:grid-cols-6 gap-2 lg:gap-6 max-w-6xl">
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
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useCharactersStore } from '~~/store/characters'

// interface Chars {
//   name: string
//   image: string
//   status: string
// }

// interface CharsList {
//   characters: Chars[]
// }
const gameSize = 9;

const charactersStore = useCharactersStore()
await charactersStore.getChars();

const shuffledList = charactersStore.list.sort(() => Math.random() - 0.5);
const singleChararsList = shuffledList.slice(0, gameSize);
const gameList = singleChararsList.reduce((arr,item)=>arr.concat(item,item),[]);
const shuffledArray = gameList.sort(() => Math.random() - 0.5);
const listArray = JSON.parse(JSON.stringify(shuffledArray)) //array from Proxy
const gameCards = ref(listArray.map(card => Object.assign(card, { flipped: false, solved: false }) ));

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
