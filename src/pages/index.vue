<script lang="ts" setup>
import baoUpload from '@/components/bao-upload.vue';
// const onThemeChange = (e: string) => {
//   document.body.className = e;
// };
</script>
<template>
  <div class="min-h-svh w-full flex items-center justify-center bg-amber">
    <div class="w-full max-w-screen-md">
      <baoUpload/>
    </div>
    <!-- <header bg-primary flex items-center justify-center gap-2>
      <h2>主题切换</h2>
      <button @click="onThemeChange('default')">default</button>
      <button @click="onThemeChange('peaple')">peaple</button>
      <button @click="onThemeChange('spring')">spring</button>
    </header>
    <div class="i-mdi-loading  text-amber w-24px h-24px animate-spin"></div>
    <div mb-3 flex justify-center gap-2>
      <button p="x-2 y-2" text="shadow-color-amber xl" flex-shrink-1 bg-primary text-white>primary</button>
      <button bg-warning text-white>warning</button>
      <button bg-danger text-white>danger</button>
      <button bg-info text-white>info</button>
    </div> -->
  </div>
</template>