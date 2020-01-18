/*!
 * AriaNg GUI
 * 
 * Copyright (c) 2018-2020 Xmader
 * Released under the MIT license
 * 
 * Source Code: https://github.com/Xmader/aria-ng-gui
 * 
 * power-save-blocker.js - 在有任务正在下载时阻止系统休眠，但允许屏幕关闭
 * https://github.com/Xmader/aria-ng-gui/issues/34
 */

// @ts-check

const { powerSaveBlocker } = require("electron").remote

class PowerSaveBlocker {

    /** @type {number} */
    id = null

    start() {
        if (this.id !== null) {
            return
        }

        // 阻止系统休眠，但允许屏幕关闭
        this.id = powerSaveBlocker.start("prevent-app-suspension")

        console.log("powerSaveBlocker started")
    }

    stop() {
        if (this.id !== null && powerSaveBlocker.isStarted(this.id)) {
            powerSaveBlocker.stop(this.id)
            this.id = null
            console.log("powerSaveBlocker stopped")
        }
    }

}

const blocker = new PowerSaveBlocker()

/**
 * @typedef {import("./index").Plugin} Plugin
 * @type {Plugin}
 */
module.exports = {
    activate(context) {
        context.addListener("downloading", (tasks) => {
            const isDownloading = tasks.length > 0
            if (isDownloading) {
                blocker.start()
            } else {
                blocker.stop()
            }
        })
    },
    deactivate() {
        blocker.stop()
    }
}
