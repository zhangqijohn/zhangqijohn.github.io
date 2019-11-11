<template>
    <div v-if="messageVisible" class="message-container">
        {{message}}
    </div>
</template>

<script>
    export default {
        props: {
            messageVisible: {
                type: Boolean,
                default: false
            },
            message: {
                type: String,
                default: '数据加载中...'
            }

        }
    }
</script>

<style scoped>
.message-container{
    text-align: center;
    font-size: .28rem;
    color: #666;
}
</style>