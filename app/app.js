/*!
 * AriaNg GUI
 * 
 * Copyright (c) 2018 Xmader
 * Released under the MIT license
 * 
 * Source Code: https://github.com/Xmader/aria-ng-gui
 * 
*/

const os = require('os');
const electron = require('electron');
const path = require('path');
const process = require('process')
const fs = require("fs")

const edit_conf = require('./edit_conf.js')

const { app, BrowserWindow, Menu, ipcMain } = electron

var mainWindow = null;

// console.dir(process.argv)
const isDev = process.argv.pop() == "dev";

// 增加右键菜单
const contextMenuTemplate = [
    { label: "撤销", role: 'undo', accelerator: "CmdOrCtrl+Z" },
    { label: "恢复", role: 'redo', accelerator: "CmdOrCtrl+Y" },
    { type: 'separator' }, //分隔线 
    { label: "剪切", role: 'cut', accelerator: "CmdOrCtrl+X" }, //Cut菜单项
    { label: "复制", role: 'copy', accelerator: "CmdOrCtrl+C" }, //Copy菜单项
    { label: "粘贴", role: 'paste', accelerator: "CmdOrCtrl+V" }, //Paste菜单项
    { type: 'separator' }, //分隔线 
    { label: "全选", role: 'selectall', accelerator: "CmdOrCtrl+A" }, //Select All菜单项
];
if (isDev) {
    [
        { type: 'separator' }, //分隔线 
        { label: "重新加载页面", role: 'reload' },
        { label: "切换开发者工具", role: 'toggledevtools' },
    ].forEach(x => contextMenuTemplate.push(x))
}
const contextMenu = Menu.buildFromTemplate(contextMenuTemplate);


app.commandLine.appendSwitch('ignore-certificate-errors') // 忽略证书相关错误, 适用于使用自签名证书将Aria2的RPC配置成HTTPS协议的情况

app.on('window-all-closed', function () {
    app.quit();
});

app.on('ready', function () {
    mainWindow = new BrowserWindow({
        title: 'AriaNg',
        width: 1000,
        height: 600,
        minWidth: 400,
        minHeight: 400,
        icon: path.join(__dirname, 'assets/AriaNg.png'),
        show: false,
        webPreferences: {
            nodeIntegration: false,
            preload: path.join(__dirname, 'pre.js')
        }
    });

    const platform = os.platform();

    const aria2_bin = (platform == 'linux' || platform == 'darwin') ? "aria2c" : "aria2c.exe"
    const aria2_dir = path.join(__dirname, "aria2", platform, aria2_bin)

    const conf_path = path.join(__dirname, "aria2", "aria2.conf")
    edit_conf(conf_path) // 根据用户的操作系统动态编辑aria2的配置文件

    //打开主程序
    fs.chmodSync(aria2_dir, 0o777)
    let subpy = require('child_process').spawn(aria2_dir, [`--conf-path=${conf_path}`]);

    // 打开窗口的调试工具
    //mainWindow.webContents.openDevTools();

    mainWindow.setMenu(null);
    mainWindow.loadURL(`file://${__dirname}/pages/index.html`);

    mainWindow.once('ready-to-show', function () {
        mainWindow.show()
    });

    mainWindow.on('closed', function () {
        subpy.kill('SIGINT');
        mainWindow = null;
    });
});

ipcMain.on("right_btn", () => {
    contextMenu.popup(mainWindow);
})

