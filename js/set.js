// 背景图片配置
var wallpaperConfig = {
    type1: [
        './img/background1.webp',
        './img/background2.webp',
        './img/background3.webp',
        './img/background4.webp',
        './img/background5.webp',
        './img/background6.webp',
        './img/background7.webp',
        './img/background8.webp',
        './img/background9.webp',
        './img/background10.webp'
    ],
    type2: 'https://api.dujin.org/bing/1920.php',
    type3: 'https://api.vvhan.com/api/wallpaper/views',
    type4: 'https://api.vvhan.com/api/wallpaper/acg'
};

// 默认背景配置
var bg_img_preinstall = {
    "type": "1" // 1:默认背景 2:每日一图 3:随机风景 4:随机动漫
};

// 设置背景图片到 Cookies
function setBgImg(bg_img) {
    if (bg_img) {
        Cookies.set('bg_img', JSON.stringify(bg_img), {
            expires: 36500
        });
        return true;
    }
    return false;
}

// 获取背景图片 Cookies
function getBgImg() {
    var bg_img_local = Cookies.get('bg_img');
    if (bg_img_local && bg_img_local !== "{}") {
        return JSON.parse(bg_img_local);
    } else {
        return bg_img_preinstall;
    }
}

// 设置壁纸
function setWallpaper(type, url) {
    var bg_img = getBgImg();
    bg_img["type"] = type;
    setBgImg(bg_img);
    $('#bg').attr('src', url);
    iziToast.destroy(); // 关闭之前的通知
    iziToast.show({
        icon: "fa-solid fa-image",
        timeout: 2500,
        message: '壁纸设置成功',
    });
}

// 初始化背景图片
function setBgImgInit() {
    var bg_img = getBgImg();
    $("input[name='wallpaper-type'][value=" + bg_img["type"] + "]").click();

    switch (bg_img["type"]) {
        case "1":
            var pictures = wallpaperConfig.type1;
            var rd = Math.floor(Math.random() * pictures.length);
            $('#bg').attr('src', pictures[rd]); // 随机默认壁纸
            break;
        case "2":
            var bingUrl = localStorage.getItem('bingWallpaper');
            if (bingUrl) {
                $('#bg').attr('src', bingUrl); // 必应每日
            } else {
                // 重新获取必应每日图片 URL
                fetch(wallpaperConfig.type2)
                    .then(response => response.url)
                    .then(url => {
                        localStorage.setItem('bingWallpaper', url);
                        $('#bg').attr('src', url);
                    });
            }
            break;
        case "3":
            var sceneryUrl = localStorage.getItem('sceneryWallpaper');
            if (sceneryUrl) {
                $('#bg').attr('src', sceneryUrl); // 随机风景
            } else {
                // 重新获取随机风景图片 URL
                fetch(wallpaperConfig.type3)
                    .then(response => response.url)
                    .then(url => {
                        localStorage.setItem('sceneryWallpaper', url);
                        $('#bg').attr('src', url);
                    });
            }
            break;
        case "4":
            var acgUrl = localStorage.getItem('acgWallpaper');
            if (acgUrl) {
                $('#bg').attr('src', acgUrl); // 随机动漫
            } else {
                // 重新获取随机动漫图片 URL
                fetch(wallpaperConfig.type4)
                    .then(response => response.url)
                    .then(url => {
                        localStorage.setItem('acgWallpaper', url);
                        $('#bg').attr('src', url);
                    });
            }
            break;
    }
}

// 页面加载时初始化
$(document).ready(function () {
    // 壁纸数据加载
    setBgImgInit();

    // 设置背景图片
    $("#wallpaper").on("click", ".set-wallpaper", function () {
        var type = $(this).val();
        switch (type) {
            case "1":
                var pictures = wallpaperConfig.type1;
                var rd = Math.floor(Math.random() * pictures.length);
                setWallpaper(type, pictures[rd]);
                break;
            case "2":
                var bingUrl = localStorage.getItem('bingWallpaper');
                if (bingUrl) {
                    setWallpaper(type, bingUrl);
                } else {
                    fetch(wallpaperConfig.type2)
                        .then(response => response.url)
                        .then(url => {
                            localStorage.setItem('bingWallpaper', url);
                            setWallpaper(type, url);
                        });
                }
                break;
            case "3":
                var sceneryUrl = localStorage.getItem('sceneryWallpaper');
                if (sceneryUrl) {
                    setWallpaper(type, sceneryUrl);
                } else {
                    fetch(wallpaperConfig.type3)
                        .then(response => response.url)
                        .then(url => {
                            localStorage.setItem('sceneryWallpaper', url);
                            setWallpaper(type, url);
                        });
                }
                break;
            case "4":
                var acgUrl = localStorage.getItem('acgWallpaper');
                if (acgUrl) {
                    setWallpaper(type, acgUrl);
                } else {
                    fetch(wallpaperConfig.type4)
                        .then(response => response.url)
                        .then(url => {
                            localStorage.setItem('acgWallpaper', url);
                            setWallpaper(type, url);
                        });
                }
                break;
        }
    });
});