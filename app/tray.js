/*!
 * AriaNg GUI
 * 
 * Copyright (c) 2018 Xmader
 * Released under the MIT license
 * 
 * Source Code: https://github.com/Xmader/aria-ng-gui
 * 
*/

const { app, Tray, BrowserWindow } = require("electron")

let tray = null
let trayMenu = null

const getTrayMenu = () => {
    const locale = app.getLocale().includes("zh") ? "zh-CN" : "en-US"
    const { trayMenu: _trayMenu } = require("./menu.js").buildMenu(locale)
    trayMenu = _trayMenu
    return _trayMenu
}

const displayTray = (icon) => {
    tray = new Tray(icon)
    tray.setToolTip("AriaNg GUI v" + app.getVersion())
    tray.setContextMenu(trayMenu || getTrayMenu())
}

const destroyTray = () => {
    const mainWindow = BrowserWindow.getAllWindows()[0]

    tray.destroy()
    mainWindow.show()
}

const destroyMainWindow = () => {
    const mainWindow = BrowserWindow.getAllWindows()[0]

    mainWindow.destroy()
}

module.exports = {
    displayTray,
    destroyTray,
    destroyMainWindow
}
