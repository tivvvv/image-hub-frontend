<template>
  <div id="homeView">
    <!-- 搜索框 -->
    <div class="searchBar">
      <a-input-search
        v-model:value="searchParams.keyword"
        placeholder="从海量图片中搜索"
        enter-button="搜索"
        size="large"
        @search="doSearch"
      />
    </div>

    <!-- 分类筛选 -->
    <a-tabs v-model:active-key="selectedCategory" @change="doSearch">
      <a-tab-pane key="all" tab="全部" />
      <a-tab-pane v-for="category in categoryList" :tab="category" :key="category" />
    </a-tabs>

    <!-- 标签筛选 -->
    <div class="tagBar">
      <span style="margin-right: 8px">标签</span>
      <a-space :size="[0, 8]" wrap>
        <a-checkable-tag
          v-for="(tag, index) in tagList"
          :key="tag"
          v-model:checked="selectedTags[index]"
          @change="doSearch"
        >
          {{ tag }}
        </a-checkable-tag>
      </a-space>
    </div>

    <a-list
      :grid="{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }"
      :data-source="dataList"
      :pagination="pagination"
      :loading="loading"
    >
      <template #renderItem="{ item: pictureVO }">
        <a-list-item style="padding: 0">
          <!-- 单张图片 -->
          <a-card hoverable @click="doClickPicture(pictureVO)">
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
import {
  listPictureTagCategoryUsingGet,
  listPictureVoByPageUsingPost,
} from '@/api/pictureController.ts'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'

const router = useRouter()

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
  // 转换搜索参数
  const params = {
    ...searchParams,
    picTagList: [] as string[],
  }
  if (selectedCategory.value !== 'all') {
    params.picCategory = selectedCategory.value
  }
  selectedTags.value.forEach((selectTag, index) => {
    if (selectTag) {
      params.picTagList.push(tagList.value[index])
    }
  })
  const res = await listPictureVoByPageUsingPost(params)
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
  getTagAndCategoryOptions()
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

// 搜索
const doSearch = () => {
  // 重置搜索条件
  searchParams.current = 1
  fetchData()
}

const tagList = ref<string[]>([])
const selectedTags = ref<boolean[]>([])

const categoryList = ref<string[]>([])
const selectedCategory = ref<string>('all')

const getTagAndCategoryOptions = async () => {
  const res = await listPictureTagCategoryUsingGet()
  if (res.data.code === 0 && res.data.data) {
    tagList.value = res.data.data.tagList ?? []
    categoryList.value = res.data.data.categoryList ?? []
  } else {
    message.error('获取标签和分类选项失败,' + res.data.message)
  }
}

// 点击图片跳转详情页
const doClickPicture = (pictureVO: API.PictureVO) => {
  router.push({
    path: `/picture/${pictureVO.id}`,
  })
}
</script>

<style scoped>
#homeView {
  margin-bottom: 16px;
}

#homeView .searchBar {
  max-width: 480px;
  margin: 0 auto 16px;
}

#homeView .tagBar {
  margin-bottom: 20px;
}
</style>
