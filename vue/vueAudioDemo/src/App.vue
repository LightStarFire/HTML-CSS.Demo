<template>
  <div id="app">
    <router-view/>
    <we-audio :musicList="musicList"></we-audio>
  </div>
</template>

<script>
import weAudio from '@/components/we-audio'

export default {
  name: 'App',
  components: {weAudio},
  data () {
    return {
      musicList: [
        {
          songName: '天若有情',
          like: false,
          color: '#fff',
          songCover: '../static/images/songer.jpg',
          songSrc: '../static/music/琵琶行——雷俊军.mp3'
        },
        {
          songName: '天若有情',
          like: false,
          color: '#fff',
          songCover: '../static/images/songer2.jpg',
          songSrc: '../static/music/归去来兮辞——雷俊军.mp3'
        }
      ]
    }
  }
}
</script>

<style>
</style>
