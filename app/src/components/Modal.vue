<template>
  <div>
    <div class="fixed z-10 inset-0 overflow-y-auto">
      <div
        class="flex justify-center min-h-screen md:pt-4 md:px-4 md:pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <div
          class="inline-block bg-white sm:rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div
                v-if="iconName"
                :class="
                  `mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-${setColour}-500 sm:mx-0 sm:h-10 sm:w-10`
                "
              >
                
              </div>
              <div class="mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  class="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  {{ title }}
                </h3>
                <div class="mt-2">
                  <slot name="body"></slot>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <slot name="footer"></slot>
            <button
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              @click="$emit('close')"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      required: true,
      default: () => "Título"
    },
    iconName: {
      type: String
    },
    type: {
      type: String,
      default: () => "success"
    }
  },
  computed: {
    setColour() {
      switch (this.type) {
        case "success":
          return "green"
        case "warning":
          return "yellow"
        case "error":
          return "red"
        default:
          return "blue"
      }
    }
  }
}
</script>

<style></style>
