# 解决头歌禁止复制粘贴问题
一个油猴的插件
现在通过链接搜索不到了
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/6547b050de6542c08e24862cbbeec497.png)
源码我就不发了，在这里直接给大家给出解决代码
~~~js
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




~~~
## 安装方法
直接在油猴插件的管理面板里面新建一个脚本
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/12ab5c3ef14a4a9692a8942c0e73e01b.png)



![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/d5b92dd6eaaa47febcb31d3c126268f6.png)


然后把上述代码粘进去就行了
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/29b04fa28ad049198b7edae4ddd7275f.png)
上述步骤都弄好后打开头歌oj
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/99791601eb524815adb623de95637399.png)
在这里打开oj打开这个脚本，然后再刷新页面，就可以进行复制粘贴了
