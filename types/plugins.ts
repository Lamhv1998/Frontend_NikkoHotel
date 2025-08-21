// Type declarations for plugins

// SweetAlert2
declare module '#app' {
  interface NuxtApp {
    $Swal: any
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $Swal: any
  }
}

export {}
