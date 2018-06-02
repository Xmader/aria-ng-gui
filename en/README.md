# AriaNg GUI

> An Aria2 GUI for Windows & Linux

![](../Screenshot1.png)

## Features
* 集成aria2c (默认aria2 RPC:`http://localhost:6800`)
* 多线程下载
* 未完成任务退出自动保存
* 支持PT/BT
* Download finished notification
* Multi-languages support
* Multi aria2 RPC host support
* 支持直接从远程aria2服务器上下载文件
* Responsive design, supporting desktop and mobile devices
* User-friendly interface
    * Sort tasks (by name, size, progress, remain time, download speed, etc.), files, peers
    * Search tasks
    * Adjust download order by dragging task
    * More information of tasks (health percentage, client infomation of bt peers, etc.)
    * Filter files of tasks in file types (by videos, audios, pictures, documents, applications, archives, etc.)
    * Download/upload history chart of global or task
    * Full support of aria2 settings


## 使用

解压后双击`aria-ng.exe`或`aria-ng`(Linux版) 即可

默认下载到与`aria-ng.exe`或`aria-ng`(Linux版) 同一文件夹下的 `Download` 文件夹

<!-- ## 高级使用

### 文件直接下载

`AriaNg 客户端`支持直接从远程aria2服务器上下载文件，此功能默认关闭。

#### 启用方法：

修改`GUI/resources/app/pages/js/`文件夹下的`download-url-setting.js`文件，将`false`修改为`true`,并在引号内写上直接下载地址。

例如：
```js
// 是否启用文件直接下载
enable_file_download = true

// 请在这里写下您的文件直接下载地址
download_url = "https://www.example.com/"
``` -->

## Screenshots

![](../Screenshot5.png)
![](../Screenshot2.png)
![](../Screenshot3.png)

## Download

[Linux](https://xmader.oss-cn-shanghai.aliyuncs.com/AriaNG_GUI_Linux.zip)

[Windows](https://xmader.oss-cn-shanghai.aliyuncs.com/AriaNG_GUI_Windows.zip)

## With special thanks to:

* [Aria2](https://aria2.github.io/)
* [AriaNg](http://ariang.mayswind.net/zh_Hans/)
* [Electron](https://electronjs.org/)
* [docsify](https://docsify.js.org/#/zh-cn/)



