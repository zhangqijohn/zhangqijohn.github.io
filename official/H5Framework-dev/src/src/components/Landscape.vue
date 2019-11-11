<template>
    <div id="orientLayer" class="mod-orient-layer">
        <div class="mod-orient-layer__content">
            <i class="icon mod-orient-layer__icon-orient"></i>
            <div class="mod-orient-layer__desc">
                为了更好的体验，请使用横屏浏览<br>
                PS：同时手机需要取消横屏锁定喔！
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "landscape"
    }
</script>

<style scoped>
    @-webkit-keyframes rotation {
        10% {
            transform: rotate(90deg);
            -webkit-transform: rotate(90deg)
        }

        50%, 60% {
            transform: rotate(0deg);
            -webkit-transform: rotate(0deg)
        }

        90% {
            transform: rotate(90deg);
            -webkit-transform: rotate(90deg)
        }

        100% {
            transform: rotate(90deg);
            -webkit-transform: rotate(90deg)
        }
    }

    @keyframes rotation {
        10% {
            transform: rotate(90deg);
            -webkit-transform: rotate(90deg)
        }

        50%, 60% {
            transform: rotate(0deg);
            -webkit-transform: rotate(0deg)
        }

        90% {
            transform: rotate(90deg);
            -webkit-transform: rotate(90deg)
        }

        100% {
            transform: rotate(90deg);
            -webkit-transform: rotate(90deg)
        }
    }

    #orientLayer {
        display: none;
        z-index: 999999;
    }

    @media all and (orientation : portrait) {
        #orientLayer {
            display: block;
        }
    }

    .mod-orient-layer {
        display: none;
        position: fixed;
        height: 100%;
        width: 100%;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: #000;
        z-index: 9999
    }

    .mod-orient-layer__content {
        position: absolute;
        width: 100%;
        top: 45%;
        margin-top: -.75rem;
        text-align: center
    }

    .mod-orient-layer__icon-orient {
        background-image: url('../assets/img/mobile.png');
        display: inline-block;
        width: .67rem;
        height: 1.09rem;
        transform: rotate(90deg);
        -webkit-transform: rotate(90deg);
        -webkit-animation: rotation infinite 1.5s ease-in-out;
        animation: rotation infinite 1.5s ease-in-out;
        -webkit-background-size: 100%;
        background-size: 100%
    }

    .mod-orient-layer__desc {
        margin-top: .20rem;
        font-size: .15rem;
        line-height: .8rem;
        color: #fff
    }
</style>