<template>
  <div id="pictureDetailView">
    <a-row :gutter="[16, 16]">
      <!-- 图片预览 -->
      <a-col :sm="24" :md="16" :xl="18">
        <a-card title="图片预览">
          <a-image :src="pictureVO.picUrl" style="max-height: 600px; object-fit: contain" />
        </a-card>
      </a-col>

      <!-- 图片信息区域 -->
      <a-col :sm="24" :md="8" :xl="6">
        <a-card title="图片信息">
          <a-descriptions :column="1">
            <a-descriptions-item label="作者">
              <a-space>
                <a-avatar :size="24" :src="pictureVO.userVO?.userAvatar" />
                <div>{{ pictureVO.userVO?.userName }}</div>
              </a-space>
            </a-descriptions-item>
            <a-descriptions-item label="名称">
              {{ pictureVO.picName ?? '未命名' }}
            </a-descriptions-item>
            <a-descriptions-item label="简介">
              {{ pictureVO.picIntro ?? '-' }}
            </a-descriptions-item>
            <a-descriptions-item label="分类">
              {{ pictureVO.picCategory ?? '默认' }}
            </a-descriptions-item>
            <a-descriptions-item label="标签">
              <a-tag v-for="tag in pictureVO.picTagList" :key="tag">
                {{ tag }}
              </a-tag>
            </a-descriptions-item>
            <a-descriptions-item label="格式">
              {{ pictureVO.picFormat ?? '-' }}
            </a-descriptions-item>
            <a-descriptions-item label="宽度">
              {{ pictureVO.picWidth ?? '-' }}
            </a-descriptions-item>
            <a-descriptions-item label="高度">
              {{ pictureVO.picHeight ?? '-' }}
            </a-descriptions-item>
            <a-descriptions-item label="宽高比">
              {{ pictureVO.picScale ?? '-' }}
            </a-descriptions-item>
            <a-descriptions-item label="大小">
              {{ formatSize(pictureVO.picSize) }}
            </a-descriptions-item>
          </a-descriptions>

          <!-- 图片操作 -->
          <a-space wrap>
            <a-button type="primary" @click="doDownload">
              下载
              <template #icon>
                <DownloadOutlined />
              </template>
            </a-button>
            <a-button v-if="canEdit" :icon="h(EditOutlined)" type="default" @click="doEdit">
              编辑
            </a-button>
            <a-button v-if="canEdit" :icon="h(DeleteOutlined)" danger @click="doDelete">
              删除
            </a-button>
          </a-space>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, h } from 'vue'
import { deletePictureUsingDelete, getPictureVoByIdUsingGet } from '@/api/pictureController.ts'
import { message } from 'ant-design-vue'
import { downloadImage, formatSize } from '@/utils/pictureUtil.ts'
import { DeleteOutlined, DownloadOutlined, EditOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts'

const pictureVO = ref<API.PictureVO>({})
const router = useRouter()
const loginUserStore = useLoginUserStore()
const props = defineProps<Props>()

interface Props {
  id: string
}

// 获取图片详情
const fetchPictureDetail = async () => {
  const res = await getPictureVoByIdUsingGet({
    id: props.id,
  })
  if (res.data.code === 0 && res.data.data) {
    pictureVO.value = res.data.data
  } else {
    message.error('获取图片详情失败,' + res.data.message)
  }
}

// 页面加载时请求一次
onMounted(() => {
  fetchPictureDetail()
})

// 只有创建人或管理员可编辑
const canEdit = computed(() => {
  const loginUser = loginUserStore.loginUser
  if (!loginUser.id) {
    return false
  }
  const user = pictureVO.value.userVO || {}
  return loginUser.id === user.id || loginUser.userRole === 'admin'
})

// 下载
const doDownload = () => {
  downloadImage(pictureVO.value.picUrl)
}

// 编辑
const doEdit = () => {
  router.push({
    path: '/picture/add',
    query: {
      id: pictureVO.value.id,
      spaceId: pictureVO.value.spaceId,
    },
  })
}

// 删除
const doDelete = async () => {
  const id = pictureVO.value?.id?.toString()
  if (!id) {
    return
  }
  const res = await deletePictureUsingDelete({ id })
  if (res.data.code === 0) {
    message.success('删除成功')
  } else {
    message.error('删除失败')
  }
}
</script>

<style scoped>
#pictureDetailView {
}
</style>
