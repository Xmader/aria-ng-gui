/*!
 * AriaNg GUI
 * 
 * Copyright (c) 2018 Xmader
 * Released under the MIT license
 * 
 * Source Code: https://github.com/Xmader/aria-ng-gui
 * 
 * check_update.js - 检查更新
 * 
*/

const path = require("path")
const { dialog, shell, app } = require("electron").remote

const versionCheckApi = "https://raw.githubusercontent.com/Xmader/aria-ng-gui/master/app/package.json"
const DownloadUrl = "https://github.com/Xmader/aria-ng-gui/releases/latest"

/**
 * @param {string} version
 * @param {string} new_version
 */
const found_new_version = (version, new_version) => {
    dialog.showMessageBox({
        type: "question",
        buttons: ["下载", "取消"],
        defaultId: 0,
        cancelId: 1,
        title: "发现新版本!",
        message: "是否要下载新版本?",
        detail: `当前版本: v${version} ,\n新版本: v${new_version} `,
        icon: path.join(__dirname, "assets/AriaNg.png"),
    }, (response) => {
        if (response == 0) {
            shell.openExternal(DownloadUrl)
        }
    })
}

const check_update = async () => {
    const req = await fetch(versionCheckApi)
    const data = await req.json()

    const version = app.getVersion() // 当前版本号, 在package.json中定义
    const version_formatted = format_version(version)

    const new_version = data["version"]
    const new_version_formatted = format_version(new_version)

    if (version_formatted < new_version_formatted) {
        found_new_version(version, new_version)
    }
}

/**
 * @param {string} e - 需要被格式化的版本号字符串
 */
const format_version = (e) => {
    return e.split(".").map((e) => +e)
}

module.exports = check_update

