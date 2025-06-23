<template>
  <div id="app">
    <BasicLayout />
  </div>
</template>

<script setup lang="ts">
import BasicLayout from '@/layouts/BasicLayout.vue'
import { heartBeatUsingGet } from '@/api/testController.ts'

heartBeatUsingGet().then((res) => {
  console.log(res)
})
</script>

<style scoped></style>
