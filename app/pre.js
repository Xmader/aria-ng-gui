/*!
 * AriaNg GUI
 * 
 * Copyright (c) 2018-2020 Xmader
 * Released under the MIT license
 * 
 * Source Code: https://github.com/Xmader/aria-ng-gui
 * 
 * pre.js - 用于内置的AriaNg页面的预加载脚本
 * 
*/

// @ts-check

const { ipcRenderer, remote: { app } } = require("electron")


/**
 * 插件系统
 */
const PluginsHelper = require("./native_node_modules").PluginsHelper.default
window["PluginsHelper"] = PluginsHelper

const plugins = require("./plugins")
plugins.forEach((p) => {
    PluginsHelper.registerPlugin(p)
})


/**
 * 检查版本更新
 */
const check_update = require("./check_update.js")
check_update()


/**
 * 最小化通知
 */
// 获取是否禁用了最小化时的通知
ipcRenderer.on("isMinimizeNotificationDisabled", () => {
    const options = localStorage.getItem("AriaNg.Options")
    const disabled = options && JSON.parse(options).minimizeNotification == false

    ipcRenderer.send("minimizeNotificationDisabled", disabled)
})


/**
 * 显示版本号
 */
window.onload = () => {
    // 显示 AriaNg GUI 的版本号
    const version = app.getVersion()
    let logo = document.getElementById("aria-ng-logo")
    logo.title = `AriaNg GUI v${version} | ${logo.title}`
}
