<template>
  <ol class="list-inside list-decimal text-body-2 text-system-gray-80 xl:text-body">
    <li v-for="(term, index) in terms" :key="index">{{ term }}</li>
  </ol>
</template>

<script lang="ts" setup>
/* Lưu ý khi đặt phòng */
const terms = ref([
  'Thời gian nhận phòng là 15:00, trả phòng trước 12:00 trưa.',
  'Nếu cần trả phòng trễ, vui lòng liên hệ quầy lễ tân trước, tùy vào tình trạng phòng sẽ có thể phát sinh phụ phí.',
  'Vui lòng không hút thuốc trong phòng, nếu có nhu cầu hút thuốc, hãy sử dụng khu vực hút thuốc riêng ở mỗi tầng.',
  'Nếu phát hiện thiết bị trong phòng bị hư hỏng hoặc mất mát, sẽ thu phí bồi thường theo giá trị.',
  'Hãy giữ gìn phòng và không gian chung sạch sẽ, ngăn nắp.',
  'Nếu cần thêm khăn, đồ dùng vệ sinh hoặc vật dụng khác, vui lòng liên hệ quầy lễ tân.',
  'Chúng tôi cung cấp Wi-Fi miễn phí, mật khẩu có thể xem tại quầy lễ tân hoặc trên thẻ thông tin trong phòng.',
  'Vui lòng không mang các vật dụng trong phòng ra khỏi khách sạn, nếu muốn mua, hãy liên hệ quầy lễ tân.',
  'Chúng tôi phục vụ quầy lễ tân 24/7, nếu có nhu cầu hoặc thắc mắc, vui lòng liên hệ bất cứ lúc nào.',
  'Để đảm bảo an toàn cho tất cả khách, vui lòng không gây ồn ào ở hành lang hoặc khu vực chung và tuân thủ các quy định khác của khách sạn.'
])
</script>
