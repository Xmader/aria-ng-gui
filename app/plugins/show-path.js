/*!
 * AriaNg GUI
 * 
 * Copyright (c) 2018-2020 Xmader
 * Released under the MIT license
 * 
 * Source Code: https://github.com/Xmader/aria-ng-gui
 * 
 * show-path.js - 打开已下载文件的保存位置 / 在文件管理器中显示文件
 */

// @ts-check

const { resolve } = require("path")
const { shell } = require("electron")
const { existsSync } = require("fs")

/**
 * @typedef {import("./index").Plugin} Plugin
 * @type {Plugin}
 */
module.exports = {
    activate(context) {

        // 打开下载路径
        context.extra.openDir = (dir) => {
            shell.openItem(resolve(dir))
            shell.beep()
        }

        // 在文件管理器中显示文件
        context.extra.showFile = (path) => {
            shell.showItemInFolder(resolve(path))
            shell.beep()
        }

        // 检测文件或目录是否已被移动或删除
        context.extra.fileExists = context.extra.fileExistsSync = (path) => {
            return existsSync(path)
        }

    }
}
