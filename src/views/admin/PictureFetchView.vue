<template>
  <div id="pictureFetchView">
    <h2 style="margin-bottom: 16px">抓取图片</h2>

    <!-- 图片信息表单 -->
    <a-form name="pictureForm" layout="vertical" :model="pictureForm" @finish="handleSubmit">
      <a-form-item name="searchText" label="搜索词">
        <a-input v-model:value="pictureForm.searchText" placeholder="请输入搜索词" allow-clear />
      </a-form-item>

      <a-form-item name="fetchSize" label="抓取数量">
        <a-input-number
          v-model:value="pictureForm.fetchSize"
          placeholder="请输入抓取数量"
          style="min-width: 180px"
          :min="1"
          :max="30"
          allow-clear
        />
      </a-form-item>

      <a-form-item name="picNamePrefix" label="图片名称前缀">
        <a-input
          v-model:value="pictureForm.picNamePrefix"
          placeholder="请输入图片名称前缀"
          allow-clear
        />
      </a-form-item>

      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 100%" :loading="loading"
          >执行抓取
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { fetchPictureUsingPost } from '@/api/pictureController.ts'
import { message } from 'ant-design-vue'

const pictureForm = reactive<API.PictureFetchRequest>({
  fetchSize: 20,
})
const loading = ref(false)

/**
 * 提交表单
 * @param values
 */
const handleSubmit = async (values: any) => {
  loading.value = true

  const res = await fetchPictureUsingPost({
    ...pictureForm,
  })
  // 操作成功
  if (res.data.code === 0 && res.data.data) {
    message.success(`成功抓取${res.data.data}张图片`)
  } else {
    message.error('图片抓取失败,' + res.data.message)
  }
  loading.value = false
}
</script>

<style scoped>
#pictureFetchView {
  max-width: 720px;
  margin: 0 auto;
}
</style>
