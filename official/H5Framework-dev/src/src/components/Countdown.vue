<template>
    <div class="countdown-container">
        <span v-if="countdown!==0" class="countdown"><strong>{{countdown}}</strong> s</span>
        <span
            v-if="countdown===0"
            @click="getCountDown">{{countText}}</span>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                countdown: 0,
                timer: null,
                countText: '获取验证码'
            }
        },
        methods: {
            countdownHandler () {
                this.countdown--;
                if(this.countdown <=0 ) {
                    this.countText = '重新获取';
                    clearInterval(this.timer)
                }
            },
            getCountDown () {
                this.countdown = 30;
                this.timer = setInterval(this.countdownHandler, 1000)
            }
        }
    }
</script>

<style scoped>
    .countdown{
        color: #999;
    }
</style>