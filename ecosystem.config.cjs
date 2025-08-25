module.exports = {
  apps: [
    {
      name: 'NuxtAppName',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs',
      env: {
        NITRO_PORT: 3001,
        NITRO_HOST: '0.0.0.0'
      }
    }
  ]
}
