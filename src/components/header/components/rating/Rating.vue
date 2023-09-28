<template>
  <div class="Rating h-[32pt] flex flex-col justify-center">
    <div class="Rating-stars pl-[12pt] pr-[16pt]">
      <div class="flex flex-row items-center gap-2">
        <div class="flex gap-x-1">
          <RatingStar v-for="star of [1, 1, 1, 0.5, 0]" :key="star" :progress="star" />
        </div>
        <div class="font-bold text-[10pt]">3.5</div>
      </div>
      <div class="flex text-[8pt]">Rate Me</div>
    </div>
  </div>
</template>

<script setup>
import RatingStar from './RatingStar.vue'
</script>

<style scoped lang="scss">
.Rating {
  background: linear-gradient(178deg, #292929 1.65%, rgba(46, 46, 46, 0) 128.53%);
}
</style>
