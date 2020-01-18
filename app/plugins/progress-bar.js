/*!
 * AriaNg GUI
 * 
 * Copyright (c) 2018-2020 Xmader
 * Released under the MIT license
 * 
 * Source Code: https://github.com/Xmader/aria-ng-gui
 * 
 * progress-bar.js - 显示任务栏进度条
 */

// @ts-check

const { ipcRenderer } = require("electron")

/**
 * @typedef {import("./index").Plugin} Plugin
 * @type {Plugin}
 */
module.exports = {
    activate(context) {

        // 显示任务栏进度条
        context.addListener("downloading", (tasks) => {
            const totalProgress = tasks.reduce((total, task) => total + (task.completedLength / task.totalLength), 0)
            const progress = (tasks.length > 0) ? (totalProgress / tasks.length) : -1
            ipcRenderer.send("show_progress_bar", progress)
        })

    }
}
