<template>
  <div class="Frame mb-5">
    <div
      ref="wrapper"
      class="flex justify-center"
      :class="{ 'Frame-fullscreen': viewerStore.isFullscreen }"
    ></div>
  </div>
</template>

<script setup>
import { isEmpty } from 'lodash'
import { defineProps, onMounted, ref, watch } from 'vue'
import { useViewerStore } from '../../../../stores/viewer'

const view = ref(null)
const wrapper = ref(null)

const viewerStore = useViewerStore()

const props = defineProps({
  index: { type: Number, required: true },
  frame: { type: Object, required: true }
})

const makeFullscreen = () => {
  const widthBlock = props.frame.width
  const widthScreen = window.innerWidth

  const heightBlock = props.frame.height
  const heightScreen = window.innerHeight

  if (widthScreen > heightScreen) {
    const width = heightScreen * (widthBlock / heightBlock)

    view.value.style.height = 'max-content'
    view.value.style.transformOrigin = `50% 0.5%`
    view.value.style.aspectRatio = `${width} / ${heightScreen}`
    view.value.style.transform = `scale(${width / heightScreen - 0.0899})`
  }
}

const getBlocks = () => {
  if (isEmpty(props.frame.blocks)) return ''
  return props.frame.blocks.reduce((acc, block) => (acc += block.el), '')
}

const setStyles = (element) => {
  if (isEmpty(props.frame.styles)) return
  element.style.height = '100%'
  element.style.backgroundColor = 'white'
  for (const style of Object.keys(props.frame.styles)) {
    element.style[style] = props.frame.styles[style]
  }
}

const content = () => {
  const element = document.createElement('div')
  element.innerHTML = getBlocks()
  setStyles(element)
  return element
}

const mountIFrame = () => {
  view.value = document.createElement('iframe')

  view.value.frameborder = '0'
  view.value.allowfullscreen = true
  view.value.width = props.frame.width
  view.value.allow = 'autoplay; fullscreen; picture-in-picture'
  view.value.style.aspectRatio = `${props.frame.width} / ${props.frame.height}`

  const meta = document.createElement('meta')
  meta.name = 'viewport'
  meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'

  view.value.appendChild(meta)
  wrapper.value.appendChild(view.value)

  view.value.contentWindow.document.body.style.margin = 'auto'
  view.value.contentWindow.document.body.style.width = `${props.frame.width}px`
  view.value.contentWindow.document.body.style.height = `${props.frame.height}px`

  view.value.contentWindow.document.body.appendChild(content())
}

const start = () => {
  const interval = setInterval(() => {
    if (wrapper.value) {
      mountIFrame()
      if (viewerStore.isFullscreen && viewerStore.currentIndex === props.index) {
        makeFullscreen()
      }
      clearInterval(interval)
    }
  }, 100)
}

watch(
  () => viewerStore.isFullscreen,
  (value) => {
    if (value) return makeFullscreen()
    view.value.style.transform = `scale(1)`
    view.value.style.transformOrigin = `initial`
    view.value.style.aspectRatio = `${props.frame.width} / ${props.frame.height}`
  }
)

onMounted(() => {
  console.log('roge props.frame ---->', props.frame)
  start()
})
</script>

<style scoped lang="scss">
.Frame {
  &-fullscreen {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
    overflow: hidden;
    background: rgb(30, 30, 30);
  }
}
</style>
