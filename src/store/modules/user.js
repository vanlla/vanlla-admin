import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    menus: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_MENUS: (state, menus) => {
      state.menus = menus
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password, userInfo.uuid, userInfo.code)
          .then(response => {
            const data = response.data
            setToken(data.token)
            commit('SET_TOKEN', data.token)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token)
          .then(response => {
            const data = response.data
            if (data.roles && data.roles.length > 0) {
              // 验证返回的roles是否是一个非空数组
              commit('SET_ROLES', data.roles)
            } else {
              reject('getInfo: roles must be a non-null array !')
            }
            commit('SET_NAME', data.name)
            commit('SET_AVATAR', data.avatar)

            //获取菜单
            if (data.menuList.length > 0) {
              let menuItems = []
              for (let i = 0; i < data.menuList.length; i++) {
                let firstLevel = data.menuList[i]
                let menuItem = {}
                menuItem.path = firstLevel.url || ''
                menuItem.name = firstLevel.name
                menuItem.meta = {
                  title: firstLevel.title || firstLevel.name,
                  icon: firstLevel.icon
                }
                menuItem.children = []
                for (let j = 0; j < firstLevel.children.length; j++) {
                  let subMenuItem = {}
                  subMenuItem.path = firstLevel.children[j].url
                  subMenuItem.name = firstLevel.children[j].name
                  subMenuItem.meta = {
                    title:
                      firstLevel.children[j].title ||
                      firstLevel.children[j].name,
                    icon: firstLevel.children[j].icon
                  }
                  menuItem.children.push(subMenuItem)
                }
                menuItems.push(menuItem)
              }
              commit('SET_MENUS', menuItems)
            }

            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
