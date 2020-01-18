/*!
 * AriaNg GUI
 * 
 * Copyright (c) 2018-2020 Xmader
 * Released under the MIT license
 * 
 * Source Code: https://github.com/Xmader/aria-ng-gui
 * 
 * notification.js - 支持桌面提醒
 */

// @ts-check

/** @type {import("../notify")} */
const notify = require("electron").remote.require("./notify.js")

/**
 * @typedef {import("./index").Plugin} Plugin
 * @type {Plugin}
 */
module.exports = {
    activate(context) {

        // 支持桌面提醒
        context.addListener("notify", notify)

    }
}
