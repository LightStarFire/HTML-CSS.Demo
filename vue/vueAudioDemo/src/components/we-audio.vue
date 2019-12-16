<template>
  <div class="component-we-audio">
    <div class="we-audio we-clearfix">
      <div class="we-song-info we-clearfix">
        <img :src="activeMusic.songCover" class="we-song-cover we-fl">
        <div class="we-lyrics-play we-fl">
          <div class="we-play">
            <i @click="preSong" class="iconfont icon-pre-song we-i-item"></i>
            <span @click="changeIsPlay" class="we-play-circle"><i class="iconfont playItem" :class="isPlay ? 'icon-play' : 'icon-stop'"></i></span>
            <i @click="nextSong" class="iconfont icon-next-song we-i-item"></i>
          </div>
        </div>
        <div class="we-operation we-fl">
          <i @click="exChangeLike" class="iconfont we-i-item" :class="activeMusic.like ? 'icon-full-like we-full-like' : 'icon-empty-like'"></i>
          <i class="iconfont icon-voice we-i-item"></i>
          <i class="iconfont icon-list we-i-item"></i>
        </div>
      </div>
    </div>
    <audio :src="activeMusic.songSrc" ref="weAudio">
    </audio>
  </div>
</template>

<script>
export default {
  name: 'weAudio',
  props: {
    musicList: {
      required: true,
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      activeMusic: {
        songName: '',
        like: false,
        color: '#fff',
        songCover: '',
        songSrc: ''
      },
      isPlay: false,
      isPlayIndex: 0
    }
  },
  mounted () {
    if (this.musicList.length > 0) {
      this.activeMusic = this.musicList[0];
      this.isPlayIndex = 0;
    }
  },
  methods: {
    // 下一首
    nextSong () {
      if (this.musicList.length > 1) {
        if (this.isPlayIndex === (this.musicList.length - 1)) {
          this.isPlayIndex = 0;
        } else {
          this.isPlayIndex += 1;
        }
        this.activeMusic = this.musicList[this.isPlayIndex];
        this.$nextTick(() => {
          this.isPlay = true;
          this.playOrStop(true);
        })
      }
    },
    // 上一首
    preSong () {
      if (this.musicList.length > 1) {
        if (this.isPlayIndex === 0) {
          this.isPlayIndex = (this.musicList.length - 1);
        } else {
          this.isPlayIndex -= 1;
        }
        this.activeMusic = this.musicList[this.isPlayIndex];
        this.$nextTick(() => {
          this.isPlay = true;
          this.playOrStop(true);
        })
      }
    },
    // 切换喜欢
    exChangeLike () {
      this.activeMusic.like = !this.activeMusic.like;
    },
    // 播放或者暂停
    playOrStop (isPlay) {
      if (isPlay) {
        this.$refs.weAudio.play();
      } else {
        this.$refs.weAudio.pause();
      }
    },
    // 改变isPlay
    changeIsPlay () {
      this.isPlay = !this.isPlay;
      this.playOrStop(this.isPlay);
    }
  }
}
</script>

<style scoped>
.we-audio {
position: fixed;
top: 50%;
left: 50%;
width: 300px;
height: 40px;
box-shadow: 1px 1px 2px 1px rgba(223, 223, 223, .8);
border-radius: 1px;
}

.we-audio .we-song-info .we-song-cover {
display: inline-block;
width: 40px;
}

.we-audio .we-song-info .we-lyrics-play {
display: inline-block;
width: 150px;
line-height: 40px;
}

.we-lyrics-play .we-play {
text-align: center;
color: #36d592;
}

.we-lyrics-play .we-play .we-i-item {
padding: 10px;
cursor: pointer;
user-select: none;
}

.we-lyrics-play .we-play .we-i-item:hover {
color: #2fb27a
}

.we-lyrics-play .we-play .we-play-circle {
display: inline-block;
padding: 3px 6px;
width: 30px;
height: 30px;
line-height: initial;
border: 1px solid #36d592;
border-radius: 50%;
cursor: pointer;
user-select: none;
box-sizing: border-box;
}

.we-lyrics-play .we-play .we-play-circle:hover {
color: #2fb27a;
border: 1px solid #2fb27a;
}

.we-song-info .we-operation {
display: inline-block;
width: 110px;
line-height: 40px;
}

.we-song-info .we-operation .we-i-item {
padding: 5px;
cursor: pointer;
color: #838383;
}

.we-song-info .we-operation .we-i-item:hover {
color: #333;
}
.we-song-info .we-operation .we-full-like {
color: #c72e2e;
}

.we-song-info .we-operation .we-full-like:hover {
color: #c72e2e;
}
</style>
