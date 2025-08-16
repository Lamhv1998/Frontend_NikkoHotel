<template>
  <button
    class="group flex w-full items-center justify-end gap-[.625rem] text-nowrap rounded-lg bg-white p-5 text-h5 text-black transition-colors hover:bg-system-primary-100 hover:text-white xl:p-10 xl:text-h5"
    type="button"
  >
    {{ props.text }}

    <!-- Đường kẻ phân cách -->
    <UILine
      class="max-w-20 flex-1 transition-all group-hover:max-w-[3.125rem] group-hover:bg-white xl:max-w-[9.375rem] xl:group-hover:max-w-[7.5rem]"
      color="black"
    />
  </button>
</template>

<script lang="ts" setup>
const props = defineProps({
  text: {
    type: String,
    default: 'Nút nổi bật'
  }
})
</script>
