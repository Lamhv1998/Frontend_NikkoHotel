<template>
  <div class="flex items-center justify-between gap-2 text-title">
    <template v-for="(title, index) in props.steps" :key="index">
      <button
        :class="[
          index < progress && !props.disabled ? 'cursor-pointer' : 'pointer-events-none',
          progress >= index ? ' text-white' : 'text-system-gray-60',
          'flex flex-col  items-center gap-1'
        ]"
        type="button"
        :disabled="index >= progress || props.disabled"
        @click="progress = index"
      >
        <div
          :class="[
            progress >= index ? 'bg-system-primary-80' : 'border',
            'flex h-8 w-8 items-center justify-center rounded-full '
          ]"
        >
          <Icon v-if="index < progress" name="ic:baseline-check" />
          <template v-else>
            {{ index + 1 }}
          </template>
        </div>
        {{ title }}
      </button>
      <div
        v-if="index + 1 !== props.steps.length"
        :class="[progress > index ? 'bg-white' : 'bg-system-gray-60', 'h-[2px] flex-1 ']"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  steps: {
    type: Array,
    default: () => ['Title', 'Title', 'Title']
  },
  disabled: {
    type: Boolean,
    default: true
  }
})

const progress = defineModel<number>({
  default: 0
})
</script>
