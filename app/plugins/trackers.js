/*!
 * AriaNg GUI
 * 
 * Copyright (c) 2018-2020 Xmader
 * Released under the MIT license
 * 
 * Source Code: https://github.com/Xmader/aria-ng-gui
 * 
 * trackers.js - 自动更新 BitTorrent trackers 列表
 */

// @ts-check

const updateURL = "https://cdn.jsdelivr.net/gh/ngosang/trackerslist/trackers_all.txt"

/**
 * @typedef {import("./index").Plugin} Plugin
 * @type {Plugin}
 */
module.exports = {
    async activate(context) {

        // 程序运行时自动更新 trackers 列表
        const r = await fetch(updateURL)
        const trackerslist = await r.text()

        const trackers = trackerslist.split(/\n+/).filter(Boolean)

        // 热修改 aria2.conf
        context.addListener("ready", () => {
            context.extra.changeAria2Config({
                "bt-tracker": trackers.join(",")
            })
        })

    }
}
