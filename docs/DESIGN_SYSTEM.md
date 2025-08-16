# Nikko Hotel Design System

## Tổng quan

Hệ thống thiết kế mới của Nikko Hotel được xây dựng với mục tiêu tạo ra một giao diện nhất quán, hiện đại và dễ bảo trì. Hệ thống này sử dụng CSS Variables, Tailwind CSS và SCSS để đảm bảo tính linh hoạt và hiệu suất cao.

## 🎨 Màu sắc

### Primary Colors
```scss
--color-primary-50: #fef7f0;   // Lightest
--color-primary-100: #fdecd8;
--color-primary-200: #fbd5b1;
--color-primary-300: #f8b883;
--color-primary-400: #f49455;
--color-primary-500: #f17a2e;   // Main brand color
--color-primary-600: #e25f1a;
--color-primary-700: #bc4a16;
--color-primary-800: #963b19;
--color-primary-900: #7a3218;
--color-primary-950: #421709;   // Darkest
```

### Neutral Colors
```scss
--color-neutral-50: #fafafa;    // Lightest
--color-neutral-100: #f5f5f5;
--color-neutral-200: #e5e5e5;
--color-neutral-300: #d4d4d4;
--color-neutral-400: #a3a3a3;
--color-neutral-500: #737373;
--color-neutral-600: #525252;
--color-neutral-700: #404040;
--color-neutral-800: #262626;
--color-neutral-900: #171717;
--color-neutral-950: #0a0a0a;   // Darkest
```

### Accent Colors
```scss
--color-accent-gold: #d4af37;
--color-accent-silver: #c0c0c0;
--color-accent-bronze: #cd7f32;
```

### Semantic Colors
```scss
--color-success: #10b981;
--color-warning: #f59e0b;
--color-error: #ef4444;
--color-info: #3b82f6;
```

## 📝 Typography

### Font Families
- **Primary**: Inter (Sans-serif)
- **Display**: Playfair Display (Serif)
- **Mono**: JetBrains Mono (Monospace)

### Font Sizes
```scss
--font-size-xs: 0.75rem;      // 12px
--font-size-sm: 0.875rem;     // 14px
--font-size-base: 1rem;       // 16px
--font-size-lg: 1.125rem;     // 18px
--font-size-xl: 1.25rem;      // 20px
--font-size-2xl: 1.5rem;      // 24px
--font-size-3xl: 1.875rem;    // 30px
--font-size-4xl: 2.25rem;     // 36px
--font-size-5xl: 3rem;        // 48px
--font-size-6xl: 3.75rem;     // 60px
```

### Font Weights
```scss
--font-weight-light: 300;
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
--font-weight-extrabold: 800;
```

## 📏 Spacing

```scss
--spacing-xs: 0.25rem;    // 4px
--spacing-sm: 0.5rem;     // 8px
--spacing-md: 1rem;       // 16px
--spacing-lg: 1.5rem;     // 24px
--spacing-xl: 2rem;       // 32px
--spacing-2xl: 3rem;      // 48px
--spacing-3xl: 4rem;      // 64px
--spacing-4xl: 6rem;      // 96px
--spacing-5xl: 8rem;      // 128px
```

## 🔲 Border Radius

```scss
--radius-sm: 0.25rem;     // 4px
--radius-md: 0.375rem;    // 6px
--radius-lg: 0.5rem;      // 8px
--radius-xl: 0.75rem;     // 12px
--radius-2xl: 1rem;       // 16px
--radius-3xl: 1.5rem;     // 24px
--radius-full: 9999px;
```

## 🌟 Shadows

```scss
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.2);
--shadow-primary: 0 10px 25px -5px rgba(241, 122, 46, 0.3);
--shadow-luxury: 0 20px 40px -12px rgba(212, 175, 55, 0.3);
```

## ⚡ Transitions

```scss
--transition-fast: 150ms ease-in-out;
--transition-normal: 250ms ease-in-out;
--transition-slow: 350ms ease-in-out;
```

## 🎯 Components

