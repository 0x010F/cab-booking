import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import './registerServiceWorker'
// import axios from 'axios'
import VueLogger from 'vuejs-logger'
import mqlOptions from './plugins/mqlOptions.js'
import VueLocalStorage from 'vue-localstorage'
import { loadLanguageAsync, i18n } from './setup/i18n-setup.js'
import VuejsDialog from 'vuejs-dialog'
import BootstrapVue from 'bootstrap-vue'
import vSelect from 'vue-select'
import Toasted from 'vue-toasted'
import VueMeta from 'vue-meta'
import Vuebar from 'vuebar';

import 'vuejs-dialog/dist/vuejs-dialog.min.css'
import '../public/assets/plugins/bootstrap-4.1.2-dist/css/bootstrap.min.css'
import '../public/assets/plugins/materialdesignicons/css/materialdesignicons.min.css'
import 'vue-select/dist/vue-select.css'
import '../public/assets/css/template.scss'

Vue.config.productionTip = false
const isProduction = process.env.NODE_ENV === 'production'

const options = {
  isEnabled: true,
  logLevel: isProduction ? 'error' : 'debug',
  stringifyArguments: false,
  showLogLevel: true,
  showMethodName: true,
  separator: '|',
  showConsoleColors: true
}

Vue.use(VueMeta)
Vue.use(VueLogger, options)
Vue.use(VuejsDialog)
Vue.use(BootstrapVue)
Vue.use(vSelect)
Vue.use(Toasted)
Vue.use(Vuebar);

var baseURL = '/server'
var cdnBaseURL = '/cdnserver'
Vue.use(mqlOptions, {
  baseURL: baseURL,
  cdnBaseURL: cdnBaseURL,
  cdnConfig: [
    {
      'purposeId': '1',
      'bucketId': '123456',
      'bucketName': 'client2',
      'clientId': '26',
      'userId': '23',
      'isPrivateBucket': true
    },
    {
      'bucketName': 'client2',
      'clientId': 'client2',
      'isPrivateBucket': false
    },
    {
      'bucketId': '1TBvOvV0WPk52KoYrslIPmdieBD',
      'bucketName': 'TestBucket',
      'clientId': '1TBvKXU60Lu2zPAfU85dcPYOvlb',
      'createdBy': 'suvarnar@mkcl.org',
      'createdOn': 1572946274,
      'description': 'TestBucket.',
      'isPrivateBucket': null,
      'modifiedBy': 'suvarnar@mkcl.org',
      'modifiedOn': 1572946274,
      'purposeId': '1TBvKXU60Lu2zPAfU85dcPYOvlb'
    },
    {
      'bucketId': '1TC5up2yyDGAeJfMXBRnazhPG6Z',
      'bucketName': 'TestBucket',
      'clientId': '1TC5qFX6rFuxNcrtTqCzpGumfWI',
      'createdBy': 'suvarnar@mkcl.org',
      'createdOn': 1572951461,
      'description': 'Testbucket.',
      'isPrivateBucket': null,
      'modifiedBy': 'suvarnar@mkcl.org',
      'modifiedOn': 1572951461,
      'purposeId': '1TC5qFX6rFuxNcrtTqCzpGumfWI'
    }
  ]
})
// axios.defaults.baseURL = baseURL
// TODO: set axios header on login  to session storage
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

// TODO: delete axios header on logout and clear session storage
// delete axios.defaults.headers.common['Authorization']
sessionStorage.setItem('user-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.qCJ-hcgSTLgkaT7kfI6--xRm4IEpPFQmMj3UZ94gNo4')
Vue.use(VueLocalStorage)

router.beforeEach((to, from, next) => {
  loadLanguageAsync(to.meta.lang).then(() => next())

  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title)
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags)

  if (nearestWithTitle) document.title = nearestWithTitle.meta.title

  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el))

  if (!nearestWithMeta) return next()
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta')
    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key])
    })
    tag.setAttribute('data-vue-router-controlled', '')
    return tag
  })
    .forEach(tag => document.head.appendChild(tag))
  next()
})

// axios.interceptors.request.use(function (config) {
//   // if (config.url.indexOf('/r/') !== -1) {  // Check for restricted request
//   if (config.headers.common['Authorization']) {
//     console.log('autorize!')
//   } else {
//     console.log('not authorize')
//   }
//   // }
//   return config
// }, function (error) {
//   return Promise.reject(error)
// })

var vm = new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

window.app = vm
