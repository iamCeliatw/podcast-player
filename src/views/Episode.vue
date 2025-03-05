<template lang="pug">
.episode__wrapper
  .episode__header(v-if="currentEpisode")
    .episode__header--image(v-if="store.podcastInfo.image")
      img(:src="store.podcastInfo.image" alt="Episode Image" width="100" height="100")
    .episode__header--info
      .episode__header--info--title
        h2 {{ currentEpisode.title }}
        p.episode__author {{ currentEpisode.author }}
        span {{ formatDate(currentEpisode.pubDate) }}
        span {{ " · " }}
        span {{ formatTime(currentEpisode.duration) }}
      .episode__header--info--play
        img(:src="isPlaying ? '/pause-button.png' : '/play-button.png' " @click="playAudio")
  .episode__main 
    .episode__main--description 
      h3 {{ "介紹" }}
    p.episode__main--content(v-html="formattedDesc(currentEpisode.description)" v-if="currentEpisode")
  .episode__player(v-if="currentEpisode")
    audio(:src="currentEpisode.audioUrl" controls ref="musicContainer" @ended="playNextEpisode" @play="isPlaying = true" @pause="isPlaying = false")
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
const musicContainer = ref<HTMLAudioElement | null>(null)
const autoPlay = ref(false)
const isPlaying = ref(false)
const currentEpisode = computed(
  () =>
    store.episodesList.find(
      (episode: Episode) => episode.guid === route.params.id
    ) || null
)
const formattedDesc = (desc) => {
  return desc.replace(/\n/g, '<br>')
}

const playAudio = () => {
  if (musicContainer.value.paused) {
    musicContainer.value.play()
  } else {
    musicContainer.value.pause()
  }
}
const playNextEpisode = () => {
  const currentEpisodeIndex = store.episodesList.findIndex(
    (episode: Episode) => episode.guid === route.params.id
  )
  if (currentEpisodeIndex < store.episodesList.length - 1) {
    autoPlay.value = true
    router.push({
      name: 'Episode',
      params: { id: store.episodesList[currentEpisodeIndex + 1].guid },
    })
  }
}

watch(
  () => route.params.id,
  (newId, oldId) => {
    if (newId !== oldId) {
      if (autoPlay.value && musicContainer.value) {
        musicContainer.value.oncanplaythrough = () => {
          if (autoPlay.value) {
            musicContainer.value.play()
          }
          autoPlay.value = false
        }
      }
    }
  }
)
</script>

<style lang="sass" scoped>
@use '../assets/_variable' as var
.episode
  &__wrapper
    width: 1280px
    margin: 0 auto
    padding: 20px
  &__header
    display: flex
    width: 100%
    margin: 20px 0 50px 0
    &--image
      width: 150px
      height: 150px
      border-radius: 10px
      border: 1px solid var.$primary-color
      margin-right: 50px
      flex-shrink: 0
      img
        border-radius: 10px
        width: 100%
        height: 100%
    &--info
      flex-grow: 1
      display: flex
      justify-content: space-between
      &--title
        width: 100%
        margin-right: 20px
        h2
          font-size: 24px
          margin-bottom: 5px
        span
          font-size: 14px
          color: var.$light-gray
          letter-spacing: 1px
      &--play
        cursor: pointer
  &__main
    &--description
      h3
        font-size: 24px
        margin-bottom: 20px
    &--content
      font-size: 18px
      line-height: 1.5
      margin-top: 20px
      color: var.$tertiary-color
      letter-spacing: 1px
  &__player
    position: fixed
    bottom: 0
    left: 0
    width: 100%
    background: var.$primary-color
    padding: 20px
    cursor: pointer
    audio
      width: 100%
      border-radius: 5px
      padding: 10px
      outline: none
      transition: all 0.3s
  &__author
    font-size: 14px
    color: var.$secondary-color
    letter-spacing: 1px
    margin: 5px 0
</style>
