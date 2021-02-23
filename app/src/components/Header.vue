<template>
  <nav class="flex p-3 bg-blue-600 text-white items-center">
    <div class="flex-1 text-3xl text-left">
      <span>ZOOX</span>
    </div>
    <div class="flex space-between font-extralight text-lg">
      <p class="mr-4 p-4 hover:bg-blue-500 rounded-md">
        <router-link to="/estados" v-slot="{ isActive, href, navigate }">
          <a :href="href" @click="navigate" :class="[`${isActive ? 'underline' : null}`]">Estados</a>
        </router-link>
      </p>
      <p class="p-4 hover:bg-blue-500 rounded-md">
        <router-link to="/cidades" v-slot="{ isActive, href, navigate }">
          <a :href="href" @click="navigate" :class="[`${isActive ? 'underline' : null}`]">Cidades</a>
        </router-link>
      </p>
    </div>
  </nav>
</template>

<script>
export default {}
</script>

<style></style>
