// ==UserScript==
// @name         解除OJ粘贴限制
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  强制允许网页中的复制粘贴
// @match       https://www.educoder.net/*
// @grant        unsafeWindow
// @run-at       document-start
// ==/UserScript==
(function() {
    'use strict';

    // 劫持所有可能的事件监听器
    const originalAddEventListener = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function(type, listener, options) {
        if (['paste', 'copy'].includes(type)) {
            const stack = new Error().stack;  // 获取调用栈
            console.log(`[拦截] 阻止添加事件: ${type}`);
            console.log(`[拦截信息] 监听器代码:`, listener.toString());
            console.log(`[拦截信息] 调用栈:\n`, stack);
            return; // 直接阻止原网页绑定相关事件
        }
        originalAddEventListener.call(this, type, listener, options);
    };

    // 暴力解除键盘限制
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && (e.key === 'v' || e.key === 'V' || e.key === 'c' || e.key === 'C')) {
            // 阻止其他事件
            e.stopImmediatePropagation();
            return true;
        }
    }, true);
    console.log('OJ粘贴限制已解除!');
})();