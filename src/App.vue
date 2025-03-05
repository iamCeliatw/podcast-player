<template lang="pug">
nav.home__navbar(@click="$router.push('/')")
  h1 {{ 'Podcast Player' }}
router-view
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { fetchPodcastData } from './utils/rssParser'
import { usePodcastStore } from './stores/usePodcastStore'
const store = usePodcastStore()

onMounted(async () => {
  store.setLoading(true)
  const data = await fetchPodcastData()
  store.setLoading(false)
  store.setEpisodeList(data.episodes)
  store.setPodcastInfo(data.podcastInfo)
})
</script>

<style lang="sass" scoped>
@use './assets/_variable' as var
.home__navbar
  height: 100px
  background-color: var.$primary-color
  display: flex
  align-items: center
  h1
    font-size: 36px
    margin-left: 50px
    letter-spacing: 2px
    color: var.$tertiary-color
    text-transform: uppercase
    font-weight: 700
    cursor: pointer
    transition: all 0.3s
    &:hover
      color: var.$secondary-color
</style>
