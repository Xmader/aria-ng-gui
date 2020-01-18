/*!
 * AriaNg GUI
 * 
 * Copyright (c) 2018-2020 Xmader
 * Released under the MIT license
 * 
 * Source Code: https://github.com/Xmader/aria-ng-gui
 * 
 * save-local-config.js - 保存设置到 aria2.conf 文件
 */

// @ts-check

const { remote: { app, require: remoteRequire } } = require("electron")
const { EOL } = require("os")

/** @type {import("../conf")} */
const { syncConfigFiles } = remoteRequire("./conf.js")

/**
 * @typedef {import("./index").Plugin} Plugin
 * @type {Plugin}
 */
module.exports = {
    activate(context) {

        const { path, fs } = context

        // 保存设置到 aria2.conf 文件
        context.addListener("aria2-config-changed", async (changedOptions) => {

            const conf_path = path.join(
                app.getPath("userData"),
                "aria2.conf"
            )

            let conf = await fs.readFile(conf_path, "utf-8")

            Object.entries(changedOptions).forEach(([key, value]) => {
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

            await fs.writeFile(conf_path, conf)

            syncConfigFiles()

        })

    }
}
