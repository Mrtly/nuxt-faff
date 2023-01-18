<template>
  <div class="h-screen w-screen bg-purple-100 p-10">
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
