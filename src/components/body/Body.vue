<template>
  <div :id="id" class="Body text-white mt-[60px]">
    <Section>
      <template v-for="(frame, index) in viewerStore.frames" :key="frame.id">
        <Frame
          v-if="viewerStore.isFullscreen ? viewerStore.currentIndex == index : true"
          :frame="frame"
          :index="index"
        />
      </template>
    </Section>
  </div>
</template>

<script setup>
import uniqid from 'uniqid'
import { inject, onMounted } from 'vue'
import Section from '../section/Section.vue'
import Frame from './components/frame/Frame.vue'
import { useViewerStore } from '../../stores/viewer'
import useTemplateService from '../../services/useTemplateService.js'

const id = `body-${uniqid()}`

const domain = inject('$domain')
const apiKey = inject('$apiKey')

const viewerStore = useViewerStore()
const { getTemplate } = useTemplateService(domain, apiKey)

const loadTemplate = async (keyname) => {
  try {
    const template = await getTemplate(keyname)
    viewerStore.setFrames(JSON.parse(template.body))
  } catch (err) {
    console.error(err)
  }
}

const loadExitFullscreen = () => {
  const interval = setInterval(() => {
    if (!document.getElementById(id)) return
    document.body.addEventListener('keydown', (e) => {
      if (/Escape/i.test(e.key) && e.keyCode == 27) {
        viewerStore.setFullScreen(false)
      }
      if (/ArrowRight/i.test(e.key) && e.keyCode == 39) {
        viewerStore.moveCurrentIndex(1)
      }
      if (/ArrowLeft/i.test(e.key) && e.keyCode == 37) {
        viewerStore.moveCurrentIndex(-1)
      }
    })
    clearInterval(interval)
  }, 100)
}

onMounted(async () => {
  loadExitFullscreen()
  await loadTemplate('example-editor3')
})
</script>
