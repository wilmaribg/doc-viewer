<template>
  <div
    class="Header bg-black text-white fixed left-0 top-0 right-0"
    :class="{ 'z-[100]': !viewerStore.isFullscreen }"
  >
    <Section>
      <div class="Header-row grid">
        <div class="Header-items Header-items--agent grid">
          <Avatar />
          <Name />
          <Rating />
        </div>
        <div class="Header-items Header-items--proposal grid">
          <Versions />
          <BtnOptions />
        </div>
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
  &-row {
    grid-template-columns: 1fr 2fr;
    @media (max-width: 1024px) {
      grid-template-columns: 100%;
    }
  }
  &-items {
    &--agent {
      display: grid;
      grid-template-columns: min-content min-content auto;
      @media (max-width: 1024px) {
        grid-template-columns: min-content auto min-content;
      }
    }
    &--proposal {
      display: grid;
      grid-template-columns: auto min-content;
    }
  }
}
</style>
