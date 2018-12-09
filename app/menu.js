/*!
 * AriaNg GUI
 * 
 * Copyright (c) 2018 Xmader
 * Released under the MIT license
 * 
 * Source Code: https://github.com/Xmader/aria-ng-gui
 * 
*/

const process = require("process")
const { Menu } = require("electron")
const Translate = require("./translate.js")
const { destroyTray, destroyMainWindow } = require("./tray.js")

const isDev = process.argv.pop() == "dev"


// 增加右键菜单
const contextMenuTemplate = [
    { label: "撤销", role: "undo", accelerator: "CmdOrCtrl+Z" },
    { label: "恢复", role: "redo", accelerator: "CmdOrCtrl+Y" },
    { type: "separator" }, //分隔线 
    { label: "剪切", role: "cut", accelerator: "CmdOrCtrl+X" }, //Cut菜单项
    { label: "复制", role: "copy", accelerator: "CmdOrCtrl+C" }, //Copy菜单项
    { label: "粘贴", role: "paste", accelerator: "CmdOrCtrl+V" }, //Paste菜单项
    { type: "separator" }, //分隔线 
    { label: "全选", role: "selectall", accelerator: "CmdOrCtrl+A" }, //Select All菜单项
]
if (isDev) {
    [
        { type: "separator" }, //分隔线 
        { label: "重新加载页面", role: "reload" },
        { label: "切换开发者工具", role: "toggledevtools" },
    ].forEach(x => contextMenuTemplate.push(x))
}

const appMenuTemplate = [
    {
        submenu: [{ label: "退出", role: "quit" }]
    },
    {
        label: "编辑",
        submenu: contextMenuTemplate
    }
]

const trayMenuTemplate = [
    // {
    //     label: "打开下载文件夹",
    // },
    {
        label: "显示窗口",
        click() {
            destroyTray()
        }
    },
    {
        label: "退出",
        click() {
            destroyMainWindow()
        }
    }
]

const buildMenu = (locale) => {

    const _buildMenuFromTemplate = (menuTemplate) => {
        if (locale != "zh-CN") {
            menuTemplate = Translate(menuTemplate, locale)
        }
        return Menu.buildFromTemplate(menuTemplate)
    }

    const contextMenu = _buildMenuFromTemplate(contextMenuTemplate)
    const appMenu = _buildMenuFromTemplate(appMenuTemplate)
    const trayMenu = _buildMenuFromTemplate(trayMenuTemplate)

    return {
        contextMenu,
        appMenu,
        trayMenu
    }
}

module.exports = {
    buildMenu
}
