<template>
  <div>
    <div class="scrollWrap">

       <div class="scroll-content" :style="{ top }" @mouseenter="Stop()" @mouseleave="Up()">
          <p v-for="(item,i) in prizeList" :ref="prizeList" :key="i" :class="item.id" class="plist"><span :href="item.src">{{item.name}}</span></p>
       </div>

    </div>
    <!--<div ref="prize" class="a10">123</div>-->
  </div>
</template>

<script>
  export default {
    name: 'complexTable',
    data() {
      return {
        prizeList: [
          { name: '城轨采购网',src:'http://www.railunique.com',id:'a1'},
          { name: '天津地铁电子采购平台',src:'http://www.railunique.com',id:'a2' },
          { name: '南昌地铁',src:'http://www.railunique.com',id:'a3' },
          { name: '南昌地铁',src:'http://www.railunique.com',id:'a4' },
          { name: '兰州地铁招标信息,兰州地铁招标信息兰州地铁招标信息兰州地铁招标信息兰州地铁招标信息，兰州地铁招标信息兰州地铁招标信息兰州地铁招标信息',src:'http://www.railunique.com',id:'a5' },
          { name: '西安公共资源交易中心',src:'http://www.railunique.com',id:'a6' },
        ],
        activeIndex: 0,
        intnum: undefined,
        top: 0,
        topVaule: 0
      }
    },
    computed: {
      // top() {
      //   // return - this.activeIndex * 50 + 'px';
      //   return - (window.getComputedStyle(document.querySelector(".a5")).height)
      //
      // }
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
        }, 1);
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
        }, 1000);
      },

      Stop(){
        // clearInterval(this.intnum);
      },
      Up(){
        // this.ScrollUp();
      }
    }
  }

</script>


<style lang="less" scoped>
    p{padding: 0;margin: 0}
    .scrollWrap{ width:150px;height: 150px; overflow: auto; }
    .scroll-content { position: relative; transition: top 0.5s; }
    .scroll-content p{ line-height:25px; text-align: center;padding: 10px 0;}
</style>
