import { defineStore } from "pinia"

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

export const useCharactersStore = defineStore({
  id: 'characters-store',
  state: () => {
    return {
      characters: []
    }
  },
  actions: {
    async getChars (){
      const { data } = await useAsyncQuery(query);
      this.characters = data?.value?.characters?.results;
    }
  },
  getters: {
    list: state => state.characters,
  },
})