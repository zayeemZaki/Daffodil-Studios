import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return new Promise(resolve => {
        setTimeout(() => {
          const el = document.querySelector(to.hash)
          if (el) {
            resolve({ el: to.hash, top: 80, behavior: 'smooth' })
          } else {
            resolve({ top: 0, behavior: 'smooth' })
          }
        }, 700)
      })
    }
    return { top: 0, left: 0, behavior: 'instant' }
  }
}
