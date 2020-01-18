/*!
 * AriaNg GUI
 * 
 * Copyright (c) 2018-2020 Xmader
 * Released under the MIT license
 * 
 * Source Code: https://github.com/Xmader/aria-ng-gui
 *  
 * 同时将配置文件保存在 程序目录 和 userData (AppData) 下
 * 方便升级和在电脑之间迁移，实际只使用保存在 userData (AppData) 下的配置文件
 * 
 * conf.js - 同步在两处的配置文件
 * 
*/

// @ts-check

const path = require("path")
const fs = require("fs")
const { app } = require("electron")

// 在程序目录下的配置文件路径
const basePathOld = path.join(__dirname, "aria2")
const confPathOld = path.join(basePathOld, "aria2.conf")
const sessionPathOld = path.join(basePathOld, "aria2.session")

// 在 userData (AppData) 下的配置文件路径 (实际使用)
const basePath = app.getPath("userData")
const confPath = path.join(basePath, "aria2.conf")
const sessionPath = path.join(basePath, "aria2.session")

/**
 * 同步在两处的配置文件
 * @param {string} path0
 * @param {string} path1 (实际使用)
 */
const syncConfigFile = (path0, path1) => {
    if (fs.existsSync(path0)) {
        if (!fs.existsSync(path1)) {  // 实际使用的文件不存在
            fs.copyFileSync(path0, path1)
            return
        }

        if (fs.statSync(path0).mtimeMs > fs.statSync(path1).mtimeMs) {  // 在程序目录下的配置文件比实际使用的文件新
            fs.copyFileSync(path0, path1)
            return
        }
    }

    fs.copyFileSync(path1, path0)
}

const syncConfigFiles = () => {
    syncConfigFile(confPathOld, confPath)
    syncConfigFile(sessionPathOld, sessionPath)
}

module.exports = {
    confPathOld,
    sessionPathOld,
    confPath,
    sessionPath,
    syncConfigFiles,
}
