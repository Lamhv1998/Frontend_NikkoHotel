<template>
  <section class="space-y-6 bg-white p-6 rounded-lg shadow">
    <h2 class="text-title">Hạng thành viên của bạn</h2>
    <div class="flex items-center justify-between">
      <p class="text-body">Hạng hiện tại: <strong>{{ member.level }}</strong></p>
      <p class="text-body">Điểm hiện tại: <strong>{{ member.points }}</strong></p>
    </div>
    <ProgressBar :current="member.points" :nextLevel="member.nextLevelPoint" />

    <h3 class="mt-4 text-sub-title">Lịch sử điểm thưởng</h3>
    <ul class="divide-y divide-gray-100">
      <li v-for="(item, index) in member.pointHistory" :key="index" class="py-2">
        <span>{{ item.date }} - {{ item.note }}</span>
        <span class="float-right font-bold">+{{ item.point }}</span>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
const member = reactive({
  level: 'Bạc',
  points: 320,
  nextLevelPoint: 500,
  pointHistory: [
    { date: '2025-05-20', point: 50, note: 'Đặt phòng thành công' },
    { date: '2025-05-10', point: 30, note: 'Đánh giá khách sạn' }
  ]
})
</script>
