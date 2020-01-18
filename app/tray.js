/*!
 * AriaNg GUI
 * 
 * Copyright (c) 2018-2020 Xmader
 * Released under the MIT license
 * 
 * Source Code: https://github.com/Xmader/aria-ng-gui
 * 
*/

// @ts-check

const { app, Tray, BrowserWindow, ipcMain, dialog, Notification, nativeImage } = require("electron")

/** @type {Electron.Tray} */
let tray = null
/** @type {Electron.Menu} */
let trayMenu = null

const getTrayMenu = () => {
    const locale = app.getLocale().includes("zh") ? "zh-CN" : "en-US"
    const { trayMenu: _trayMenu } = require("./menu.js").buildMenu(locale)
    trayMenu = _trayMenu
    return _trayMenu
}

/**
 * @param {string | Electron.NativeImage} icon
 * @param {string | Electron.NativeImage} trayIcon
 */
const displayTray = async (icon, trayIcon) => {
    if (typeof icon == "string") {
        icon = nativeImage.createFromPath(icon)
    }

    if (tray && tray.isDestroyed()) {
        tray = null
    }

    if (!tray) {
        tray = new Tray(trayIcon)
        tray.setToolTip("AriaNg GUI v" + app.getVersion())
        tray.setContextMenu(trayMenu || getTrayMenu())

        tray.on("click", () => {
            destroyTray()
        })
    }

    // MacOS
    if (process.platform == "darwin") {
        app.dock.hide()
    }

    const minimizeNotificationDisabled = await new Promise((resolve) => {
        const mainWindow = BrowserWindow.getAllWindows()[0]

        ipcMain.once("minimizeNotificationDisabled", (e, value) => {
            resolve(value)
        })

        mainWindow.webContents.send("isMinimizeNotificationDisabled")
    })


    if (!minimizeNotificationDisabled) {
        const title = "AriaNg GUI 已最小化到托盘"
        const content = "可以通过托盘图标菜单完全退出"
        if (Notification.isSupported()) {
            new Notification({
                icon,
                title,
                body: content,
            }).show()
        } else if (process.platform == "win32") {
            // Windows only
            tray.displayBalloon({
                icon,
                title,
                content,
            })
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
    if (process.platform == "darwin") {
        app.dock.show()
    }

    // cross-platform workaround
    // issues: Xmader/aria-ng-gui#20 Xmader/aria-ng-gui#22 Xmader/aria-ng-gui#24
    mainWindow.once("show", () => {
        // 暂时绕过 Xmader/aria-ng-gui#24
        // 临时的 workaround for KDE and GNOME, 直到找到更好的解决办法
        // 在 Linux 上显示窗口后不移除托盘图标
        if (process.platform != "linux") {
            tray.destroy()
        }

        if (tray.isDestroyed()) {
            tray = null
        }
    })

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
