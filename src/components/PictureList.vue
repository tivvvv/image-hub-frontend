<template>
  <div class="pictureList">
    <a-list
      :grid="{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }"
      :data-source="dataList"
      :loading="loading"
    >
      <template #renderItem="{ item: pictureVO }">
        <a-list-item style="padding: 0">
          <!-- 单张图片 -->
          <a-card hoverable @click="doClickPicture(pictureVO)">
            <!-- 图片封面 -->
            <template #cover>
              <img
                :alt="pictureVO.picName"
                :src="pictureVO.thumbnailUrl ?? pictureVO.picUrl"
                style="height: 200px; object-fit: contain"
              />
            </template>
            <a-card-meta :title="pictureVO.picName">
              <template #description>
                <a-flex>
                  <a-tag color="blue">
                    {{ pictureVO.picCategory ?? '默认分类' }}
                  </a-tag>
                  <a-tag v-for="tag in pictureVO.picTagList" :key="tag">
                    {{ tag }}
                  </a-tag>
                </a-flex>
              </template>
            </a-card-meta>
            <template v-if="showOperation" #actions>
              <a-space @click="(e: MouseEvent) => doDownload(pictureVO, e)">
                <download-outlined key="download">删除</download-outlined>
              </a-space>
              <a-space @click="(e: MouseEvent) => doEdit(pictureVO, e)">
                <edit-outlined key="edit">编辑</edit-outlined>
              </a-space>
              <a-space @click="(e: MouseEvent) => doDelete(pictureVO, e)">
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
import { downloadImage } from '@/utils/pictureUtil.ts'

interface Props {
  dataList?: API.PictureVO[]
  loading?: boolean
  showOperation?: boolean
}

import { DeleteOutlined, DownloadOutlined, EditOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
import { deletePictureUsingDelete } from '@/api/pictureController.ts'
import { message } from 'ant-design-vue'

const emit = defineEmits(['refresh'])
const router = useRouter()
const props = withDefaults(defineProps<Props>(), {
  dataList: () => [],
  loading: false,
  showOperation: false,
})

// 点击图片跳转详情页
const doClickPicture = (pictureVO: API.PictureVO) => {
  router.push({
    path: `/picture/${pictureVO.id}`,
  })
}

// 下载
const doDownload = (pictureVO: API.PictureVO, e: MouseEvent) => {
  // 阻止事件冒泡
  e.stopPropagation()
  downloadImage(pictureVO.picUrl)
}

// 编辑
const doEdit = (pictureVO: API.PictureVO, e: MouseEvent) => {
  // 阻止事件冒泡
  e.stopPropagation()
  router.push({
    path: '/picture/add',
    query: {
      id: pictureVO.id,
      spaceId: pictureVO.spaceId,
    },
  })
}

// 删除
const doDelete = async (pictureVO: API.PictureVO, e: MouseEvent) => {
  // 阻止事件冒泡
  e.stopPropagation()
  const id = pictureVO.id?.toString()
  if (!id) {
    return
  }
  const res = await deletePictureUsingDelete({ id })
  if (res.data.code === 0) {
    message.success('删除成功')
    emit('refresh')
  } else {
    message.error('删除失败')
  }
}
</script>

<style scoped></style>
