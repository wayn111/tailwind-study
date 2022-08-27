import router from './router'
import { setLocalStorage, getLocalStorage } from './util/localStorage'
import { getToken } from './util/auth' // get token from cookie

const whiteList = ['/login', '/register']

router.beforeEach(async (to, from, next) => {

  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    }
    next()
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})

router.afterEach(() => {
})
