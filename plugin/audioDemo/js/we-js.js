;(function (global) {
    // 开启严格模式，规范代码，提高浏览器运行效率
    "use strict";

    // this
    var that;

    // 默认参数
    var defaultOpts = {
        musicList: [], // 音乐列表
        playMode: 'order', // single(单曲循环) order(顺序播放) random(随机播放)
    };

    // 定义一个音频WeAudio类，通常首字母大写
    var WeAudio = function(el, opts) {
        Object.assign(defaultOpts, opts);
        console.log(defaultOpts);
        that = this;
        this.el = typeof el === 'string' ? document.querySelector(el) : el;
        init();
    };

    // weAudio status 音频的一些状态
    var status = {
        isNotEmptyArray: true
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
        // init: function() {
        //     this.el.innerHTML = addWeAudioDom();
        // }
    };

    // 播放器初始化
    function init () {
        // 参数检查
        checkParams();
        // 根据模式选择一首歌曲
        playMusicForMode();
        // 插入节点
        that.el.innerHTML = addWeAudioDom();
        // 
    };

    var utils = {
        // 不是一个空的数组 true 反之 false
        isNotEmptyArray: function (_arr) {
            if (!Array.isArray(_arr)) {
                return false;
            }
            if (_arr.length === 0) {
                return false;
            }
            return true;
        }
    };

    // 参数检查
    function checkParams () {
        status.isNotEmptyArray = utils.isNotEmptyArray(defaultOpts.musicList);
        if (!status.isNotEmptyArray) {
            return;
        }
        // defaultOpts.musicList.length
    };

    // 根据模式选择一首歌曲
    function playMusicForMode () {
        switch (defaultOpts.playMode) {
            case 'single':
            // 单曲循环

            break;
            case 'order':
            // 顺序播放
            break;
            case 'random':
            // random
            break;
        }
    };

    // 单曲循环
    
    
    // 插入节点 配置皮肤什么的
    function addWeAudioDom () {
        var audioDom;
        if (!status.isNotEmptyArray) {
            audioDom = '<div class="component-we-audio">' +
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
                            '<audio id="weAudio">' +
                            '</audio>' +
                        '</div>';
        } else {
            audioDom = '<div class="component-we-audio"><div class="we-audio we-clearfix"><p>噢~你这该死的家伙!歌曲资源都弄错了。</p></div></div>'
        }
        return audioDom;
    };

    // 兼容CommonJs规范
    if (typeof module !== 'undefined' && module.exports) module.exports = WeAudio;

    // 兼容AMD/CMD规范
    if (typeof define === 'function') define(function() { return WeAudio; });

    // 注册全局变量，兼容直接使用script标签引入该插件
    global.WeAudio = WeAudio;
})(this)