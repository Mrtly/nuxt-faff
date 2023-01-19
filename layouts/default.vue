<template>
  <div class="font-mono text-slate-700">
    <nav class="px-6 py-5 h-16 border-b border-gray-300 shadow-md bg-black text-white">
      <ul class="flex font-semibold">
        <!-- TODO extract nav link -->
        <li> 
          <NuxtLink to="/" :class="['mr-10 list-none w-max p-1 border-b-2 transition-colors duration-200',
            routeName === 'index' ? 'border-amber-700' : 'border-gray-400 hover:bg-amber-700' ]"> 
            Home 
          </NuxtLink> 
        </li>
        <li> 
          <NuxtLink to="/rickmorty" :class="['mr-10 list-none w-max p-1 border-b-2 transition-colors duration-200',
            routeName === 'rickmorty' ? 'border-amber-700' : 'border-gray-400 hover:bg-amber-700' ]"> 
            R & M 
          </NuxtLink> 
        </li>
        <li> 
          <NuxtLink to="/other"  :class="['mr-10 list-none w-max p-1 border-b-2 transition-colors duration-200',
            routeName === 'other' ? 'border-amber-700' : 'border-gray-400 hover:bg-amber-700' ]"> 
            Other 
          </NuxtLink> 
        </li>
      </ul>
    </nav>
    <div class="min-h-[calc(100vh-64px)] p-6 bg-zinc-50"> 
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
