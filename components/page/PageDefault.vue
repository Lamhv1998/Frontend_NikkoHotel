<template>
  <div class="container mt-10">
    <h1 class="text-h1 font-bold">{{ `This is ${route.name}.` }}</h1>
  </div>
</template>

<script setup>
const route = useRoute()
</script>
