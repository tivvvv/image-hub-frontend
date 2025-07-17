<template>
  <div id="homeView">
    <a-list
      :grid="{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }"
      :data-source="dataList"
      :pagination="pagination"
      :loading="loading"
    >
      <template #renderItem="{ item: pictureVO }">
        <a-list-item>
          <!-- 单张图片 -->
          <a-card hoverable>
            <!-- 图片封面 -->
            <template #cover>
              <!-- 也可以使用object-fit: cover -->
              <img
                :alt="pictureVO.picName"
                :src="pictureVO.picUrl"
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
import { computed, onMounted, reactive, ref } from 'vue'
import { listPictureVoByPageUsingPost } from '@/api/pictureController.ts'
import { message } from 'ant-design-vue'

const dataList = ref<API.PictureVO[]>([])
const total = ref(0)
const loading = ref(true)

// 搜索条件
const searchParams = reactive<API.PictureQueryRequest>({
  current: 1,
  pageSize: 12,
  sortField: 'create_time',
  sortOrder: 'desc',
})

// 获取数据
const fetchData = async () => {
  loading.value = true
  const res = await listPictureVoByPageUsingPost({
    ...searchParams,
  })
  if (res.data.code === 0 && res.data.data) {
    dataList.value = res.data.data.records ?? []
    total.value = res.data.data.total ?? 0
  } else {
    message.error(res.data.message)
  }
  loading.value = false
}

// 页面加载时请求一次
onMounted(() => {
  fetchData()
})

// 分页参数
const pagination = computed(() => {
  return {
    current: searchParams.current,
    pageSize: searchParams.pageSize,
    total: total.value,
    onChange: (page: number, pageSize: number) => {
      searchParams.current = page
      searchParams.pageSize = pageSize
    },
  }
})
</script>

<style scoped>
#homeView {
}
</style>
