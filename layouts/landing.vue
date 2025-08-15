<template>
  <div id="landing-layout">
    <PageHeader />

    <main class="overflow-x-hidden">
      <slot />
    </main>

    <PageFooter />
  </div>
</template>

<style lang="scss" scoped>
#landing-layout {
  @apply relative flex min-h-screen flex-col;

  > header {
    @apply fixed top-0 z-30 w-full;
  }

  > main {
    @apply flex-1;
  }
}
</style>
