/*!
 * AriaNg GUI
 * 
 * Copyright (c) 2018-2019 Xmader
 * Released under the MIT license
 * 
 * Source Code: https://github.com/Xmader/aria-ng-gui
 * 
 * pre.js - 用于内置的AriaNg页面的预加载脚本
 * 
*/

// @ts-check

const fs = require("fs")
const { resolve, join } = require("path")
const { EOL } = require("os")
const { ipcRenderer, shell, remote: { app } } = require("electron")

const check_update = require("./check_update.js")
const notify = require("./notify.js")

// 支持桌面提醒
window["notify"] = notify

// 添加右键菜单
window.addEventListener("contextmenu", (e) => {
    e.preventDefault()

    let activeElement = document.activeElement
    let tagName = activeElement.tagName.toLocaleLowerCase()

    if (tagName == "input" || tagName == "textarea") {
        ipcRenderer.send("right_btn")
    }
})

// 检查版本更新
check_update()

// 打开下载路径
const open_download_dir = (dir) => {
    shell.openItem(resolve(dir))
    shell.beep()
}

window["open_download_dir"] = open_download_dir

// 在文件管理器中显示文件
const show_file = (path) => {
    shell.showItemInFolder(resolve(path))
    shell.beep()
}

window["show_file"] = show_file

// 检测文件或目录是否已被移动或删除
const file_exists = (path) => fs.existsSync(path)
window["file_exists"] = file_exists

const show_progress_bar = () => { // 显示任务栏进度条
    if (!window["aria2TaskService"]) return

    window["aria2TaskService"].getTaskList("downloading", false, (response) => {
        let tasks = response.data

        let total_progress = tasks.reduce((total, task) => total + (task.completedLength / task.totalLength), 0)

        let progress = (tasks.length > 0) ? (total_progress / tasks.length) : -1
        ipcRenderer.send("show_progress_bar", progress)
    })
}

// 保存设置到aria2.conf文件
const saveLocalConfig = (options) => {
    const conf_path = join(app.getPath("userData"), "aria2.conf")
    let conf = fs.readFileSync(conf_path).toString()

    Object.entries(options).forEach(([key, value]) => {
        const r = new RegExp(`^(?:#\\s*)?(${key}=).*`, "m")
        if (r.test(conf)) {
            conf = conf.replace(
                r,
                "$1" + value
            )
        } else {
            conf += `${EOL}${key}=${value}`
        }
    })

    fs.writeFileSync(conf_path, conf)
}

window["saveLocalConfig"] = saveLocalConfig


// 获取是否禁用了最小化时的通知
ipcRenderer.on("isMinimizeNotificationDisabled", () => {
    const options = localStorage.getItem("AriaNg.Options")
    const disabled = options && JSON.parse(options).minimizeNotification == false

    ipcRenderer.send("minimizeNotificationDisabled", disabled)
})


window.onload = () => {
    // 显示AriaNg GUI的版本号
    const version = app.getVersion()
    let logo = document.getElementById("aria-ng-logo")
    logo.title = `AriaNg GUI v${version} | ${logo.title}`

    // 显示任务栏进度条
    setInterval(show_progress_bar, 200)
}
