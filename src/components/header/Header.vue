<template>
  <div
    class="Header bg-black text-white fixed left-0 top-0 right-0"
    :class="{ 'z-[100]': !viewerStore.isFullscreen }"
  >
    <Section>
      <div class="Header-items grid">
        <Avatar />
        <Name />
        <Rating />
        <Versions />
        <BtnOptions />
      </div>
    </Section>
  </div>
</template>

<script setup>
import Section from '../section/Section.vue'
import Name from './components/name/Name.vue'
import Avatar from './components/avatar/Avatar.vue'
import Rating from './components/rating/Rating.vue'
import Versions from './components/versions/Versions.vue'
import BtnOptions from './components/btn-options/BtnOptions.vue'

import { useViewerStore } from '../../stores/viewer'
const viewerStore = useViewerStore()
</script>

<style scoped lang="scss">
.Header {
  &-items {
    grid-template-columns: min-content min-content min-content auto min-content;
  }
}
</style>
