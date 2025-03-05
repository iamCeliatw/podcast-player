import { defineStore } from 'pinia'
import { type Episode, type PodcastInfo } from '../types/types'

interface PodcastStoreState {
  isLoading: boolean
  episodesList: Episode[]
  podcastInfo: PodcastInfo | null
}

export const usePodcastStore = defineStore('podcast', {
  state: (): PodcastStoreState => ({
    isLoading: false,
    episodesList: [],
    podcastInfo: null,
  }),
  actions: {
    setLoading(value: boolean) {
      this.isLoading = value
    },
    setEpisodeList(episodes: Episode[]) {
      this.episodesList = episodes
    },
    setPodcastInfo(info: PodcastInfo) {
      this.podcastInfo = info
    },
  },
})
