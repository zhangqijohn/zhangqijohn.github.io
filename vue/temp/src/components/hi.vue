<template>
  <div class="app-main">
    <button @click="goToEditor">跳转至文本编辑</button>
  </div>
</template>

<script>
  export default {
    name: 'complexTable',
    data() {
      return {
        opened: true
      }
    },
    methods: {
      goToEditor(){
        this.$router.push({
          path: '/editor/quill'
        })
      }
    }
  }

</script>

<style lang="less" scoped>
  .app-main{
    position: relative;
    .moni-fr{
      min-height: 100%;
      transition: margin-left .28s;
      margin-left: 280px;
      position: relative;
    }
    .moni-fl {
      transition: width 0.28s;
      width: 280px !important;
      height: 100%;
      position: fixed;
      font-size: 20px;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 1001;
      overflow: hidden;
    }
  }

  .hideSidebar {
    .moni-fl {
      width: 0px !important;
    }
    .moni-fr {
      margin-left: 0px;
    }
  }

</style>
