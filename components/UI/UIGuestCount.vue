<template>
  <div class="flex items-center gap-4">
    <button
      class="up-down-button"
      type="button"
      :disabled="peopleNum <= 1"
      @click="changeCurrent('down')"
    >
      <Icon name="ic:baseline-minus" />
    </button>
    {{ peopleNum }}
    <button
      class="up-down-button"
      type="button"
      :disabled="peopleNum >= props.max"
      @click="changeCurrent('up')"
    >
      <Icon name="ic:outline-plus" />
    </button>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  max: {
    type: Number,
    required: true
  }
})

const peopleNum = defineModel<number>({ default: 1 })

const changeCurrent = (event: string) => {
  if (event === 'down' && peopleNum.value > 1) {
    peopleNum.value--
  } else if (event === 'up' && peopleNum.value < props.max) {
    peopleNum.value++
  }
}
</script>

<style lang="scss" scoped>
.up-down-button {
  @apply flex h-14 w-14 place-items-center rounded-full border border-system-gray-40 bg-white p-4 text-icon-24 transition-colors hover:bg-system-gray-10 active:bg-system-gray-40 disabled:bg-system-gray-40 disabled:text-system-gray-60;
}
</style>
