/*!
 * AriaNg GUI
 * 
 * Copyright (c) 2018-2020 Xmader
 * Released under the MIT license
 * 
 * Source Code: https://github.com/Xmader/aria-ng-gui
 */

// @ts-check

/**
 * @typedef {import("../native_node_modules/node_modules/aria-ng-gui-plugins-core").Plugin} Plugin
 * @type {Plugin[]}
 */
const plugins = [
    require("./show-path"),
    require("./contextmenu"),
    require("./progress-bar"),
    require("./save-local-config"),
    require("./notification"),
    require("./trackers"),
    require("./power-save-blocker"),
]

module.exports = plugins
