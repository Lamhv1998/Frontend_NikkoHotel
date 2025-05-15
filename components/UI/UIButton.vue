<template>
  <button :class="[cssColor, props.block ? 'flex w-full' : 'inline-flex']" :type="props.type">
    {{ props.text }}
    <template v-if="loading">
      <Icon class="text-icon-24" name="eos-icons:loading" />
    </template>
    <Icon v-else-if="props.icon" class="text-icon-24" :name="props.icon" />
  </button>
</template>

<script lang="ts" setup>
const props = defineProps({
  type: {
    type: String as PropType<'button' | 'submit' | 'reset' | undefined>,
    default: 'button'
  },
  text: {
    type: String,
    default: 'Button'
  },
  icon: {
    type: String,
    default: ''
  },
  variant: {
    type: String as PropType<
      'primary' | 'secondary' | 'ghost' | 'ghost-light' | 'text' | 'text-black' | 'dropdown'
    >,
    default: 'primary'
  },
  block: Boolean,
  loading: Boolean
})

const cssColor = computed<string>(() => {
  return {
    primary:
      'h-14 text-nowrap select-none items-center justify-center gap-1 rounded-lg bg-system-primary-100 px-8 py-4 text-sub-title xl:text-title text-white transition-colors hover:bg-system-primary-120 disabled:bg-system-gray-40 disabled:text-system-gray-60',
    secondary:
      'h-14 text-nowrap select-none items-center justify-center gap-1 rounded-lg border border-system-primary-100 bg-white px-8 py-4 text-sub-title xl:text-title text-system-primary-100 transition-colors hover:border-system-primary-120 hover:bg-system-primary-10 hover:text-system-primary-120 disabled:border-system-gray-60 disabled:text-system-gray-60 disabled:bg-white',
    ghost:
      'h-14 text-nowrap select-none items-center justify-center gap-1 rounded-lg px-8 py-4 text-sub-title xl:text-title text-white transition-colors hover:text-system-primary-100 disabled:text-system-gray-60',
    dropdown:
      'h-14 text-nowrap select-none items-center gap-1 rounded-lg px-8 py-4 text-sub-title xl:text-title text-system-gray-80 transition-colors hover:text-system-primary-100 hover:bg-system-primary-10 disabled:text-system-gray-60',
    'ghost-light':
      'h-14 text-nowrap select-none items-center justify-center gap-1 rounded-lg px-8 py-4 text-sub-title xl:text-title text-system-gray-80 transition-colors hover:text-black disabled:text-system-gray-60',
    text: 'text-nowrap select-none items-center justify-center gap-1 rounded-lg text-sub-title xl:text-title text-system-primary-100 underline transition-colors hover:text-system-primary-120 disabled:text-system-gray-60',
    'text-black':
      'text-nowrap select-none items-center justify-center gap-1 rounded-lg text-sub-title xl:text-title text-black underline transition-colors hover:text-system-primary-120 disabled:text-system-gray-80'
  }[props.variant]
})
</script>
