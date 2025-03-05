<template lang="pug">
.home__wrapper 
  main.home__main
    .main__channel(v-if="store.podcastInfo")
      .main__channel--image(v-if="store.podcastInfo.image")
        img(:src="store.podcastInfo.image" alt="Channel Image")
      .main__channel--info
        h2 {{ store.podcastInfo.title }}
        span {{ store.podcastInfo.author }}
        p(v-html="store.podcastInfo.description")
    ul.main__episode(v-if="store.episodesList.length")
      li.main__episode--list(v-for="episode in showedEpisodes" :key="episode.guid" @click="goToEpisode(episode.guid)")
        .main__episode--list--title
          .main__episode--list--image
            img(:src="store.podcastInfo.image" alt="Channel Image")
          .main__episode--list--info
            h3 {{ episode.title }}
            p.author__name {{ episode.author }}
        .main__episode--list--desc
          p(v-html="episode.description")
        .main__episode--list--date
          span {{ formatDate(episode.pubDate) }}
          span {{ " · " }}
          span {{ formatTime(episode.duration) }}
  Loading(v-show="store.isLoading")
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { fetchPodcastData } from '../utils/rssParser'
import Loading from '../components/Loading.vue'
import { usePodcastStore } from '../stores/usePodcastStore'
import { formatTime, formatDate } from '../utils/format'
import { computed } from 'vue'
import { onUnmounted } from 'vue'
import { type Episode } from '../types/types'
import router from '../router'
const store = usePodcastStore()
const visibleCount = ref(20)
const hasMore = computed(() => visibleCount.value < store.episodesList.length)

const showedEpisodes = computed(() =>
  store.episodesList.slice(0, visibleCount.value)
)

const goToEpisode = (guid: string) => {
  router.push({ name: 'Episode', params: { id: guid } })
}

const loadMore = () => {
  if (hasMore.value) {
    store.setLoading(true)
    visibleCount.value += 20
    store.setLoading(false)
  }
}

const handleScroll = () => {
  const scrollPosition = window.scrollY + window.innerHeight
  const documentHeight = document.documentElement.offsetHeight
  if (scrollPosition >= documentHeight - 200) {
    loadMore()
  }
}

onMounted(async () => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="sass" scoped>
@use '../assets/_variable' as var
.home
  &__wrapper
    width: 100%
    height: 100%
    min-height: 100vh
  &__main
    width: 1280px
    margin: auto
    padding: 0 20px
    height: 100%

.main
  &__channel
    display: flex
    margin-top: 36px
    &--image
      width: 300px
      height: 300px
      border-radius: 10px
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2)
      flex-shrink: 0
      img
        border-radius: 10px
        width: 100%
        height: 100%
    &--info
      flex-grow: 1
      padding-left: 50px
      h2
        font-size: 32px
        letter-spacing: 2px
      p
        margin-top: 10px
        letter-spacing: 1px
  &__episode
    margin-top: 36px
    &--list
      box-shadow: 0 3px 12px 0 rgba(0,0,0,.1)
      padding: 25px
      transition: all 0.3s
      border-radius: 10px
      list-style: none
      margin-bottom: 30px
      cursor: pointer
      &:hover
        transform: translateY(-10px)
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2)
      &--title
        display: flex
        margin-bottom: 15px
      &--image
        width: 100px
        height: 100px
        border-radius: 10px
        border: 1px solid var.$primary-color
        flex-shrink: 0

        img
          border-radius: 10px
          width: 100%
          height: 100%
      &--info
        flex-grow: 1
        padding-left: 50px
        h3
          font-size: 24px
          letter-spacing: 2px
        p
          margin-top: 5px
          letter-spacing: 1px
          color: var.$gray
          font-size: 15px
      &--desc
        margin-bottom: 15px
        font-size: 18px
        display: -webkit-box
        -webkit-line-clamp: 3
        -webkit-box-orient: vertical
        overflow: hidden
        text-overflow: ellipsis
        letter-spacing: 1px
        color: var.$tertiary-color

      &--date
        span
          color: var.$gray
          font-size: 15px
        span + span
          margin-left: 10px
</style>
