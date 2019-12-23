// @ts-check

const path = require("path")

const { notifier } = require("./native_node_modules")

const { Notification } = require("electron")

/**
 * @param {string} title 
 * @param {string} message 
 */
const notify = (title, message) => {
    const icon = path.join(__dirname, "assets", "AriaNg.png")

    if (Notification.isSupported()) {

        new Notification({
            icon,
            title,
            body: message,
        }).show()

    } else {

        notifier.notify({
            title,
            message,
            icon,
            // appID:"github.xmader.ariang_gui"
        }, (err) => {
            if (err)
                console.error(err)
        })

    }
}

module.exports = notify
