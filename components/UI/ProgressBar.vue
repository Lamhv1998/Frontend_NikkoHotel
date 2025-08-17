<template>
  <div class="w-full">
    <div class="relative">
      <!-- Background bar -->
      <div class="w-full bg-gray-700 rounded-full h-3">
        <!-- Progress bar -->
        <div 
          class="bg-gradient-to-r from-amber-400 to-yellow-500 h-3 rounded-full transition-all duration-1000 ease-out"
          :style="{ width: `${progressPercentage}%` }"
        ></div>
      </div>
      
      <!-- Progress indicator -->
      <div 
        class="absolute -top-1 w-5 h-5 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full border-2 border-white shadow-lg transition-all duration-1000 ease-out"
        :style="{ left: `calc(${progressPercentage}% - 10px)` }"
      ></div>
    </div>
    
    <!-- Progress text -->
    <div class="flex justify-between text-xs text-gray-400 mt-2">
      <span>{{ current }} điểm</span>
      <span>{{ nextLevel }} điểm</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  current: number
  nextLevel: number
}

const props = defineProps<Props>()

const progressPercentage = computed(() => {
  if (props.nextLevel <= props.current) return 100
  return Math.min((props.current / props.nextLevel) * 100, 100)
})
</script>
