<script lang="ts">
import { onMounted, ref } from 'vue';
import Keyboard from 'simple-keyboard'
import { tremble } from '../utils/index'
import { commonKeyboardOptions, EventEnum, configMain, configCtrl, configArrow, getLayoutKey } from './config';
export default {
  name: 'VirtualKeyboard'
}
</script>
<script setup lang="ts">
const emits = defineEmits([EventEnum.Up, EventEnum.Down])
const keyboard = ref<Keyboard>()
const handleShift = () => {
  let currentLayout = keyboard.value?.options.layoutName;
  let shiftToggle = currentLayout === "default" ? "shift" : "default";
  keyboard.value?.setOptions({
    layoutName: shiftToggle
  });
}
const renderKeyboardMain = () => {
  keyboard.value = new Keyboard('.simple-keyboard-main', {
    ...commonKeyboardOptions,
    // layoutName: 'fullKeyboard',
    // onKeyPress: (button:string) => {
    //   if (button === "{capslock}")
    //   handleShift();
    // },
    ...configMain
  })
}

const keyboardCtrl = ref<Keyboard>();
const renderKeyboardCtrl = () => {
  keyboardCtrl.value = new Keyboard(".simple-keyboard-control", {
    ...commonKeyboardOptions,
    ...configCtrl
  })
}

const keyboardArrow = ref<Keyboard>();
const renderKeyboardArrow = () => {
  keyboardArrow.value = new Keyboard(".simple-keyboard-arrows", {
    ...commonKeyboardOptions,
    ...configArrow
  });
}

onMounted(() => {
  renderKeyboardMain()
  renderKeyboardCtrl()
  renderKeyboardArrow()
})
let downKey = ''
const mouseHandler = (e:TouchEvent | MouseEvent, type: EventEnum) => {
  e.preventDefault()
  e.stopPropagation()
  const target = e.target as HTMLElement
  if (target) {
    const btn = target.getAttribute('data-skbtn')
    if (btn) {
      let key = getLayoutKey(btn as string)
      if (!key) {
        const reg = /^{(.+)}$/g
        const regRes = reg.exec(btn)
        key = regRes ? regRes[1] : btn
      }
      if (key) {
        key = key.toLocaleLowerCase()
      }
      emits(type, key)
      if (type === EventEnum.Down) {
        tremble()
        downKey = key
      } else {
        if (key === 'capslock' && key === downKey) {
          handleShift()
        }
        downKey = ''
      }
    }
  }
}

</script>

<template>
  <div class="keyboard-container"
    @mousedown.capture="mouseHandler($event, EventEnum.Down)"
    @mouseup.capture="mouseHandler($event, EventEnum.Up)"
    @touchstart="mouseHandler($event, EventEnum.Down)"
    @touchend="mouseHandler($event, EventEnum.Up)"
  >
    <div class="simple-keyboard-main"></div>
    <div class="control-arrows">
      <div class="simple-keyboard-control"></div>
      <div class="simple-keyboard-arrows"></div>
    </div>
  </div>
</template>

<style>
@import './style.css';
</style>
