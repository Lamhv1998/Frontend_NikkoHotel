<template>
  <footer class="bg-background-dark text-text-inverse">
    <div class="container py-16 lg:py-20 pt-20 lg:pt-24">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 xl:grid-cols-4 xl:gap-20 p-5">
        <!-- Brand Section -->
        <div class="space-y-8">
          <NuxtLink to="/" class="inline-block">
            <PageLogo white />
          </NuxtLink>
          
          <p class="text-body text-neutral-300 leading-relaxed">
            Nikko Hotel - Nơi nghỉ dưỡng sang trọng bậc nhất tại Việt Nam. Chúng tôi cam kết mang đến trải nghiệm lưu trú đẳng cấp 5 sao.
          </p>
          
          <!-- Social Links -->
          <div class="flex gap-4">
            <NuxtLink 
              class="social-link" 
              target="_blank" 
              to="https://line.me/ti/p/l7E02lIDG4"
              aria-label="Line"
            >
              <Icon name="bi:line" class="text-icon-lg" />
            </NuxtLink>
            
            <NuxtLink 
              class="social-link" 
              target="_blank" 
              to="https://instagram.com/cutecat8110"
              aria-label="Instagram"
            >
              <Icon name="bi:instagram" class="text-icon-lg" />
            </NuxtLink>
            
            <NuxtLink 
              class="social-link" 
              target="_blank" 
              to="https://facebook.com"
              aria-label="Facebook"
            >
              <Icon name="bi:facebook" class="text-icon-lg" />
            </NuxtLink>
            
            <NuxtLink 
              class="social-link" 
              target="_blank" 
              to="https://youtube.com"
              aria-label="YouTube"
            >
              <Icon name="bi:youtube" class="text-icon-lg" />
            </NuxtLink>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="space-y-8">
          <h3 class="text-h5 font-display font-bold text-text-inverse">
            Liên kết nhanh
          </h3>
          
          <ul class="space-y-4">
            <li>
              <NuxtLink 
                to="/rooms" 
                class="text-body text-neutral-300 transition-colors hover:text-primary-400"
              >
                Phòng nghỉ
              </NuxtLink>
            </li>
            <li>
              <NuxtLink 
                to="/services" 
                class="text-body text-neutral-300 transition-colors hover:text-primary-400"
              >
                Dịch vụ
              </NuxtLink>
            </li>
            <li>
              <NuxtLink 
                to="/blog" 
                class="text-body text-neutral-300 transition-colors hover:text-primary-400"
              >
                Blog
              </NuxtLink>
            </li>
            <li>
              <NuxtLink 
                to="/about" 
                class="text-body text-neutral-300 transition-colors hover:text-primary-400"
              >
                Về chúng tôi
              </NuxtLink>
            </li>
            <li>
              <NuxtLink 
                to="/contact" 
                class="text-body text-neutral-300 transition-colors hover:text-primary-400"
              >
                Liên hệ
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Services -->
        <div class="space-y-8">
          <h3 class="text-h5 font-display font-bold text-text-inverse">
            Dịch vụ
          </h3>
          
          <ul class="space-y-4">
            <li>
              <span class="text-body text-neutral-300">
                Đặt phòng trực tuyến
              </span>
            </li>
            <li>
              <span class="text-body text-neutral-300">
                Dịch vụ spa & massage
              </span>
            </li>
            <li>
              <span class="text-body text-neutral-300">
                Nhà hàng cao cấp
              </span>
            </li>
            <li>
              <span class="text-body text-neutral-300">
                Hội nghị & sự kiện
              </span>
            </li>
            <li>
              <span class="text-body text-neutral-300">
                Dịch vụ vận chuyển
              </span>
            </li>
          </ul>
        </div>

        <!-- Contact Information -->
        <div class="space-y-8">
          <h3 class="text-h5 font-display font-bold text-text-inverse">
            Thông tin liên hệ
          </h3>
          
          <div class="space-y-6">
            <div class="flex items-start gap-4">
              <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500/20 text-primary-400">
                <Icon name="ic:outline-phone" class="text-icon-md" />
              </div>
              <div>
                <p class="text-body-sm font-medium text-neutral-300">Điện thoại</p>
                <p class="text-body text-text-inverse">+84 28 1234 5678</p>
              </div>
            </div>
            
            <div class="flex items-start gap-4">
              <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500/20 text-primary-400">
                <Icon name="ic:outline-email" class="text-icon-md" />
              </div>
              <div>
                <p class="text-body-sm font-medium text-neutral-300">Email</p>
                <p class="text-body text-text-inverse">info@nikkohotel.com</p>
              </div>
            </div>
            
            <div class="flex items-start gap-4">
              <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500/20 text-primary-400">
                <Icon name="ic:outline-location-on" class="text-icon-md" />
              </div>
              <div>
                <p class="text-body-sm font-medium text-neutral-300">Địa chỉ</p>
                <p class="text-body text-text-inverse">123 Nguyễn Huệ, Quận 1, TP.HCM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="mt-16 border-t border-neutral-700 pt-8">
        <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <!-- Copyright -->
          <div class="text-center lg:text-left">
            <p class="text-body-sm text-neutral-400">
              © {{ new Date().getFullYear() }} Nikko Hotel. Tất cả quyền được bảo lưu.
            </p>
          </div>
          
          <!-- Legal Links -->
          <div class="flex flex-wrap items-center justify-center gap-6 lg:justify-end">
            <NuxtLink 
              to="/privacy" 
              class="text-body-sm text-neutral-400 transition-colors hover:text-primary-400"
            >
              Chính sách bảo mật
            </NuxtLink>
            <NuxtLink 
              to="/terms" 
              class="text-body-sm text-neutral-400 transition-colors hover:text-primary-400"
            >
              Điều khoản sử dụng
            </NuxtLink>
            <NuxtLink 
              to="/sitemap" 
              class="text-body-sm text-neutral-400 transition-colors hover:text-primary-400"
            >
              Sitemap
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
// No additional logic needed for this component
</script>

<style lang="scss" scoped>
.social-link {
  display: inline-flex;
  height: 48px;
  width: 48px;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  border: 1px solid var(--color-neutral-600);
  color: var(--color-neutral-300);
  transition: all var(--transition-normal);
  
  &:hover {
    border-color: var(--color-primary-500);
    color: var(--color-primary-400);
    background: var(--color-primary-500/10);
    transform: translateY(-2px);
  }
  
  &:focus {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 2px;
  }
}

// Smooth animations
footer {
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--color-primary-500), transparent);
  }
}

// Responsive adjustments
@media (max-width: 1024px) {
  .social-link {
    height: 40px;
    width: 40px;
  }
}
</style>
