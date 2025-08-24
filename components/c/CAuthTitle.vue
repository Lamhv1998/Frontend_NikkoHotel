<template>
  <div class="space-y-2">
    <p class="text-system-primary-100 xl:text-sub-title">
      Nika Hotel, hân hạnh chào đón quý khách
    </p>
    <h2 class="text-h3 text-text-inverse xl:text-h1">{{ props.text }}</h2>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  text: {
    type: String,
    default: ''
  }
})
</script>
