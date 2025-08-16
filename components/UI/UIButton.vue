<template>
  <button
    :class="[
      'ui-button',
      `ui-button--${props.variant}`,
      props.block && 'ui-button--block',
      props.size && `ui-button--${props.size}`
    ]"
    :disabled="props.disabled"
    @click="$emit('click')"
  >
    <Icon v-if="props.loading" class="text-icon-md animate-spin" name="eos-icons:loading" />
    <Icon v-else-if="props.icon" class="text-icon-md" :name="props.icon" />
    <span v-if="props.text">{{ props.text }}</span>
    <slot />
  </button>
</template>

<script lang="ts" setup>
interface Props {
  text?: string
  icon?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'dropdown'
  size?: 'small' | 'large'
  block?: boolean
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  block: false,
  disabled: false,
  loading: false
})

defineEmits<{
  click: []
}>()
</script>

<style lang="scss" scoped>
.ui-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-lg);
  font-weight: var(--font-weight-medium);
  transition: all var(--transition-normal);
  cursor: pointer;
  border: none;
  outline: none;
  font-size: var(--font-size-base);
  
  &:focus {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 2px;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &--block {
    width: 100%;
  }
  
  &--small {
    padding: var(--spacing-xs) var(--spacing-md);
    font-size: var(--font-size-sm);
    border-radius: var(--radius-md);
  }
  
  &--large {
    padding: var(--spacing-md) var(--spacing-xl);
    font-size: var(--font-size-lg);
    border-radius: var(--radius-xl);
  }
  
  // Primary variant
  &--primary {
    background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
    color: var(--color-text-inverse);
    
    &:hover:not(:disabled) {
      background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-700));
      transform: translateY(-1px);
      box-shadow: var(--shadow-lg);
    }
  }
  
  // Secondary variant
  &--secondary {
    background: var(--color-bg-secondary);
    color: var(--color-text-primary);
    border: 1px solid var(--color-border-medium);
    
    &:hover:not(:disabled) {
      background: var(--color-bg-tertiary);
      border-color: var(--color-primary-500);
    }
  }
  
  // Outline variant
  &--outline {
    background: transparent;
    color: var(--color-primary-600);
    border: 2px solid var(--color-primary-600);
    
    &:hover:not(:disabled) {
      background: var(--color-primary-600);
      color: var(--color-text-inverse);
    }
  }
  
  // Ghost variant
  &--ghost {
    background: transparent;
    color: var(--color-text-secondary);
    
    &:hover:not(:disabled) {
      background: var(--color-bg-secondary);
      color: var(--color-text-primary);
    }
  }
  
  // Dropdown variant
  &--dropdown {
    background: transparent;
    color: var(--color-text-primary);
    width: 100%;
    justify-content: flex-start;
    
    &:hover:not(:disabled) {
      background: var(--color-bg-secondary);
    }
  }
}
</style>
