<template>
  <div id="default-layout">
    <PageHeader />

    <main>
      <slot />
    </main>

    <PageFooter />
  </div>
</template>

<style lang="scss" scoped>
#default-layout {
  @apply relative flex min-h-screen flex-col;

  > header {
    @apply sticky top-0 z-[25] w-full bg-system-background;
  }

  > main {
    @apply flex-1;
  }
}
</style>
