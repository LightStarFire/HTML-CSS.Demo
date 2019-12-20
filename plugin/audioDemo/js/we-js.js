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
        weAudio: null, // 音频节点
        weMusicList: null, // 音乐列表
        weListBtn: null, // 音乐列表按钮
        weMusicItems: '', // 音乐列表item的集合
        isPlayIndex: 0, // 播放的是第几首
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
        // console.log(WeActiveMusic);
        // 绑定节点事件
        bindDom();
        // 设置音乐信息
        beforePlayAudio();
        // 设置音乐list
        setMusicList();
    };

    // 绑定节点事件
    function bindDom () {
        status.wePreSongDom = document.getElementsByClassName('we-pre-song')[0]; // 上一首
        status.weNextSongDom = document.getElementsByClassName('we-next-song')[0]; // 下一首
        status.wePlayCircleDom = document.getElementsByClassName('we-play-circle')[0]; // 播放\暂停
        status.weSongCoverDom = document.getElementsByClassName('we-song-cover')[0]; // 背景图片
        status.weLikeDom = document.getElementsByClassName('we-like')[0]; // 喜欢
        status.weAudio = document.getElementById('weAudio'); // audio节点
        status.weMusicList = document.getElementsByClassName('we-music-list')[0]; // 音乐列表
        status.weListBtn = document.getElementsByClassName('we-list-btn')[0]; // 音乐列表
        status.wePreSongDom.onclick = preSong;
        status.weNextSongDom.onclick = nextSong;
        status.wePlayCircleDom.onclick = playAudio;
        status.weListBtn.onclick = exChangeMusicList;
    };

    // musicListItem 双击
    function dblclickMusicItems () {
        var index = parseInt(this.getAttribute('data-id'));
        if (index === status.isPlayIndex && !status.weAudio.paused) return;
        status.isPlayIndex = index;
        beforePlayAudio();
        playAudio();
    }
    
    // musicListItem 单击
    function clickMusicItems () {
        if (this.classList.value.indexOf('active') !== -1) return;
        for (var i = 0; i < status.weMusicItems.length; i++) {
            status.weMusicItems[i].classList.remove('active');
        }
        status.weMusicItems[status.isPlayIndex].classList.add('active');
        this.classList.add('active');
    };

    // musicListItem 显示播放暂停按钮
    function showBtnForMusicItems () {
        // 移除之前的
        for (var i = 0; i < status.weMusicItems.length; i++) {
            if (status.weMusicItems[i].childNodes.length > 1) {
                status.weMusicItems[i].removeChild(status.weMusicItems[i].childNodes[0]);
                status.weMusicItems[i].classList.remove('active');
                break;
            }
        }
        var iNode = document.createElement('i');
        if (status.weAudio.paused) {
            iNode.classList = 'we-iconfont we-icon-play we-i-item';
        } else {
            iNode.classList = 'we-iconfont we-icon-stop we-i-item';
        }
        // iNode.classList = 'we-iconfont we-icon-play we-i-item';
        status.weMusicList.childNodes[status.isPlayIndex].insertBefore(iNode, status.weMusicList.childNodes[status.isPlayIndex].childNodes[0]);
        status.weMusicList.childNodes[status.isPlayIndex].classList.add('active');
    };

    // 改变MusicList
    function exChangeMusicList () {
        let weMusicListHeight = status.weMusicList.style.height;
        status.weMusicList.style.height = (weMusicListHeight === '0px' || weMusicListHeight === '') ? '290px' : '0px';
    };

    // 下一首
    function nextSong () {
        if (status.isPlayIndex === (defaultOpts.musicList.length - 1)) {
            status.isPlayIndex = 0;
        } else {
            status.isPlayIndex += 1;
        }
        beforePlayAudio();
        playAudio();
    };

    // 上一首
    function preSong () {
        if (status.isPlayIndex === 0) {
            status.isPlayIndex = (defaultOpts.musicList.length - 1);
        } else {
            status.isPlayIndex -= 1;
        }
        beforePlayAudio();
        playAudio();
    };

    // 播放之前处理
    function beforePlayAudio () {
        WeActiveMusic = defaultOpts.musicList[status.isPlayIndex];
        setMusicInfo();
    };

    // 播放
    function playAudio () {
        if (status.weAudio.paused) {
            status.weAudio.play();
        } else {
            status.weAudio.pause();
        }
        setPlayBtn(!status.weAudio.paused);
    };

    // 设置音乐信息且播放
    function setMusicInfo () {
        setWeSongCover();
        setAudioSrc();
    };

    // 设置背景图片
    function setWeSongCover () {
        status.weSongCoverDom.src = WeActiveMusic.songCover;
    };

    // 设置音频链接src
    function setAudioSrc () {
        status.weAudio.src = WeActiveMusic.songSrc;
    };

    // 设置播放按钮
    function setPlayBtn (isPlay) {
        if (isPlay) {
            status.wePlayCircleDom.childNodes[0].classList.add('we-icon-play');
            status.wePlayCircleDom.childNodes[0].classList.remove('we-icon-stop');
        } else {
            status.wePlayCircleDom.childNodes[0].classList.add("we-icon-stop");
            status.wePlayCircleDom.childNodes[0].classList.remove('we-icon-play');
        }
        showBtnForMusicItems();
    };

    // 设置音乐列表
    function setMusicList () {
        // 插入歌曲item
        var musicItem = '';
        for (var i = 0; i < defaultOpts.musicList.length; i++) {
            musicItem += '<div class="we-music-item" data-id="' + i + '">' + defaultOpts.musicList[i].songName + '</div>'
        }
        status.weMusicList.innerHTML = musicItem;
        // 显示按钮
        showBtnForMusicItems();
        // 给每一个musicItem绑定事件
        status.weMusicItems = document.getElementsByClassName('we-music-item'); // 音乐列表item 的集合
        for (var i = 0; i < status.weMusicItems.length; i++) {
            status.weMusicItems[i].onclick = clickMusicItems; // 单击项事件
            status.weMusicItems[i].ondblclick = dblclickMusicItems; // 双击项事件
        }
    };

    
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
                                        '<i @click="preSong" class="we-iconfont we-icon-pre-song we-i-item we-pre-song"></i>' +
                                        '<span @click="changeIsPlay" class="we-play-circle"><i class="we-iconfont we-icon-stop playItem"></i></span>' +
                                        '<i @click="nextSong" class="we-iconfont we-icon-next-song we-i-item we-next-song"></i>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="we-operation we-fl">' +
                                    '<i @click="exChangeLike" class="we-iconfont we-icon-empty-like we-i-item we-like"></i>' +
                                    '<i class="we-iconfont we-icon-voice we-i-item"></i>' +
                                    '<i class="we-iconfont we-icon-list we-i-item we-list-btn"></i>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="we-music-list"></div>' +
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