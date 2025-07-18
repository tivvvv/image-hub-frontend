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
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getPictureVoByIdUsingGet } from '@/api/pictureController.ts'
import { message } from 'ant-design-vue'
import { formatSize } from '@/utils/pictureUtil.ts'

const pictureVO = ref<API.PictureVO>({})

interface Props {
  id: string
}

const props = defineProps<Props>()

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
</script>

<style scoped>
#pictureDetailView {
}
</style>
