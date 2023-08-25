import { createApp } from "vue"
import { createPinia } from "pinia"

// Quasar
import { Quasar, Loading } from "quasar"
import quasarLang from "quasar/lang/ja"
// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css"
// Import Quasar css
import "quasar/src/css/index.sass"

// Amplify
import { Amplify } from "aws-amplify"
import awsExports from "./aws-exports"
Amplify.configure(awsExports)

import App from "./App.vue"
import router from "./router"

import "./assets/main.css"

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Quasar, {
  plugins: { Loading },
  lang: quasarLang,
})

app.config.errorHandler = (err) => {
  /* エラーの制御 */
  console.log(err)
}
// グローバルコンポーネントの登録
// app.component('TodoDeleteButton', TodoDeleteButton)

app.mount("#app")
