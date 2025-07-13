<template>
  <div id="pictureAddView">
    <PictureUpload :picture="pictureVO" :onSuccess="(newPicture) => {}" />
  </div>
</template>

<script setup lang="ts">
import PictureUpload from '@/components/PictureUpload.vue'
import { ref } from 'vue'

const pictureVO = ref<API.PictureVO>()
</script>

<style scoped>
#pictureAddView {
}
</style>
