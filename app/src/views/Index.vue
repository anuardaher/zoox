<template>
  <div class="home">
    <div class="w-full flex justify-center my-4">
      <router-link
        :to="`/${path}/novo`"
        class="bg-blue-800 hover:bg-blue-600 p-3 flex items-center justify-center cursor-pointer text-white rounded-lg"
      >
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path
            fill="white"
            d="M20.7,7C21.1,6.6 21.1,6 20.7,5.6L18.4,3.3C18,2.9 17.4,2.9 17,3.3L15.2,5.1L19,8.9M3,17.2V21H6.8L17.8,9.9L14.1,6.1L3,17.2M7,2V5H10V7H7V10H5V7H2V5H5V2H7Z"
          />
        </svg>
        <span class="ml-1">Criar Novo</span>
      </router-link>
    </div>
    <div class="flex justify-center my-6">
      <search-bar @input="filter" />
    </div>
    <div class="my-8 w-full">
      <div class="text-2xl font-bold my-8" v-if="items.length == 0">
        Nada pra mostrar 😥
      </div>
      <div
        class="grid lg:grid-cols-4 md:grid-cols-3 2xl:grid-cols-5 grid-cols-1 gap-4 place-content-center"
        v-else
      >
        <div
          class="relative bg-blue-100 p-2  w-full transform hover:scale-105 cursor-pointer"
          v-for="item in items"
          :key="item._id"
        >
          <div
            class="flex flex-col"
            @click="$router.push(`/${path}/ver/${item._id}`)"
          >
            <span class="text-lg font-semibold">{{ item.nome }}</span>
            <span>{{ item.sigla || item.estado.sigla }}</span>
            <span>{{ new Date(item.createdAt).toLocaleDateString() }}</span>
            <div
              class="absolute bottom-0 right-0 hover:bg-blue-200 rounded-full h-10 w-10 flex items-center justify-center cursor-pointer"
              @click.stop="remove(item._id)"
            >
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path
                  fill="#b10b0b"
                  d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
                />
              </svg>
            </div>
            <div
              class="absolute top-0 right-0 hover:bg-blue-200 rounded-full h-10 w-10 flex items-center justify-center cursor-pointer"
              @click.stop="$router.push(`${path}/editar/${item._id}`)"
            >
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path
                  fill="blue"
                  d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from "../components/SearchBar.vue"

export default {
  name: "Home",
  components: {
    SearchBar
  },
  props: {
    path: {
      type: String,
      required: () => true
    }
  },
  data() {
    return {
      items: [],
      timeOut: null
    }
  },
  methods: {
    async get() {
      try {
        const response = await fetch(`http://localhost:3000/api/${this.path}`)
        this.items = (await response.json()) ?? []
      } catch (error) {
        console.error(error)
      }
    },
    async filter(text) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/${this.path}?` +
            new URLSearchParams({
              data: JSON.stringify({ nome: { $regex: text, $options: "i" } })
            })
        )
        this.items = (await response.json()) ?? []
      } catch (error) {
        console.error(error)
      }
    },
    async remove(id) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/${this.path}/${id}`,
          { method: "DELETE" }
        )
        if (response.ok) this.get()
      } catch (error) {
        console.error(error)
      }
    }
  },
  mounted() {
    this.get()
  }
}
</script>
