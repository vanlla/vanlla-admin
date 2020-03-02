import { param2Obj } from '@/utils'

const loginResult = { code: 20000, data: { token: 'admin' } }
const userInfo = {
  code: 20000,
  data: {
    roles: ['admin'],
    name: 'admin',
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
  }
}

const logoutResult = {
  code: 20000,
  data: 'success'
}

export default {
  loginByUsername: config => {
    const { username } = JSON.parse(config.body)
    if (username) return loginResult
  },
  getUserInfo: config => {
    console.log(config)
    const { token } = param2Obj(config.url)
    if (token) {
      return userInfo
    } else {
      return false
    }
  },
  logout: () => {
    return logoutResult
  }
}
