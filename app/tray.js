/*!
 * AriaNg GUI
 * 
 * Copyright (c) 2018-2019 Xmader
 * Released under the MIT license
 * 
 * Source Code: https://github.com/Xmader/aria-ng-gui
 * 
*/

const { app, Tray, BrowserWindow, ipcMain, dialog, Notification } = require("electron")

let tray = null
let trayMenu = null

const getTrayMenu = () => {
    const locale = app.getLocale().includes("zh") ? "zh-CN" : "en-US"
    const { trayMenu: _trayMenu } = require("./menu.js").buildMenu(locale)
    trayMenu = _trayMenu
    return _trayMenu
}

const displayTray = async (icon, trayIcon) => {
    tray = new Tray(trayIcon)
    tray.setToolTip("AriaNg GUI v" + app.getVersion())
    tray.setContextMenu(trayMenu || getTrayMenu())

    tray.on("click", () => {
        destroyTray()
    })

    // MacOS
    app.dock.hide()

    const minimizeNotificationDisabled = await new Promise((resolve) => {
        const mainWindow = BrowserWindow.getAllWindows()[0]

        ipcMain.once("minimizeNotificationDisabled", (e, value) => {
            resolve(value)
        })

        mainWindow.webContents.send("isMinimizeNotificationDisabled")
    })


    if (!minimizeNotificationDisabled) {
        const title = "AriaNg GUI 已最小化到托盘"
        const content = "可以右键单击托盘图标完全退出"
        if (process.platform == "win32") {
            tray.displayBalloon({
                icon,
                title,
                content,
            })
        } else if (Notification.isSupported()) {
            new Notification({
                title,
                body: content,
                icon,
            }).show()
        } else {
            dialog.showMessageBox({
                type: "info",
                icon,
                title: "AriaNg GUI",
                message: title,
                detail: content
            })
        }
    }
}

const destroyTray = () => {
    if (!tray) return

    const mainWindow = BrowserWindow.getAllWindows()[0]

    // MacOS
    app.dock.show()

    mainWindow.show()

    // MacOS & Linux workaround
    // issues: Xmader/aria-ng-gui#20 Xmader/aria-ng-gui#22 Xmader/aria-ng-gui#24
    mainWindow.once("show", () => {
        tray.destroy()
    })
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
