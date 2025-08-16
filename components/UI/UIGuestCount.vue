<template>
  <div class="guest-count">
    <label class="guest-count-label">{{ label }}</label>
    <div class="guest-count-controls">
      <button
        class="guest-count-btn"
        :disabled="modelValue <= min"
        @click="decrease"
        aria-label="Decrease count"
      >
        <Icon name="ic:baseline-remove" class="text-icon-md" />
      </button>
      
      <span class="guest-count-value">{{ modelValue }}</span>
      
      <button
        class="guest-count-btn"
        :disabled="modelValue >= max"
        @click="increase"
        aria-label="Increase count"
      >
        <Icon name="ic:baseline-add" class="text-icon-md" />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  modelValue: number
  label?: string
  min?: number
  max?: number
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Số khách',
  min: 1,
  max: 10
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const decrease = () => {
  if (props.modelValue > props.min) {
    emit('update:modelValue', props.modelValue - 1)
  }
}

const increase = () => {
  if (props.modelValue < props.max) {
    emit('update:modelValue', props.modelValue + 1)
  }
}
</script>

<style lang="scss" scoped>
.guest-count {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.guest-count-label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.guest-count-controls {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.guest-count-btn {
  display: flex;
  height: 40px;
  width: 40px;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  border: 1px solid var(--color-border-medium);
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  transition: all var(--transition-normal);
  cursor: pointer;
  outline: none;
  
  &:hover:not(:disabled) {
    background: var(--color-bg-secondary);
    border-color: var(--color-primary-500);
    color: var(--color-primary-500);
  }
  
  &:focus {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 2px;
  }
  
  &:disabled {
    background: var(--color-bg-tertiary);
    color: var(--color-text-tertiary);
    cursor: not-allowed;
    opacity: 0.5;
  }
}

.guest-count-value {
  min-width: 40px;
  text-align: center;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}
</style>
