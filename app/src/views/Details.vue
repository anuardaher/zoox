<template>
  <div class="w-full">
    <form
      class="bg-white flex flex-col justify-center items-center p-10"
      @submit.prevent="salvar()"
    >
      <div class="flex my-3 items-center">
        <span class="mr-2 w-20">Nome:</span>
        <input
          type="text"
          v-model="item.nome"
          class="form-input"
          :disabled="action == 'ver'"
          required
          minlength="4"
          maxlength="30"
        />
      </div>
      <div class="flex my-3 items-center" v-if="path == 'estados'">
        <span class="mr-2 w-20">Sigla:</span>
        <input
          type="text"
          v-model="item.sigla"
          class="form-input"
          :disabled="action == 'ver'"
          required
          minlength="2"
          maxlength="2"
        />
      </div>
      <div class="flex my-3 items-center" v-else>
        <span class="mr-2 w-20">Estado:</span>
        <select
          type="text"
          v-model="item.estadoId"
          class="form-input text-white"
          :disabled="action == 'ver'"
          required
          minlength="2"
          maxlength="2"
        >
          <option disabled value="">Escolha um item</option>
          <option v-for="estado in estados" :key="estado._id" :value="estado._id">
            {{ estado.sigla }}
          </option>
        </select>
      </div>
      <div class="flex my-3 items-center" v-if="!!itemId">
        <span class="mr-2 w-20">Criado em:</span>
        <input
          type="text"
          v-model="item.createdAt"
          class="form-input"
          disabled
        />
      </div>
      <div class="flex my-3 items-center" v-if="!!itemId">
        <span class="mr-2 w-20">Atualizado em:</span>
        <input
          type="text"
          v-model="item.updatedAt"
          class="form-input"
          disabled
        />
      </div>
      <div class="my-3">
        <button v-if="action != 'ver'" type="submit" class="form-btn w-full">
          💾 Salvar
        </button>
        <button
          v-else
          type="button"
          class="form-btn w-full"
          @click="$router.go(-1)"
        >
          🔙 Voltar
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    path: String,
    required: () => true
  },
  data() {
    return {
      action: null,
      itemId: null,
      item: {},
      estados: []
    }
  },
  computed: {},
  methods: {
    async getData(id) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/${this.path}/${id}`
        )
        this.item = (await response.json()) ?? {}
        const { createdAt, updatedAt } = this.item
        this.item.createdAt = createdAt
          ? this.frontEndDateFormat(createdAt)
          : null
        this.item.updatedAt = updatedAt
          ? this.frontEndDateFormat(updatedAt)
          : null
      } catch (error) {
        console.error(error)
      }
    },
    frontEndDateFormat(date) {
      return new Date(date).toLocaleDateString()
    },
    async salvar() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/${this.path}/${this.itemId ?? ""}`,
          {
            method: this.action == "novo" ? "POST" : "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(this.item)
          }
        )
        if (response.ok) this.$router.go(-1)
      } catch (error) {
        console.error(error)
      }
    },
    async getStates() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/estados?` +
            new URLSearchParams({
              project: JSON.stringify({ sigla: 1 }),
              options: JSON.stringify({ sort: { nome: 1 } })
            })
        )
        this.estados = (await response.json()) ?? []
      } catch (error) {
        console.error(error)
      }
    }
  },
  mounted() {
    const { id, action } = this.$route.params
    this.action = action
    this.itemId = id
    if (id) this.getData(id)
    if (this.path == "cidades") this.getStates()
  }
}
</script>

<style></style>
