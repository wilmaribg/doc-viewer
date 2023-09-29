import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useViewerStore = defineStore('viewer', () => {
  const frames = ref([])
  const currentIndex = ref(-Infinity)
  const isFullscreen = ref(false)

  const setFrames = (value) => {
    for (const frame of value) {
      frames.value.push(frame)
    }
  }

  const setFullScreen = (value) => {
    if (value) currentIndex.value = 0
    isFullscreen.value = value
  }

  const toggleFullScreen = () => {
    setFullScreen(!isFullscreen.value)
  }

  const moveCurrentIndex = (pos) => {
    const newPos = currentIndex.value + pos
    if (frames.value[newPos]) currentIndex.value = newPos
  }

  watch(
    () => isFullscreen.value,
    (value) => {
      if (!value) currentIndex.value = -Infinity
    }
  )

  return {
    isFullscreen,
    currentIndex,
    setFullScreen,
    toggleFullScreen,
    moveCurrentIndex,
    frames,
    setFrames
  }
})
