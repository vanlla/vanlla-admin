import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN' // element-ui lang
import elementZhTWLocale from 'element-ui/lib/locale/lang/zh-TW' // element-ui lang
import enLocale from './lang/en'
import zhLocale from './lang/zh-CN'
import zhTWLocale from './lang/zh-TW'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  },
  zh_TW: {
    ...zhTWLocale,
    ...elementZhTWLocale
  }
}

const i18n = new VueI18n({
  // set locale
  // options: en | zh | es
  locale: Cookies.get('language') || 'zh',
  // set locale messages
  messages
})

export default i18n
