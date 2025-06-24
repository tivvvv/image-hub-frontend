import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

/**
 * 存储用户登录信息
 */
export const useLoginUserStore = defineStore('loginUser', () => {
  const loginUser = ref<any>({
    userName: '未登录',
  })

  function setLoginUser(user: any) {
    loginUser.value = user
  }

  async function fetchLoginUser() {
    setTimeout(() => {
      loginUser.value = { userName: '测试用户', id: 1 }
    }, 3000)
  }

  return { loginUser, setLoginUser, fetchLoginUser }
})
