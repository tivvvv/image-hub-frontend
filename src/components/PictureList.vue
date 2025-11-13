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
          </a-card>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script setup lang="ts">
interface Props {
  dataList?: API.PictureVO[]
  loading?: boolean
}

import { useRouter } from 'vue-router'

const router = useRouter()
const props = withDefaults(defineProps<Props>(), {
  dataList: () => [],
  loading: false,
})

// 点击图片跳转详情页
const doClickPicture = (pictureVO: API.PictureVO) => {
  router.push({
    path: `/picture/${pictureVO.id}`,
  })
}
</script>

<style scoped></style>
