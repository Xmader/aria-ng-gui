/*!
 * AriaNg GUI
 * 
 * Copyright (c) 2018 Xmader
 * Released under the MIT license
 * 
 * Source Code: https://github.com/Xmader/aria-ng-gui
 * 
 * pre.js - 用于内置的AriaNg页面的预加载脚本
 * 
*/

const { ipcRenderer } = require('electron');
const check_update = require('./check_update.js')

window.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    let activeElement = document.activeElement
    let tagName = activeElement.tagName.toLocaleLowerCase()

    if (tagName == "input" || tagName == "textarea") {
        ipcRenderer.send('right_btn');
    }
});

check_update() // 检查版本更新
