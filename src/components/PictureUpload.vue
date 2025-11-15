<template>
  <div class="pictureUpload">
    <a-upload
      list-type="picture-card"
      :show-upload-list="false"
      :custom-request="handleUpload"
      :before-upload="beforeUpload"
    >
      <img v-if="picture?.picUrl" :src="picture?.picUrl" alt="avatar" />
      <div v-else>
        <loading-outlined v-if="loading"></loading-outlined>
        <plus-outlined v-else></plus-outlined>
        <div class="ant-upload-text">点击或拖拽上传图片</div>
      </div>
    </a-upload>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue'
import { message, type UploadFile } from 'ant-design-vue'
import { uploadPictureUsingPost } from '@/api/pictureController.ts'

interface Props {
  picture?: API.PictureVO
  spaceId?: string
  onSuccess?: (newPicture: API.PictureVO) => void
}

const props = defineProps<Props>()

const loading = ref<boolean>(false)

/**
 * 上传文件之前校验
 * @param file
 */
const beforeUpload = (file: UploadFile<unknown>) => {
  // 校验图片格式
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('图片格式不支持,请使用jpg或png')
  }
  // 校验图片大小
  const isLt2M = (file.size ?? 0) / 1024 / 1024 <= 10
  if (!isLt2M) {
    message.error('仅支持上传10M以内的图片')
  }
  return isJpgOrPng && isLt2M
}

/**
 * 上传图片
 * @param file
 */
const handleUpload = async ({ file }: any) => {
  loading.value = true
  try {
    const params: API.PictureUploadRequest = props.picture ? { id: props.picture.id } : {}
    params.spaceId = props.spaceId
    const res = await uploadPictureUsingPost(params, {}, file)
    if (res.data.code == 0 && res.data.data) {
      message.success('图片上传成功')
      props.onSuccess?.(res.data.data)
    } else {
      message.error('图片上传失败,' + res.data.message)
    }
  } catch (e) {
    let errorMessage = '图片上传失败'

    if (e instanceof Error) {
      errorMessage += ', ' + e.message
    }

    message.error(errorMessage)
  }
  loading.value = false
}
</script>

<style scoped>
.pictureUpload :deep(.ant-upload) {
  width: 100% !important;
  height: 100% !important;
  min-height: 150px;
  min-width: 150px;
}

.pictureUpload img {
  max-width: 100%;
  max-height: 500px;
}

.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
