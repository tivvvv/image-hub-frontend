import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserRegisterView from '@/views/user/UserRegisterView.vue'
import UserLoginView from '@/views/user/UserLoginView.vue'
import UserManageView from '@/views/admin/UserManageView.vue'
import PictureAddView from '@/views/picture/PictureAddView.vue'
import PictureManageView from '@/views/admin/PictureManageView.vue'
import PictureDetailView from '@/views/picture/PictureDetailView.vue'
import PictureFetchView from '@/views/admin/PictureFetchView.vue'
import SpaceManageView from '@/views/admin/SpaceManageView.vue'
import SpaceAddView from '@/views/space/SpaceAddView.vue'
import MySpaceView from '@/views/space/MySpaceView.vue'

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
      path: '/space/add',
      name: '创建空间',
      component: SpaceAddView,
    },
    {
      path: '/my/space',
      name: '我的空间',
      component: MySpaceView,
    },
    {
      path: '/admin/pictureManage',
      name: '图片管理',
      component: PictureManageView,
    },
    {
      path: '/admin/spaceManage',
      name: '空间管理',
      component: SpaceManageView,
    },
    {
      path: '/admin/picture/fetch',
      name: '抓取图片',
      component: PictureFetchView,
    },
    {
      path: '/picture/:id',
      name: '图片详情',
      component: PictureDetailView,
      props: true,
    },
  ],
})

export default router
