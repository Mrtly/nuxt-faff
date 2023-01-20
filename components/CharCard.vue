<template>
  <div :class="['flip-container', flipped ? 'flipped' : 'cursor-pointer hover:shadow-lg']">
    <div class='flipper relative max-w-max'>
      <NuxtImg 
        :src="imgSrc"
        width="200"
        height="200"
        :class="['shadow-md rounded-md asbolute inset-0 backface-hidden',
            flipped ? 'front rotate-y-[180deg]': 'back rotate-y-[0deg]']"
        />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';

const props = defineProps({
  id: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  status: { type: String, required: true },
  flipped: { type: Boolean, required: true },
  solved: { type: Boolean, required: true }
})

const imgSrc = computed(() => {
  if (props.solved) { return props.image }
  else {
   return props.flipped ? props.image : 'https://picsum.photos/id/537/200/200'
  }
})
</script>

<style scoped>
.flip-container {
  perspective: 1000px;
}
.flip-container.flipped .flipper {
  transform: rotateY(180deg);
}
.flipper {
  transition: 0.6s;
  transform-style: preserve-3d;
}
.backface-hidden {
  backface-visibility: hidden;
}
.back {
  transform: rotateY(0deg);
}
.front {
  transform: rotateY(180deg);
}
</style>