### Buttons
```html
<!-- Primary Button -->
<button class="btn btn-primary">Primary Action</button>

<!-- Secondary Button -->
<button class="btn btn-secondary">Secondary Action</button>

<!-- Outline Button -->
<button class="btn btn-outline">Outline Action</button>

<!-- Ghost Button -->
<button class="btn btn-ghost">Ghost Action</button>
```

### Cards
```html
<!-- Basic Card -->
<div class="card">
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</div>

<!-- Hover Card -->
<div class="card-hover">
  <h3>Hover Card</h3>
  <p>This card has hover effects</p>
</div>

<!-- Luxury Card -->
<div class="card-luxury">
  <h3>Luxury Card</h3>
  <p>Premium styling with gradient</p>
</div>
```

### Forms
```html
<!-- Input -->
<input class="input" type="text" placeholder="Enter text...">

<!-- Input Group -->
<div class="input-group">
  <input class="input" type="text" placeholder="First name">
  <input class="input" type="text" placeholder="Last name">
</div>
```

## 📱 Responsive Design

### Breakpoints
```scss
sm: 576px
md: 768px
lg: 992px
xl: 1200px
2xl: 1400px
```

### Responsive Mixins
```scss
@include responsive(sm) { /* styles */ }
@include responsive(md) { /* styles */ }
@include responsive(lg) { /* styles */ }
@include responsive(xl) { /* styles */ }
@include responsive(2xl) { /* styles */ }
```

## 🎨 Utility Classes

### Layout
```html
<div class="container">Centered container</div>
<div class="grid-layout">Grid layout</div>
<div class="flex-layout">Flex layout</div>
```

### Spacing
```html
<div class="p-1">Padding 4px</div>
<div class="p-2">Padding 8px</div>
<div class="p-3">Padding 16px</div>
<div class="p-4">Padding 24px</div>
<div class="p-5">Padding 32px</div>
<div class="p-6">Padding 48px</div>
```

### Text
```html
<h1 class="text-gradient">Gradient Text</h1>
<div class="glass-effect">Glass Effect</div>
```

## 🔧 Mixins

### Flexbox
```scss
@include flex-center;    // Center items
@include flex-between;   // Space between items
```

### Positioning
```scss
@include absolute-center; // Center absolutely
```

### Effects
```scss
@include glass-effect;    // Glass morphism
@include gradient-primary; // Primary gradient
@include gradient-luxury;  // Luxury gradient
@include text-gradient;    // Text gradient
```

## 📁 File Structure

```
assets/
├── css/
│   └── fonts.css          # Font definitions
├── scss/
│   ├── main.scss          # Main stylesheet
│   ├── _base.scss         # Base styles
│   └── _variable.scss     # Design tokens
```

## 🚀 Sử dụng

### 1. Import trong component
```vue
<template>
  <div class="card">
    <h2 class="text-h2 font-display">Title</h2>
    <p class="text-body">Content</p>
    <button class="btn btn-primary">Action</button>
  </div>
</template>
```

### 2. Sử dụng CSS Variables
```scss
.my-component {
  background: var(--color-primary-500);
  color: var(--color-text-inverse);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}
```

### 3. Sử dụng Mixins
```scss
.my-component {
  @include flex-center;
  @include gradient-primary;
  @include responsive(lg) {
    // Large screen styles
  }
}
```

## 🎯 Best Practices

1. **Sử dụng CSS Variables** thay vì hardcode values
2. **Sử dụng utility classes** khi có thể
3. **Sử dụng mixins** cho logic phức tạp
4. **Responsive design** từ mobile-first
5. **Accessibility** luôn được ưu tiên
6. **Performance** với font-display: swap

## 🔄 Cập nhật

Khi cần thay đổi design system:

1. Cập nhật `_variable.scss` cho design tokens
2. Cập nhật `tailwind.config.js` cho Tailwind classes
3. Cập nhật `_base.scss` cho global styles
4. Test trên tất cả breakpoints
5. Cập nhật documentation này

## 📞 Hỗ trợ

Nếu có câu hỏi về design system, vui lòng liên hệ team development.
