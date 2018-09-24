const os = require('os');
const electron = require('electron');
const path = require('path');

const edit_conf = require('./edit_conf.js')

const { app, BrowserWindow, Menu, ipcMain } = electron

var mainWindow = null;
var platform = os.platform();

var aria2_bin = (platform == 'linux' || platform == 'darwin') ? "aria2c" : "aria2c.exe"

// 增加右键菜单
const contextMenuTemplate = [
    { label: "撤销", role: 'undo' },
    { type: 'separator' }, //分隔线 
    { label: "剪切", role: 'cut' }, //Cut菜单项
    { label: "复制", role: 'copy' }, //Copy菜单项
    { label: "粘贴", role: 'paste' }, //Paste菜单项
    { label: "删除", role: 'delete' }, //Delete菜单项
    { type: 'separator' }, //分隔线 
    { label: "全选", role: 'selectall' }, //Select All菜单项
    { type: 'separator' }, //分隔线 
    { label: "重新加载页面", role: 'reload' },
    { label: "切换开发者工具", role: 'toggledevtools' },
];
const contextMenu = Menu.buildFromTemplate(contextMenuTemplate);


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

    let aria2_dir = path.join(__dirname, "aria2", platform, aria2_bin)

    let conf_path = `${__dirname}/aria2/aria2.conf`

    edit_conf()

    //打开主程序
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

