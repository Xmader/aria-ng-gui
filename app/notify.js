const path = require("path")

const { notifier } = require("./native_node_modules")

const notify = (title, message) => {
    notifier.notify({
        title,
        message,
        icon: path.join(__dirname, "assets", "AriaNg.png"),
        // appID:"github.xmader.ariang_gui"
    }, (err) => {
        if (err)
            console.error(err)
    })
}

module.exports = notify
