/*!
 * AriaNg GUI
 * 
 * Copyright (c) 2018 Xmader
 * Released under the MIT license
 * 
 * Source Code: https://github.com/Xmader/aria-ng-gui
 * 
*/

const os = require("os")
const path = require("path")
const fs = require("fs")
const { app, BrowserWindow, Menu, ipcMain } = require("electron")

const edit_conf = require("./edit_conf.js")
const { buildMenu } = require("./menu.js")
const { displayTray } = require("./tray.js")

let mainWindow = null

const icon = path.join(__dirname, "assets", "AriaNg.png")

app.commandLine.appendSwitch("ignore-certificate-errors") // 忽略证书相关错误, 适用于使用自签名证书将Aria2的RPC配置成HTTPS协议的情况

app.on("window-all-closed", function () {
    app.quit()
})

app.on("ready", function () {
    mainWindow = new BrowserWindow({
        title: "AriaNg",
        width: 1000,
        height: 600,
        minWidth: 400,
        minHeight: 400,
        icon,
        show: false,
        webPreferences: {
            nodeIntegration: false,
            preload: path.join(__dirname, "pre.js")
        }
    })

    const platform = os.platform()

    const aria2_bin = (platform == "linux" || platform == "darwin") ? "aria2c" : "aria2c.exe"
    const aria2_dir = path.join(__dirname, "aria2", platform, aria2_bin)

    const conf_path = path.join(__dirname, "aria2", "aria2.conf")
    edit_conf(conf_path) // 根据用户的操作系统动态编辑aria2的配置文件

    //打开主程序
    fs.chmodSync(aria2_dir, 0o777)

    let subpy = null

    function runAria2() {
        killAria2()

        subpy = require("child_process").spawn(aria2_dir, [`--conf-path=${conf_path}`], {
            stdio: "pipe"
        })
        subpy.stdout.pipe(process.stdout, { end: false })
        subpy.stderr.pipe(process.stderr, { end: false })

        subpy.on("error", runAria2)
        subpy.on("exit", runAria2)
    }

    function killAria2() {
        if (subpy) {
            subpy.removeAllListeners("error")
            subpy.removeAllListeners("exit")
            subpy.kill("SIGINT")
            subpy = null
        }
    }

    runAria2()

    // 打开窗口的调试工具
    //mainWindow.webContents.openDevTools()

    const locale = app.getLocale().includes("zh") ? "zh-CN" : "en-US"
    const { contextMenu, appMenu } = buildMenu(locale)

    if (platform == "darwin") {
        Menu.setApplicationMenu(appMenu)
    } else {
        mainWindow.setMenu(null)
    }

    mainWindow.loadURL(`file://${__dirname}/pages/index.html`)

    mainWindow.once("ready-to-show", function () {
        mainWindow.show()
    })

    mainWindow.on("close", function (e) {
        e.preventDefault()
        mainWindow.hide()
        displayTray(icon)
    })

    mainWindow.on("closed", function () {
        killAria2()
        mainWindow = null
    })

    ipcMain.on("right_btn", () => {
        contextMenu.popup(mainWindow)
    })
})

ipcMain.on("show_progress_bar", (event, n) => {
    if (mainWindow && mainWindow.setProgressBar) {
        mainWindow.setProgressBar(n ? n : -1)
    }
})
