// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    // ssr: false,
    tailwindcss: {
        cssPath: '~/assets/css/tailwind.css',
        configPath: 'tailwind.config'
        // exposeConfig: false,
        // config: {},
        // injectPosition: 0,
        // viewer: true,
    },
    imports: {
        dirs: ['stores']
    },
    alias: {
        pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs"
    },
    modules: [
        '@nuxtjs/tailwindcss',
        ['@pinia/nuxt',
            {
                autoImports: ['defineStore', 'acceptHMRUpdate']
            }
        ],
        '@vueuse/nuxt',
        '@nuxtjs/device'
    ]
})