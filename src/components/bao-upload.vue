<script setup lang="ts">
import { ref } from 'vue';
import { post } from '@/api/http';

const imgs = ref<any>([])
const fileList = ref<any>([])
const handleUpload = (e: any) => {
    const files = e.target.files
    let len = files.length
    if(imgs.value.length + len > 9) {
        len = 9 - imgs.value.length
    }
    for (let i = 0; i < len ; i++) {
        const file = files[i]
        fileList.value.push(file)
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function () {
            imgs.value.push(reader.result)
        }
    }
    e.target.value = null
}

const remove = (index: number) => {
    imgs.value.splice(index, 1)
    fileList.value.splice(index, 1)
}

const handleSubmit = async () => {
    const formData = new FormData()
    fileList.value.map((item:File) => {
        formData.append('files', item)
    })
    let data = await post('/upload/upload', formData)
    imgs.value = []
    fileList.value = []
    console.log(data)
    return data
}
</script>
<template>
    <div class="w-full bg-slate p-3">
        <div grid grid-cols-3 gap-2>
            <div v-for="(img,index) in imgs" :key="img">
                <div class="w-full aspect-[1/1] bg-gray/80 relative overflow-hidden">
                    <img :src="img" class="w-full h-full object-cover"/>
                    <div i-mdi-close-circle-outline 
                    @click="remove(index)"
                    class="absolute top-2 right-2 text-2xl text-amber hover:text-red cursor-pointer"/>
                </div>
            </div>
            <label v-if="imgs.length < 9" for="upload">
                <div class="w-full aspect-[1/1]
                hover:(bg-gray/60 cursor-pointer)
                bg-gray/80 rounded-lg"
                cursor-pointer flex flex-col items-center justify-center
                border="2px dashed black">
                    <div i-mdi-plus text-xl/>
                </div>
                <input @change="handleUpload" id="upload" type="file" class="hidden" multiple />
            </label>
        </div>
        <button @click="handleSubmit" class="mt-4">提交</button>
    </div>
</template>