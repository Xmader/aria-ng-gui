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

const fs = require("fs")
const { resolve } = require("path")
const { ipcRenderer, shell, remote: { app } } = require('electron');
const check_update = require('./check_update.js')

// 添加右键菜单
window.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    let activeElement = document.activeElement
    let tagName = activeElement.tagName.toLocaleLowerCase()

    if (tagName == "input" || tagName == "textarea") {
        ipcRenderer.send('right_btn');
    }
});

// 检查版本更新
check_update()

// 打开下载路径
const open_download_dir = (dir) => {
    shell.openItem(resolve(dir))
    shell.beep()
}

window.open_download_dir = open_download_dir

// 在文件管理器中显示文件
const show_file = (path) => {
    shell.showItemInFolder(resolve(path))
    shell.beep()
}

window.show_file = show_file

// 检测文件或目录是否已被移动或删除
const file_exists = (path) => fs.existsSync(path)
window.file_exists = file_exists

// 显示AriaNg GUI的版本号
window.onload = () => {
    const version = app.getVersion()
    let logo = document.getElementById("aria-ng-logo")
    logo.title = `AriaNg GUI v${version} | ${logo.title}`
}
