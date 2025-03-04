<template lang="pug">
.loading__container
  .loading__animation(ref="animationContainer")
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import loadingData from '../assets/loading.json'
import lottie from 'lottie-web'

const animationContainer = ref<HTMLDivElement | null>(null)
let animationInstance: any = null

onMounted(async () => {
  if (animationContainer.value) {
    animationInstance = lottie.loadAnimation({
      container: animationContainer.value,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: loadingData,
    })
  }
})
</script>

<style lang="sass" scoped>
.loading__container
  width: 100%
  height: 100%
  position: absolute
  top: 0
  left: 0
  background: rgba(0, 0, 0, 0.2)
.loading__animation
  width: 40vw
  // height: 100px
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
</style>
