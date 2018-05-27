const os = require('os');
const electron = require('electron');
const path = require('path');


const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const Tray = electron.Tray;

var mainWindow = null;
var tray = null;
var platform=os.platform();
if (platform == 'linux'){
    var aria2_bin = "aria2c"
}
else{
    var aria2_bin = "aria2c.exe"
}

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
    
    var aria2_dir = __dirname + '/aria2/' + aria2_bin
    
    //打开主程序
    var subpy = require('child_process').spawn(aria2_dir, ["--conf-path="+__dirname + '/aria2/aria2.conf']);
    //console.log(subpy)
    
    // 打开窗口的调试工具
    //mainWindow.webContents.openDevTools();

    mainWindow.setMenu(null);
    mainWindow.loadURL('file://' + __dirname + '/pages/index.html');
    //mainWindow.loadURL('https://xmader.coding.me/aria-ng/');

    mainWindow.once('ready-to-show', function () {
        mainWindow.show()
    });

    mainWindow.on('closed', function () {
        subpy.kill('SIGINT');
        mainWindow = null;
    });
});
