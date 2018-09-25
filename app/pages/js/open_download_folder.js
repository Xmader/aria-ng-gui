/*!
 * AriaNg GUI
 * 
 * Copyright (c) 2018 Xmader
 * Released under the MIT license
 * 
 * Source Code: https://github.com/Xmader/aria-ng-gui
 * 
*/

// 更改工具栏上的帮助按钮的链接
const toolbars = $(".toolbar")
toolbars[toolbars.length - 1].href = "https://github.com/Xmader/aria-ng-gui"

const init = () => {
    // 判断是否是 已完成/已停止 页面
    const hash = location.hash.split("/")[1];
    if (hash == "stopped") {

    }
    else {


    }
}

// 检测浏览器是否支持onhashchange事件 
if (("onhashchange" in window) && ((typeof document.documentMode === "undefined") || document.documentMode == 8)) {
    window.onhashchange = init;
}
