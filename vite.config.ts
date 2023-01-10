import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()],
// })

export default defineConfig(({command,mode})=>{
  const env = loadEnv(mode,process.cwd())
  return{
    plugins: [vue()],
    define: {
      __APP_ENV__: env.APP_ENV,
    },
    server:{
      port:6666
    }
  }
})