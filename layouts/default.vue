<template>
  <div class="font-mono text-slate-700">
    <nav class="h-20 p-6 bg-black text-white">
      <NuxtLink to="/game" :class="['mr-10 list-none w-max p-1 border-b-2 transition-colors duration-200',
        routeName === 'game' ? 'border-purple-700' : 'border-gray-400 hover:bg-slate-800' ]"> 
        a Rick & Morty Game
      </NuxtLink> 
    </nav>
    <div class="bg-zinc-50"> 
      <slot /> 
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const routeName = computed(() => {
  return route.name
})

</script>
