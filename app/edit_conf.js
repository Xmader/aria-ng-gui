/*!
 * AriaNg GUI
 * 
 * Copyright (c) 2018-2020 Xmader
 * Released under the MIT license
 * 
 * Source Code: https://github.com/Xmader/aria-ng-gui
 * 
 * edit_conf.js - 根据用户的操作系统动态编辑aria2的配置文件
 * 
*/

// @ts-check

const os = require("os")
const fs = require("fs")
const path = require("path")
const { app } = require("electron")

const default_download_dir = app.getPath("downloads") || path.join(os.homedir(), "Downloads")

/**
 * @param {string} conf_path 
 */
const edit_conf = (conf_path) => {
    const session_path = path.join(path.dirname(conf_path), "aria2.session")

    if (!fs.existsSync(session_path)) {
        fs.writeFileSync(session_path, "")
    }

    let old_conf = fs.readFileSync(conf_path).toString()

    let download_dir = default_download_dir
    let saved_dir = (old_conf.match(/^dir=(.*)$/m) || [])[1]
    if (saved_dir) {
        /** @type {fs.Stats} */
        let stat = null
        try {
            stat = fs.statSync(saved_dir)
        } catch (e) { }  // eslint-disable-line no-empty
        if (stat && stat.isDirectory()) {
            download_dir = saved_dir
        }
    }

    let new_conf = old_conf
        .replace(/^dir=.*$/m, "dir=" + download_dir)
        .replace(/^(input-file=|save-session=).*$/gm, "$1" + session_path)

    fs.writeFileSync(conf_path, new_conf)
}

module.exports = edit_conf
