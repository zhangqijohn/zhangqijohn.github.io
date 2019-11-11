<template>
  <div class="app-main">
    <el-row :class="classObj">
      <div class="moni-fl">
        moni-fl
      </div>
      <div class="moni-fr">
        <el-button @click="opened = !opened">点击</el-button>
            <div class="new-add-msg-tips" >有0条新信息</div>
      </div>
    </el-row>

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
    computed: {
      classObj () {
        return {
          hideSidebar: !this.opened,
          openSidebar: this.opened
        }
      }
    },
    mounted(){
     // let height = window.getComputedStyle(this.$refs.element).height; // 100px
      this.$nextTick(()=>{
        // let height= this.$refs.prize[0].offsetHeight;
        // console.log(window.getComputedStyle(this.$refs.prize).height)
        // console.log((window.getComputedStyle(document.querySelector(".plist")).height).replace(/px$/,''))
        //this.topVaule = parseInt(window.getComputedStyle(document.querySelector(".plist")).height.replace(/px$/,''))+20
        // this.top= - this.topVaule +'px'
        console.log(this.top)
        console.log(this.topVaule)
      })

    },
    created() {
      var a01 = 1
      for(let x=0,mx=3000;x<mx;x++){
        this.prizeList.push({ name:'这是第几条新增数据'+x,src:'11234564',id:'a'+x})
      }
      window.addEventListener('scroll', this.handleScroll, true);

      this.ScrollUp();
      this.adddate()
    },
    methods: {
      handleScroll(){
        console.log('鼠标滚动了')
        clearInterval(intnum)
      },
      adddate(){
        let num = 6
        setInterval(() => {
          num++
          this.prizeList.push({ name:'这是第几条新增数据'+num,src:'11234564',id:'a'+num})
        }, 6000);
      },
      ScrollUp(){
        window.intnum = setInterval(_ => {
          if (this.activeIndex < this.prizeList.length) {
            this.activeIndex += 1;
          } else {
            this.activeIndex = 0;
          }
          this.topVaule = parseInt(this.topVaule) + parseInt((window.getComputedStyle(document.querySelector(".a"+this.activeIndex)).height).replace(/px$/,'')) + 20

          this.top= - this.topVaule +'px'

          console.log(this.activeIndex)
        }, 1000);
      },

      Stop(){
        // clearInterval(this.intnum);
      },
      Up(){
        // this.ScrollUp();
      }
    },
    filters: {
      getId (val) {
        let prizeList = this.prizeList
        prizeList.filter(x=>{
          if(x.id === val){
            return x.label
          }
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
