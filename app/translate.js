/*!
 * AriaNg GUI
 * 
 * Copyright (c) 2018-2020 Xmader
 * Released under the MIT license
 * 
 * Source Code: https://github.com/Xmader/aria-ng-gui
 * 
 * translate.js - 翻译菜单项
 * 
*/

// @ts-check

const translations = {
    "撤销": "Undo",
    "恢复": "Redo",
    "剪切": "Cut",
    "复制": "Copy",
    "粘贴": "Paste",
    "全选": "Select All",
    "重新加载页面": "Reload",
    "切换开发者工具": "Toggle Developer Tools",
    "退出": "Quit",
    "编辑": "Edit",
    "显示窗口": "Display Window",
}

/**
 * @param {import("./menu").MenuTemplate} menuTemplate 
 * @param {"zh-CN" | "en-US"} locale 
 */
const Translate = (menuTemplate, locale = "en-US") => {
    if (locale != "en-US") {
        return menuTemplate
    }

    /**
     * @param {import("./menu").MenuTemplateItem} x 
     */
    const _translateLabels = (x) => {
        if (x.label) {
            x.label = translations[x.label] || x.label
        }
        if (x.submenu) {
            x.submenu = x.submenu.map(_translateLabels)
        }
        return x
    }

    return menuTemplate.map(_translateLabels)
}

module.exports = Translate
