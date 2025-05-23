<template>
  <div class="min-h-screen bg-gray-100 px-4 py-10">
    <form
      class="mx-auto max-w-5xl space-y-10 rounded-xl bg-white p-8 shadow-xl"
      @submit.prevent="onSubmit"
    >
      <!-- THÔNG TIN PHÒNG -->
      <fieldset class="grid grid-cols-1 gap-6">
        <div class="col-span-full lg:col-span-1">
          <p class="text-xl font-semibold text-gray-700">Thông tin quyền</p>
        </div>
        <div class="col-span-full grid grid-cols-6 gap-4 lg:col-span-3">
          <div class="col-span-full sm:col-span-4">
            <label class="text-sm font-medium text-gray-600" for="firstname">Tên quyền</label>
            <input
              id="firstname"
              v-model="form.roomNum"
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              type="text"
              placeholder="Nhập số phòng"
            />
          </div>
          <div class="col-span-full sm:col-span-3">
            <label class="text-sm font-medium text-gray-600" for="lastname">Miêu tả</label>
            <input
              id="lastname"
              v-model="form.floor"
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              type="text"
              placeholder="Nhập tầng"
            />
          </div>
        </div>
      </fieldset>
      <!-- Nút submit -->
      <div class="flex justify-end">
        <button
          class="rounded-md bg-blue-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-blue-700"
          type="submit"
        >
          Tạo mới
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
const props = defineProps({
  permissData: {
    type: Object,
    default: () => ({
      permissName: '',
      note: ''
    })
  },
  isEdit: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submit'])

const form = reactive({ ...props.permissData })

const onSubmit = () => {
  emit('submit', { ...form })
}
</script>
