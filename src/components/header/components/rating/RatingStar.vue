<template>
  <div class="RatingStar relative w-[12pt] h-[12pt]">
    <div class="RatingStar-progress" :style="{ width: props.progress * 100 + '%' }"></div>
    <div class="RatingStar--inside"></div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  progress: {
    type: Number,
    default: 0
  }
})
</script>

<style scoped lang="scss">
$position-spacing: 3px;
.RatingStar {
  background: white;
  clip-path: polygon(
    50% 0%,
    61% 35%,
    98% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    2% 35%,
    39% 35%
  );
  &-progress {
    left: -2;
    z-index: 1;
    width: 50%;
    content: '';
    height: 100%;
    position: absolute;
    background: white;
  }
  &:after {
    content: '';
    position: absolute;
    background: black;
    top: $position-spacing;
    left: $position-spacing;
    right: $position-spacing;
    bottom: $position-spacing;
    clip-path: polygon(
      50% 0%,
      61% 35%,
      98% 35%,
      68% 57%,
      79% 91%,
      50% 70%,
      21% 91%,
      32% 57%,
      2% 35%,
      39% 35%
    );
  }
}
</style>
