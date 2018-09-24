const os = require('os');
const fs = require('fs')
const path = require('path')

const edit_conf = (conf_path = `${__dirname}/aria2/aria2.conf`) => {
    const download_dir = path.join(os.homedir(), "Downloads")

    let old_conf = fs.readFileSync(conf_path).toString()

    let old_conf_list = old_conf.split("\r\n")
    if (old_conf_list.length == 1) {
        old_conf_list = old_conf.split("\n")
    }

    let new_conf_list = old_conf_list.map(x => {
        if (x.startsWith("input-file=") || x.startsWith("save-session=")) return "# " + x
        else if (x.startsWith("dir=")) return "dir=" + download_dir
        else return x
    })

    let new_conf = new_conf_list.join("\n")

    fs.writeFileSync(conf_path, new_conf)
}

module.exports = edit_conf
