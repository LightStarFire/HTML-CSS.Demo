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
        haveMistake: false, // 有没有出错
        mistakeInfo: '', // 出错信息
        wePreSongDom: null, // 上一首
        weNextSongDom: null, // 下一首
        wePlayCircleDom: null, // 播放\暂停
        weSongCoverDom: null, // 背景图片
        weLikeDom: null, // 喜欢
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

    // 工具
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
        },
        // 检查模式
        checkPlayMode: function () {
            var playModeArr = ['single', 'order', 'random']
            return playModeArr.indexOf(defaultOpts.playMode);
        }
    };

    // 播放器初始化
    function init () {
        // 参数检查
        checkParams();
        // 插入节点
        that.el.innerHTML = addWeAudioDom();
        // 选择一首歌曲
        playMusic();
    };

    // 参数检查
    function checkParams () {
        status.haveMistake = !utils.isNotEmptyArray(defaultOpts.musicList);
        if (status.haveMistake) {
            status.mistakeInfo = '噢~你这该死的家伙!歌曲资源都弄错了。';
            return;
        }
        status.haveMistake = utils.checkPlayMode() === -1;
        if (status.haveMistake) {
            status.mistakeInfo = '啊~你这该死的家伙!没有这种播放模式。';
            return;
        }
        // defaultOpts.musicList.length
    };

    // 选择一首歌曲
    function playMusic () {
        if (status.haveMistake) return;
        WeActiveMusic = defaultOpts.musicList[0];
        // console.log(WeActiveMusic);
        bindDom();
    };

    // 绑定节点事件
    function bindDom () {
        var wePreSongDom = document.getElementsByClassName('we-pre-son')[0]; // 上一首
        var weNextSongDom = document.getElementsByClassName('we-next-song')[0]; // 下一首
        var wePlayCircleDom = document.getElementsByClassName('we-play-circle')[0]; // 播放\暂停
        var weSongCoverDom = document.getElementsByClassName('we-song-cover')[0]; // 背景图片
        var weLikeDom = document.getElementsByClassName('we-like')[0]; // 喜欢
    };

    // 设置背景图片
    function setWeSongCover () {

    }
    
    
    // 插入节点 配置皮肤什么的
    function addWeAudioDom () {
        var audioDom;
        if (!status.haveMistake) {
            audioDom = '<div class="component-we-audio">' +
                            '<div class="we-audio we-clearfix">' +
                            '<div class="we-song-info we-clearfix">' +
                                '<img class="we-song-cover we-fl">' +
                                '<div class="we-lyrics-play we-fl">' +
                                '<div class="we-play">' +
                                    '<i @click="preSong" class="iconfont icon-pre-song we-i-item we-pre-song"></i>' +
                                    '<span @click="changeIsPlay" class="we-play-circle"><i class="iconfont icon-stop playItem"></i></span>' +
                                    '<i @click="nextSong" class="iconfont icon-next-song we-i-item we-next-song"></i>' +
                                '</div>' +
                                '</div>' +
                                '<div class="we-operation we-fl">' +
                                '<i @click="exChangeLike" class="iconfont icon-empty-like we-i-item we-like"></i>' +
                                '<i class="iconfont icon-voice we-i-item"></i>' +
                                '<i class="iconfont icon-list we-i-item"></i>' +
                                '</div>' +
                            '</div>' +
                            '</div>' +
                            '<audio id="weAudio">' +
                            '</audio>' +
                        '</div>';
        } else {
            audioDom = '<div class="component-we-audio"><div class="we-audio we-clearfix"><p class="we-errorData">' + status.mistakeInfo + '</p></div></div>'
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