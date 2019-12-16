;(function (global) {
    // 开启严格模式，规范代码，提高浏览器运行效率
    "use strict";

    // 定义一个音频WeAudio类，通常首字母大写
    var WeAudio = function(el) {
        this.el = typeof el === 'string' ? document.querySelector(el) : el;
    };

    // 定义一个正在播放的音乐类WeActiveMusic
    var WeActiveMusic = {
        songName: '',
        like: false,
        color: '#fff',
        songCover: '',
        songSrc: ''
    };

    // 覆写原型链，给继承者提供方法
    WeAudio.prototype = {
        init: function() {
            this.el.innerHTML = addWeAudioDom();
        }
    };

    // 插入节点
    function addWeAudioDom () {
        var audioDom = '<div class="component-we-audio">' +
                            '<div class="we-audio we-clearfix">' +
                            '<div class="we-song-info we-clearfix">' +
                                '<img src="./images/songer.jpg" class="we-song-cover we-fl">' +
                                '<div class="we-lyrics-play we-fl">' +
                                '<div class="we-play">' +
                                    '<i @click="preSong" class="iconfont icon-pre-song we-i-item"></i>' +
                                    '<span @click="changeIsPlay" class="we-play-circle"><i class="iconfont icon-stop playItem"></i></span>' +
                                    '<i @click="nextSong" class="iconfont icon-next-song we-i-item"></i>' +
                                '</div>' +
                                '</div>' +
                                '<div class="we-operation we-fl">' +
                                '<i @click="exChangeLike" class="iconfont icon-empty-like we-i-item"></i>' +
                                '<i class="iconfont icon-voice we-i-item"></i>' +
                                '<i class="iconfont icon-list we-i-item"></i>' +
                                '</div>' +
                            '</div>' +
                            '</div>' +
                            '<audio :src="activeMusic.songSrc" ref="weAudio">' +
                            '</audio>' +
                        '</div>';
                        return audioDom;
    }

    // 兼容CommonJs规范
    if (typeof module !== 'undefined' && module.exports) module.exports = WeAudio;

    // 兼容AMD/CMD规范
    if (typeof define === 'function') define(function() { return WeAudio; });

    // 注册全局变量，兼容直接使用script标签引入该插件
    global.WeAudio = WeAudio;
})(this)