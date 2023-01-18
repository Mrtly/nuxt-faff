<template>
  <div class="h-screen w-screen bg-purple-100 p-10">
    <CharCard v-for="{ name, image, status } in data?.characters.results"
      :key="name"
      :name="name"
      :image="image"
      :status="status"
      class="inline-block m-2"
      />
  </div>
</template>

<script lang="ts" setup>

type Char = {
  name: string;
  image: string;
  status: string;
};

type Results = {
  characters: {
    results: Char[]
  }
}

const query = gql`
  query getChars {
    characters {
      results {
        name
        image
        status
        id
        species
        location {
          name
        }
      }
    }
  }
`
const { data } = await useAsyncQuery<Results>(query)
</script>
