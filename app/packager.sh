platform=$1 # 操作系统名称: win32 或 linux 或 darwin
if [ $2 ]
then
   arch=$2 # 系统构架: x64 或 ia32 或 arm64 或 armv7l
else
   arch=x64
fi

ignore_platform=$(node -e "console.log(['linux','darwin','win32'].filter(x=>x!='${platform}').join('|'))")

electron-packager . AriaNgGUI --app-copyright="Copyright (c) 2018-2019 Xmader" \
    --platform=${platform} --arch=${arch} --electron-version 3.1.11 \
    --out ../OutApp/ --overwrite \
    --icon=./assets/AriaNg.ico --ignore=packager.sh --ignore="aria2\/(${ignore_platform})" --ignore="^\/node_modules" \
    --tmpdir=../OutApp/Temp/ --download.cache=../OutApp/Temp/ --download.mirror="https://npm.taobao.org/mirrors/electron/"

cd ../OutApp/AriaNgGUI-${platform}-${arch}
rm LICENSE LICENSES.chromium.html version
cp ../../README.md ./
cp ../../LICENSE ./

cd ../ # 在OutApp文件夹
cd "AriaNgGUI-${platform}-${arch}"

if [ ${platform} = "darwin" ]
then
    electron-installer-zip AriaNgGUI.app ../../dist/AriaNgGUI-${platform}-${arch}.zip
elif [ ${platform} = "linux" ]
then
    electron-installer-zip AriaNgGUI-${platform}-${arch} ../../dist/AriaNgGUI-${platform}-${arch}.zip
else
    electron-installer-zip . ../../dist/AriaNgGUI-${platform}-${arch}.zip
fi

# rm -rf AriaNgGUI-${platform}-${arch}

# rm ../dist/AriaNgGUI-${platform}-${arch}.zip
