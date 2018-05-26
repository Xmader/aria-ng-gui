const os = require('os');
const electron = require('electron');
const path = require('path');


const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const Tray = electron.Tray;

var mainWindow = null;
var tray = null;

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
            nodeIntegration: false
        }
    });

    // 打开窗口的调试工具
    mainWindow.webContents.openDevTools();
    mainWindow.setMenu(null);
    mainWindow.loadURL('file://' + __dirname + '/pages/index.html');

    mainWindow.once('ready-to-show', function () {
        mainWindow.show()
    });

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
});
