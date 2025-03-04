// stores/counter.js
import { defineStore } from 'pinia'
import { type Episode, type PodcastInfo } from '../types/types'

interface PodcastStoreState {
  currentEpisodeIndex: number
  isPlaying: boolean
  isLoading: boolean
  episodesList: Episode[]
  currentEpisode: Episode | null
  podcastInfo: PodcastInfo | null
}

export const usePodcastStore = defineStore('podcast', {
  state: (): PodcastStoreState => ({
    isLoading: false,
    episodesList: [],
    currentEpisodeIndex: 0,
    isPlaying: false,
    currentEpisode: null,
    podcastInfo: null,
  }),
  actions: {
    setLoading(value: boolean) {
      this.isLoading = value
    },
    setCurrentEpisode(episode: Episode) {
      this.currentEpisode = episode
    },
    setEpisodeList(episodes: Episode[]) {
      this.episodesList = episodes
    },
    setCurrentEpisodeIndex(index: number) {
      this.currentEpisodeIndex = index
    },
    setIsPlaying(value: boolean) {
      this.isPlaying = value
    },
    setPodcastInfo(info: PodcastInfo) {
      this.podcastInfo = info
    },
  },
})
