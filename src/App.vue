<template lang="pug">
  router-view
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { fetchPodcastData } from './utils/rssParser'
import { usePodcastStore } from './stores/usePodcastStore'
const store = usePodcastStore()

onMounted(async () => {
  console.log('App.vue mounted')
  store.setLoading(true)
  const data = await fetchPodcastData()
  store.setLoading(false)
  console.log(data)
  store.setEpisodeList(data.episodes)
  store.setPodcastInfo(data.podcastInfo)
})
</script>

<style lang="sass" scoped></style>
