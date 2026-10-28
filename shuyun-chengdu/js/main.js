/* =========================================================
   蜀韵成都 - 首页交互脚本
   功能：轮播图的自动播放、左右切换与圆点跳转
   ========================================================= */

(function () {
    'use strict';

    /* ---------- 获取页面元素 ---------- */
    var slides = document.querySelectorAll('.banner .slide');   // 所有轮播图
    var dots = document.querySelectorAll('.banner .dots button'); // 所有指示圆点
    var prevBtn = document.querySelector('.arrow.prev');         // 上一张按钮
    var nextBtn = document.querySelector('.arrow.next');         // 下一张按钮

    var current = 0;   // 当前显示的轮播图索引
    var timer = null;  // 自动播放定时器
    var INTERVAL = 5000; // 自动切换间隔：5秒

    /* ---------- 切换到指定索引的轮播图 ---------- */
    function goTo(index) {
        // 先移除当前图与圆点的激活状态
        slides[current].classList.remove('active');
        dots[current].classList.remove('active');

        // 计算新索引（循环轮播：最后一张之后回到第一张）
        current = (index + slides.length) % slides.length;

        // 为新图与对应圆点添加激活状态
        slides[current].classList.add('active');
        dots[current].classList.add('active');
    }

    /* ---------- 自动播放控制 ---------- */
    function startPlay() {
        timer = setInterval(function () {
            goTo(current + 1);
        }, INTERVAL);
    }

    // 手动操作后重新计时，避免刚切换就又自动跳转
    function resetPlay() {
        clearInterval(timer);
        startPlay();
    }

    /* ---------- 绑定交互事件 ---------- */

    // 上一张按钮
    prevBtn.addEventListener('click', function () {
        goTo(current - 1);
        resetPlay();
    });

    // 下一张按钮
    nextBtn.addEventListener('click', function () {
        goTo(current + 1);
        resetPlay();
    });

    // 点击圆点跳转到对应轮播图
    dots.forEach(function (dot, i) {
        dot.addEventListener('click', function () {
            goTo(i);
            resetPlay();
        });
    });

    /* ---------- 页面加载完成后启动自动播放 ---------- */
    startPlay();
})();
