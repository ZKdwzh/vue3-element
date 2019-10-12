import { login, getInfo, loginOut } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
const user = {
  state: {
    token: getToken(),
    avatar: '',
    roles: [],
    userInfo: []
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      setToken(token)
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles.push(roles)
    },
    SET_USERINFO: (state, info) => {
      state.userInfo = info
    }
  },

  actions: {
    // 登录
    Login({ commit }, loginFrom) {
      return new Promise((resolve, reject) => {
        login(loginFrom)
          .then(response => {
            let { data } = response.result
            commit('SET_TOKEN', data.token)
            resolve(data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 获取用户信息
    GetInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        getInfo(params)
          .then(response => {
            debugger
            var data = response.result.data
            commit('SET_ROLES', data.roles)
            commit('SET_AVATAR', data.avatar)
            commit('SET_USERINFO', data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    LoginOut({ commit }, params) {
      return new Promise((resolve, reject) => {
        loginOut(params)
          .then(() => {
            commit('SET_ROLES', [])
            commit('SET_AVATAR', '')
            commit('SET_USERINFO', '')
            removeToken()
            resetRouter()
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}

export default user
