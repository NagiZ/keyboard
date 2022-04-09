<script lang="ts">
import { computed } from '@vue/reactivity';
import { onMounted, onUnmounted, ref, reactive } from 'vue';
import { EventEnum } from './components/config';
</script>
<script setup lang="ts">
import VirtualKeyboard from './components/Keyboard.vue'
const defaultSrc = 'ws://192.168.0.102:2333/ws'
const wsSrc = ref(defaultSrc)
const status = ref(0)
const isConnected = computed(() => {
  return status.value === 1
})
const statusStyle = computed(() => {
  let color
  switch (status.value) {
    case 1:
      color = '#67C23A'
      break
    case 2:
      color = '#F56C6C'
      break
    case 0:
      color = '#333333'
      break
    default: break
  }
  return { color }
})
let ws:WebSocket
const wsConnect = () => {
  const src = wsSrc.value || defaultSrc
  if (ws) {
    if (ws.url === src) return
    if (ws.readyState !== WebSocket.CLOSED) {
      ws.close()
    }
  }
  ws = new WebSocket(wsSrc.value || defaultSrc)
  console.log(ws.url)
  ws.onopen = () => {
    status.value = 1
  }
  ws.onerror = (error) => {
    status.value = 2
  }
}
const wsDisConnect = () => {
  ws.close();
  status.value = 0
}
const send = (key: string, type: EventEnum) => {
  const msg = JSON.stringify({ key, ack: type })
  ws.send(msg)
}

onMounted(() => {
  wsConnect()
})

onUnmounted(() => {
  wsDisConnect()
})
const onKeydown = (key: string) => {
  send(key, EventEnum.Down)
}
const onKeyup= (key: string) => {
  send(key, EventEnum.Up)
} 

</script>

<template>
<div class="ws-setter">
  <input v-model="wsSrc" class="ws-input" />
  <button @click="wsConnect">连接</button>
  <span class="status" :style="statusStyle">{{ status === 1 ? '已连接' : (status === 2 ? '连接失败' : '未连接') }}</span>
</div>
<VirtualKeyboard @keydown="onKeydown" @keyup="onKeyup"></VirtualKeyboard>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.ws-setter {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 10px;
}
.ws-input {
  padding: 6px 8px;
  border-radius: 4px;
  outline: none;
  border: 1px solid #d8d8d8;
}
.ws-input:hover, .ws-input:active, .ws-input:focus{
  border: 1px solid #409eff;
}
.status {
  font-size: 14px;
  margin-left: 10px;
  align-self: center;
}
</style>
