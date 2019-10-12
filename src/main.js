import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Element from 'element-ui'
import './styles/element-variables.scss'
import '@/styles/index.scss'

import './icons' // icon
import './router/permission'

Vue.use(Element)
Vue.config.productionTip = false
Vue.directive('real-img', async function(el, binding) {
  //指令名称为：real-img
  let imgURL = binding.value //获取图片地址
  if (imgURL) {
    let exist = await imageIsExist(imgURL)
    if (exist) {
      el.setAttribute('src', imgURL)
    }
  }
})

/**
 * 检测图片是否存在
 * @param url
 */
let imageIsExist = function(url) {
  return new Promise(resolve => {
    var img = new Image()
    img.onload = function() {
      if (this.complete == true) {
        resolve(true)
        img = null
      }
    }
    img.onerror = function() {
      resolve(false)
      img = null
    }
    img.src = url
  })
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
