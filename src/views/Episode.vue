<template lang="pug">
.episode__wrapper
  .episode__header(v-if="currentEpisode")
    .episode__header--image(v-if="store.podcastInfo.image")
      img(:src="store.podcastInfo.image" alt="Episode Image" width="100" height="100")
    .episode__header--info
      h2 {{ currentEpisode.title }}
      span {{ currentEpisode.author }}
      p(v-html="currentEpisode.description")
      span {{ formatDate(currentEpisode.pubDate) }}
      span {{ " · " }}
      span {{ formatTime(currentEpisode.duration) }}
      audio(:src="currentEpisode.audioUrl" controls)
  Loading(v-show="!currentEpisode")
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePodcastStore } from '../stores/usePodcastStore'
import { formatTime, formatDate } from '../utils/format'
import { type Episode } from '../types/types'
import Loading from '../components/Loading.vue'
import { fetchPodcastData } from '../utils/rssParser'

const store = usePodcastStore()
const route = useRoute()
const router = useRouter()

const findCurrentEpisode = (): Episode | null =>
  store.episodesList.find(
    (episode: Episode) => episode.guid === route.params.id
  ) || null

// 使用 computed 替代函數
const currentEpisode = computed(
  () =>
    store.episodesList.find(
      (episode: Episode) => episode.guid === route.params.id
    ) || null
)
</script>
