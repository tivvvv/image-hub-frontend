<template>
  <div id="pictureAddView">
    <h2 style="margin-bottom: 16px">{{ route.query?.id ? '编辑图片' : '添加图片' }}</h2>

    <!-- 选择图片上传方式 -->
    <a-tabs v-model:activeKey="uploadType">
      <a-tab-pane key="file" tab="文件上传">
        <!-- 图片上传组件 -->
        <PictureUpload :picture="pictureVO" :onSuccess="onSuccess" />
      </a-tab-pane>
      <a-tab-pane key="url" tab="URL上传" force-render>
        <!-- URL图片上传组件 -->
        <UrlPictureUpload :picture="pictureVO" :onSuccess="onSuccess" />
      </a-tab-pane>
    </a-tabs>

    <!-- 图片信息表单 -->
    <a-form
      name="pictureForm"
      v-if="pictureVO"
      layout="vertical"
      :model="pictureForm"
      @finish="handleSubmit"
    >
      <a-form-item name="picName" label="名称">
        <a-input v-model:value="pictureForm.picName" placeholder="请输入名称" allow-clear />
      </a-form-item>

      <a-form-item name="picIntro" label="简介">
        <a-textarea
          v-model:value="pictureForm.picIntro"
          placeholder="请输入简介"
          :auto-size="{ minRows: 2, maxRows: 5 }"
          allow-clear
        />
      </a-form-item>

      <a-form-item name="picCategory" label="分类">
        <a-auto-complete
          v-model:value="pictureForm.picCategory"
          placeholder="请输入分类"
          :options="categoryOptions"
          allow-clear
        />
      </a-form-item>

      <a-form-item name="picTagList" label="标签">
        <a-select
          v-model:value="pictureForm.picTagList"
          mode="tags"
          placeholder="请输入标签"
          :options="tagOptions"
          allow-clear
        />
      </a-form-item>

      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 100%">创建</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import PictureUpload from '@/components/PictureUpload.vue'
import { onMounted, reactive, ref } from 'vue'
import {
  getPictureVoByIdUsingGet,
  listPictureTagCategoryUsingGet,
  updatePictureUsingPost,
} from '@/api/pictureController.ts'
import { message } from 'ant-design-vue'
import { useRoute, useRouter } from 'vue-router'
import UrlPictureUpload from '@/components/UrlPictureUpload.vue'

const route = useRoute()
const router = useRouter()
const pictureVO = ref<API.PictureVO>()
const pictureForm = reactive<API.PictureUpdateRequest>({})
const tagOptions = ref<{ value: string; label: string }[]>([])
const categoryOptions = ref<{ value: string; label: string }[]>([])
const uploadType = ref<'file' | 'url'>('file')

/**
 * 提交表单
 * @param values
 */
const handleSubmit = async (values: any) => {
  console.log(values)
  if (!pictureVO.value) {
    return
  }
  const pictureId = pictureVO.value.id

  if (!pictureId) {
    return
  }
  const res = await updatePictureUsingPost({
    id: pictureId,
    ...values,
  })
  // 操作成功
  if (res.data.code === 0 && res.data.data) {
    message.success('图片添加成功')
    // 跳转到图片详情页
    await router.push({
      path: `/picture/${pictureId}`,
    })
  } else {
    message.error('图片添加失败,' + res.data.message)
  }
}

const onSuccess = (newPicture: API.PictureVO) => {
  pictureVO.value = newPicture
  pictureForm.picName = newPicture.picName
}

onMounted(() => {
  getTagAndCategoryOptions()
  getExistedPicture()
})

/**
 * 获取默认标签和分类选项
 * @param values
 */
const getTagAndCategoryOptions = async () => {
  const res = await listPictureTagCategoryUsingGet()
  if (res.data.code === 0 && res.data.data) {
    tagOptions.value = (res.data.data.tagList ?? []).map((data: string) => {
      return {
        value: data,
        label: data,
      }
    })
    categoryOptions.value = (res.data.data.categoryList ?? []).map((data: string) => {
      return {
        value: data,
        label: data,
      }
    })
  } else {
    message.error('获取默认标签和分类选项失败,' + res.data.message)
  }
}

// 获取指定图片信息
const getExistedPicture = async () => {
  // 获取图片id
  const id = route.query?.id as string
  if (id) {
    const res = await getPictureVoByIdUsingGet({
      id,
    })
    if (res.data.code === 0 && res.data.data) {
      const data = res.data.data
      pictureVO.value = data
      pictureForm.picName = data.picName
      pictureForm.picIntro = data.picIntro
      pictureForm.picCategory = data.picCategory
      pictureForm.picTagList = data.picTagList
    }
  }
}
</script>

<style scoped>
#pictureAddView {
  max-width: 720px;
  margin: 0 auto;
}
</style>
