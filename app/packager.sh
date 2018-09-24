platform=$1 # 操作系统名称: win32 或 linux
if [ $2 ]
then
   arch=$2 # 系统构架: x64 或 ia32 或 arm64 或 armv7l
else
   arch=x64
fi

electron-packager . AriaNgGUI \
    --platform=${platform} --arch=${arch} --electron-version 3.0.0 \
    --out ../OutApp/ --overwrite \
    --icon=./assets/AriaNg.ico --ignore=packager.sh \
    --tmpdir=../OutApp/Temp/ --download.cache=../OutApp/Temp/ --download.mirror="https://npm.taobao.org/mirrors/electron/"

cd ../OutApp/AriaNgGUI-${platform}-${arch}
rm LICENSE LICENSES.chromium.html version
cp ../../README.md ./

cd ../ # 在OutApp文件夹
electron-installer-zip AriaNgGUI-${platform}-${arch} ../dist/AriaNgGUI-${platform}-${arch}.zip
# rm -rf AriaNgGUI-${platform}-${arch}

# rm ../dist/AriaNgGUI-${platform}-${arch}.zip
