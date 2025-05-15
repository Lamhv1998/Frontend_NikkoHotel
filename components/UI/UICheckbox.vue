<template>
  <label class="block space-y-2" :for="props.name">
    <div class="group flex items-center gap-2">
      <div class="relative inline-block h-6 w-6">
        <VField
          :id="props.name"
          v-bind="attrs"
          v-model="checked"
          class="peer h-6 w-6 cursor-pointer appearance-none rounded border border-system-gray-40 bg-white transition-colors checked:border-system-primary-100 checked:bg-system-primary-100 hover:outline hover:outline-4 hover:outline-system-primary-100/10 disabled:bg-system-gray-40 group-hover:checked:hover:bg-system-primary-120 group-hover:disabled:hover:cursor-default group-hover:disabled:hover:bg-system-gray-40"
          :name="props.name"
          type="checkbox"
          :value="true"
        />
        <div
          class="pointer-events-none absolute left-0 top-0 flex h-6 w-6 items-center justify-center text-white opacity-0 transition-opacity peer-checked:opacity-100 peer-disabled:text-system-gray-60"
        >
          <Icon name="ic:baseline-check" />
        </div>
      </div>
      <div class="select-none text-sub-title text-white xl:text-title">{{ props.text }}</div>
    </div>
    <VErrorMessage
      class="block text-sub-title text-system-error-120 xl:text-title"
      :name="props.name"
    />
  </label>
</template>

<script lang="ts" setup>
const attrs = useAttrs()

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  error: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: ''
  }
})

const checked = defineModel<boolean>({
  default: false
})
</script>
