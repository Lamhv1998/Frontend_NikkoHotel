<template>
  <div id="default-layout" class="min-h-screen flex flex-col bg-system-background">
    <PageHeader />

    <main class="flex-1">
      <slot />
    </main>

    <PageFooter />
  </div>
</template>

<style lang="scss" scoped>
#default-layout {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--color-bg-primary);

  > header {
    position: sticky;
    top: 0;
    z-index: var(--z-sticky);
    width: 100%;
    background: #000000;
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--color-border-light);
    transition: all var(--transition-normal);
    
    &.scrolled {
      background: rgba(0, 0, 0, 0.95);
      box-shadow: var(--shadow-sm);
    }
  }

  > main {
    flex: 1;
    width: 100%;
  }
}

// Smooth scrolling for the entire page
html {
  scroll-behavior: smooth;
}

// Custom scrollbar for webkit browsers
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--color-bg-secondary);
}

::-webkit-scrollbar-thumb {
  background: var(--color-neutral-300);
  border-radius: var(--radius-full);
  
  &:hover {
    background: var(--color-neutral-400);
  }
}
</style>
