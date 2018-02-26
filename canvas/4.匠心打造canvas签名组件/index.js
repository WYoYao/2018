; (function () {



    // 定义全局的 canvas 对象
    const canvas = document.getElementById('canvas');
    const { clientHeight: height, clientWidth: width } = document.body;

    //  动态获取屏幕的宽高
    canvas.setAttribute('height', `${height}px`);
    canvas.setAttribute('width', `${width * 0.9}px`);
    const context = canvas.getContext('2d');

    // 优化动画效果 最低每秒60帧
    const requestAnimationFrame = window.requestAnimationFrame || (fn => setInterval(fn, 16.6));

    // 判断是PC 或 Mobile
    const isMobile = /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(navigator.userAgent);

    //  设置颜色
    context.lineWidth = 10;         // 直线宽度
    context.strokeStyle = 'black';     // 路径的颜色
    context.lineCap = 'round';         // 直线首尾端圆滑
    context.lineJoin = 'round';     // 当两条线条交汇时，创建圆形边角
    context.shadowBlur = 0;         // 边缘模糊，防止直线边缘出现锯齿
    context.shadowColor = 'black';  // 边缘颜色

    // 画布距屏幕左边和顶部的像素距离，主要用于将屏幕坐标点转换为画布坐标点。
    const { left: lefts, top: tops } = canvas.getBoundingClientRect();

    //  用来存储点的容器
    const point = {};

    // 连点成线
    const paint = (signal) => {
        switch (signal) {
            case 1:// 开始路径
                context.beginPath();
                context.moveTo(point.x, point.y);
            case 2://之所以没有break,是为了点击时候就能描出来一个点
                context.lineTo(point.x, point.y);
                context.stroke();
                break;
        }
    }

    let pressed = false; // 标示是否发生鼠标按下或者手指按下事件
    const create = signal => (e) => {
        if (signal === 1) {
            pressed = true;
        }
        if (signal === 1 || pressed) {
            e = isMobile ? e.touches[0] : e;
            point.x = e.clientX - lefts + 0.5; // 不加0.5，整数坐标处绘制直线，直线宽度将会多1px(不理解的不妨谷歌下)
            point.y = e.clientY - tops + 0.5;
            paint(signal);
        }
    };


    const start = create(1);
    const move = create(2);

    const optimizedMove = requestAnimationFrame ? (e) => {
        requestAnimationFrame(() => {
            move(e);
        });
    } : move;

    if (isMobile) {
        canvas.addEventListener('touchstart', start);
        canvas.addEventListener('touchmove', optimizedMove);
    } else {
        canvas.addEventListener('mousedown', start);
        canvas.addEventListener('mousemove', optimizedMove);
        ['mouseup', 'mouseleave'].forEach((event) => {
            canvas.addEventListener(event, () => {
                pressed = false;
            });
        });
    }


    // 颜色修改
    let colors = ["#70d4b4", "#ffebb7", "#bbbbbb", "#aaaaaa", "#ec7700", "#d65f00", "#c04d00", "#efefef", "#3a0088", "#930077", "#e61c5d", "#ffbd39", "#194769", "#f6f6e9", "#d7eef2", "#f2855e", "#0e9577", "#04dead", "#f1efb9", "#fbfae1", "#970747", "#fef4e8", "#1989ac", "#283e56", "#fdfdeb", "#f9ce00", "#00818a", "#09194f", "#0f3057", "#00587a", "#008891", "#e7e7de", "#9f609c", "#ea8f79", "#e4d183", "#f8f1e5", "#283149", "#404b69", "#da0463", "#dbedf3", "#f4e8c1", "#a0c1b8", "#726a95", "#351f39", "#ffb6b9", "#fae3d9", "#bbded6", "#61c0bf", "#ecfafb", "#81cbc8", "#4aa6b5", "#d6c481", "#5628b4", "#d80e70", "#e7455f", "#f7b236", "#f4f4f4", "#65eeb7", "#ff5722", "#474744", "#232855", "#215b63", "#5fcc9c", "#aaffc7", "#4a772f", "#ffdd00", "#fa9e05", "#a7095c", "#ffa3ac", "#00043c", "#005d6c", "#00c9b1", "#265961", "#227066", "#76a665", "#ffdd5c", "#17139c", "#dd3e3e", "#ffe5e1", "#f2f2f2", "#ff7777", "#fff195", "#fcffbf", "#f5e9ff", "#ebebeb", "#fec100", "#528078", "#3e615b", "#333644", "#84577c", "#c65f63", "#f6e1b8", "#fdfdfd", "#e1eb71", "#ecab69", "#e36161"]

    let nodeList = colors.reduce((con, item) => {
        let li = document.createElement('li');
        li.style.background = item;
        li.onclick = (e) => context.strokeStyle = item;
        con.appendChild(li);
        return con;
    }, document.createDocumentFragment());

    document.getElementById("float").appendChild(nodeList);

})();