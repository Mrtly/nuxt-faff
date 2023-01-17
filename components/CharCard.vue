<template>
    <div class="font-mono font-semibold">
        {{ name }} {{ status==='Dead' ? '(dead)' : '' }}
        <NuxtImg 
            :src="image"
            width="160"
            height="160"
            class="rounded"
            :modifiers="grayScaleWhenDead" />
    </div>
</template>

<script lang="ts" setup>

const props = defineProps({
    name: { type: String, required: true },
    image: { type: String, required: true },
    status: { type: String, required: true },
    // id: { type: String, required: true },
    // species: { type: String, required: true },
    // location: { type: String, required: true },
})

const grayScaleWhenDead = computed(() => props.status === 'Dead' ? { grayscale: true } : {})
</script>
