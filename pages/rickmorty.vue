<template>
  <div class="h-screen w-screen">
    <!-- TODO extract tooltip -->
    <div class="">
      <div class="underline text-sm mb-5 w-max cursor-default
      relative transition-all w-min-content
      before:content-['doodle'] before:p-1  before:h-6 
      before:absolute before:-top-1 before:left-28 before:opacity-0
      before:transition-all before:duration-300 before:text-amber-700
      hover:before:opacity-100 hover:before:w-28">what is this?</div>
    </div>

    <CharCard v-for="{ name, image, status } in charactersList"
      :key="name"
      :name="name"
      :image="image"
      :status="status"
      class="inline-block m-2"
      />
  </div>
</template>

<script lang="ts" setup>
import { useCharactersStore } from '~~/store/characters'

const blurb = 'doodle'

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
const charactersList = charactersStore.list;
</script>
