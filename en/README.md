# AriaNg GUI

> An Aria2 GUI for Windows & Linux

![](Screenshot1.png)

## Features
* Integrate aria2c (Default aria2 RPC: `http://localhost:6800`)
* Multi-Thread Download
* Auto save unfinished tasks on exit
* PT/BT support
* Download finished notification
* Multi-languages support
* Multi aria2 RPC host support
* Support for downloading files from a remote aria2 server directly
* Responsive design, supporting desktop and mobile devices
* User-friendly interface
    * Sort tasks (by name, size, progress, remain time, download speed, etc.), files, peers
    * Search tasks
    * Adjust download order by dragging task
    * More information of tasks (health percentage, client infomation of bt peers, etc.)
    * Filter files of tasks in file types (by videos, audios, pictures, documents, applications, archives, etc.)
    * Download/upload history chart of global or task
    * Full support of aria2 settings


## Usage

Just Unzip it, and Open `aria-ng.exe` or `aria-ng`(Linux).

By default, `AriaNg GUI` downloads files into `Download` directory.

<!-- ## 高级使用

### 文件直接下载

`AriaNg GUI`支持直接从远程aria2服务器上下载文件，此功能默认关闭。

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

![](Screenshot5.png)
![](Screenshot2.png)
![](Screenshot3.png)

## Download

[Releases](https://github.com/Xmader/aria-ng-gui/releases/latest)

## With special thanks to

* [Aria2](https://aria2.github.io/)
* [AriaNg](http://ariang.mayswind.net/)
* [Electron](https://electronjs.org/)
* [docsify](https://docsify.js.org)



