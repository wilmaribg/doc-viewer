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
import IsMobile from 'ismobilejs'
import { isEmpty } from 'lodash'
import { defineProps, onMounted, ref, watch } from 'vue'
import { useViewerStore } from '../../../../stores/viewer'

const isMobile = IsMobile(window.navigator).any

const view = ref(null)
const wrapper = ref(null)

const viewerStore = useViewerStore()

const props = defineProps({
  index: { type: Number, required: true },
  frame: { type: Object, required: true }
})

const makeFullscreen = async () => {
  const widthScreen = window.innerWidth

  const heightBlock = props.frame.height
  const heightScreen = window.innerHeight

  view.value.style.height = 'max-content'

  if (widthScreen > heightScreen && !isMobile) {
    view.value.style.margin = 'inherit'
    view.value.style.transformOrigin = '50% 0'
    view.value.style.transform = `scale(${heightScreen / heightBlock})`
  }
  await resize()
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

const resize = () => {
  return new Promise((resolve) => {
    if (!isMobile) return resolve()
    const interval = setInterval(() => {
      const body = view.value?.contentWindow?.document?.body
      if (!body) return
      body.style.overflow = 'hidden'
      body.style.transformOrigin = '0 0'
      if (view.value.scrollHeight > window.innerHeight && viewerStore.isFullscreen) {
        body.style.marginLeft = '50%'
        body.style.transform = `scale(${window.innerHeight / props.frame.height}) translateX(-50%)`
      } else {
        body.style.transform = `scale(${view.value.scrollWidth / props.frame.width})`
      }
      resolve()
      clearInterval(interval)
    }, 100)
  })
}

const mountIFrame = async () => {
  view.value = document.createElement('iframe')

  view.value.frameborder = '0'
  view.value.style.margin = 'auto'
  view.value.allowfullscreen = true
  view.value.width = props.frame.width
  view.value.allow = 'autoplay; fullscreen; picture-in-picture'
  view.value.style.aspectRatio = `${props.frame.width} / ${props.frame.height}`

  const meta = document.createElement('meta')
  meta.name = 'viewport'
  meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'

  wrapper.value.appendChild(view.value)

  view.value.contentWindow.document.body.style.margin = 'auto'
  view.value.contentWindow.document.body.style.width = `${props.frame.width}px`
  view.value.contentWindow.document.body.style.height = `${props.frame.height}px`

  view.value.contentWindow.document.head.appendChild(meta)
  view.value.contentWindow.document.body.appendChild(content())

  await resize()
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
  async (value) => {
    if (value) return makeFullscreen()
    view.value.style.transform = `scale(1)`
    view.value.style.transformOrigin = `initial`
    view.value.style.aspectRatio = `${props.frame.width} / ${props.frame.height}`
    view.value.contentWindow.document.body.style.margin = 'auto'
    await resize()
  }
)

onMounted(() => {
  console.log('roge props.frame ---->', props.frame)
  start()
  window.addEventListener('resize', resize)
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
    // align-items: center;
    background: rgb(30, 30, 30);
  }
}
</style>
