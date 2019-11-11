<template>
    <div class="loading">
        <span class="icon-loading"></span>
    </div>
</template>

<script>
    export default {
        name: "Loading"
    }
</script>

<style scoped>
    .loading{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;
        background:rgba(0,0,0,.5);
    }
    .icon-loading{
        width: .48rem;
        height: .48rem;
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -.24rem 0 0 -.24rem;
        -webkit-animation: loading linear .75s infinite;
        animation: loading linear .75s infinite;
        background:url("../assets/icon/icon-loading.png") no-repeat 50% 50%;
        -webkit-background-size: 100%;
        background-size: .48rem .48rem;
    }
    @-webkit-keyframes loading{
        from{ transform: rotate(0deg) }
        to { transform: rotate(360deg) }
    }
    @keyframes loading{
        from{ transform: rotate(0deg) }
        to { transform: rotate(360deg) }
    }
</style>