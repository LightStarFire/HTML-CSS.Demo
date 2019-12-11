<template>
  <div class="component-we-audio">
    <div class="weAudio clearFix">
      <div class="songInfo clearFix">
        <img :src="activeMusic.songCover" class="songCover fl">
        <div class="lyrics-play fl">
          <div class="play">
            <i @click="preSong" class="iconfont icon-pre-song iItem"></i>
            <span @click="changeIsPlay" class="playCircle"><i class="iconfont playItem" :class="isPlay ? 'icon-play' : 'icon-stop'"></i></span>
            <i @click="nextSong" class="iconfont icon-next-song iItem"></i>
          </div>
        </div>
        <div class="operation fl">
          <i @click="exChangeLike" class="iconfont iItem" :class="activeMusic.like ? 'icon-full-like fullLike' : 'icon-empty-like'"></i>
          <i class="iconfont icon-voice iItem"></i>
          <i class="iconfont icon-list iItem"></i>
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
.component-we-audio .weAudio {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 300px;
  height: 40px;
  box-shadow: 1px 1px 2px 1px rgba(223, 223, 223, .8);
  border-radius: 1px;
}

.weAudio .songInfo .songCover {
  display: inline-block;
  width: 40px;
}

.weAudio .songInfo .lyrics-play {
  display: inline-block;
  width: 150px;
  line-height: 40px;
}

.lyrics-play .play {
  text-align: center;
  color: #36d592;
}

.lyrics-play .play .iItem {
  padding: 10px;
  cursor: pointer;
  user-select: none;
}

.lyrics-play .play .iItem:hover {
  color: #2fb27a
}

.lyrics-play .play .playCircle {
  display: inline-block;
  padding: 3px 6px;
  width: 30px;
  height: 30px;
  line-height: initial;
  border: 1px solid #36d592;
  border-radius: 50%;
  cursor: pointer;
  user-select: none;
}

.lyrics-play .play .playCircle:hover {
  color: #2fb27a;
  border: 1px solid #2fb27a;
}

.songInfo .operation {
  display: inline-block;
  width: 110px;
  line-height: 40px;
}

.songInfo .operation .iItem {
  padding: 5px;
  cursor: pointer;
  color: #838383;
}

.songInfo .operation .iItem:hover {
  color: #333;
}
.songInfo .operation .fullLike {
  color: #c72e2e;
}
.songInfo .operation .fullLike:hover {
  color: #c72e2e;
}
</style>
