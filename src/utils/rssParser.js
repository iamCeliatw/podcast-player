import axios from 'axios'
import { XMLParser } from 'fast-xml-parser'
export async function fetchPodcastData() {
  const url =
    '/api/rss/v2/podcasts/954689a5-3096-43a4-a80b-7810b219cef3/feed.xml'

  try {
    const { data } = await axios.get(url, {
      headers: { Accept: 'application/xml, text/xml' },
    })

    const parser = new XMLParser({
      attributeNamePrefix: '@_', // 屬性名稱前綴
      ignoreAttributes: false, // 不忽略屬性
      parseAttributeValue: true, // 解析屬性值
      isArray: (name) => name === 'item', // 確保 `item` 是陣列
    })

    const parsedData = parser.parse(data)

    if (
      !parsedData.rss ||
      !parsedData.rss.channel ||
      !parsedData.rss.channel.item
    ) {
      console.error('RSS 結構找不到')
      return []
    }
    const channelData = parsedData.rss.channel
    const podcastInfo = {
      title: channelData.title || 'Unknown Podcast',
      description: channelData.description || '',
      image: channelData.image.url || '',
      author: channelData['itunes:author'] || '',
    }

    const episodes = channelData.item.map((episode) => {
      let audioUrl = episode.enclosure?.['@_url'] || ''

      if (!audioUrl && episode.link) {
        audioUrl = episode.link
      }

      // **修正 `guid` 被包裝在 `#text` 內的問題**
      const guid =
        typeof episode.guid === 'object' ? episode.guid['#text'] : episode.guid

      return {
        title: episode.title || 'Untitled',
        description: episode['itunes:summary'] || episode.description || '',
        pubDate: episode.pubDate || '',
        audioUrl: audioUrl,
        guid: guid,
        duration: episode['itunes:duration'] || '',
        author: episode['itunes:author'] || episode['dc:creator'] || '',
        link: episode.link || '',
      }
    })
    return {
      podcastInfo,
      episodes,
    }
  } catch (error) {
    console.error('Error fetching RSS feed:', error)
    return []
  }
}
