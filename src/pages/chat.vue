<script lang="ts" setup>
import { ref } from 'vue'
import axios from 'axios';
interface msg {
    id:string,
    content: string
    who: string
}
const msgList = ref<msg[]>([])
const content = ref<string>('')
const loading = ref<boolean>(false)

const headers = {
    "Authorization": `Bearer ${import.meta.env.VITE_API_KEY}`,
    "Content-Type": "application/json"
}
const getAnswer = (question:string) => {
    return axios.post('/api',{
        model: "glm-4-flash",
        messages: [
            {"role": "user", "content": question}
        ]
    },{
        headers:headers
    })
}
const send = () => {
    console.log(content.value)
    if(content.value === '' || content.value.trim() === '')
        return
    msgList.value.push({
        id:new Date().getTime().toString(),
        content: content.value,
        who: 'me'
    })
    loading.value = true
    getAnswer(content.value).then(res => {
        msgList.value.push({
            id:new Date().getTime().toString(),
            content: res.data.choices[0].message.content,
            who: 'other'
        })
        loading.value = false
    })
    content.value = ''
}
</script>
<template>
    <div class="min-h-svh max-h-svh px-[10%] relative flex items-center justify-center">
        <div class="h-[75svh] min-w-[60svw] max-w-[60svh] bg-gray flex flex-col rounded-lg overflow-hidden">
            <div class="h-[5svh] flex-shrink-1 bg-blue flex itemcs-center justify-center"> 
                <div class="flex items-center gap-2 text-xl">
                    <div i-mdi-text text-amber></div>
                    <span class="font-semibold">title</span>
                </div>
            </div>
            <div class="flex-1 bg-red relative overflow-y-scroll">
                <div v-for="msg in msgList"  :key="msg.id"
                :class="['flex flex-shrink-0 p-2',msg.who === 'me' ? 'justify-end' : 'justify-start']">
                    <div :class="['max-w-[60%] h-auto p-2 rounded-lg',msg.who === 'me' ? 'bg-sky' : 'bg-emerald']" >
                        {{ msg.content }}
                    </div>
                </div>
                <div v-if="loading" class="flex flex-shrink-0 justify-start p-1">
                    <div class="max-w-[60%] h-auto p-2 bg-emerald rounded-lg overflow-hidden">
                        <div i-mdi-loading class="animate-spin"></div>
                    </div>
                </div>
            </div>
            <div class="h-[10svh] flex-shrink-1 bg-amber flex items-center p-2 gap-2">
                <textarea v-model="content" type="text" class="flex-grow-9 h-[90%] resize-none focus-visible text-md" placeholder="search" />
                <button class=" flex-grow-1 rounded-lg h-[90%] flex items-center justify-center 
                border-2 border-black border-solid bg-gray-300 hover:(bg-gray-400)"
                    @click="send()" @keydown="send()" :disabled="loading">
                    <div i-mdi-send/>
                </button>
            </div>
        </div>
    </div>
</template>