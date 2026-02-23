<template>
  <div class="imageList">
    <a-list
      :grid="{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }"
      :data-source="dataList"
      :loading="loading"
    >
      <template #renderItem="{ item: imageVO }">
        <a-list-item style="padding: 0">
          <!-- 单张图片 -->
          <a-card hoverable @click="doClickImage(imageVO)">
            <!-- 图片封面 -->
            <template #cover>
              <img
                :alt="imageVO.imageName"
                :src="imageVO.thumbnailUrl ?? imageVO.imageUrl"
                style="height: 200px; object-fit: contain"
              />
            </template>
            <a-card-meta :title="imageVO.imageName">
              <template #description>
                <a-flex>
                  <a-tag color="blue">
                    {{ imageVO.imageCategory ?? '默认分类' }}
                  </a-tag>
                  <a-tag v-for="tag in imageVO.imageTagList" :key="tag">
                    {{ tag }}
                  </a-tag>
                </a-flex>
              </template>
            </a-card-meta>
            <template v-if="showOperation" #actions>
              <a-space @click="(e: MouseEvent) => doDownload(imageVO, e)">
                <download-outlined key="download">删除</download-outlined>
              </a-space>
              <a-space @click="(e: MouseEvent) => doEdit(imageVO, e)">
                <edit-outlined key="edit">编辑</edit-outlined>
              </a-space>
              <a-space @click="(e: MouseEvent) => doDelete(imageVO, e)">
                <delete-outlined key="delete">删除</delete-outlined>
              </a-space>
            </template>
          </a-card>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script setup lang="ts">
import { downloadImage } from '@/utils/imageUtil.ts'
import { DeleteOutlined, DownloadOutlined, EditOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
import { deleteImageUsingDelete } from '@/api/imageController.ts'
import { message } from 'ant-design-vue'

interface Props {
  dataList?: API.ImageVO[]
  loading?: boolean
  showOperation?: boolean
}

const emit = defineEmits(['refresh'])
const router = useRouter()
const props = withDefaults(defineProps<Props>(), {
  dataList: () => [],
  loading: false,
  showOperation: false,
})

// 点击图片跳转详情页
const doClickImage = (imageVO: API.ImageVO) => {
  router.push({
    path: `/image/${imageVO.id}`,
  })
}

// 下载
const doDownload = (imageVO: API.ImageVO, e: MouseEvent) => {
  // 阻止事件冒泡
  e.stopPropagation()
  downloadImage(imageVO.imageUrl)
}

// 编辑
const doEdit = (imageVO: API.ImageVO, e: MouseEvent) => {
  // 阻止事件冒泡
  e.stopPropagation()
  router.push({
    path: '/image/add',
    query: {
      id: imageVO.id,
      spaceId: imageVO.spaceId,
    },
  })
}

// 删除
const doDelete = async (imageVO: API.ImageVO, e: MouseEvent) => {
  // 阻止事件冒泡
  e.stopPropagation()
  const id = imageVO.id?.toString()
  if (!id) {
    return
  }
  const res = await deleteImageUsingDelete({ id })
  if (res.data.code === 0) {
    message.success('删除成功')
    emit('refresh')
  } else {
    message.error('删除失败')
  }
}
</script>

<style scoped></style>
