<template>
  <button
    type="button"
    class="BtnOptions w-[32pt] flex justify-center items-center cursor-pointer"
    @click="toggleFullScreen"
  >
    <img src="../../../../assets/icons/dots-vertical.svg" alt="btn-options" class="h-[80%]" />
  </button>
</template>

<script setup>
import { useViewerStore } from '../../../../stores/viewer'

const { toggleFullScreen } = useViewerStore()
</script>
