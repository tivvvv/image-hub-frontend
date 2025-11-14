<template>
  <div id="spaceDetailView">
    <!-- 空间信息 -->
    <a-flex justify="space-between">
      <h2>{{ spaceVO.spaceName }} (私有空间)</h2>
      <a-space size="middle">
        <a-button type="primary" :href="`/picture/add?spaceId=${id}`" target="_blank"
          >+ 添加图片
        </a-button>

        <a-tooltip
          :title="`占用空间 ${formatSize(spaceVO.currentSize)} / ${formatSize(spaceVO.maxSize)}`"
        >
          <a-progress
            type="circle"
            :size="42"
            :percent="
              spaceVO.maxSize
                ? (((spaceVO.currentSize || 0) * 100) / spaceVO.maxSize).toFixed(1)
                : 0
            "
          />
        </a-tooltip>
      </a-space>
    </a-flex>
    <div style="margin-bottom: 16px" />

    <!-- 图片列表 -->
    <PictureList :dataList="dataList" :loading="loading" />
    <!-- 分页 -->
    <a-pagination
      style="text-align: right"
      v-model:current="searchParams.current"
      v-model:pageSize="searchParams.pageSize"
      :total="total"
      @change="onPageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import { getSpaceVoByIdUsingGet } from '@/api/spaceController.ts'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts'
import { listPictureVoByPageUsingPost } from '@/api/pictureController.ts'
import { formatSize } from '@/utils/pictureUtil.ts'
import PictureList from '@/components/PictureList.vue'

const spaceVO = ref<API.SpaceVO>({})
const router = useRouter()
const loginUserStore = useLoginUserStore()
const props = defineProps<Props>()

interface Props {
  id: string
}

// 获取空间详情
const fetchSpaceDetail = async () => {
  const res = await getSpaceVoByIdUsingGet({
    id: props.id,
  })
  if (res.data.code === 0 && res.data.data) {
    spaceVO.value = res.data.data
  } else {
    message.error('获取空间详情失败,' + res.data.message)
  }
}

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
    spaceId: props.id,
    ...searchParams,
  }

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
  ;(fetchSpaceDetail(), fetchData())
})

// 分页参数
const onPageChange = (page: number, pageSize: number) => {
  searchParams.current = page
  searchParams.pageSize = pageSize
  fetchData()
}
</script>

<style scoped>
#spaceDetailView {
}
</style>
