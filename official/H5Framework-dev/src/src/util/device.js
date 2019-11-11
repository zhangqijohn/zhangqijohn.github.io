const ua = navigator.userAgent.toLowerCase()
const device = {
    flexible (params) {
        const doc = document;
        const win = window;
        const docEl = doc.documentElement;
        const resizeEvent = "orientationchange" in win ? "orientationchange" : "resize";
        const width = params.width || 1334;

        const remHandler = () => {
            const clientWidth = docEl.clientWidth;

            if(!clientWidth) {
                return;
            }
            docEl.style.fontSize = 100 * (clientWidth / width) + 'px';
        };

        remHandler();

        win.addEventListener(resizeEvent, remHandler, false);
        doc.addEventListener('DOMContentLoaded', remHandler, false);
    },
    isWeChat () {
        return /micromessenger/.test(ua)
    },
    isiIos (){
        return /iphone|ipad|ipod|windows phone/ig.test(ua)
    },
    isAndroid () {
        return /android/ig.test(ua)
    },
    isMobile () {
        return this.isWeChat() || this.isiIos() || this.isAndroid()
    }
}

export default device
