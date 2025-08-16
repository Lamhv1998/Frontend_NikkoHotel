<template>
  <div class="room-info">
    <div class="room-info-grid">
      <div
        v-for="box in roomInfoList"
        :key="box.id"
        class="room-info-item"
      >
        <Icon class="text-icon-md text-primary-500" :name="box.icon" />
        <div class="room-info-content">
          <h4 class="room-info-title">{{ box.title }}</h4>
          <p class="room-info-description">{{ box.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const roomInfoList = ref([
  {
    id: 1,
    icon: 'ic:outline-king-bed',
    title: 'Giường King Size',
    description: 'Giường ngủ cao cấp với đệm memory foam'
  },
  {
    id: 2,
    icon: 'ic:outline-ac-unit',
    title: 'Điều hòa không khí',
    description: 'Hệ thống điều hòa hiện đại, điều chỉnh nhiệt độ'
  },
  {
    id: 3,
    icon: 'ic:outline-wifi',
    title: 'WiFi miễn phí',
    description: 'Kết nối internet tốc độ cao không giới hạn'
  },
  {
    id: 4,
    icon: 'ic:outline-tv',
    title: 'TV màn hình phẳng',
    description: 'Smart TV 55 inch với các kênh giải trí đa dạng'
  },
  {
    id: 5,
    icon: 'ic:outline-local-bar',
    title: 'Mini bar',
    description: 'Tủ lạnh mini với đồ uống và snack đa dạng'
  },
  {
    id: 6,
    icon: 'ic:outline-shower',
    title: 'Phòng tắm riêng',
    description: 'Phòng tắm sang trọng với vòi sen và bồn tắm'
  }
])
</script>

<style lang="scss" scoped>
.room-info {
  padding: var(--spacing-xl) 0;
}

.room-info-grid {
  display: grid;
  gap: var(--spacing-lg);
  
  @include responsive(md) {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-xl);
  }
  
  @include responsive(lg) {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-2xl);
  }
}

.room-info-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  border-radius: var(--radius-xl);
  background: var(--color-bg-secondary);
  transition: all var(--transition-normal);
  
  &:hover {
    background: var(--color-bg-tertiary);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
}

.room-info-content {
  flex: 1;
}

.room-info-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-xs);
}

.room-info-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
}
</style>
