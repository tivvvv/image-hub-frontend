import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserRegisterView from '@/views/user/UserRegisterView.vue'
import UserLoginView from '@/views/user/UserLoginView.vue'
import UserManageView from '@/views/admin/UserManageView.vue'
import PictureAddView from '@/views/PictureAddView.vue'
import PictureManageView from '@/views/admin/PictureManageView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/user/register',
      name: '用户注册',
      component: UserRegisterView,
    },
    {
      path: '/user/login',
      name: '用户登录',
      component: UserLoginView,
    },
    {
      path: '/admin/userManage',
      name: '用户管理',
      component: UserManageView,
    },
    {
      path: '/picture/add',
      name: '添加图片',
      component: PictureAddView,
    },
    {
      path: '/admin/pictureManage',
      name: '图片管理',
      component: PictureManageView,
    },
  ],
})

export default router
