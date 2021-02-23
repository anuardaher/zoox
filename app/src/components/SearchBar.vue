<template>
  <div class="search-bar w-full">
    <input
      type="text"
      placeholder="Filtrar"
      class="h-10 md:w-1/3 rounded-md px-4 border-2 focus:ring-2 focus:ring-blue-600"
      v-model="searchText"
    />
    <button
      type="button"
      class="h-10 px-4 bg-blue-800 text-white rounded-md ml-4 hover:bg-blue-600 focus:ring-blue-600"
      @click="$emit('input', searchText)"
    >
      🔍 Buscar
    </button>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  props: {
    msg: String
  },
  data() {
    return {
      searchText: ''
    }
  }
}
</script>

<style scoped>

</style>
