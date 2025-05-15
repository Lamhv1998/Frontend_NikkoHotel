<template>
  <div id="auth-layout">
    <NuxtImg
      class="fixed inset-y-0 left-0 z-0 hidden h-full w-1/2 object-cover xl:block"
      src="/img/5EHlsYm.png"
      width="100vw"
    />
    <PageHeader />
    <main>
      <slot />
    </main>
  </div>
</template>

<style lang="scss" scoped>
#auth-layout {
  @apply relative flex min-h-screen flex-col;

  > header {
    @apply sticky top-0 z-[25] bg-system-background xl:z-auto;
  }

  > main {
    @apply relative flex flex-1 items-center justify-center bg-system-background xl:-mt-[7.5rem] xl:ml-[50%] xl:w-1/2;
    background-image: url('/img/line3.png');
    background-size: 100vw;
    background-position-x: center;
    background-position-y: 20%;
    background-repeat: no-repeat;
    background-attachment: fixed;

    @include xl {
      background-size: 60vw;
      background-position-x: 110%;
    }
  }
}
</style>
