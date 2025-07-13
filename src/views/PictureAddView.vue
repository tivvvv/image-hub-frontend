<template>
  <div id="pictureAddView">
    <PictureUpload :picture="pictureVO" :onSuccess="onSuccess" />
  </div>
</template>

<script setup lang="ts">
import PictureUpload from '@/components/PictureUpload.vue'
import { ref } from 'vue'

const pictureVO = ref<API.PictureVO>()

const onSuccess = (newPicture: API.PictureVO) => {
  pictureVO.value = newPicture
}
</script>

<style scoped>
#pictureAddView {
}
</style>
