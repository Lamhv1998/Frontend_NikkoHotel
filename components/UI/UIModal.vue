<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="ui-modal-overlay" @click="handleOverlayClick">
        <div
          :class="[
            'ui-modal',
            fullscreen && 'ui-modal--fullscreen',
            black && 'ui-modal--black'
          ]"
          @click.stop
        >
          <button
            v-if="!fullscreen"
            class="ui-modal-close"
            @click="$emit('update:modelValue', false)"
            aria-label="Close modal"
          >
            <Icon name="ic:baseline-close" class="text-icon-md" />
          </button>
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
interface Props {
  modelValue: boolean
  fullscreen?: boolean
  black?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  fullscreen: false,
  black: false
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const handleOverlayClick = () => {
  if (!props.fullscreen) {
    emit('update:modelValue', false)
  }
}
</script>

<style lang="scss" scoped>
.ui-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: var(--z-modal-backdrop);
  background: var(--color-bg-overlay);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-md);
}

.ui-modal {
  position: relative;
  background: var(--color-bg-primary);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-2xl);
  max-width: 90vw;
  max-height: 90vh;
  overflow: auto;
  
  &--fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    max-width: none;
    max-height: none;
    border-radius: 0;
    z-index: var(--z-modal);
  }
  
  &--black {
    background: var(--color-bg-dark);
    color: var(--color-text-inverse);
  }
}

.ui-modal-close {
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  z-index: 10;
  display: flex;
  height: 40px;
  width: 40px;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  background: var(--color-bg-secondary);
  color: var(--color-text-secondary);
  transition: all var(--transition-normal);
  border: none;
  outline: none;
  
  &:hover {
    background: var(--color-bg-tertiary);
    color: var(--color-text-primary);
  }
  
  &:focus {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 2px;
  }
}

// Modal transitions
.modal-enter-active,
.modal-leave-active {
  transition: all var(--transition-normal);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
