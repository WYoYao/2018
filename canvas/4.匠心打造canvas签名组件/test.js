



; (function () {

    // 定义全局的 canvas 对象
    const canvas = document.getElementById('canvas');
    const { height, width } = window.screen;

    //  动态获取屏幕的宽高
    canvas.setAttribute('height', `${height}px`);
    canvas.setAttribute('width', `${width}px`);
    const context = canvas.getContext('2d');

    // 优化动画效果 最低每秒60帧
    requestAnimationFrame ? void 0 : fn => setInterval(fn, 16.6);

    // 判断是PC 或 Mobile
    const isMobile = /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(navigator.userAgent);


    //  暂停跟随
    let stop = false;




    // 鼠标按住事件
    let start = e => {

    }

    // moveCache 
    let point  = [];
    //  移动事件
    let mousemove = e => {

        let { x, y } = e;

        console.log({ x, y });

        context.fillStyle = "rgb(200,0,0)";
        context.lineCap = "round";


        moveCache.push([x, y, 10, 10]);
        //moveCache.push([x, y, 10, 0, Math.PI + (Math.PI * 360) / 2, true]);
        requestAnimationFrame(() => {

            console.log(moveCache.length);
            for (item of moveCache) {
                context.fillRect(...item);
            };

            moveCache = [];
        });
    }

    //  绑定滑动事件
    //  记录鼠标按住状态
    let pressed = false;

    if (isMobile) {
        // Mobile
        canvas.addEventListener('touchstart', start);
        canvas.addEventListener('touchmove', mousemove);
    } else {
        // PC
        canvas.addEventListener('mousedown', start);
        canvas.addEventListener('mousemove', mousemove);
        ['mouseup', 'mouseleave'].forEach((event) => {
            canvas.addEventListener(event, () => {
                pressed = false;
            });
        });
    }


})();
