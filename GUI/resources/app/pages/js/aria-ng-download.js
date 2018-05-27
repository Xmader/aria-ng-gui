// aria-ng 显示直接下载链接 (自用)
// © Xmader.com & 超猫

function show_urls() {
    var spans = $(".task-name");
    for (i = 0; i < spans.length; i++) {
        var err = $($(".task-name").parent().parent()[i]).next().children(".icon-error");
        if (err.length == 0) {

            var old_innerHTML = spans[i].innerHTML;
            spans[i].innerHTML = "<a href='" + download_url + old_innerHTML + "'>" + old_innerHTML + "</a>"
        }
    }
}

function show_btn() {
    // 判断是否是 已完成/已停止 页面
    var hash = location.hash.split("/")[1];
    if (hash == "stopped" && enable_file_download == true) {
        // 导航栏增加分割线
        var divider = document.createElement('li');
        divider.classList = ["divider"];
        divider.id = "show_urls_divider";
        $(".nav.navbar-nav")[0].append(divider);

        // 导航栏增加按钮
        var li = document.createElement('li');
        li.id = "show_urls_btn";
        li.innerHTML = '<a title="显示直接下载链接" href="javascript:show_urls()"><i class="fa fa-download"></i></a>';
        $(".nav.navbar-nav")[0].append(li);
    }
    else {
        $($(".nav.navbar-nav")[0]).children("li#show_urls_btn,li#show_urls_divider").remove();

    }
}

// 判断是否是 已完成/已停止 页面
var hash = location.hash.split("/")[1];
if (hash == "stopped" && enable_file_download == true) {
    show_btn()
}

// 检测浏览器是否支持onhashchange事件 
if (("onhashchange" in window) && ((typeof document.documentMode === "undefined") || document.documentMode == 8)) {
    window.onhashchange = show_btn;
}


