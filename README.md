
# AriaNg GUI

> 一个 Aria2 图形界面客户端

[![构建状态](https://dev.azure.com/xmader/apps/_apis/build/status/aria-ng-gui)](https://dev.azure.com/xmader/apps/_build/latest?definitionId=1)

![](https://aria-ng.xmader.com/Screenshot1.png)

## 特性

* 集成aria2c
* 多线程下载
* 未完成任务退出自动保存 <!-- (Bug: 需要暂停才能保存进度) -->
* 支持PT/BT
* 下载完成消息通知
* 多语言支持
* 支持配置多个 aria2 RPC
* 支持打开下载文件夹, 在文件管理器中显示已下载的文件 (仅限使用内置的Aria2 RPC)
* 使用响应式布局, 支持各种计算机或移动设备
* 友好的界面交互

## [查看文档](https://aria-ng.xmader.com/)

## [下载](https://github.com/Xmader/aria-ng-gui/releases/latest)

## Aria2 配置文件路径

* Windows: `%APPDATA%/aria-ng-gui/aria2.conf`
* Linux: `~/.config/aria-ng-gui/aria2.conf` 或 `$XDG_CONFIG_HOME/aria-ng-gui/aria2.conf`
* macOS: `~/Library/Application Support/aria-ng-gui/aria2.conf`

## 使用 npm 安装

```
npm i -g aria-ng-gui
```

运行

```
AriaNgGUI
```

更新

```
npm update -g aria-ng-gui
```

## 使用 scoop 安装

[Scoop](https://github.com/lukesampson/scoop) 是一个 Windows 下的包管理工具。

```
scoop bucket add extras
scoop install aria-ng-gui
```

---

# AriaNg GUI

> An Aria2 GUI for Windows & Linux & MacOS

[![Build Status](https://dev.azure.com/xmader/aria-ng-gui/_apis/build/status/aria-ng-gui-darwin)](https://dev.azure.com/xmader/aria-ng-gui/_build/latest?definitionId=1)

![](https://aria-ng.xmader.com/en/Screenshot1.png)

## Features

* Integrate aria2c
* Multi-Thread Download
* Auto save unfinished tasks on exit
* PT/BT support
* Download finished notification
* Multi-languages support
* Multi aria2 RPC host support
* Support for opening download folder, and displaying downloaded files in file manager (the built-in Aria2 RPC only)
* Responsive design, supporting desktop and mobile devices
* User-friendly interface

## [Docs](https://aria-ng.xmader.com/#/en/README)

## [Download](https://github.com/Xmader/aria-ng-gui/releases/latest)

## Path to the aria2 config file

* on Windows: `%APPDATA%/aria-ng-gui/aria2.conf`
* on Linux: `~/.config/aria-ng-gui/aria2.conf` or `$XDG_CONFIG_HOME/aria-ng-gui/aria2.conf`
* on macOS: `~/Library/Application Support/aria-ng-gui/aria2.conf`

## Install using npm

```
npm i -g aria-ng-gui
```

run

```
AriaNgGUI
```

update

```
npm update -g aria-ng-gui
```

## Install using scoop

[Scoop](https://github.com/lukesampson/scoop) is a command-line installer for Windows.

```
scoop bucket add extras
scoop install aria-ng-gui
```
