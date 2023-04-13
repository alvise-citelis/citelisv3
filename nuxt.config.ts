// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devServer: {
    port: 3333,
  },
  typescript: {
    shim: false,
  },
  css: ["/assets/css/index.css"],
  vite: {
    // @ts-ignore
    // curently this will lead to a type error, but hopefully will be fixed soon #justBetaThings
  },
  postcss: {
    plugins: {
      autoprefixer: {},
    },
  },
  modules: ["@nuxt/image-edge", ["@nuxtjs/tailwindcss"]],
});
