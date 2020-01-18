/*!
 * AriaNg GUI
 * 
 * Copyright (c) 2018-2020 Xmader
 * Released under the MIT license
 * 
 * Source Code: https://github.com/Xmader/aria-ng-gui
 * 
 * check_update.js - 检查更新
 * 
*/

// @ts-check

const path = require("path")
const { dialog, shell, app, nativeImage } = require("electron").remote

const versionCheckApi = "https://raw.githubusercontent.com/Xmader/aria-ng-gui/master/app/package.json"
const DownloadUrl = "https://github.com/Xmader/aria-ng-gui/releases/latest"

/**
 * @param {string} version
 * @param {string} new_version
 */
const found_new_version = async (version, new_version) => {
    const icon = nativeImage.createFromPath(path.join(__dirname, "assets/AriaNg.png"))

    const { response } = await dialog.showMessageBox({
        type: "question",
        buttons: ["下载", "取消"],
        defaultId: 0,
        cancelId: 1,
        title: "发现新版本!",
        message: "是否要下载新版本?",
        detail: `当前版本: v${version} ,\n新版本: v${new_version} `,
        icon,
    })

    if (response == 0) {
        shell.openExternal(DownloadUrl)
    }
}

const check_update = async () => {
    const req = await fetch(versionCheckApi)
    const data = await req.json()

    const version = app.getVersion() // 当前版本号, 在package.json中定义
    const new_version = data["version"]

    if (compare_versions(new_version, version) >= 1) {
        found_new_version(version, new_version)
    }
}

/**
 * @param {string} e - 需要被格式化的版本号字符串
 */
const format_version = (e) => {
    return e.split(".").map((e) => +e | 0)
}

/**
 * @param {string} a 
 * @param {string} b 
 */
const compare_versions = (a, b) => {
    const av = format_version(a)
    const bv = format_version(b)

    for (let i = 0; i < Math.max(av.length, bv.length); i++) {
        const an = +av[i]
        const bn = +bv[i]

        if (an > bn) {
            return 1
        } else if (bn > an) {
            return -1
        }
    }

    return 0
}

module.exports = check_update

