<template>
  <div id="app" class="container mx-auto md:px-20">
    <div class="bg-gray-100 h-screen">
      <app-header />
      <main class="md:p-4 p-1 text-center mx-auto">
        <router-view :key="$route.fullPath"></router-view>
      </main>
    </div>
  </div>
</template>

<script>
import AppHeader from "./components/Header.vue"

export default {
  name: "App",
  components: {
    AppHeader
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

*:focus {
  outline: none;
}

button:focus {
  outline: 1px dotted;
  outline: 5px auto -webkit-focus-ring-color;
}

.form-input {
  @apply py-2 
  px-4 
  bg-blue-600 
  text-white 
  font-semibold 
  rounded-lg 
  shadow-md 
  hover:bg-blue-800 
  focus:bg-blue-800 
  focus:outline-none 
  focus:ring-2 
  focus:ring-indigo-400
  focus:ring-opacity-75 
  disabled:bg-blue-400;
}

.form-btn {
  @apply h-10 px-4 bg-blue-800 text-white rounded-md ml-4 hover:bg-blue-600 focus:ring-blue-600;
}
</style>
